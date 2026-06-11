"use client";

import { useRef, useState } from "react";
import adminStyles from "../admin.module.css";
import enquiryStyles from "./enquiries.module.css";
import {
  downloadElementAsPng,
  enquiryImageFilename,
} from "@/utils/downloadAsImage";

function EnquiryCaptureCard({ enquiry, captureRef }) {
  return (
    <div ref={captureRef} className={enquiryStyles.captureCard}>
      <div className={enquiryStyles.brandBar}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-web.webp"
          alt="Ocean Lifespaces"
          className={enquiryStyles.brandLogo}
          crossOrigin="anonymous"
        />
      </div>

      <div className={enquiryStyles.cardHeader}>
        <h3 className={enquiryStyles.cardTitle}>Enquiry Details</h3>
        <p className={enquiryStyles.cardSub}>
          Reference #{enquiry.id} · {new Date(enquiry.createdAt).toLocaleString()}
        </p>
      </div>

      <div className={enquiryStyles.cardBody}>
        <div className={enquiryStyles.grid}>
          <div>
            <span className={enquiryStyles.fieldLabel}>Type</span>
            <p className={enquiryStyles.typeValue}>{enquiry.type}</p>
          </div>
          <div>
            <span className={enquiryStyles.fieldLabel}>Status</span>
            <p className={enquiryStyles.statusValue}>{enquiry.status}</p>
          </div>
          <div>
            <span className={enquiryStyles.fieldLabel}>Name</span>
            <p className={enquiryStyles.fieldValue}>{enquiry.name}</p>
          </div>
          <div>
            <span className={enquiryStyles.fieldLabel}>Date</span>
            <p className={enquiryStyles.fieldValue}>
              {new Date(enquiry.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <span className={enquiryStyles.fieldLabel}>Email</span>
            <p className={enquiryStyles.fieldValue}>{enquiry.email}</p>
          </div>
          <div>
            <span className={enquiryStyles.fieldLabel}>Mobile</span>
            <p className={enquiryStyles.fieldValue}>{enquiry.mobile || "N/A"}</p>
          </div>
        </div>

        <div className={enquiryStyles.block}>
          <span className={enquiryStyles.fieldLabel}>Subject</span>
          <p className={enquiryStyles.subjectValue}>
            {enquiry.subject || "No Subject"}
          </p>
        </div>

        <div>
          <span className={enquiryStyles.fieldLabel}>Message</span>
          <div className={enquiryStyles.messageBox}>{enquiry.message}</div>
        </div>
      </div>

      <div className={enquiryStyles.exportFooter}>
        Ocean Lifespaces Pvt. Ltd. · www.olipl.com · Enquiry #{enquiry.id}
      </div>
    </div>
  );
}

export default function EnquiryDetailModal({
  enquiry,
  onClose,
  onMarkRead,
  onMarkResolved,
}) {
  const captureRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const handleDownloadImage = async () => {
    if (!captureRef.current) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      await downloadElementAsPng(
        captureRef.current,
        enquiryImageFilename(enquiry)
      );
    } catch (error) {
      console.error("Enquiry image download:", error);
      setDownloadError("Could not generate image. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={enquiryStyles.overlay} role="presentation">
      <div className={enquiryStyles.modalShell} role="dialog" aria-modal="true">
        <button
          type="button"
          onClick={onClose}
          className={enquiryStyles.closeFloating}
          aria-label="Close"
        >
          &times;
        </button>

        <EnquiryCaptureCard enquiry={enquiry} captureRef={captureRef} />

        {downloadError && (
          <p style={{ color: "#b91c1c", fontSize: 13, padding: "0 20px 8px", margin: 0 }}>
            {downloadError}
          </p>
        )}

        <div className={enquiryStyles.modalActions}>
          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={downloading}
            className={enquiryStyles.downloadBtn}
          >
            {downloading ? "Generating…" : "Download as image"}
          </button>
          <button type="button" onClick={onClose} className={adminStyles.editButton}>
            Close
          </button>
          {enquiry.status === "new" && (
            <button type="button" onClick={onMarkRead} className={adminStyles.primaryButton}>
              Mark as Read
            </button>
          )}
          {enquiry.status !== "resolved" && (
            <button
              type="button"
              onClick={onMarkResolved}
              className={adminStyles.primaryButton}
              style={{ background: "#10b981" }}
            >
              Mark Resolved
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
