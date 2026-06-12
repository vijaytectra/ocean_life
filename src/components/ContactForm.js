"use client";

import { useState, useEffect } from "react";
import styles from "./ContactForm.module.css";

const FORM_COPY = {
  default: {
    nameLabel: "Name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email address",
    phoneLabel: "Phone",
    phonePlaceholder: "Enter your mobile number",
    subjectLabel: "Subject",
    subjectPlaceholder: "Enter the subject of your message",
    messageLabel: "Message",
    messagePlaceholder: "Enter your message or project details",
    submitLabel: "Send Message",
    successTitle: "Submitted Successfully",
    successBody:
      "Thank you for reaching out. Our team will get back to you shortly.",
  },
  "Floating Enquiry": {
    nameLabel: "Name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email address",
    phoneLabel: "Phone",
    phonePlaceholder: "Enter your mobile number",
    subjectLabel: "Subject",
    subjectPlaceholder: "Enter your enquiry subject",
    messageLabel: "Message",
    messagePlaceholder: "Describe your requirement or question",
    submitLabel: "Submit Enquiry",
    successTitle: "Enquiry Submitted",
    successBody:
      "Thank you. We have received your enquiry and will respond as soon as possible.",
  },
  Careers: {
    subjectLabel: "Position",
    subjectPlaceholder: "Enter the position you are applying for",
    messageLabel: "Details",
    messagePlaceholder: "Enter additional details about your application",
  },
  "Schedule Visit": {
    subjectLabel: "Visit Type",
    subjectPlaceholder: "Enter purpose of your site visit",
    messageLabel: "Preferred Details",
    messagePlaceholder: "Enter preferred date, time, and location",
  },
  "Joint Venture": {
    subjectLabel: "Partnership Type",
    subjectPlaceholder: "Enter type of joint venture or collaboration",
    messageLabel: "Proposal",
    messagePlaceholder: "Enter details of your partnership proposal",
  },
};

function getFormCopy(type) {
  const base = FORM_COPY.default;
  const extra = FORM_COPY[type] || {};
  return { ...base, ...extra };
}

const ContactForm = ({ type = "Contact", title = "Get in Touch", embedded = false }) => {
  const copy = getFormCopy(type);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div className={`${styles.formContainer} ${embedded ? styles.embedded : ""}`}>
      {title ? <h2 className={styles.formTitle}>{title}</h2> : null}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="contact-name">
              {copy.nameLabel} *
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder={copy.namePlaceholder}
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="contact-email">
              {copy.emailLabel} *
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder={copy.emailPlaceholder}
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="contact-phone">
              {copy.phoneLabel} *
            </label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              placeholder={copy.phonePlaceholder}
              value={formData.phone}
              onChange={handleChange}
              required
              autoComplete="tel"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="contact-subject">
              {copy.subjectLabel} *
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              placeholder={copy.subjectPlaceholder}
              value={formData.subject}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="contact-message">
            {copy.messageLabel} *
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder={copy.messagePlaceholder}
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textareaField}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className={styles.loaderText}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </span>
          ) : (
            copy.submitLabel
          )}
        </button>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>

      {submitted && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <div className={styles.successIcon}>✓</div>
            <h3>{copy.successTitle}</h3>
            <p>{copy.successBody}</p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className={styles.closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
