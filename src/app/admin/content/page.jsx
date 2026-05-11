"use client";

import { useState, useEffect } from 'react';
import ImageCropper from '@/components/ImageCropper';
import styles from '../admin.module.css';

export default function AdminContent() {
  const [contents, setContents] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ id: '', type: 'text', value: '' });
  const [showCropper, setShowCropper] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const res = await fetch('/api/content');
    const data = await res.json();
    if (Array.isArray(data)) setContents(data);
  };

  const handleImageCropped = (url) => {
    setFormData({ ...formData, value: url });
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/content/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: formData.value })
      });
      setEditingId(null);
    } else {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    }
    
    setFormData({ id: '', type: 'text', value: '' });
    setIsCreating(false);
    fetchContent();
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure?")) return;
    await fetch(`/api/content/${id}`, { method: 'DELETE' });
    fetchContent();
  };

  const startEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setIsCreating(true);
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Global Site Content</h2>
        <button onClick={() => {
          setIsCreating(!isCreating);
          setEditingId(null);
          setFormData({ id: '', type: 'text', value: '' });
        }} className={isCreating ? styles.dangerButton : styles.primaryButton}>
          {isCreating ? 'Cancel' : 'Create Content Block'}
        </button>
      </div>

      {isCreating && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <input 
              type="text" 
              placeholder="Unique Key (e.g., home-hero-title)" 
              value={formData.id} 
              onChange={e => setFormData({...formData, id: e.target.value})} 
              required 
              disabled={!!editingId}
              className={styles.inputField} 
            />
            
            {!editingId && (
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value, value: ''})} className={styles.inputField}>
                <option value="text">Text / HTML</option>
                <option value="image">Image</option>
              </select>
            )}

            {formData.type === 'text' ? (
              <textarea 
                placeholder="Content Value" 
                value={formData.value} 
                onChange={e => setFormData({...formData, value: e.target.value})} 
                required 
                rows={5} 
                className={styles.inputField} 
              />
            ) : (
              showCropper ? (
                <ImageCropper onImageCropped={handleImageCropped} onCancel={() => setShowCropper(false)} />
              ) : (
                <div>
                  <button type="button" onClick={() => setShowCropper(true)} className={styles.editButton}>
                    {formData.value ? 'Change Image' : 'Upload Image'}
                  </button>
                  {formData.value && <img src={formData.value} alt="Preview" style={{ display: 'block', marginTop: '15px', maxHeight: '150px', borderRadius: '8px' }} />}
                </div>
              )
            )}
            
            <button type="submit" className={styles.primaryButton} style={{ alignSelf: 'flex-start', marginTop: '10px' }}>Save Content Block</button>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {contents.map(item => (
          <div key={item.id} className={styles.card}>
            <h3 className={styles.cardTitle} style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{item.id}</h3>
            <div style={{ marginTop: '10px', flex: 1 }}>
              {item.type === 'image' ? (
                <img src={item.value} alt={item.id} style={{ maxHeight: '120px', borderRadius: '8px' }} />
              ) : (
                <p className={styles.cardDescription}>{item.value.substring(0, 150)}{item.value.length > 150 ? '...' : ''}</p>
              )}
            </div>
            <div className={styles.cardActions}>
              <button onClick={() => startEdit(item)} className={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(item.id)} className={styles.dangerButton}>Delete</button>
            </div>
          </div>
        ))}
        {contents.length === 0 && <p style={{color: '#94a3b8'}}>No dynamic content blocks found. Create one above.</p>}
      </div>
    </div>
  );
}
