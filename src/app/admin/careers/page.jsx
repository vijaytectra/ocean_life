"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";
import ConfirmModal from "@/components/admin/ConfirmModal";

const STATUS_OPTIONS = [
  { value: "new", label: "New", bg: "#fee2e2", text: "#991b1b" },
  { value: "screening", label: "Screening", bg: "#fef3c7", text: "#92400e" },
  { value: "interview", label: "Interview", bg: "#e0f2fe", text: "#075985" },
  { value: "offered", label: "Offered", bg: "#ede9fe", text: "#5b21b6" },
  { value: "hired", label: "Hired", bg: "#dcfce7", text: "#166534" },
  { value: "rejected", label: "Rejected", bg: "#f1f5f9", text: "#475569" },
];

function statusStyle(status) {
  return STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];
}

export default function AdminCareersPage() {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [positionFilter, setPositionFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [modal, setModal] = useState({ isOpen: false, id: null });
  const [mailTest, setMailTest] = useState({ loading: false, message: null, error: null });
  const [loadError, setLoadError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const sendMailTest = async () => {
    setMailTest({ loading: true, message: null, error: null });
    try {
      const res = await fetch("/api/admin/careers/test-mail/", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Mail test failed");
      }
      setMailTest({ loading: false, message: data.message, error: null });
    } catch (err) {
      setMailTest({ loading: false, message: null, error: err.message });
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/admin/careers/", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) {
        setApplications([]);
        setLoadError(data.error || `Could not load applications (${res.status})`);
        return;
      }
      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        setApplications([]);
        setLoadError("Unexpected response from server.");
      }
    } catch (err) {
      setApplications([]);
      setLoadError(err.message || "Could not load applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    await fetch(`/api/admin/careers/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchApplications();
    if (selected?.id === id) {
      setSelected((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const saveNotes = async (id) => {
    await fetch(`/api/admin/careers/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: notesDraft }),
    });
    fetchApplications();
    setSelected((prev) => (prev ? { ...prev, notes: notesDraft } : null));
  };

  const markViewed = async (id) => {
    const res = await fetch(`/api/admin/careers/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markViewed: true }),
    });
    if (res.ok) {
      const updated = await res.json();
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
      );
      setSelected((prev) => (prev?.id === id ? { ...prev, ...updated } : prev));
    }
  };

  const openDetail = (app) => {
    setSelected(app);
    setNotesDraft(app.notes || "");
    if (!app.viewedAt) {
      markViewed(app.id);
    }
  };

  const confirmDelete = async () => {
    const id = modal.id;
    setModal({ isOpen: false, id: null });
    await fetch(`/api/admin/careers/${id}/`, { method: "DELETE" });
    if (selected?.id === id) setSelected(null);
    fetchApplications();
  };

  const positions = [
    "All",
    ...new Set(applications.map((a) => a.position).filter(Boolean)),
  ];

  const filtered = applications.filter((a) => {
    const matchStatus =
      statusFilter === "All" || a.status === statusFilter.toLowerCase();
    const matchPosition =
      positionFilter === "All" || a.position === positionFilter;
    return matchStatus && matchPosition;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Careers — ATS</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <button
            type="button"
            onClick={sendMailTest}
            className={styles.editButton}
            disabled={mailTest.loading}
          >
            {mailTest.loading ? "Testing mail…" : "Test careers email"}
          </button>
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className={styles.inputField}
            style={{ width: "200px" }}
          >
            {positions.map((p) => (
              <option key={p} value={p}>
                {p === "All" ? "All Positions" : p}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.inputField}
            style={{ width: "160px" }}
          >
            <option value="All">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {mailTest.message && (
        <p style={{ color: "#166534", marginBottom: 16, fontSize: 14 }}>{mailTest.message}</p>
      )}
      {mailTest.error && (
        <p style={{ color: "#b91c1c", marginBottom: 16, fontSize: 14 }}>{mailTest.error}</p>
      )}
      {loadError && (
        <p
          style={{
            color: "#b91c1c",
            marginBottom: 16,
            fontSize: 14,
            padding: "12px 16px",
            background: "#fef2f2",
            borderRadius: 8,
            border: "1px solid #fecaca",
          }}
        >
          {loadError}
        </p>
      )}

      <div
        className={styles.formCard}
        style={{ padding: 0, overflowX: "auto", marginBottom: 24 }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Applicant</th>
              <th style={thStyle}>Position</th>
              <th style={thStyle}>Experience</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Resume</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
                  Loading applications…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
                  {loadError ? "Fix the error above, then refresh this page." : "No applications yet."}
                </td>
              </tr>
            ) : (
              filtered.map((app) => {
                const st = statusStyle(app.status);
                return (
                  <tr
                    key={app.id}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      background:
                        app.status === "new" && !app.viewedAt
                          ? "#fffbeb"
                          : "transparent",
                    }}
                  >
                    <td style={tdStyle}>
                      {new Date(app.createdAt).toLocaleDateString()}
                      {!app.viewedAt && (
                        <span
                          style={{
                            display: "inline-block",
                            marginLeft: 6,
                            padding: "2px 6px",
                            borderRadius: 10,
                            fontSize: 10,
                            fontWeight: 700,
                            background: "#fee2e2",
                            color: "#991b1b",
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 600, color: "#1e293b" }}>
                        {app.fullName}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{app.email}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{app.phone}</div>
                    </td>
                    <td style={tdStyle}>{app.position}</td>
                    <td style={tdStyle}>{app.experience || "—"}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background: st.bg,
                          color: st.text,
                        }}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <a
                        href={app.resumeUrl || `/api/resumes/${encodeURIComponent(app.resumePath)}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.editButton}
                        style={{ textDecoration: "none", fontSize: 12 }}
                        onClick={() => {
                          if (!app.viewedAt) markViewed(app.id);
                        }}
                      >
                        Download
                      </a>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      <button
                        type="button"
                        onClick={() => openDetail(app)}
                        className={styles.editButton}
                        style={{ marginRight: 8 }}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => setModal({ isOpen: true, id: app.id })}
                        className={styles.dangerButton}
                        style={{ padding: "6px 12px", fontSize: 11 }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div
          className={styles.formCard}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            maxWidth: 560,
            width: "92%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h3 style={{ margin: 0 }}>Application #{selected.id}</h3>
            <button
              type="button"
              onClick={() => setSelected(null)}
              style={{
                background: "none",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                color: "#94a3b8",
              }}
            >
              &times;
            </button>
          </div>

          <div style={{ display: "grid", gap: 12, fontSize: 14 }}>
            <p>
              <strong>Name:</strong> {selected.fullName}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${selected.email}`}>{selected.email}</a>
            </p>
            <p>
              <strong>Phone:</strong> {selected.phone}
            </p>
            <p>
              <strong>Position:</strong> {selected.position}
            </p>
            <p>
              <strong>Experience:</strong> {selected.experience || "—"}
            </p>
            <p>
              <strong>City:</strong> {selected.location || "—"}
            </p>
            {selected.linkedin && (
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a href={selected.linkedin} target="_blank" rel="noopener noreferrer">
                  Profile
                </a>
              </p>
            )}
            {selected.coverLetter && (
              <div>
                <strong>Cover letter:</strong>
                <p
                  style={{
                    marginTop: 8,
                    padding: 12,
                    background: "#f8fafc",
                    borderRadius: 8,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selected.coverLetter}
                </p>
              </div>
            )}
          </div>

          <div style={{ marginTop: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>
              ATS Status
            </label>
            <select
              value={selected.status}
              onChange={(e) => handleStatusChange(selected.id, e.target.value)}
              className={styles.inputField}
              style={{ width: "100%", marginTop: 8 }}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>
              Internal notes
            </label>
            <textarea
              value={notesDraft}
              onChange={(e) => setNotesDraft(e.target.value)}
              className={styles.inputField}
              style={{ width: "100%", minHeight: 80, marginTop: 8 }}
              placeholder="Interview feedback, follow-up dates..."
            />
            <button
              type="button"
              onClick={() => saveNotes(selected.id)}
              className={styles.primaryButton}
              style={{ marginTop: 8 }}
            >
              Save notes
            </button>
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={
                selected.resumeUrl ||
                `/api/resumes/${encodeURIComponent(selected.resumePath)}/`
              }
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryButton}
              style={{ textDecoration: "none", display: "inline-block" }}
              onClick={() => {
                if (!selected.viewedAt) markViewed(selected.id);
              }}
            >
              Download resume
            </a>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className={styles.editButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selected && (
        <div
          role="presentation"
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 999,
          }}
        />
      )}

      <ConfirmModal
        isOpen={modal.isOpen}
        onCancel={() => setModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete application?"
        message="This removes the applicant record and resume file permanently."
        danger
      />
    </div>
  );
}

const thStyle = {
  padding: "15px 20px",
  textAlign: "left",
  fontSize: 13,
  color: "#64748b",
};

const tdStyle = { padding: "15px 20px", fontSize: 14 };
