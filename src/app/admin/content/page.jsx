"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import ImageCropper from "@/components/ImageCropper";
import MainVideoEditor from "@/components/admin/MainVideoEditor";
import styles from "../admin.module.css";
import { clearActiveToDefaultHero, DEFAULT_HERO_VIDEO_SRC, resolveMediaPublicUrl } from "@/lib/mainVideoContent";

const MAIN_VIDEO_FIELD = {
  id: "main-video",
  title: "Main Website Video",
  description:
    "Update the homepage hero background with a video or a still image (JPG, PNG, WebP, GIF, SVG). Replacements stay in history so you can switch back.",
  placeholder: "Media URL — e.g. /hero-video.mp4, /api/images/banner.jpg, or /about/photo.webp",
};

const TESTIMONIAL_DESKTOP_FIELD = {
  id: "testimonial-desktop",
  title: "Client Testimonials (Desktop)",
  description:
    "Background or featured video/image for the desktop testimonials area. Same as the main hero: upload or paste a URL, with full history to switch back.",
  placeholder: "Desktop media URL — e.g. /api/images/testimonial-desktop.mp4 or .webp",
};

const TESTIMONIAL_MOBILE_FIELD = {
  id: "testimonial-mobile",
  title: "Client Testimonials (Mobile)",
  description:
    "Separate media for mobile if you want a different aspect or shorter clip. Video or image; history is kept when you replace it.",
  placeholder: "Mobile media URL — e.g. /api/images/testimonial-mobile.mp4 or .webp",
};

export default function AdminContent() {
  const [content, setContent] = useState([]);
  const [showCropper, setShowCropper] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      if (Array.isArray(data)) setContent(data);
    } catch {
      setMessage({ type: "error", text: "Could not load saved content." });
    }
  };

  const upsertLocal = useCallback((id, value, type) => {
    setContent((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = { ...next[index], value };
        return next;
      }
      return [...prev, { id, value, type }];
    });
  }, []);

  const findValue = (id) => content.find((item) => item.id === id)?.value ?? "";

  const saveField = async (id, value, type) => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await fetch(`/api/content/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, type }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload.error || "Save failed");
      }
      upsertLocal(id, value, type);
      setMessage({ type: "ok", text: "Saved." });
      await fetchContent();
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Save failed" });
    } finally {
      setLoading(false);
    }
  };

  const clearField = async (id, type) => {
    await saveField(id, "", type);
  };

  const clearMediaPreservingHistory = async (contentId) => {
    await saveField(contentId, clearActiveToDefaultHero(findValue(contentId)), "video");
  };

  const handleImageCropped = async (url) => {
    if (!activeItem) return;
    await saveField(activeItem, url, "image");
    setActiveItem(null);
    setShowCropper(false);
  };

  const handleDirectUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        await saveField("popup-image", data.url, "image");
      } else {
        setMessage({ type: "error", text: data.error || "Upload failed" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Upload failed" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Main Content & Media</h2>
        {loading && <span className={styles.cardDescription}>Saving…</span>}
      </div>

      {message.text ? (
        <p
          role="status"
          className={styles.formCard}
          style={{
            marginBottom: 16,
            color: message.type === "error" ? "#b91c1c" : "#15803d",
            fontWeight: 600,
          }}
        >
          {message.text}
        </p>
      ) : null}

      <div className={styles.grid}>
        <MainVideoEditor
          mode="homepage"
          emptyPreviewFallback={DEFAULT_HERO_VIDEO_SRC}
          field={MAIN_VIDEO_FIELD}
          storedValue={findValue("main-video")}
          loading={loading}
          onSave={async (serialized) => {
            await saveField("main-video", serialized, "video");
          }}
          onClear={() => clearMediaPreservingHistory("main-video")}
          onError={(text) => setMessage({ type: "error", text })}
        />

        <MainVideoEditor
          mode="content"
          field={TESTIMONIAL_DESKTOP_FIELD}
          storedValue={findValue("testimonial-desktop")}
          loading={loading}
          onSave={async (serialized) => {
            await saveField("testimonial-desktop", serialized, "video");
          }}
          onClear={() => clearMediaPreservingHistory("testimonial-desktop")}
          onError={(text) => setMessage({ type: "error", text })}
        />

        <MainVideoEditor
          mode="content"
          field={TESTIMONIAL_MOBILE_FIELD}
          storedValue={findValue("testimonial-mobile")}
          loading={loading}
          onSave={async (serialized) => {
            await saveField("testimonial-mobile", serialized, "video");
          }}
          onClear={() => clearMediaPreservingHistory("testimonial-mobile")}
          onError={(text) => setMessage({ type: "error", text })}
        />

        <div className={styles.formCard}>
          <h3 className={styles.cardTitle}>Popup Advertisement Image</h3>
          <p className={styles.cardDescription}>The image shown when users first visit the site. No cropping—used exactly as uploaded.</p>
          
          <div style={{ marginTop: "15px" }}>
            {findValue("popup-image") ? (
              <div style={{ marginBottom: "10px" }}>
                <img
                  src={resolveMediaPublicUrl(findValue("popup-image"))}
                  alt="Popup preview"
                  style={{ width: "100%", maxHeight: "300px", objectFit: "contain", borderRadius: "8px", background: '#f8fafc', border: '1px solid #e2e8f0' }}
                />
                <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleDirectUpload} 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                  />
                  <button
                    type="button"
                    disabled={loading || uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className={styles.primaryButton}
                    style={{ flex: 1 }}
                  >
                    {uploading ? 'Uploading...' : 'Replace Banner'}
                  </button>
                  <button
                    type="button"
                    disabled={loading || uploading}
                    onClick={() => clearField("popup-image", "image")}
                    className={styles.dangerButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleDirectUpload} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />
                <button
                  type="button"
                  disabled={loading || uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.primaryButton}
                  style={{ width: '100%' }}
                >
                  {uploading ? 'Uploading...' : 'Upload Popup Banner'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.formCard} style={{ marginTop: "30px" }}>
        <h3 className={styles.cardTitle}>Masters Image Plan</h3>
        <p className={styles.cardDescription}>Upload the main master plan image for the projects section.</p>
        {showCropper && activeItem === "master-plan" ? (
          <ImageCropper
            uploadFullImage
            onImageCropped={handleImageCropped}
            onCancel={() => { setShowCropper(false); setActiveItem(null); }}
          />
        ) : (
          <div style={{ marginTop: "15px" }}>
            {findValue("master-plan") ? (
              <img
                src={resolveMediaPublicUrl(findValue("master-plan"))}
                alt="Master plan preview"
                style={{ maxWidth: "400px", display: "block", marginBottom: "15px", borderRadius: "8px" }}
              />
            ) : null}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setActiveItem("master-plan");
                  setShowCropper(true);
                }}
                className={styles.primaryButton}
              >
                {findValue("master-plan") ? "Replace master plan image" : "Upload master plan image"}
              </button>
              {findValue("master-plan") ? (
                <button type="button" disabled={loading} onClick={() => clearField("master-plan", "image")} className={styles.dangerButton}>
                  Remove image
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
