"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import ImageCropper from '@/components/ImageCropper';
import ConfirmModal from '@/components/admin/ConfirmModal';
import styles from '../admin.module.css';
import { 
  parseMainVideoValue, 
  nextMainVideoStateFromReplace, 
  nextMainVideoStateFromHistoryPick, 
  removeHistoryUrl, 
  resolveMediaPublicUrl 
} from '@/lib/mainVideoContent';

function LogoSection({ title, description, id, storedRaw, onSave, loading }) {
  const { active, history } = parseMainVideoValue(storedRaw);
  const [showCropper, setShowCropper] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, url: '' });

  const handleImageCropped = async (url) => {
    const next = nextMainVideoStateFromReplace(storedRaw, url);
    setShowCropper(false);
    await onSave(id, next);
  };

  const handleUseHistory = async (url) => {
    const next = nextMainVideoStateFromHistoryPick(storedRaw, url);
    await onSave(id, next);
  };

  const handleRemoveHistory = (url) => {
    setModal({ isOpen: true, url });
  };

  const confirmRemove = async () => {
    const url = modal.url;
    setModal({ isOpen: false, url: '' });
    const next = removeHistoryUrl(storedRaw, url);
    await onSave(id, next);
  };

  return (
    <div className={styles.formCard} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription} style={{ marginBottom: '20px', minHeight: '40px' }}>
        {description}
      </p>

      {showCropper ? (
        <div style={{ flex: 1 }}>
          <ImageCropper 
            uploadFullImage
            onImageCropped={handleImageCropped} 
            onCancel={() => setShowCropper(false)} 
          />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          <div style={{ 
            background: 'rgba(0,0,0,0.03)', 
            padding: '40px', 
            borderRadius: '16px', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed rgba(0,0,0,0.08)',
            height: '220px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {active ? (
              <>
                <img 
                  src={resolveMediaPublicUrl(active)} 
                  alt="Current Logo" 
                  style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '12px', 
                  left: '0', 
                  right: '0', 
                  textAlign: 'center',
                  fontSize: '11px', 
                  color: '#94a3b8', 
                  fontFamily: 'monospace',
                  padding: '0 10px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {active}
                </div>
              </>
            ) : (
              <p style={{ color: '#64748b' }}>No custom logo set. Using default.</p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              onClick={() => setShowCropper(true)} 
              className={styles.primaryButton}
              disabled={loading}
              style={{ width: '100%' }}
            >
              {active ? 'Replace Logo' : 'Upload Logo'}
            </button>
          </div>

          <div style={{ marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#0c4a6e', margin: 0 }}>
                Logo History
              </h4>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>{history.length} items</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px', 
              maxHeight: '320px', 
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              {history.length > 0 ? history.map((url, i) => {
                const isCurrent = url === active;
                return (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '10px', 
                    background: isCurrent ? '#f0f9ff' : '#f8fafc', 
                    borderRadius: '10px',
                    border: isCurrent ? '1px solid #bae6fd' : '1px solid #e2e8f0',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{ 
                      width: '70px', 
                      height: '40px', 
                      background: '#fff', 
                      borderRadius: '4px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      padding: '4px',
                      border: '1px solid #edf2f7',
                      flexShrink: 0
                    }}>
                      <img 
                        src={resolveMediaPublicUrl(url)} 
                        alt={`History ${i}`} 
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <p style={{ 
                          fontSize: '11px', 
                          color: '#64748b', 
                          fontFamily: 'monospace', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          margin: 0
                        }}>
                          {url.split('/').pop()}
                        </p>
                        {isCurrent && <span style={{ fontSize: '9px', background: '#0ea5e9', color: '#fff', padding: '1px 5px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase' }}>Current</span>}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                        {!isCurrent && (
                          <button 
                            onClick={() => handleUseHistory(url)}
                            className={styles.editButton}
                            style={{ 
                              padding: '4px 10px', 
                              fontSize: '11px', 
                              borderRadius: '4px',
                              fontWeight: '600'
                            }}
                            disabled={loading}
                          >
                            Select
                          </button>
                        )}
                        <button 
                          onClick={() => handleRemoveHistory(url)}
                          className={styles.dangerButton}
                          style={{ 
                            padding: '4px 10px', 
                            fontSize: '11px', 
                            borderRadius: '4px',
                            fontWeight: '600',
                            marginLeft: isCurrent ? '0' : 'auto'
                          }}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center', padding: '20px 0' }}>No history items found.</p>
              )}
            </div>
          </div>
        </div>
      )}
      <ConfirmModal 
        isOpen={modal.isOpen}
        title="Delete from history?"
        message="This logo will be removed from your history list. You can always upload it again if needed."
        onConfirm={confirmRemove}
        onCancel={() => setModal({ isOpen: false, url: '' })}
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}

function DirectUploadSection({ title, description, id, value, onSave, loading }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        await onSave(id, data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.formCard} style={{ gridColumn: '1 / -1' }}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription} style={{ marginBottom: '20px' }}>
        {description}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ 
          background: 'rgba(0,0,0,0.03)', 
          padding: '20px', 
          borderRadius: '16px', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed rgba(0,0,0,0.08)',
          minHeight: '200px',
          overflow: 'hidden'
        }}>
          {value ? (
            <img 
              src={resolveMediaPublicUrl(value)} 
              alt="Popup Preview" 
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
            />
          ) : (
            <p style={{ color: '#64748b' }}>No advertisement image set.</p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className={styles.primaryButton}
            disabled={loading || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload New Banner'}
          </button>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            This image will be used exactly as uploaded. Best for horizontal banners.
          </p>
          {value && (
            <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 4px 0', textTransform: 'uppercase', fontWeight: 'bold' }}>Active URL</p>
              <p style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace', wordBreak: 'break-all', margin: 0 }}>{value}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/content');
      const json = await res.json();
      const map = {};
      json.forEach(item => map[item.id] = item.value);
      setData(map);
    } catch (e) {
      console.error("Failed to fetch settings", e);
    }
  };

  const saveField = async (id, value, type = 'image') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, type })
      });

      if (!res.ok) throw new Error('Save failed');

      setData(prev => ({ ...prev, [id]: value }));
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      console.error(e);
      setMessage('Failed to update settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className={styles.pageTitle}>Site Branding & Marketing</h2>
        {message && (
          <div style={{ 
            background: message.includes('success') ? '#dcfce7' : '#fee2e2',
            color: message.includes('success') ? '#166534' : '#991b1b',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            animation: 'fadeIn 0.3s ease'
          }}>
            {message}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '32px', alignItems: 'stretch' }}>
        <LogoSection 
          id="site-logo-header"
          title="Header Navigation Logo"
          description="High-visibility logo shown at the top of every page. Recommended for horizontal layouts."
          storedRaw={data['site-logo-header'] || data['site-logo'] || ''}
          onSave={saveField}
          loading={loading}
        />

        <LogoSection 
          id="site-logo-footer"
          title="Website Footer Branding"
          description="Secondary logo shown in the footer. Can be a variation or the same as the header."
          storedRaw={data['site-logo-footer'] || data['site-logo'] || ''}
          onSave={saveField}
          loading={loading}
        />

        <DirectUploadSection 
          id="popup-image"
          title="Popup Advertisement Banner"
          description="The banner image shown to users when they first visit the site. No cropping—used exactly as uploaded."
          value={data['popup-image'] || ''}
          onSave={saveField}
          loading={loading}
        />

        <div className={styles.formCard} style={{ gridColumn: '1 / -1' }}>
          <h3 className={styles.cardTitle}>Enquiry Form Configuration</h3>
          <p className={styles.cardDescription}>
            Manage how enquiry forms appear and function across the website.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '20px' }}>
            <div className={styles.inputWrapper}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px', display: 'block' }}>
                Floating Enquiry Button
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <input 
                  type="checkbox" 
                  checked={data['show-floating-enquiry'] === 'true'} 
                  onChange={(e) => saveField('show-floating-enquiry', e.target.checked.toString(), 'text')}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', color: '#1e293b' }}>Show floating enquiry button on all pages</span>
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px', display: 'block' }}>
                Contact Page Form Type
              </label>
              <select 
                value={data['contact-form-type'] || 'Contact'} 
                onChange={(e) => saveField('contact-form-type', e.target.value, 'text')}
                className={styles.inputField}
                style={{ width: '100%' }}
              >
                <option value="Contact">Contact Us (Default)</option>
                <option value="General Enquiry">General Enquiry</option>
                <option value="Joint Venture">Joint Venture</option>
                <option value="Schedule Visit">Schedule Visit</option>
              </select>
            </div>

            <div className={styles.inputWrapper}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px', display: 'block' }}>
                Admin Email for Notifications
              </label>
              <input 
                type="email" 
                placeholder="salesinfra@olipl.com"
                value={data['admin-notification-email'] || ''} 
                onChange={(e) => setData({...data, 'admin-notification-email': e.target.value})}
                onBlur={(e) => saveField('admin-notification-email', e.target.value, 'text')}
                className={styles.inputField}
                style={{ width: '100%' }}
              />
              <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Where form submissions are sent.</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
