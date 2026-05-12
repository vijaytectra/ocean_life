"use client";

import { useState, useEffect } from 'react';
import ImageCropper from '@/components/ImageCropper';
import styles from '../admin.module.css';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', content: '', image: '', status: 'published', metaTitle: '', metaDesc: '' 
  });
  const [showCropper, setShowCropper] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

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
    if (editingId) {
      await fetch(`/api/blogs/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setEditingId(null);
    } else {
      await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    }
    setFormData({ title: '', content: '', image: '', status: 'published', metaTitle: '', metaDesc: '' });
    setIsCreating(false);
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure?")) return;
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    fetchBlogs();
  };

  const startEdit = (blog) => {
    setFormData({ 
      title: blog.title, 
      content: blog.content, 
      image: blog.image || '', 
      status: blog.status || 'published',
      metaTitle: blog.metaTitle || '',
      metaDesc: blog.metaDesc || ''
    });
    setEditingId(blog.id);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Blogs & News</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Search events..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className={styles.inputField} 
            style={{ width: '250px', padding: '8px 15px' }} 
          />
          <button onClick={() => {
            setIsCreating(!isCreating);
            setEditingId(null);
            setFormData({ title: '', content: '', image: '', status: 'published', metaTitle: '', metaDesc: '' });
          }} className={styles.primaryButton}>
            {isCreating ? 'Cancel' : 'Add News'}
          </button>
        </div>
      </div>

      {isCreating && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input type="text" placeholder="Blog Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className={styles.inputField} />
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className={styles.inputField}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <input type="text" placeholder="SEO Meta Title" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} className={styles.inputField} />
              <input type="text" placeholder="SEO Meta Description" value={formData.metaDesc} onChange={e => setFormData({...formData, metaDesc: e.target.value})} className={styles.inputField} />
            </div>
            <textarea placeholder="Blog Content" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required rows={5} className={styles.inputField} />
            
            {showCropper ? (
              <ImageCropper onImageCropped={handleImageCropped} onCancel={() => setShowCropper(false)} />
            ) : (
              <div>
                <button type="button" onClick={() => setShowCropper(true)} className={styles.editButton}>
                  {formData.image ? 'Change Banner' : 'Upload Banner'}
                </button>
                {formData.image && <img src={formData.image} alt="Preview" style={{ display: 'block', marginTop: '15px', maxHeight: '150px', borderRadius: '8px' }} />}
              </div>
            )}
            
            <button type="submit" className={styles.primaryButton} style={{ alignSelf: 'flex-start' }}>
              {editingId ? 'Update News' : 'Save News'}
            </button>
          </form>
        </div>
      )}

      <div className={styles.formCard} style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '15px', textAlign: 'left', width: '60px' }}>S.No</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Title</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Banner</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>SEO Setup</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog, index) => (
              <tr key={blog.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '15px' }}>{index + 1}</td>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{blog.title}</td>
                <td style={{ padding: '15px' }}>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem',
                    background: blog.status === 'published' ? '#dcfce7' : '#fef9c3',
                    color: blog.status === 'published' ? '#166534' : '#854d0e'
                  }}>
                    {blog.status}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  {blog.image ? <img src={blog.image} alt="thumb" style={{ width: '50px', height: '30px', objectFit: 'cover', borderRadius: '4px' }} /> : 'None'}
                </td>
                <td style={{ padding: '15px' }}>
                  <span style={{ fontSize: '0.8rem', color: blog.metaTitle ? '#10b981' : '#f59e0b' }}>
                    {blog.metaTitle ? '✅ Configured' : '⚠️ Missing'}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button onClick={() => startEdit(blog)} className={styles.editButton} style={{ padding: '5px 10px', fontSize: '0.75rem' }}>Edit</button>
                    <button onClick={() => handleDelete(blog.id)} className={styles.dangerButton} style={{ padding: '5px 10px', fontSize: '0.75rem' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
