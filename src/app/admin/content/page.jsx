"use client";

import { useState, useEffect } from 'react';
import ImageCropper from '@/components/ImageCropper';
import styles from '../admin.module.css';

export default function AdminContent() {
  const [content, setContent] = useState([]);
  const [showCropper, setShowCropper] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const res = await fetch('/api/content');
    const data = await res.json();
    if (Array.isArray(data)) setContent(data);
  };

  const updateItem = async (id, value, type = 'text') => {
    setLoading(true);
    await fetch(`/api/content/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    // If update fails (e.g. not created yet), create it
    const res = await fetch('/api/content');
    const data = await res.json();
    if (!data.find(i => i.id === id)) {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, value, type })
      });
    }
    fetchContent();
    setLoading(false);
  };

  const handleImageCropped = async (url) => {
    if (activeItem) {
      await updateItem(activeItem, url, 'image');
      setActiveItem(null);
      setShowCropper(false);
    }
  };

  const findValue = (id) => content.find(i => i.id === id)?.value || '';

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Main Content & Media</h2>
      </div>

      <div className={styles.grid}>
        {/* Main Video Section */}
        <div className={styles.formCard}>
          <h3 className={styles.cardTitle}>Main Website Video</h3>
          <p className={styles.cardDescription}>Update the background video used on the homepage.</p>
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Video URL (e.g. /hero-video.mp4)" 
              value={findValue('main-video')}
              onChange={(e) => {
                const newValue = e.target.value;
                const newContent = content.map(item => item.id === 'main-video' ? { ...item, value: newValue } : item);
                setContent(newContent);
              }}
              onBlur={(e) => updateItem('main-video', e.target.value, 'video')}
              className={styles.inputField}
              style={{ flex: 1 }}
            />
            <button onClick={() => updateItem('main-video', '', 'video')} className={styles.dangerButton}>Delete</button>
          </div>
        </div>

        {/* Popup Image Section */}
        <div className={styles.formCard}>
          <h3 className={styles.cardTitle}>Popup Advertisement Image</h3>
          <p className={styles.cardDescription}>The image shown when users first visit the site.</p>
          {showCropper && activeItem === 'popup-image' ? (
            <ImageCropper onImageCropped={handleImageCropped} onCancel={() => setShowCropper(false)} />
          ) : (
            <div style={{ marginTop: '15px' }}>
              {findValue('popup-image') && (
                <div style={{ marginBottom: '10px' }}>
                  <img src={findValue('popup-image')} alt="Popup" style={{ width: '100%', maxHeight: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                  <button onClick={() => updateItem('popup-image', '', 'image')} className={styles.dangerButton} style={{ width: '100%', marginTop: '5px' }}>Delete Image</button>
                </div>
              )}
              <button onClick={() => { setActiveItem('popup-image'); setShowCropper(true); }} className={styles.editButton}>Update Popup Image</button>
            </div>
          )}
        </div>

        {/* Testimonials Video Desktop */}
        <div className={styles.formCard}>
          <h3 className={styles.cardTitle}>Client Testimonials (Desktop)</h3>
          <p className={styles.cardDescription}>Video URL for desktop testimonials.</p>
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Desktop Video URL" 
              value={findValue('testimonial-desktop')}
              onChange={(e) => {
                const newValue = e.target.value;
                const newContent = content.map(item => item.id === 'testimonial-desktop' ? { ...item, value: newValue } : item);
                setContent(newContent);
              }}
              onBlur={(e) => updateItem('testimonial-desktop', e.target.value, 'video')}
              className={styles.inputField}
              style={{ flex: 1 }}
            />
            <button onClick={() => updateItem('testimonial-desktop', '', 'video')} className={styles.dangerButton}>Delete</button>
          </div>
        </div>

        {/* Testimonials Video Mobile */}
        <div className={styles.formCard}>
          <h3 className={styles.cardTitle}>Client Testimonials (Mobile)</h3>
          <p className={styles.cardDescription}>Video URL for mobile testimonials.</p>
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Mobile Video URL" 
              value={findValue('testimonial-mobile')}
              onChange={(e) => {
                const newValue = e.target.value;
                const newContent = content.map(item => item.id === 'testimonial-mobile' ? { ...item, value: newValue } : item);
                setContent(newContent);
              }}
              onBlur={(e) => updateItem('testimonial-mobile', e.target.value, 'video')}
              className={styles.inputField}
              style={{ flex: 1 }}
            />
            <button onClick={() => updateItem('testimonial-mobile', '', 'video')} className={styles.dangerButton}>Delete</button>
          </div>
        </div>
      </div>

      <div className={styles.formCard} style={{ marginTop: '30px' }}>
        <h3 className={styles.cardTitle}>Masters Image Plan</h3>
        <p className={styles.cardDescription}>Upload the main master plan image for the projects section.</p>
        {showCropper && activeItem === 'master-plan' ? (
          <ImageCropper onImageCropped={handleImageCropped} onCancel={() => setShowCropper(false)} />
        ) : (
          <div style={{ marginTop: '15px' }}>
            {findValue('master-plan') && <img src={findValue('master-plan')} alt="Master Plan" style={{ maxWidth: '400px', display: 'block', marginBottom: '15px', borderRadius: '8px' }} />}
            <button onClick={() => { setActiveItem('master-plan'); setShowCropper(true); }} className={styles.primaryButton}>Update Master Plan Image</button>
          </div>
        )}
      </div>
    </div>
  );
}
