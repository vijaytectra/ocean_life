"use client";

import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    // Basic email regex validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Clear error when user starts typing
    if (emailError && value) {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setEmailError("");

    // Client-side validation
    if (!email) {
      setEmailError("Email is required");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setEmail("");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.sectionNewsLetter}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Get The Latest Ocean Updates <br></br> By Subscribing To Our
          Newsletter!
        </h2>
        <form onSubmit={handleSubmit} className={styles.inputWrapper}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Enter email address"
              className={`${styles.input} ${
                emailError ? styles.inputError : ""
              }`}
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className={styles.errorMessage}>{emailError}</p>}
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting || !!emailError}
            aria-label="Subscribe to newsletter"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <AiOutlineArrowRight className={styles.icon} />
            )}
          </button>
        </form>
        {message && (
          <p
            className={`${styles.message} ${
              message.includes("success")
                ? styles.successMessage
                : styles.errorMessage
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
