"use client";

import { useState, useEffect } from 'react';
import ImageCropper from '@/components/ImageCropper';
import styles from '../admin.module.css';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', image: '' });
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    if (Array.isArray(data)) setBlogs(data);
  };

  const handleImageCropped = (url) => {
    setFormData({ ...formData, image: url });
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ title: '', content: '', image: '' });
    setIsCreating(false);
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure?")) return;
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    fetchBlogs();
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Manage Blogs</h2>
        <button onClick={() => setIsCreating(!isCreating)} className={isCreating ? styles.dangerButton : styles.primaryButton}>
          {isCreating ? 'Cancel' : 'Create New'}
        </button>
      </div>

      {isCreating && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <input type="text" placeholder="Blog Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className={styles.inputField} />
            <textarea placeholder="Blog Content" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required rows={5} className={styles.inputField} />
            
            {showCropper ? (
              <ImageCropper onImageCropped={handleImageCropped} onCancel={() => setShowCropper(false)} />
            ) : (
              <div>
                <button type="button" onClick={() => setShowCropper(true)} className={styles.editButton}>
                  {formData.image ? 'Change Banner Image' : 'Upload Banner Image'}
                </button>
                {formData.image && <img src={formData.image} alt="Preview" style={{ display: 'block', marginTop: '15px', maxHeight: '200px', borderRadius: '8px' }} />}
              </div>
            )}
            
            <button type="submit" className={styles.primaryButton} style={{ alignSelf: 'flex-start', marginTop: '10px' }}>Save Blog Post</button>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {blogs.map(blog => (
          <div key={blog.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{blog.title}</h3>
            <p className={styles.cardDescription}>{blog.content.substring(0, 100)}...</p>
            {blog.image && <img src={blog.image} alt={blog.title} className={styles.cardImage} />}
            <div className={styles.cardActions}>
              <button onClick={() => handleDelete(blog.id)} className={styles.dangerButton}>Delete</button>
            </div>
          </div>
        ))}
        {blogs.length === 0 && <p style={{color: '#94a3b8'}}>No blogs found. Create one above.</p>}
      </div>
    </div>
  );
}
