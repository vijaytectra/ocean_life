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
    ongoing: 0,
    completed: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contentRes, blogsRes, empRes] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/blogs'),
          fetch('/api/employees')
        ]);
        const content = await contentRes.json();
        const blogs = await blogsRes.json();
        const employees = await empRes.json();

        const findVal = (key) => {
          const item = content.find(i => i.id === key);
          return item ? item.value : '0';
        };

        setStats({
          content: Array.isArray(content) ? content.length : 0,
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          employees: Array.isArray(employees) ? employees.length : 0,
          ongoing: findVal('counter-ongoing'),
          completed: findVal('counter-projects') // This is mapped to "Client Return Rate" or Projects in your UI
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
            <FaEdit size={24} color="var(--color-orange)" />
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Site Content</h3>
          </div>
          <p className={styles.cardDescription}>Manage the dynamic text and images across all your website pages.</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{stats.content}</span>
            <Link href="/admin/content" className={styles.primaryButton} style={{ padding: '8px 15px', textDecoration: 'none' }}>Manage</Link>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <FaBlog size={24} color="var(--color-orange)" />
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Blogs</h3>
          </div>
          <p className={styles.cardDescription}>Create and edit your recent news and events articles.</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{stats.blogs}</span>
            <Link href="/admin/blogs" className={styles.primaryButton} style={{ padding: '8px 15px', textDecoration: 'none' }}>Manage</Link>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <FaUsers size={24} color="var(--color-orange)" />
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Team</h3>
          </div>
          <p className={styles.cardDescription}>Manage your company's leadership and team profiles.</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{stats.employees}</span>
            <Link href="/admin/employees" className={styles.primaryButton} style={{ padding: '8px 15px', textDecoration: 'none' }}>Manage</Link>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <FaProjectDiagram size={24} color="var(--color-orange)" />
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Ongoing Projects</h3>
          </div>
          <p className={styles.cardDescription}>Live counter shown on the homepage.</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{stats.ongoing}</span>
            <Link href="/admin/content" className={styles.primaryButton} style={{ padding: '8px 15px', textDecoration: 'none' }}>Update</Link>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <FaCheckCircle size={24} color="var(--color-orange)" />
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>Completed Projects</h3>
          </div>
          <p className={styles.cardDescription}>Total projects count shown on homepage.</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{stats.completed}</span>
            <Link href="/admin/content" className={styles.primaryButton} style={{ padding: '8px 15px', textDecoration: 'none' }}>Update</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
