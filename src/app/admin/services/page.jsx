"use client";

import { useState, useEffect, useMemo } from "react";
import ImageCropper from "@/components/ImageCropper";
import styles from "../admin.module.css";

const SERVICE_TYPES = [
  "Turnkey solutions",
  "Interior fit-out services",
  "Civil construction",
  "Real estate development",
  "Infrastructure development",
  "Hospitals and hospitality",
  "Data Centre Project Expertise",
];

const TYPE_OTHER = "__other__";

const emptyForm = () => ({
  type: SERVICE_TYPES[0],
  customType: "",
  name: "",
  subServices: "",
  image: "",
  description: "",
  recentProject: "",
  ongoingProject: "",
});

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [formData, setFormData] = useState(() => emptyForm());
  const [message, setMessage] = useState({ kind: "", text: "" });
  const [saving, setSaving] = useState(false);
  /** Inline delete confirm (avoids window.confirm, which some browsers block or auto-dismiss). */
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const typeFieldValue = useMemo(() => {
    if (formData.type === TYPE_OTHER) return TYPE_OTHER;
    if (SERVICE_TYPES.includes(formData.type)) return formData.type;
    return TYPE_OTHER;
  }, [formData.type]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services", { credentials: "include" });
      const data = await res.json();
      if (Array.isArray(data)) setServices(data);
      else setMessage({ kind: "error", text: data?.error || "Failed to load services" });
    } catch {
      setMessage({ kind: "error", text: "Failed to load services" });
    }
  };

  const resolvedCategory = () => {
    if (formData.type === TYPE_OTHER) return formData.customType.trim();
    return formData.type.trim();
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm());
    setIsFormOpen(true);
    setConfirmDeleteId(null);
    setMessage({ kind: "", text: "" });
  };

  const openEdit = (service) => {
    const inList = SERVICE_TYPES.includes(service.type);
    setFormData({
      type: inList ? service.type : TYPE_OTHER,
      customType: inList ? "" : service.type,
      name: service.name || "",
      subServices: service.subServices || "",
      image: service.image || "",
      description: service.description || "",
      recentProject: service.recentProject || "",
      ongoingProject: service.ongoingProject || "",
    });
    setEditingId(service.id);
    setIsFormOpen(true);
    setConfirmDeleteId(null);
    setMessage({ kind: "", text: "" });
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(emptyForm());
    setShowCropper(false);
    setConfirmDeleteId(null);
  };

  const handleImageCropped = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = resolvedCategory();
    if (!category) {
      setMessage({ kind: "error", text: "Choose a category or enter a custom category name." });
      return;
    }

    setSaving(true);
    setMessage({ kind: "", text: "" });

    const payload = {
      type: category,
      name: formData.name.trim(),
      subServices: formData.subServices.trim(),
      image: formData.image.trim(),
      description: formData.description.trim(),
      recentProject: formData.recentProject.trim(),
      ongoingProject: formData.ongoingProject.trim(),
    };

    try {
      const url = editingId ? `/api/admin/services/${editingId}` : "/api/admin/services";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Save failed");
      }
      setMessage({ kind: "ok", text: editingId ? "Service updated." : "Service created." });
      closeForm();
      fetchServices();
    } catch (err) {
      setMessage({ kind: "error", text: err.message || "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirmed = async (rawId) => {
    const id = Number(rawId);
    if (!Number.isFinite(id) || id <= 0) {
      setMessage({ kind: "error", text: "Invalid service id; refresh the page and try again." });
      setConfirmDeleteId(null);
      return;
    }

    setDeletingId(id);
    setMessage({ kind: "", text: "" });
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Delete failed (${res.status})`);
      }
      setConfirmDeleteId(null);
      setMessage({ kind: "ok", text: "Service deleted." });
      await fetchServices();
    } catch (err) {
      setMessage({ kind: "error", text: err.message || "Delete failed" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Services Management</h2>
        <button type="button" onClick={() => (isFormOpen ? closeForm() : openCreate())} className={styles.primaryButton}>
          {isFormOpen ? "Cancel" : "Add service"}
        </button>
      </div>

      {message.text ? (
        <p
          role="status"
          className={styles.formCard}
          style={{
            marginBottom: 16,
            color: message.kind === "error" ? "#b91c1c" : "#15803d",
            fontWeight: 600,
          }}
        >
          {message.text}
        </p>
      ) : null}

      {isFormOpen && (
        <div className={styles.formCard}>
          <h3 className={styles.cardTitle}>{editingId ? "Edit service" : "New service"}</h3>
          <p className={styles.cardDescription}>
            Pick a category (e.g. Interior fit-out services or Civil construction). Services appear on that category&apos;s public page under &quot;Our offerings in this category&quot;.
          </p>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <label className={styles.cardDescription} style={{ gridColumn: "1 / -1" }}>
                Category
                <select
                  value={typeFieldValue}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === TYPE_OTHER) {
                      setFormData((prev) => ({ ...prev, type: TYPE_OTHER }));
                    } else {
                      setFormData((prev) => ({ ...prev, type: v, customType: "" }));
                    }
                  }}
                  className={styles.inputField}
                  style={{ marginTop: 6, width: "100%" }}
                >
                  {SERVICE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                  <option value={TYPE_OTHER}>Other (type below)</option>
                </select>
              </label>
              {formData.type === TYPE_OTHER ? (
                <input
                  type="text"
                  placeholder="Custom category name (must match public page filter)"
                  value={formData.customType}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customType: e.target.value }))}
                  className={styles.inputField}
                  style={{ gridColumn: "1 / -1" }}
                />
              ) : null}
              <input
                type="text"
                placeholder="Service name (required)"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className={styles.inputField}
              />
              <input
                type="text"
                placeholder="Sub-services (comma separated)"
                value={formData.subServices}
                onChange={(e) => setFormData((prev) => ({ ...prev, subServices: e.target.value }))}
                className={styles.inputField}
              />
              <input
                type="text"
                placeholder="Recent project name"
                value={formData.recentProject}
                onChange={(e) => setFormData((prev) => ({ ...prev, recentProject: e.target.value }))}
                className={styles.inputField}
              />
              <input
                type="text"
                placeholder="Ongoing project name"
                value={formData.ongoingProject}
                onChange={(e) => setFormData((prev) => ({ ...prev, ongoingProject: e.target.value }))}
                className={styles.inputField}
              />
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              className={styles.inputField}
            />

            {showCropper ? (
              <ImageCropper uploadFullImage onImageCropped={handleImageCropped} onCancel={() => setShowCropper(false)} />
            ) : (
              <div>
                <button type="button" onClick={() => setShowCropper(true)} className={styles.editButton}>
                  {formData.image ? "Change service image" : "Upload service image"}
                </button>
                {formData.image ? (
                  <img src={formData.image} alt="" style={{ display: "block", marginTop: "15px", maxHeight: "150px", borderRadius: "8px" }} />
                ) : null}
              </div>
            )}

            <button type="submit" className={styles.primaryButton} style={{ alignSelf: "flex-start" }} disabled={saving}>
              {saving ? "Saving…" : editingId ? "Update service" : "Save service"}
            </button>
          </form>
        </div>
      )}

      {SERVICE_TYPES.map((type) => (
        <div key={type} style={{ marginBottom: "40px" }}>
          <h3 className={styles.cardTitle} style={{ borderBottom: "2px solid #f5831f", paddingBottom: "10px", marginBottom: "20px" }}>
            {type}
          </h3>
          <div className={styles.grid}>
            {services
              .filter((s) => s.type === type)
              .map((service) => (
                <div key={service.id} className={styles.card}>
                  <h4 className={styles.cardTitle}>{service.name}</h4>
                  {service.image ? <img src={service.image} alt="" className={styles.cardImage} /> : null}
                  <p className={styles.cardDescription} style={{ marginTop: "10px" }}>
                    {service.description ? `${service.description.slice(0, 160)}${service.description.length > 160 ? "…" : ""}` : "—"}
                  </p>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "10px" }}>
                    <div>
                      <strong>Sub-services:</strong> {service.subServices || "—"}
                    </div>
                    <div>
                      <strong>Recent:</strong> {service.recentProject || "—"}
                    </div>
                    <div>
                      <strong>Ongoing:</strong> {service.ongoingProject || "—"}
                    </div>
                  </div>
                  <div className={styles.cardActions} style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                    <button type="button" onClick={() => openEdit(service)} className={styles.editButton}>
                      Edit
                    </button>
                    {confirmDeleteId === service.id ? (
                      <>
                        <button
                          type="button"
                          disabled={deletingId === service.id}
                          onClick={() => handleDeleteConfirmed(service.id)}
                          className={styles.dangerButton}
                        >
                          {deletingId === service.id ? "Deleting…" : "Confirm delete"}
                        </button>
                        <button type="button" disabled={deletingId === service.id} onClick={() => setConfirmDeleteId(null)} className={styles.editButton}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmDeleteId(service.id);
                          setMessage({ kind: "", text: "" });
                        }}
                        className={styles.dangerButton}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {services.some((s) => !SERVICE_TYPES.includes(s.type)) ? (
        <div style={{ marginBottom: "40px" }}>
          <h3 className={styles.cardTitle} style={{ borderBottom: "2px solid #94a3b8", paddingBottom: "10px", marginBottom: "20px" }}>
            Other categories
          </h3>
          <p className={styles.cardDescription} style={{ marginBottom: "16px" }}>
            Services saved under a custom category name. Add matching sections on the site or reuse a standard category name so they appear under the right heading above.
          </p>
          <div className={styles.grid}>
            {services
              .filter((s) => !SERVICE_TYPES.includes(s.type))
              .map((service) => (
                <div key={service.id} className={styles.card}>
                  <p className={styles.cardDescription} style={{ margin: "0 0 6px", fontWeight: 700 }}>
                    {service.type}
                  </p>
                  <h4 className={styles.cardTitle}>{service.name}</h4>
                  {service.image ? <img src={service.image} alt="" className={styles.cardImage} /> : null}
                  <div className={styles.cardActions} style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                    <button type="button" onClick={() => openEdit(service)} className={styles.editButton}>
                      Edit
                    </button>
                    {confirmDeleteId === service.id ? (
                      <>
                        <button
                          type="button"
                          disabled={deletingId === service.id}
                          onClick={() => handleDeleteConfirmed(service.id)}
                          className={styles.dangerButton}
                        >
                          {deletingId === service.id ? "Deleting…" : "Confirm delete"}
                        </button>
                        <button type="button" disabled={deletingId === service.id} onClick={() => setConfirmDeleteId(null)} className={styles.editButton}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmDeleteId(service.id);
                          setMessage({ kind: "", text: "" });
                        }}
                        className={styles.dangerButton}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
