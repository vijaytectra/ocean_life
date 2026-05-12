"use client";

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminRoles() {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const res = await fetch('/api/admin/roles');
    const data = await res.json();
    if (Array.isArray(data)) setRoles(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    setName('');
    fetchRoles();
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure?")) return;
    await fetch(`/api/admin/roles/${id}`, { method: 'DELETE' });
    fetchRoles();
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Roles & Permissions</h2>
      </div>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Role Name (e.g. Admin, Editor)" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            className={styles.inputField} 
            style={{ flex: 1 }}
          />
          <button type="submit" className={styles.primaryButton}>Add Role</button>
        </form>
      </div>

      <div className={styles.formCard} style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '15px', textAlign: 'left', width: '80px' }}>S.No</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Role Name</th>
              <th style={{ padding: '15px', textAlign: 'left', width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={role.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '15px' }}>{index + 1}</td>
                <td style={{ padding: '15px' }}>{role.name}</td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => handleDelete(role.id)} className={styles.dangerButton} style={{ padding: '5px 10px', fontSize: '0.8rem' }}>Delete</button>
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan="3" style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>No roles defined.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
