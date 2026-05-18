"use client";

import { useState, useEffect } from "react";
import styles from "./ContactForm.module.css";

const ContactForm = ({ type = "Contact", title = "Get in Touch" }) => {
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
      // We'll add the 'type' to the request body so the API knows what kind of enquiry it is
      const response = await fetch("/api/contact", {
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
    <div className={styles.formContainer}>
      <h2 className="h2">{title}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder={type === "Careers" ? "Position Applied For" : "How can we help?"}
              value={formData.subject}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Message / Details</label>
          <textarea
            name="message"
            placeholder="Tell us more about your requirement..."
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
            "Send Message"
          )}
        </button>
        
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>

      {submitted && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <div className={styles.successIcon}>✓</div>
            <h3>Submitted Successfully!</h3>
            <p>Thank you for reaching out. Our team will get back to you shortly.</p>
            <button onClick={() => setSubmitted(false)} className={styles.closeBtn}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
