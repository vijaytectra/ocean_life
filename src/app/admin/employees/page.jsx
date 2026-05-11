"use client";

import { useState, useEffect } from 'react';
import ImageCropper from '@/components/ImageCropper';
import styles from '../admin.module.css';

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', image: '' });
  const [showCropper, setShowCropper] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await fetch('/api/employees');
    const data = await res.json();
    if (Array.isArray(data)) setEmployees(data);
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
    setFormData({ name: '', role: '', image: '' });
    setIsCreating(false);
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure?")) return;
    await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    fetchEmployees();
  };

  const startEdit = (emp) => {
    setFormData({ name: emp.name, role: emp.role, image: emp.image || '' });
    setEditingId(emp.id);
    setIsCreating(true);
    setShowCropper(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Manage Employees</h2>
        <button onClick={() => {
          setIsCreating(!isCreating);
          setEditingId(null);
          setFormData({ name: '', role: '', image: '' });
        }} className={isCreating ? styles.dangerButton : styles.primaryButton}>
          {isCreating ? 'Cancel' : 'Add New Employee'}
        </button>
      </div>

      {isCreating && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <input type="text" placeholder="Employee Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className={styles.inputField} />
            <input type="text" placeholder="Role / Position" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required className={styles.inputField} />
            
            {showCropper ? (
              <ImageCropper onImageCropped={handleImageCropped} onCancel={() => setShowCropper(false)} />
            ) : (
              <div>
                <button type="button" onClick={() => setShowCropper(true)} className={styles.editButton}>
                  {formData.image ? 'Change Profile Image' : 'Upload Profile Image'}
                </button>
                {formData.image && <img src={formData.image} alt="Preview" style={{ display: 'block', marginTop: '15px', width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', border: '4px solid #e9e9e9' }} />}
              </div>
            )}
            
            <button type="submit" className={styles.primaryButton} style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
              {editingId ? 'Update Employee' : 'Save Employee'}
            </button>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {employees.map(emp => (
          <div key={emp.id} className={styles.card} style={{ alignItems: 'center', textAlign: 'center' }}>
            {emp.image ? (
              <img src={emp.image} alt={emp.name} className={styles.avatarImage} />
            ) : (
              <div className={styles.avatarImage} style={{ background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{color: '#94a3b8'}}>No Img</span></div>
            )}
            <h3 className={styles.cardTitle}>{emp.name}</h3>
            <p className={styles.cardDescription}>{emp.role}</p>
            <div className={styles.cardActions} style={{ justifyContent: 'center' }}>
              <button onClick={() => startEdit(emp)} className={styles.editButton}>Edit / Crop Image</button>
              <button onClick={() => handleDelete(emp.id)} className={styles.dangerButton}>Delete</button>
            </div>
          </div>
        ))}
        {employees.length === 0 && <p style={{color: '#94a3b8'}}>No employees found. Add one above.</p>}
      </div>
    </div>
  );
}
