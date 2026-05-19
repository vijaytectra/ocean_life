"use client";

import { useState, useEffect } from 'react';
import styles from './admin.module.css';
import Link from 'next/link';
import { FaEdit, FaBlog, FaUsers, FaCheckCircle, FaProjectDiagram } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ 
    content: 0, 
    blogs: 0, 
    employees: 0,
    users: 0,
    enquiries: 0,
    services: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contentRes, blogsRes, empRes, userRes, enqRes, serRes] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/blogs'),
          fetch('/api/employees/'),
          fetch('/api/admin/users'),
          fetch('/api/admin/enquiries'),
          fetch('/api/admin/services')
        ]);
        const content = await contentRes.json();
        const blogs = await blogsRes.json();
        const employees = await empRes.json();
        const users = await userRes.json();
        const enquiries = await enqRes.json();
        const services = await serRes.json();

        setStats({
          content: Array.isArray(content) ? content.length : 0,
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          employees: Array.isArray(employees) ? employees.length : 0,
          users: Array.isArray(users) ? users.length : 0,
          enquiries: Array.isArray(enquiries) ? enquiries.length : 0,
          services: Array.isArray(services) ? services.length : 0
        });
      } catch (e) {
        console.error("Failed to fetch stats", e);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      </div>
      
      <div className={styles.grid}>
        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <FaBlog size={24} color="var(--color-orange)" />
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Blogs & News</h3>
          </div>
          <p className={styles.cardDescription}>Total articles published on the site.</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{stats.blogs}</span>
            <Link href="/admin/blogs" className={styles.primaryButton} style={{ padding: '8px 15px', textDecoration: 'none' }}>Manage</Link>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <FaUsers size={24} color="var(--color-orange)" />
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>System Users</h3>
          </div>
          <p className={styles.cardDescription}>Admins and editors with panel access.</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{stats.users}</span>
            <Link href="/admin/users" className={styles.primaryButton} style={{ padding: '8px 15px', textDecoration: 'none' }}>Manage</Link>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <FaProjectDiagram size={24} color="var(--color-orange)" />
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Inquiries</h3>
          </div>
          <p className={styles.cardDescription}>New form submissions from the website.</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{stats.enquiries}</span>
            <Link href="/admin/enquiries" className={styles.primaryButton} style={{ padding: '8px 15px', textDecoration: 'none' }}>View All</Link>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <FaCheckCircle size={24} color="var(--color-orange)" />
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Services</h3>
          </div>
          <p className={styles.cardDescription}>Core service offerings and projects.</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{stats.services}</span>
            <Link href="/admin/services" className={styles.primaryButton} style={{ padding: '8px 15px', textDecoration: 'none' }}>Manage</Link>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <FaUsers size={24} color="var(--color-orange)" />
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Management Team</h3>
          </div>
          <p className={styles.cardDescription}>Company leadership and staff profiles.</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{stats.employees}</span>
            <Link href="/admin/team" className={styles.primaryButton} style={{ padding: '8px 15px', textDecoration: 'none' }}>Manage</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
