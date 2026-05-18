"use client";

import { useState, useEffect } from 'react';
import ConfirmModal from '@/components/admin/ConfirmModal';
import styles from '../admin.module.css';

export default function AdminSEO() {
  const [configs, setConfigs] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ page: '', metaTitle: '', metaDesc: '', status: 'active' });
  const [modal, setModal] = useState({ isOpen: false, configId: null });

  useEffect(() => {
    fetchSEO();
  }, []);

  const fetchSEO = async () => {
    const res = await fetch('/api/admin/seo');
    const data = await res.json();
    if (Array.isArray(data)) setConfigs(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ page: '', metaTitle: '', metaDesc: '', status: 'active' });
    setIsCreating(false);
    fetchSEO();
  };

  const handleDelete = async (id) => {
    setModal({ isOpen: true, configId: id });
  };

  const confirmDelete = async () => {
    const id = modal.configId;
    setModal({ isOpen: false, configId: null });
    await fetch(`/api/admin/seo/${id}`, { method: 'DELETE' });
    fetchSEO();
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>SEO Management</h2>
        <button onClick={() => setIsCreating(!isCreating)} className={styles.primaryButton}>
          {isCreating ? 'Cancel' : 'Add SEO Config'}
        </button>
      </div>

      {isCreating && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <input type="text" placeholder="Page Name (e.g. Home, About)" value={formData.page} onChange={e => setFormData({...formData, page: e.target.value})} required className={styles.inputField} />
            <input type="text" placeholder="Meta Title" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} required className={styles.inputField} />
            <textarea placeholder="Meta Description" value={formData.metaDesc} onChange={e => setFormData({...formData, metaDesc: e.target.value})} rows={3} className={styles.inputField} />
            <button type="submit" className={styles.primaryButton} style={{ alignSelf: 'flex-start' }}>Save Config</button>
          </form>
        </div>
      )}

      <div className={styles.formCard} style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Page</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Meta Title</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {configs.map(config => (
              <tr key={config.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{config.page}</td>
                <td style={{ padding: '15px' }}>{config.metaTitle}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem',
                    background: '#dcfce7',
                    color: '#166534'
                  }}>
                    {config.status}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => handleDelete(config.id)} className={styles.dangerButton} style={{ padding: '5px 10px', fontSize: '0.8rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal 
        isOpen={modal.isOpen}
        title="Delete SEO Configuration?"
        message="Are you sure you want to delete this SEO configuration? This may affect your site's search engine visibility."
        onConfirm={confirmDelete}
        onCancel={() => setModal({ isOpen: false, configId: null })}
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
