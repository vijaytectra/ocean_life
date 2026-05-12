"use client";

import { useState, useEffect } from 'react';
import ImageCropper from '@/components/ImageCropper';
import styles from '../admin.module.css';

const SERVICE_TYPES = [
  'Turnkey solutions',
  'Interior fit-out services',
  'Civil construction',
  'Real estate development',
  'Infrastructure development',
  'Hospitals and hospitality'
];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [formData, setFormData] = useState({ 
    type: SERVICE_TYPES[0], name: '', subServices: '', image: '', description: '', recentProject: '', ongoingProject: '' 
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch('/api/admin/services');
    const data = await res.json();
    if (Array.isArray(data)) setServices(data);
  };

  const handleImageCropped = (url) => {
    setFormData({ ...formData, image: url });
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ type: SERVICE_TYPES[0], name: '', subServices: '', image: '', description: '', recentProject: '', ongoingProject: '' });
    setIsCreating(false);
    fetchServices();
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure?")) return;
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
    fetchServices();
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Services Management</h2>
        <button onClick={() => setIsCreating(!isCreating)} className={styles.primaryButton}>
          {isCreating ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {isCreating && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className={styles.inputField}>
                {SERVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input type="text" placeholder="Service Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className={styles.inputField} />
              <input type="text" placeholder="Sub-services (comma separated)" value={formData.subServices} onChange={e => setFormData({...formData, subServices: e.target.value})} className={styles.inputField} />
              <input type="text" placeholder="Recent Project Name" value={formData.recentProject} onChange={e => setFormData({...formData, recentProject: e.target.value})} className={styles.inputField} />
              <input type="text" placeholder="Ongoing Project Name" value={formData.ongoingProject} onChange={e => setFormData({...formData, ongoingProject: e.target.value})} className={styles.inputField} />
            </div>
            <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className={styles.inputField} />
            
            {showCropper ? (
              <ImageCropper onImageCropped={handleImageCropped} onCancel={() => setShowCropper(false)} />
            ) : (
              <div>
                <button type="button" onClick={() => setShowCropper(true)} className={styles.editButton}>
                  {formData.image ? 'Change Service Image' : 'Upload Service Image'}
                </button>
                {formData.image && <img src={formData.image} alt="Preview" style={{ display: 'block', marginTop: '15px', maxHeight: '150px', borderRadius: '8px' }} />}
              </div>
            )}
            
            <button type="submit" className={styles.primaryButton} style={{ alignSelf: 'flex-start' }}>Save Service</button>
          </form>
        </div>
      )}

      {SERVICE_TYPES.map(type => (
        <div key={type} style={{ marginBottom: '40px' }}>
          <h3 className={styles.cardTitle} style={{ borderBottom: '2px solid #f5831f', paddingBottom: '10px', marginBottom: '20px' }}>{type}</h3>
          <div className={styles.grid}>
            {services.filter(s => s.type === type).map(service => (
              <div key={service.id} className={styles.card}>
                <h4 className={styles.cardTitle}>{service.name}</h4>
                {service.image && <img src={service.image} alt={service.name} className={styles.cardImage} />}
                <p className={styles.cardDescription} style={{ marginTop: '10px' }}>{service.description?.substring(0, 100)}...</p>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '10px' }}>
                  <div><strong>Subs:</strong> {service.subServices || 'None'}</div>
                  <div><strong>Recent:</strong> {service.recentProject || 'N/A'}</div>
                </div>
                <div className={styles.cardActions}>
                  <button onClick={() => handleDelete(service.id)} className={styles.dangerButton}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
