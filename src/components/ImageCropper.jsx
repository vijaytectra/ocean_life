"use client";

import React, { useState, useCallback, useId, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";
import { blobToDataUrl, removeImageBackground } from "@/utils/removeImageBackground";
import ClientLogoSitePreview from "@/components/admin/ClientLogoSitePreview";
import styles from "./ImageCropper.module.css";

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 5;

export default function ImageCropper({
  onImageCropped,
  onCancel,
  onUploadStart,
  aspectRatio,
  freeAspect,
  previewMode,
  previewSectionTitle,
  enableBgRemoval,
}) {
  const inputId = useId();
  const [imageSrc, setImageSrc] = useState(null);
  const [originalImageSrc, setOriginalImageSrc] = useState(null);
  const [bgRemoved, setBgRemoved] = useState(false);
  const [removingBg, setRemovingBg] = useState(false);
  const [bgProgress, setBgProgress] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(ZOOM_MIN);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState("crop");
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewBlob, setPreviewBlob] = useState(null);
  const previewUrlRef = useRef(null);
  const previewTimerRef = useRef(null);

  const revokePreviewUrl = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }, []);

  useEffect(() => () => revokePreviewUrl(), [revokePreviewUrl]);

  const loadFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setErrorMessage("Please choose an image file (PNG, JPG, WebP, etc.).");
      return;
    }
    setErrorMessage("");
    setStep("crop");
    revokePreviewUrl();
    setPreviewSrc(null);
    setPreviewBlob(null);
    setBgRemoved(false);
    setBgProgress(0);
    setRemovingBg(false);
    try {
      const imageDataUrl = await readFile(file);
      setOriginalImageSrc(imageDataUrl);
      setImageSrc(imageDataUrl);
      setCrop({ x: 0, y: 0 });
      setZoom(ZOOM_MIN);
      setCroppedAreaPixels(null);
    } catch {
      setErrorMessage("Could not read this file. Try another image.");
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) await loadFile(file);
    e.target.value = "";
  };

  const onDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await loadFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => {
    setDragActive(false);
  };

  const onCropComplete = useCallback((_croppedArea, nextPixels) => {
    setCroppedAreaPixels(nextPixels);
  }, []);

  const buildCroppedPreview = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return null;
    const blob = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
    revokePreviewUrl();
    const url = URL.createObjectURL(blob);
    previewUrlRef.current = url;
    setPreviewSrc(url);
    setPreviewBlob(blob);
    return blob;
  }, [imageSrc, croppedAreaPixels, revokePreviewUrl]);

  useEffect(() => {
    if (previewMode !== "client-logo" || !imageSrc || !croppedAreaPixels || step !== "crop") {
      return undefined;
    }

    clearTimeout(previewTimerRef.current);
    previewTimerRef.current = setTimeout(() => {
      buildCroppedPreview().catch(() => {});
    }, 250);

    return () => clearTimeout(previewTimerRef.current);
  }, [
    previewMode,
    imageSrc,
    croppedAreaPixels,
    crop,
    zoom,
    step,
    buildCroppedPreview,
  ]);

  const handleRemoveBackground = useCallback(async () => {
    if (!imageSrc || removingBg) return;
    setErrorMessage("");
    setRemovingBg(true);
    setBgProgress(0);
    try {
      const blob = await removeImageBackground(imageSrc, setBgProgress);
      const dataUrl = await blobToDataUrl(blob);
      revokePreviewUrl();
      setPreviewSrc(null);
      setPreviewBlob(null);
      setCroppedAreaPixels(null);
      setCrop({ x: 0, y: 0 });
      setZoom(ZOOM_MIN);
      setImageSrc(dataUrl);
      setBgRemoved(true);
    } catch (error) {
      console.error("Background removal:", error);
      setErrorMessage(
        "Could not remove the background. Try a clearer PNG/JPG logo or crop without removing the background."
      );
    } finally {
      setRemovingBg(false);
      setBgProgress(0);
    }
  }, [imageSrc, removingBg, revokePreviewUrl]);

  const handleRestoreOriginal = useCallback(() => {
    if (!originalImageSrc) return;
    revokePreviewUrl();
    setPreviewSrc(null);
    setPreviewBlob(null);
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(ZOOM_MIN);
    setImageSrc(originalImageSrc);
    setBgRemoved(false);
    setErrorMessage("");
  }, [originalImageSrc, revokePreviewUrl]);

  const goToPreview = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setErrorMessage("");
    try {
      await buildCroppedPreview();
      setStep("preview");
    } catch {
      setErrorMessage("Could not generate preview. Adjust the crop and try again.");
    }
  }, [imageSrc, croppedAreaPixels, buildCroppedPreview]);

  const uploadCroppedImage = useCallback(async () => {
    if (!previewBlob && !croppedAreaPixels) return;
    setErrorMessage("");
    setUploading(true);
    if (onUploadStart) onUploadStart();
    try {
      const croppedImageBlob =
        previewBlob || (await getCroppedImg(imageSrc, croppedAreaPixels, 0));
      const formData = new FormData();
      formData.append("file", croppedImageBlob, "cropped.png");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.url) {
        onImageCropped(data.url);
      } else {
        setErrorMessage(data.error || "Upload failed. Try again or use a smaller image.");
      }
    } catch {
      setErrorMessage("Something went wrong while uploading. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [previewBlob, croppedAreaPixels, imageSrc, onImageCropped, onUploadStart]);

  const showCroppedImage = useCallback(async () => {
    if (previewMode === "client-logo") {
      await goToPreview();
      return;
    }
    if (!imageSrc || !croppedAreaPixels) return;
    setErrorMessage("");
    setUploading(true);
    if (onUploadStart) onUploadStart();
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      const formData = new FormData();
      formData.append("file", croppedImageBlob, "cropped.png");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.url) {
        onImageCropped(data.url);
      } else {
        setErrorMessage(data.error || "Upload failed. Try again or use a smaller image.");
      }
    } catch {
      setErrorMessage("Something went wrong while uploading. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [previewMode, goToPreview, imageSrc, croppedAreaPixels, onImageCropped, onUploadStart]);

  const showClientLogoPreview = previewMode === "client-logo";

  return (
    <div className={styles.wrap}>
      {!imageSrc ? (
        <div className={styles.pick}>
          <div
            className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ""}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            role="presentation"
          >
            <input
              id={inputId}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={onFileChange}
            />
            <label htmlFor={inputId} className={styles.dropLabel}>
              <span className={styles.dropIcon} aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </span>
              <p className={styles.dropTitle}>Add your image</p>
              <p className={styles.dropHint}>
                Drag and drop here, or use the button below. PNG, JPG, and WebP are supported.
              </p>
              <span className={styles.browseBtn}>Browse files</span>
            </label>
          </div>
          <div className={styles.actionsRow}>
            <button type="button" className={styles.secondaryBtn} onClick={onCancel}>
              Cancel
            </button>
          </div>
          {errorMessage ? <p className={styles.errorBanner}>{errorMessage}</p> : null}
        </div>
      ) : step === "preview" && showClientLogoPreview ? (
        <div className={styles.previewShell}>
          <ClientLogoSitePreview
            imageSrc={previewSrc}
            sectionTitle={previewSectionTitle || "Corporate Clients"}
          />
          <div className={styles.controlsBar}>
            <div className={styles.cropActions}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setStep("crop")}
                disabled={uploading}
              >
                Back to crop
              </button>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={uploadCroppedImage}
                disabled={uploading || !previewBlob}
              >
                {uploading ? "Uploading…" : "Confirm & upload"}
              </button>
            </div>
            {errorMessage ? <p className={styles.errorBanner}>{errorMessage}</p> : null}
          </div>
        </div>
      ) : (
        <div className={styles.cropShell}>
          <div className={showClientLogoPreview ? styles.cropWithPreview : undefined}>
            <div className={styles.cropStage} style={bgRemoved ? {
              backgroundColor: "#fff",
              backgroundImage:
                "linear-gradient(45deg, #d1d5db 25%, transparent 25%), linear-gradient(-45deg, #d1d5db 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d1d5db 75%), linear-gradient(-45deg, transparent 75%, #d1d5db 75%)",
              backgroundSize: "16px 16px",
              backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
            } : undefined}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={freeAspect ? undefined : aspectRatio ?? 1}
                minZoom={ZOOM_MIN}
                maxZoom={ZOOM_MAX}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            {showClientLogoPreview && previewSrc ? (
              <div className={styles.livePreviewPanel}>
                <ClientLogoSitePreview
                  imageSrc={previewSrc}
                  sectionTitle={previewSectionTitle || "Corporate Clients"}
                  compact
                />
              </div>
            ) : null}
          </div>
          <div className={styles.controlsBar}>
            {enableBgRemoval && (
              <div className={styles.bgRemovalRow}>
                <div className={styles.bgRemovalCopy}>
                  <p className={styles.bgRemovalTitle}>PNG background remover</p>
                  <p className={styles.bgRemovalHint}>
                    Remove white or coloured backgrounds before cropping. Works best on logos with a solid backdrop.
                  </p>
                </div>
                <div className={styles.bgRemovalActions}>
                  {!bgRemoved ? (
                    <button
                      type="button"
                      className={styles.bgRemoveBtn}
                      onClick={handleRemoveBackground}
                      disabled={removingBg || uploading}
                    >
                      {removingBg ? `Removing… ${bgProgress}%` : "Remove background"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.secondaryBtn}
                      onClick={handleRestoreOriginal}
                      disabled={removingBg || uploading}
                    >
                      Use original image
                    </button>
                  )}
                </div>
                {removingBg && (
                  <div className={styles.bgProgressTrack} aria-hidden>
                    <div
                      className={styles.bgProgressFill}
                      style={{ width: `${bgProgress}%` }}
                    />
                  </div>
                )}
              </div>
            )}
            <div className={styles.zoomRow}>
              <span className={styles.zoomLabel}>Zoom</span>
              <input
                type="range"
                className={styles.zoomSlider}
                min={ZOOM_MIN}
                max={ZOOM_MAX}
                step={0.02}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                aria-label="Crop zoom"
              />
            </div>
            <div className={styles.cropActions}>
              <button type="button" className={styles.secondaryBtn} onClick={onCancel} disabled={uploading}>
                Cancel
              </button>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={showCroppedImage}
                disabled={uploading || removingBg || !croppedAreaPixels}
              >
                {uploading
                  ? "Uploading…"
                  : showClientLogoPreview
                    ? "Preview on website"
                    : "Save & upload"}
              </button>
            </div>
            {errorMessage ? <p className={styles.errorBanner}>{errorMessage}</p> : null}
          </div>
        </div>
      )}
    </div>
  );
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.addEventListener("error", () => reject(new Error("read failed")), false);
    reader.readAsDataURL(file);
  });
}
