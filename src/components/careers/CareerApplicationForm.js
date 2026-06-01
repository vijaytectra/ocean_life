"use client";

import { useState } from "react";
import styles from "./CareerApplicationForm.module.css";

const POSITIONS = [
  "Civil Engineer",
  "Project Manager",
  "Site Engineer",
  "Interior Designer",
  "Quantity Surveyor",
  "MEP Engineer",
  "Safety Officer",
  "General Application",
];

const EXPERIENCE_OPTIONS = [
  "Fresher (0–1 years)",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
];

export default function CareerApplicationForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    location: "",
    linkedin: "",
    coverLetter: "",
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!resume) {
      setError("Please attach your resume (PDF, DOC, or DOCX).");
      setLoading(false);
      return;
    }

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    body.append("resume", resume);

    try {
      const res = await fetch("/api/careers/apply/", { method: "POST", body });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      setForm({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        location: "",
        linkedin: "",
        coverLetter: "",
      });
      setResume(null);
      const fileInput = document.getElementById("resume");
      if (fileInput) fileInput.value = "";
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap} id="apply">
      <h2 className="h2">Apply Now</h2>
      <p className={styles.subtitle}>
        Fill in your details and upload your resume. All fields marked with * are required.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="fullName">Name *</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              value={form.fullName}
              onChange={updateField}
              placeholder="Enter your full name"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="location">City *</label>
            <input
              id="location"
              name="location"
              type="text"
              required
              autoComplete="address-level2"
              value={form.location}
              onChange={updateField}
              placeholder="Enter your city"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={updateField}
              placeholder="Enter your email address"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone">Phone *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={updateField}
              placeholder="Enter your mobile number"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="position">Position Applied For *</label>
            <select
              id="position"
              name="position"
              required
              value={form.position}
              onChange={updateField}
              className={styles.input}
            >
              <option value="">Select a role</option>
              {POSITIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="experience">Experience *</label>
            <select
              id="experience"
              name="experience"
              required
              value={form.experience}
              onChange={updateField}
              className={styles.input}
            >
              <option value="">Select experience</option>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="linkedin">LinkedIn Profile (optional)</label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            value={form.linkedin}
            onChange={updateField}
            placeholder="Enter your LinkedIn profile URL"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="coverLetter">Cover Letter / Summary (optional)</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={form.coverLetter}
            onChange={updateField}
            placeholder="Enter a brief summary of your experience and interest in this role"
            className={styles.textarea}
            rows={5}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="resume">Resume * (PDF, DOC, DOCX — max 5 MB)</label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            className={styles.fileInput}
          />
          {resume && (
            <span className={styles.fileName}>{resume.name}</span>
          )}
        </div>

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? "Submitting…" : "Submit Application"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>

      {success && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <div className={styles.check}>✓</div>
            <h3>Application Submitted</h3>
            <p>
              Thank you for applying to Ocean Lifespaces. We have received your
              resume and will contact you if your profile matches our openings.
            </p>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
