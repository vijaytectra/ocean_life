"use client";

import React, { useState, useCallback, useId } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";
import styles from "./ImageCropper.module.css";

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 5;

export default function ImageCropper({
  onImageCropped,
  onCancel,
  onUploadStart,
  aspectRatio,
  freeAspect,
}) {
  const inputId = useId();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(ZOOM_MIN);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setErrorMessage("Please choose an image file (PNG, JPG, WebP, etc.).");
      return;
    }
    setErrorMessage("");
    try {
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setZoom(ZOOM_MIN);
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

  const showCroppedImage = useCallback(async () => {
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
  }, [imageSrc, croppedAreaPixels, onImageCropped, onUploadStart]);

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
      ) : (
        <div className={styles.cropShell}>
          <div className={styles.cropStage}>
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
          <div className={styles.controlsBar}>
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
                disabled={uploading || !croppedAreaPixels}
              >
                {uploading ? "Uploading…" : "Save & upload"}
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
