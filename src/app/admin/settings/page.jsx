"use client";

import { useState, useEffect } from 'react';
import ImageCropper from '@/components/ImageCropper';
import styles from '../admin.module.css';

export default function AdminSettings() {
  const [logo, setLogo] = useState('');
  const [showCropper, setShowCropper] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      const logoItem = data.find(item => item.id === 'site-logo');
      if (logoItem) setLogo(logoItem.value);
    } catch (e) {
      console.error("Failed to fetch logo", e);
    }
  };

  const handleImageCropped = async (url) => {
    setLogo(url);
    setShowCropper(false);
    await saveLogo(url);
  };

  const saveLogo = async (url) => {
    setLoading(true);
    try {
      // First try to update, if fails, create
      const res = await fetch('/api/content/site-logo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: url })
      });

      if (!res.ok) {
        // Try creating it if PUT fails (might not exist yet)
        await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: 'site-logo', type: 'image', value: url })
        });
      }
      setMessage('Logo updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      console.error(e);
      setMessage('Failed to update logo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Site Settings</h2>
      </div>

      <div className={styles.formCard}>
        <h3 className={styles.cardTitle}>Main Website Logo</h3>
        <p className={styles.cardDescription} style={{ marginBottom: '20px' }}>
          This logo will appear in the main navigation and footer across the website.
        </p>

        {showCropper ? (
          <ImageCropper 
            onImageCropped={handleImageCropped} 
            onCancel={() => setShowCropper(false)} 
            aspectRatio={4/1} 
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ 
              background: 'rgba(0,0,0,0.05)', 
              padding: '40px', 
              borderRadius: '12px', 
              display: 'flex', 
              justifyContent: 'center',
              border: '2px dashed rgba(0,0,0,0.1)'
            }}>
              {logo ? (
                <img src={logo} alt="Current Logo" style={{ maxHeight: '100px', maxWidth: '100%' }} />
              ) : (
                <p style={{ color: '#64748b' }}>No custom logo set. Using default.</p>
              )}
            </div>

            <button 
              onClick={() => setShowCropper(true)} 
              className={styles.primaryButton}
              style={{ alignSelf: 'flex-start' }}
              disabled={loading}
            >
              {logo ? 'Change Logo' : 'Upload Logo'}
            </button>
            
            {message && <p style={{ color: message.includes('success') ? '#10b981' : '#ef4444' }}>{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
