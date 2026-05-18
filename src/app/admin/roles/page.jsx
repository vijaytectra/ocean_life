"use client";

import { useState, useEffect } from 'react';
import ConfirmModal from '@/components/admin/ConfirmModal';
import styles from '../admin.module.css';

const MODULES = [
  { id: 'blogs', name: 'Blogs' },
  { id: 'services', name: 'Services' },
  { id: 'team', name: 'Team Members' },
  { id: 'employees', name: 'Employees' },
  { id: 'enquiries', name: 'Enquiries' },
  { id: 'content', name: 'Site Content (Logos, Videos)' },
  { id: 'seo', name: 'SEO Config' },
  { id: 'users', name: 'Users & Roles' },
];

const DEFAULT_PERMISSIONS = MODULES.reduce((acc, mod) => {
  acc[mod.id] = { view: false, edit: false, delete: false };
  return acc;
}, {});

export default function AdminRoles() {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState(DEFAULT_PERMISSIONS);
  const [editingId, setEditingId] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, roleId: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const res = await fetch('/api/admin/roles');
    const data = await res.json();
    if (Array.isArray(data)) setRoles(data);
  };

  const handlePermissionChange = (moduleId, action) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [action]: !prev[moduleId][action]
      }
    }));
  };

  const toggleAllForModule = (moduleId, val) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: { view: val, edit: val, delete: val }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId ? `/api/admin/roles/${editingId}` : '/api/admin/roles';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          permissions: JSON.stringify(permissions) 
        })
      });

      if (res.ok) {
        setName('');
        setPermissions(DEFAULT_PERMISSIONS);
        setEditingId(null);
        fetchRoles();
      }
    } catch (error) {
      console.error("Save error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (role) => {
    setEditingId(role.id);
    setName(role.name);
    try {
      const parsed = role.permissions ? JSON.parse(role.permissions) : DEFAULT_PERMISSIONS;
      // Merge with default to handle new modules
      const merged = { ...DEFAULT_PERMISSIONS };
      Object.keys(parsed).forEach(k => {
        if (merged[k]) merged[k] = parsed[k];
      });
      setPermissions(merged);
    } catch {
      setPermissions(DEFAULT_PERMISSIONS);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setPermissions(DEFAULT_PERMISSIONS);
  };

  const handleDelete = async (id) => {
    setModal({ isOpen: true, roleId: id });
  };

  const confirmDelete = async () => {
    const id = modal.roleId;
    setModal({ isOpen: false, roleId: null });
    await fetch(`/api/admin/roles/${id}`, { method: 'DELETE' });
    if (editingId === id) handleCancelEdit();
    fetchRoles();
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Roles & Permissions</h2>
      </div>

      <div className={styles.formCard}>
        <h3 className={styles.cardTitle}>{editingId ? 'Edit Role' : 'Create New Role'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
              Role Name
            </label>
            <input 
              type="text" 
              placeholder="e.g. Content Editor, HR Manager, Blog Writer" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              className={styles.inputField} 
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '15px' }}>
              Module Permissions
            </label>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>Module</th>
                    <th style={{ padding: '12px 15px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>View</th>
                    <th style={{ padding: '12px 15px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>Edit/Add</th>
                    <th style={{ padding: '12px 15px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>Delete</th>
                    <th style={{ padding: '12px 15px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>Full Access</th>
                  </tr>
                </thead>
                <tbody>
                  {MODULES.map((mod) => {
                    const p = permissions[mod.id] || { view: false, edit: false, delete: false };
                    const allSelected = p.view && p.edit && p.delete;
                    return (
                      <tr key={mod.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 15px', fontWeight: '500', color: '#1e293b' }}>{mod.name}</td>
                        <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                          <input 
                            type="checkbox" 
                            checked={p.view} 
                            onChange={() => handlePermissionChange(mod.id, 'view')}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                          />
                        </td>
                        <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                          <input 
                            type="checkbox" 
                            checked={p.edit} 
                            onChange={() => handlePermissionChange(mod.id, 'edit')}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                          />
                        </td>
                        <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                          <input 
                            type="checkbox" 
                            checked={p.delete} 
                            onChange={() => handlePermissionChange(mod.id, 'delete')}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                          />
                        </td>
                        <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                          <button 
                            type="button"
                            onClick={() => toggleAllForModule(mod.id, !allSelected)}
                            style={{ 
                              background: allSelected ? '#e2e8f0' : 'transparent',
                              border: '1px solid #cbd5e1',
                              borderRadius: '4px',
                              padding: '2px 8px',
                              fontSize: '11px',
                              cursor: 'pointer',
                              color: '#475569'
                            }}
                          >
                            {allSelected ? 'Unselect' : 'All'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            {editingId && (
              <button 
                type="button" 
                onClick={handleCancelEdit} 
                className={styles.dangerButton}
                style={{ background: '#94a3b8', border: 'none' }}
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              className={styles.primaryButton}
              disabled={loading}
              style={{ paddingLeft: '40px', paddingRight: '40px' }}
            >
              {loading ? 'Saving...' : editingId ? 'Update Role' : 'Create Role'}
            </button>
          </div>
        </form>
      </div>

      <div className={styles.formCard} style={{ padding: 0, marginTop: '32px' }}>
        <div style={{ padding: '20px 25px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 className={styles.cardTitle} style={{ margin: 0 }}>Existing Roles</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '15px 25px', textAlign: 'left', width: '80px' }}>S.No</th>
              <th style={{ padding: '15px 25px', textAlign: 'left' }}>Role Name</th>
              <th style={{ padding: '15px 25px', textAlign: 'left' }}>Permissions Summary</th>
              <th style={{ padding: '15px 25px', textAlign: 'right', width: '180px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => {
              let summary = "No permissions";
              try {
                const p = JSON.parse(role.permissions || '{}');
                const accessible = Object.keys(p).filter(k => p[k].view);
                if (accessible.length > 0) {
                  summary = accessible.map(id => MODULES.find(m => m.id === id)?.name).filter(Boolean).join(', ');
                }
              } catch (e) {}

              return (
                <tr key={role.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '15px 25px' }}>{index + 1}</td>
                  <td style={{ padding: '15px 25px', fontWeight: '600', color: '#0f172a' }}>{role.name}</td>
                  <td style={{ padding: '15px 25px', fontSize: '13px', color: '#64748b' }}>
                    <div style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {summary}
                    </div>
                  </td>
                  <td style={{ padding: '15px 25px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleEdit(role)} 
                        className={styles.editButton} 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(role.id)} 
                        className={styles.dangerButton} 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {roles.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No roles defined. Start by creating one above.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal 
        isOpen={modal.isOpen}
        title="Delete Role?"
        message="Are you sure you want to delete this role? Any users assigned to this role may lose their permissions."
        onConfirm={confirmDelete}
        onCancel={() => setModal({ isOpen: false, roleId: null })}
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
