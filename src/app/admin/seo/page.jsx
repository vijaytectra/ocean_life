"use client";

import { useState, useEffect, useMemo } from "react";
import ConfirmModal from "@/components/admin/ConfirmModal";
import styles from "../admin.module.css";

const PAGE_OPTIONS = [
  { value: "home", label: "Home" },
  { value: "about", label: "About" },
  { value: "services", label: "Services" },
  { value: "projects", label: "Projects" },
  { value: "clients", label: "Clients" },
  { value: "partners", label: "Partners" },
  { value: "blog", label: "Blog" },
  { value: "news", label: "News" },
  { value: "contact", label: "Contact" },
  { value: "careers", label: "Careers" },
  { value: "privacy-policy", label: "Privacy Policy" },
  { value: "terms-conditions", label: "Terms & Conditions" },
  { value: "disclaimer", label: "Disclaimer" },
  { value: "layout-completed", label: "Layout Completed" },
];

const EMPTY_FORM = {
  id: null,
  page: "",
  metaTitle: "",
  metaDesc: "",
  status: "active",
};

function labelForPage(page) {
  const found = PAGE_OPTIONS.find((p) => p.value === page);
  if (found) return found.label;
  return page
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function AdminSEO() {
  const [configs, setConfigs] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState({ isOpen: false, configId: null });

  const pageOptions = useMemo(() => {
    const known = new Set(PAGE_OPTIONS.map((p) => p.value));
    const extras = configs
      .filter((c) => !known.has(c.page))
      .map((c) => ({ value: c.page, label: labelForPage(c.page) }));
    return [...PAGE_OPTIONS, ...extras];
  }, [configs]);

  useEffect(() => {
    fetchSEO();
  }, []);

  const fetchSEO = async () => {
    const res = await fetch("/api/admin/seo/");
    const data = await res.json();
    if (Array.isArray(data)) setConfigs(data);
  };

  const loadPageIntoForm = (pageValue) => {
    if (!pageValue) {
      setFormData(EMPTY_FORM);
      return;
    }
    const existing = configs.find((c) => c.page === pageValue);
    if (existing) {
      setFormData({
        id: existing.id,
        page: existing.page,
        metaTitle: existing.metaTitle || "",
        metaDesc: existing.metaDesc || "",
        status: existing.status || "active",
      });
    } else {
      setFormData({
        ...EMPTY_FORM,
        page: pageValue,
        metaTitle: "",
        metaDesc: "",
        status: "active",
      });
    }
  };

  const handlePageChange = (e) => {
    loadPageIntoForm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.page || !formData.metaTitle) return;

    setSaving(true);
    setMessage("");

    try {
      const payload = {
        page: formData.page,
        metaTitle: formData.metaTitle,
        metaDesc: formData.metaDesc,
        status: formData.status,
      };

      let res;
      if (formData.id) {
        res = await fetch(`/api/admin/seo/${formData.id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/seo/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to save SEO config");
        return;
      }

      setMessage("SEO settings saved successfully.");
      if (data?.id) {
        setFormData({
          id: data.id,
          page: data.page,
          metaTitle: data.metaTitle,
          metaDesc: data.metaDesc || "",
          status: data.status || "active",
        });
      }
      await fetchSEO();
    } catch {
      setMessage("Failed to save SEO config. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    setModal({ isOpen: true, configId: id });
  };

  const confirmDelete = async () => {
    const id = modal.configId;
    setModal({ isOpen: false, configId: null });
    await fetch(`/api/admin/seo/${id}/`, { method: "DELETE" });
    if (formData.id === id) setFormData(EMPTY_FORM);
    setMessage("SEO configuration deleted.");
    fetchSEO();
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>SEO Management</h2>
      </div>

      <div className={styles.formCard}>
        <h3 className={styles.seoSetupTitle}>SEO Setup</h3>

        <form onSubmit={handleSubmit} className={styles.seoForm}>
          <div className={styles.seoRow}>
            <label className={styles.seoLabel}>
              Select Page <span className={styles.seoRequired}>*</span>
            </label>
            <select
              className={styles.seoField}
              value={formData.page}
              onChange={handlePageChange}
              required
            >
              <option value="">— Select a page —</option>
              {pageOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.seoRow}>
            <label className={styles.seoLabel}>
              Meta Title <span className={styles.seoRequired}>*</span>
            </label>
            <input
              type="text"
              className={styles.seoField}
              value={formData.metaTitle}
              onChange={(e) =>
                setFormData({ ...formData, metaTitle: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.seoRow}>
            <label className={styles.seoLabel}>
              Status <span className={styles.seoRequired}>*</span>
            </label>
            <select
              className={styles.seoField}
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className={styles.seoRow}>
            <label className={styles.seoLabel}>
              Meta Description <span className={styles.seoRequired}>*</span>
            </label>
            <textarea
              className={styles.seoField}
              rows={4}
              value={formData.metaDesc}
              onChange={(e) =>
                setFormData({ ...formData, metaDesc: e.target.value })
              }
              required
            />
          </div>

          {message && <p className={styles.seoMessage}>{message}</p>}

          <div className={styles.seoActions}>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={saving || !formData.page}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      {configs.length > 0 && (
        <div className={styles.formCard} style={{ padding: 0 }}>
          <table className={styles.seoTable}>
            <thead>
              <tr>
                <th>Page</th>
                <th>Meta Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {configs.map((config) => (
                <tr key={config.id}>
                  <td>{labelForPage(config.page)}</td>
                  <td>{config.metaTitle}</td>
                  <td>
                    <span
                      className={
                        config.status === "active"
                          ? styles.seoStatusActive
                          : styles.seoStatusInactive
                      }
                    >
                      {config.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => loadPageIntoForm(config.page)}
                      className={styles.editButton}
                      style={{ padding: "5px 10px", fontSize: "0.8rem", marginRight: 8 }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(config.id)}
                      className={styles.dangerButton}
                      style={{ padding: "5px 10px", fontSize: "0.8rem" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={modal.isOpen}
        title="Delete SEO Configuration?"
        message="Are you sure you want to delete this SEO configuration?"
        onConfirm={confirmDelete}
        onCancel={() => setModal({ isOpen: false, configId: null })}
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
