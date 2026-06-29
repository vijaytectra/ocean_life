"use client";

import { useState, useEffect } from "react";
import ImageCropper from "@/components/ImageCropper";
import ConfirmModal from "@/components/admin/ConfirmModal";
import styles from "../admin.module.css";

const emptyForm = { title: "", description: "", image: "", priority: 0 };

export default function AdminAccreditations() {
  const [items, setItems] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, itemId: null });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/accreditations/", {
      cache: "no-store",
      credentials: "include",
    });
    const data = await res.json();
    if (Array.isArray(data)) setItems(data);
  };

  const handleImageCropped = (url) => {
    if (!url) {
      alert("Upload did not return an image URL. Please try again.");
      return;
    }
    setFormData((prev) => ({ ...prev, image: url }));
    setShowCropper(false);
    setIsUploading(false);
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setIsCreating(false);
    setShowCropper(false);
    setIsUploading(false);
  };

  const formatDescriptionForSave = (text) =>
    text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join(" <br>\n");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: formData.title,
        image: formData.image,
        description: formatDescriptionForSave(formData.description),
        priority: Number(formData.priority) || 0,
      };
      const url = editingId ? `/api/accreditations/${editingId}/` : "/api/accreditations/";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Save failed (${res.status})`);
      }
      resetForm();
      await fetchItems();
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not save accreditation. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description?.replace(/<br\s*\/?>/gi, "\n") || "",
      image: item.image || "",
      priority: item.priority || 0,
    });
    setEditingId(item.id);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restoreDefaults = async () => {
    setRestoring(true);
    try {
      const res = await fetch("/api/admin/restore-accreditations/", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Restore failed (${res.status})`);
      }
      if (data.skipped) {
        alert(`Accreditations already has ${data.total} item(s) in the database.`);
      } else {
        alert(`Restored ${data.seeded} default accreditations.`);
      }
      await fetchItems();
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not restore accreditations.");
    } finally {
      setRestoring(false);
    }
  };

  const handleDelete = (id) => {
    setModal({ isOpen: true, itemId: id });
  };

  const confirmDelete = async () => {
    const id = modal.itemId;
    setModal({ isOpen: false, itemId: null });
    try {
      const res = await fetch(`/api/accreditations/${id}/`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Delete failed (${res.status})`);
      }
      await fetchItems();
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not remove accreditation.");
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Accreditations</h2>
        <button
          onClick={() => (isCreating ? resetForm() : setIsCreating(true))}
          className={styles.primaryButton}
        >
          {isCreating ? "Cancel" : "Add Accreditation"}
        </button>
      </div>

      {items.length === 0 ? (
        <div
          className={styles.formCard}
          style={{ marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}
        >
          <p className={styles.cardDescription} style={{ margin: 0, flex: "1 1 280px" }}>
            No accreditations in the database yet. Restore the default set from the About page or add items manually.
          </p>
          <button
            type="button"
            onClick={restoreDefaults}
            className={styles.primaryButton}
            disabled={restoring}
          >
            {restoring ? "Restoring…" : "Restore default accreditations (6 items)"}
          </button>
        </div>
      ) : null}

      {isCreating && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <input
              type="text"
              placeholder="Title (e.g. IMS, IGBC)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className={styles.inputField}
            />

            <div>
              <label style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "6px" }}>
                Description (one line per paragraph; line breaks become breaks on the site)
              </label>
              <textarea
                placeholder="Description text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className={styles.inputField}
                style={{ width: "100%", resize: "vertical" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "6px" }}>
                Priority (higher numbers appear first)
              </label>
              <input
                type="number"
                placeholder="Priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className={styles.inputField}
              />
            </div>

            {showCropper ? (
              <ImageCropper
                uploadFullImage
                onImageCropped={handleImageCropped}
                onCancel={() => {
                  setShowCropper(false);
                  setIsUploading(false);
                }}
                onUploadStart={() => setIsUploading(true)}
              />
            ) : (
              <div>
                <button type="button" onClick={() => setShowCropper(true)} className={styles.editButton}>
                  {formData.image ? "Change logo image" : "Upload logo image"}
                </button>
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      display: "block",
                      marginTop: "15px",
                      maxWidth: "200px",
                      maxHeight: "120px",
                      objectFit: "contain",
                    }}
                  />
                ) : null}
              </div>
            )}

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={saving || isUploading || !formData.image}
            >
              {saving ? "Saving…" : editingId ? "Update accreditation" : "Save accreditation"}
            </button>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card} style={{ padding: "20px" }}>
            <div
              style={{
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </div>
            <h3 className={styles.cardTitle} style={{ fontSize: "0.95rem", marginBottom: "8px" }}>
              {item.title}
            </h3>
            <p
              className={styles.cardDescription}
              style={{ fontSize: "0.8rem", marginBottom: "12px" }}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
            <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "12px" }}>
              Priority: {item.priority ?? 0}
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button type="button" onClick={() => startEdit(item)} className={styles.editButton}>
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(item.id)} className={styles.dangerButton}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={modal.isOpen}
        title="Delete accreditation?"
        message="This will remove the accreditation from the About page."
        onConfirm={confirmDelete}
        onCancel={() => setModal({ isOpen: false, itemId: null })}
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
