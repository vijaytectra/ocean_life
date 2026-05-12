"use client";

import { useState, useEffect } from 'react';
import ImageCropper from '@/components/ImageCropper';
import styles from '../admin.module.css';

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', image: '', priority: 0 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await fetch('/api/employees');
    const data = await res.json();
    if (Array.isArray(data)) setMembers(data);
  };

  const handleImageCropped = (url) => {
    setFormData({ ...formData, image: url });
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/employees/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setEditingId(null);
    } else {
      await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    }
    setFormData({ name: '', role: '', image: '', priority: 0 });
    setIsCreating(false);
    fetchMembers();
  };

  const startEdit = (member) => {
    setFormData({ 
      name: member.name, 
      role: member.role, 
      image: member.image || '',
      priority: member.priority || 0
    });
    setEditingId(member.id);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure?")) return;
    await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    fetchMembers();
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Management Team</h2>
        <button onClick={() => setIsCreating(!isCreating)} className={styles.primaryButton}>
          {isCreating ? 'Cancel' : 'Add Team Member'}
        </button>
      </div>

      {isCreating && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input type="text" placeholder="Member Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className={styles.inputField} />
              <input type="text" placeholder="Role (e.g. Managing Director)" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required className={styles.inputField} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              <label style={{ fontSize: '12px', color: '#64748b' }}>Priority (Higher numbers appear first)</label>
              <input type="number" placeholder="Priority" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className={styles.inputField} />
            </div>
            
            {showCropper ? (
              <ImageCropper onImageCropped={handleImageCropped} onCancel={() => setShowCropper(false)} aspectRatio={1/1} />
            ) : (
              <div>
                <button type="button" onClick={() => setShowCropper(true)} className={styles.editButton}>
                  {formData.image ? 'Change Portrait' : 'Upload Portrait'}
                </button>
                {formData.image && <img src={formData.image} alt="Preview" style={{ display: 'block', marginTop: '15px', width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />}
              </div>
            )}
            
            <button type="submit" className={styles.primaryButton} style={{ alignSelf: 'flex-start' }}>Save Member</button>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {members.map(member => (
          <div key={member.id} className={styles.card} style={{ textAlign: 'center' }}>
            {member.image ? (
              <img src={member.image} alt={member.name} className={styles.avatarImage} />
            ) : (
              <div className={styles.avatarImage} style={{ background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#64748b' }}>
                {member.name.charAt(0)}
              </div>
            )}
            <h3 className={styles.cardTitle}>{member.name}</h3>
            <p className={styles.cardDescription}>{member.role}</p>
            <div className={styles.cardActions} style={{ justifyContent: 'center', gap: '10px' }}>
              <button onClick={() => startEdit(member)} className={styles.editButton} style={{ flex: 1 }}>Edit</button>
              <button onClick={() => handleDelete(member.id)} className={styles.dangerButton} style={{ flex: 1 }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
