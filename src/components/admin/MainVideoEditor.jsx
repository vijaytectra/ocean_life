"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "@/app/admin/admin.module.css";
import localStyles from "./MainVideoEditor.module.css";
import {
  DEFAULT_HERO_VIDEO_SRC,
  parseMainVideoValue,
  nextMainVideoStateFromReplace,
  nextMainVideoStateFromHistoryPick,
  removeHistoryUrl,
  resolveMediaPublicUrl,
  guessVideoMimeType,
  isHeroBackgroundImageUrl,
} from "@/lib/mainVideoContent";

export default function MainVideoEditor({
  field,
  storedValue,
  loading,
  onSave,
  onClear,
  onError,
  /** When there is no active URL, preview this (e.g. default hero). Omit for an empty preview. */
  emptyPreviewFallback = null,
  /** `homepage` — hero copy; `content` — generic testimonial / other media copy */
  mode = "content",
}) {
  const { active, history } = parseMainVideoValue(storedValue);
  const [urlDraft, setUrlDraft] = useState(active);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setUrlDraft(active);
  }, [active, storedValue]);

  const resolvedActive = active ? resolveMediaPublicUrl(active) : "";
  const resolvedFallback =
    typeof emptyPreviewFallback === "string" && emptyPreviewFallback.trim()
      ? resolveMediaPublicUrl(emptyPreviewFallback.trim())
      : "";
  const previewSrc = resolvedActive || resolvedFallback || "";
  const hasPreview = previewSrc.length > 0;
  const previewIsImage = hasPreview ? isHeroBackgroundImageUrl(previewSrc) : false;

  const isHomepage = mode === "homepage";

  const commit = useCallback(
    async (nextSerialized) => {
      await onSave(nextSerialized);
    },
    [onSave]
  );

  const handleSaveUrl = async () => {
    const next = nextMainVideoStateFromReplace(storedValue, urlDraft);
    await commit(next);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const okType = /^image\//.test(file.type) || /^video\//.test(file.type);
    if (!okType) {
      onError?.("Please choose a video or image file.");
      e.target.value = "";
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Upload failed");
      }
      const next = nextMainVideoStateFromReplace(storedValue, data.url);
      await commit(next);
    } catch (err) {
      onError?.(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleUseHistory = async (url) => {
    const next = nextMainVideoStateFromHistoryPick(storedValue, url);
    await commit(next);
  };

  const handleRemoveHistory = async (url) => {
    const next = removeHistoryUrl(storedValue, url);
    await commit(next);
  };

  return (
    <div className={styles.formCard}>
      <h3 className={styles.cardTitle}>{field.title}</h3>
      <p className={styles.cardDescription}>{field.description}</p>

      <div className={localStyles.previewWrap}>
        <p className={localStyles.previewLabel}>{isHomepage ? "Current homepage background" : "Current media"}</p>
        <div className={localStyles.videoFrame}>
          {!hasPreview ? (
            <div className={localStyles.previewEmpty}>No media selected yet</div>
          ) : previewIsImage ? (
            <img key={previewSrc} src={previewSrc} alt="" className={localStyles.previewVideo} />
          ) : (
            <video key={previewSrc} className={localStyles.previewVideo} controls muted playsInline preload="metadata">
              <source src={previewSrc} type={guessVideoMimeType(previewSrc)} />
            </video>
          )}
        </div>
        <p className={localStyles.previewHint}>
          {active ? (
            <>
              Active URL: <code className={localStyles.code}>{active}</code>
            </>
          ) : isHomepage ? (
            <>
              No custom media set — site uses default <code className={localStyles.code}>{DEFAULT_HERO_VIDEO_SRC}</code>
            </>
          ) : (
            <>No active URL — add a video or image below, or pick one from history after you have replaced media at least once.</>
          )}
        </p>
      </div>

      <div className={localStyles.row}>
        <label className={localStyles.fileLabel}>
          <span className={localStyles.fakeBtn}>Upload video or image</span>
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime,image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.mp4,.webm,.mov,.jpg,.jpeg,.png,.webp,.gif,.svg"
            className={localStyles.fileInput}
            disabled={loading || uploading}
            onChange={handleUpload}
          />
        </label>
        {uploading ? <span className={localStyles.muted}>Uploading…</span> : null}
      </div>

      <div className={localStyles.row} style={{ marginTop: 16, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder={field.placeholder}
          value={urlDraft}
          onChange={(e) => setUrlDraft(e.target.value)}
          className={styles.inputField}
          style={{ flex: "1 1 240px", minWidth: 0 }}
          disabled={loading}
        />
        <button type="button" disabled={loading} onClick={handleSaveUrl} className={styles.primaryButton}>
          Save URL
        </button>
        <button type="button" disabled={loading} onClick={() => onClear()} className={styles.dangerButton}>
          {isHomepage ? "Clear custom background" : "Clear active media (keeps history)"}
        </button>
      </div>

      {history.length > 0 ? (
        <div className={localStyles.history}>
          <h4 className={localStyles.historyTitle}>{isHomepage ? "Previous backgrounds" : "Previous media"} (newest first)</h4>
          <p className={localStyles.muted}>
            {isHomepage
              ? "Restore a past video or image as the live homepage background, or remove it from the list."
              : "Restore a past upload or URL as the active media, or remove it from the list."}
          </p>
          <ul className={localStyles.historyList}>
            {history.map((url) => {
              const resolved = resolveMediaPublicUrl(url);
              const thumbIsImage = isHeroBackgroundImageUrl(resolved);
              return (
                <li key={url} className={localStyles.historyItem}>
                  <div className={localStyles.historyThumb}>
                    {thumbIsImage ? (
                      <img src={resolved} alt="" className={localStyles.thumbVideo} />
                    ) : (
                      <video muted playsInline preload="metadata" className={localStyles.thumbVideo}>
                        <source src={resolved} type={guessVideoMimeType(resolved)} />
                      </video>
                    )}
                  </div>
                  <div className={localStyles.historyBody}>
                    <code className={localStyles.code}>{url}</code>
                    <div className={localStyles.historyActions}>
                      <button type="button" className={styles.editButton} disabled={loading} onClick={() => handleUseHistory(url)}>
                        {isHomepage ? "Use as live background" : "Use as active media"}
                      </button>
                      <button
                        type="button"
                        className={styles.dangerButton}
                        disabled={loading}
                        onClick={() => handleRemoveHistory(url)}
                      >
                        Remove from list
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className={localStyles.muted} style={{ marginTop: "18px" }}>
          No history yet. When you upload or save a new URL, the previous {isHomepage ? "background" : "version"} will appear here.
        </p>
      )}
    </div>
  );
}
