"use client";

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const res = await fetch('/api/admin/enquiries');
    const data = await res.json();
    if (Array.isArray(data)) setEnquiries(data);
  };

  const filteredEnquiries = filter === 'All' 
    ? enquiries 
    : enquiries.filter(e => e.type === filter);

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Enquiries & Form Submissions</h2>
        <select value={filter} onChange={e => setFilter(e.target.value)} className={styles.inputField} style={{ width: '200px' }}>
          <option value="All">All Types</option>
          <option value="Contact">Contact Us</option>
          <option value="Careers">Careers</option>
          <option value="Enquiry">General Enquiry</option>
          <option value="Schedule Visit">Schedule a Visit</option>
          <option value="Joint Venture">Joint Venture</option>
        </select>
      </div>

      <div className={styles.grid}>
        {filteredEnquiries.map(enquiry => (
          <div key={enquiry.id} className={styles.card} style={{ borderLeft: '5px solid var(--color-orange)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-orange)', textTransform: 'uppercase' }}>{enquiry.type}</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
            </div>
            <h3 className={styles.cardTitle} style={{ fontSize: '1.1rem' }}>{enquiry.name}</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}><strong>Email:</strong> {enquiry.email}</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Mobile:</strong> {enquiry.mobile || 'N/A'}</p>
            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>
              "{enquiry.message || 'No message provided.'}"
            </div>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <button className={styles.editButton} style={{ flex: 1, fontSize: '0.8rem' }}>Mark as Read</button>
              <button className={styles.dangerButton} style={{ fontSize: '0.8rem' }}>Delete</button>
            </div>
          </div>
        ))}
        {filteredEnquiries.length === 0 && (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#64748b' }}>No enquiries found for this category.</p>
        )}
      </div>
    </div>
  );
}
