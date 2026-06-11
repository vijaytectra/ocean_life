"use client";

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import ConfirmModal from '@/components/admin/ConfirmModal';
import EnquiryDetailModal from './EnquiryDetailModal';

const STATUS_COLORS = {
  new: { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' },
  read: { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' },
  resolved: { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' }
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modal, setModal] = useState({ isOpen: false, id: null });
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const res = await fetch('/api/admin/enquiries');
    const data = await res.json();
    if (Array.isArray(data)) setEnquiries(data);
  };

  const handleUpdateStatus = async (id, status) => {
    await fetch(`/api/admin/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchEnquiries();
  };

  const handleDelete = (id) => {
    setModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    const id = modal.id;
    setModal({ isOpen: false, id: null });
    await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
    fetchEnquiries();
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesType = filter === 'All' || e.type === filter;
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter.toLowerCase();
    return matchesType && matchesStatus;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Enquiries & Form Submissions</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select 
            value={filter} 
            onChange={e => setFilter(e.target.value)} 
            className={styles.inputField} 
            style={{ width: '180px' }}
          >
            <option value="All">All Form Types</option>
            <option value="Contact">Contact Us</option>
            <option value="Careers">Careers</option>
            <option value="Enquiry">General Enquiry</option>
            <option value="Schedule Visit">Schedule a Visit</option>
            <option value="Joint Venture">Joint Venture</option>
          </select>
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)} 
            className={styles.inputField} 
            style={{ width: '150px' }}
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Read">Read</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className={styles.formCard} style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>Date</th>
              <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>Type</th>
              <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>Name</th>
              <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>Subject / Message</th>
              <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>Status</th>
              <th style={{ padding: '15px 20px', textAlign: 'right', fontSize: '13px', color: '#64748b' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.map((enquiry) => (
              <tr key={enquiry.id} style={{ borderBottom: '1px solid #f1f5f9', background: enquiry.status === 'new' ? '#fffbeb' : 'transparent' }}>
                <td style={{ padding: '15px 20px', fontSize: '13px', color: '#64748b' }}>
                  {new Date(enquiry.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '15px 20px' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 'bold', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    background: '#e0f2fe', 
                    color: '#0369a1',
                    textTransform: 'uppercase'
                  }}>
                    {enquiry.type}
                  </span>
                </td>
                <td style={{ padding: '15px 20px' }}>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>{enquiry.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{enquiry.email}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{enquiry.mobile}</div>
                </td>
                <td style={{ padding: '15px 20px', maxWidth: '300px' }}>
                  <div style={{ fontWeight: '500', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {enquiry.subject || 'No Subject'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {enquiry.message}
                  </div>
                </td>
                <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '6px', 
                    fontSize: '11px', 
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    background: STATUS_COLORS[enquiry.status]?.bg || '#f1f5f9',
                    color: STATUS_COLORS[enquiry.status]?.text || '#475569',
                    border: `1px solid ${STATUS_COLORS[enquiry.status]?.border || '#e2e8f0'}`
                  }}>
                    {enquiry.status}
                  </span>
                </td>
                <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => setSelectedEnquiry(enquiry)}
                      className={styles.editButton} 
                      style={{ padding: '6px 12px', fontSize: '11px' }}
                    >
                      View
                    </button>
                    {enquiry.status !== 'resolved' && (
                      <button 
                        onClick={() => handleUpdateStatus(enquiry.id, enquiry.status === 'new' ? 'read' : 'resolved')}
                        className={styles.primaryButton}
                        style={{ padding: '6px 12px', fontSize: '11px', background: enquiry.status === 'new' ? '#0ea5e9' : '#10b981', border: 'none' }}
                      >
                        {enquiry.status === 'new' ? 'Mark Read' : 'Resolve'}
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(enquiry.id)}
                      className={styles.dangerButton} 
                      style={{ padding: '6px 12px', fontSize: '11px' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEnquiries.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
                  No submissions found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedEnquiry && (
        <EnquiryDetailModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onMarkRead={() => {
            handleUpdateStatus(selectedEnquiry.id, 'read');
            setSelectedEnquiry(null);
          }}
          onMarkResolved={() => {
            handleUpdateStatus(selectedEnquiry.id, 'resolved');
            setSelectedEnquiry(null);
          }}
        />
      )}

      <ConfirmModal 
        isOpen={modal.isOpen}
        title="Delete Submission?"
        message="Are you sure you want to delete this form submission? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setModal({ isOpen: false, id: null })}
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
