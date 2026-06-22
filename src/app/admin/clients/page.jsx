"use client";

import { useState, useEffect } from 'react';
import ImageCropper from '@/components/ImageCropper';
import ConfirmModal from '@/components/admin/ConfirmModal';
import styles from '../admin.module.css';

export default function AdminClients() {
  const [logos, setLogos] = useState([]);
  const [showCropper, setShowCropper] = useState(false);
  const [category, setCategory] = useState('corporate');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, logoId: null });

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    const res = await fetch("/api/clients/logos/", { cache: "no-store", credentials: "include" });
    const data = await res.json();
    if (Array.isArray(data)) setLogos(data);
  };

  const handleImageCropped = async (url) => {
    if (!url) {
      alert("Upload did not return an image URL. Please try again.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/clients/logos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ image: url, category }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Save failed (${res.status})`);
      }
      setShowCropper(false);
      await fetchLogos();
    } catch (e) {
      console.error(e);
      alert(e.message || "Could not save the logo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setModal({ isOpen: true, logoId: id });
  };

  const confirmDelete = async () => {
    const id = modal.logoId;
    setModal({ isOpen: false, logoId: null });
    try {
      const res = await fetch(`/api/clients/logos/${id}/`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Delete failed (${res.status})`);
      }
      await fetchLogos();
    } catch (e) {
      console.error(e);
      alert(e.message || "Could not remove the logo. Please try again.");
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Manage Client Logos</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className={styles.inputField}
            style={{ padding: '8px 12px' }}
          >
            <option value="corporate">Corporate Client</option>
            <option value="ongoing">Ongoing Project</option>
          </select>
          <button onClick={() => setShowCropper(true)} className={styles.primaryButton}>
            Add New Logo
          </button>
        </div>
      </div>

      {loading ? (
        <p className={styles.cardDescription} style={{ marginBottom: "1rem" }}>
          Saving logo…
        </p>
      ) : null}

      {showCropper && (
        <div className={styles.formCard}>
          <h3 className={styles.cardTitle}>Upload New Client Logo</h3>
          <ImageCropper 
            onImageCropped={handleImageCropped} 
            onCancel={() => setShowCropper(false)} 
            aspectRatio={1}
            previewMode="client-logo"
            previewSectionTitle={category === 'corporate' ? 'Corporate Clients' : 'Ongoing Projects'}
            enableBgRemoval
          />
        </div>
      )}

      <div style={{ marginBottom: '40px' }}>
        <h3 className={styles.cardTitle} style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Corporate Clients</h3>
        <div className={styles.grid}>
          {logos.filter(l => l.category === 'corporate').map(logo => (
            <div key={logo.id} className={styles.card} style={{ padding: '15px', alignItems: 'center' }}>
              <img src={logo.image} alt="Client" style={{ width: '100%', height: '100px', objectFit: 'contain', marginBottom: '15px' }} />
              <button onClick={() => handleDelete(logo.id)} className={styles.dangerButton} style={{ width: '100%' }}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className={styles.cardTitle} style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Ongoing Projects</h3>
        <div className={styles.grid}>
          {logos.filter(l => l.category === 'ongoing').map(logo => (
            <div key={logo.id} className={styles.card} style={{ padding: '15px', alignItems: 'center' }}>
              <img src={logo.image} alt="Client" style={{ width: '100%', height: '80px', objectFit: 'contain', marginBottom: '15px' }} />
              <button onClick={() => handleDelete(logo.id)} className={styles.dangerButton} style={{ width: '100%' }}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal 
        isOpen={modal.isOpen}
        title="Remove Client Logo?"
        message="Are you sure you want to remove this client logo? It will be removed from the Clients page."
        onConfirm={confirmDelete}
        onCancel={() => setModal({ isOpen: false, logoId: null })}
        confirmText="Remove"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
