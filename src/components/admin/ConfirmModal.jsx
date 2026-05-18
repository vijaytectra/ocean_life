"use client";

import React from "react";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({ 
  isOpen, 
  title = "Are you sure?", 
  message = "This action cannot be undone.", 
  onConfirm, 
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.body}>
          <p className={styles.message}>{message}</p>
        </div>
        <div className={styles.footer}>
          <button 
            className={styles.cancelBtn} 
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className={`${styles.confirmBtn} ${danger ? styles.danger : ""}`} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
