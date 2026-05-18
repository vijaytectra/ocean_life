"use client";

import { useState, useEffect } from 'react';
import ConfirmModal from '@/components/admin/ConfirmModal';
import styles from '../admin.module.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ 
    username: '', password: '', name: '', email: '', mobile: '', roleId: '', status: 'active' 
  });
  const [modal, setModal] = useState({ isOpen: false, userId: null });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    if (Array.isArray(data)) setUsers(data);
  };

  const fetchRoles = async () => {
    const res = await fetch('/api/admin/roles');
    const data = await res.json();
    if (Array.isArray(data)) setRoles(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ username: '', password: '', name: '', email: '', mobile: '', roleId: '', status: 'active' });
    setIsCreating(false);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    setModal({ isOpen: true, userId: id });
  };

  const confirmDelete = async () => {
    const id = modal.userId;
    setModal({ isOpen: false, userId: null });
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>User Management</h2>
        <button onClick={() => setIsCreating(!isCreating)} className={styles.primaryButton}>
          {isCreating ? 'Cancel' : 'Add New User'}
        </button>
      </div>

      {isCreating && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input type="text" placeholder="Username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required className={styles.inputField} />
              <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required className={styles.inputField} />
              <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={styles.inputField} />
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={styles.inputField} />
              <input type="text" placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className={styles.inputField} />
              <select value={formData.roleId} onChange={e => setFormData({...formData, roleId: e.target.value})} className={styles.inputField}>
                <option value="">Select Role</option>
                {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
              </select>
            </div>
            <button type="submit" className={styles.primaryButton} style={{ alignSelf: 'flex-start' }}>Save User</button>
          </form>
        </div>
      )}

      <div className={styles.formCard} style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Role</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Mobile</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '15px' }}>{user.name || user.username}</td>
                <td style={{ padding: '15px' }}>{user.role?.name || 'N/A'}</td>
                <td style={{ padding: '15px' }}>{user.email || 'N/A'}</td>
                <td style={{ padding: '15px' }}>{user.mobile || 'N/A'}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem',
                    background: user.status === 'active' ? '#dcfce7' : '#fee2e2',
                    color: user.status === 'active' ? '#166534' : '#991b1b'
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => handleDelete(user.id)} className={styles.dangerButton} style={{ padding: '5px 10px', fontSize: '0.8rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal 
        isOpen={modal.isOpen}
        title="Delete User?"
        message="Are you sure you want to delete this user? This will permanently remove their access."
        onConfirm={confirmDelete}
        onCancel={() => setModal({ isOpen: false, userId: null })}
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
