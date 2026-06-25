"use client";

import { useState, useEffect } from "react";
import ImageCropper from "@/components/ImageCropper";
import ConfirmModal from "@/components/admin/ConfirmModal";
import styles from "../admin.module.css";

const emptyForm = { name: "", role: "", image: "", priority: 0 };

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, memberId: null });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await fetch("/api/employees/", {
      cache: "no-store",
      credentials: "include",
    });
    const data = await res.json();
    if (Array.isArray(data)) setMembers(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        priority: Number(formData.priority) || 0,
      };
      const url = editingId ? `/api/employees/${editingId}/` : "/api/employees/";
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
      await fetchMembers();
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not save team member. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (member) => {
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image || "",
      priority: member.priority || 0,
    });
    setEditingId(member.id);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setModal({ isOpen: true, memberId: id });
  };

  const confirmDelete = async () => {
    const id = modal.memberId;
    setModal({ isOpen: false, memberId: null });
    try {
      const res = await fetch(`/api/employees/${id}/`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Delete failed (${res.status})`);
      }
      await fetchMembers();
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not remove team member.");
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Management Team</h2>
        <button
          onClick={() => (isCreating ? resetForm() : setIsCreating(true))}
          className={styles.primaryButton}
        >
          {isCreating ? "Cancel" : "Add Team Member"}
        </button>
      </div>

      {members.length === 0 ? (
        <p className={styles.cardDescription} style={{ marginBottom: "1rem" }}>
          No team members in the database yet. Add members below or run{" "}
          <code>node scripts/restore-employees.js</code> on the server.
        </p>
      ) : null}

      {isCreating && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input
                type="text"
                placeholder="Member Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className={styles.inputField}
              />
              <input
                type="text"
                placeholder="Role (e.g. Managing Director)"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className={styles.inputField}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>
              <label style={{ fontSize: "12px", color: "#64748b" }}>
                Priority (Higher numbers appear first)
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
                onImageCropped={handleImageCropped}
                onCancel={() => {
                  setShowCropper(false);
                  setIsUploading(false);
                }}
                onUploadStart={() => setIsUploading(true)}
                aspectRatio={1}
              />
            ) : (
              <div>
                <button type="button" onClick={() => setShowCropper(true)} className={styles.editButton}>
                  {formData.image ? "Change Portrait" : "Upload Portrait"}
                </button>
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      display: "block",
                      marginTop: "15px",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : null}
              </div>
            )}

            <button
              type="submit"
              className={styles.primaryButton}
              style={{ alignSelf: "flex-start", opacity: isUploading || saving ? 0.5 : 1 }}
              disabled={isUploading || saving}
            >
              {isUploading ? "Uploading Image..." : saving ? "Saving..." : editingId ? "Update Member" : "Save Member"}
            </button>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {members.map((member) => (
          <div key={member.id} className={styles.card} style={{ textAlign: "center" }}>
            {member.image ? (
              <img src={member.image} alt={member.name} className={styles.avatarImage} />
            ) : (
              <div
                className={styles.avatarImage}
                style={{
                  background: "#e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  color: "#64748b",
                }}
              >
                {member.name.charAt(0)}
              </div>
            )}
            <h3 className={styles.cardTitle}>{member.name}</h3>
            <p className={styles.cardDescription}>{member.role}</p>
            <div className={styles.cardActions} style={{ justifyContent: "center", gap: "10px" }}>
              <button onClick={() => startEdit(member)} className={styles.editButton} style={{ flex: 1 }}>
                Edit
              </button>
              <button onClick={() => handleDelete(member.id)} className={styles.dangerButton} style={{ flex: 1 }}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={modal.isOpen}
        title="Remove Team Member?"
        message="Are you sure you want to remove this team member? This will remove them from the About Us page."
        onConfirm={confirmDelete}
        onCancel={() => setModal({ isOpen: false, memberId: null })}
        confirmText="Remove"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
