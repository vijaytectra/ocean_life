"use client";

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import ImageCropper from '@/components/ImageCropper';
import styles from '../admin.module.css';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', image: '', metaTitle: '', metaDesc: '', status: 'Published' });
  const [showCropper, setShowCropper] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    if (Array.isArray(data)) setBlogs(data);
  };

  const handleDocxUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !window.mammoth) return;
    
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      const result = await window.mammoth.convertToHtml({ arrayBuffer });
      if (window.tinymce && window.tinymce.activeEditor) {
        window.tinymce.activeEditor.setContent(result.value);
      }
      setFormData(prev => ({ ...prev, content: result.value }));
      setIsUploading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = window.tinymce ? window.tinymce.activeEditor.getContent() : formData.content;
    const dataToSend = { ...formData, content };

    const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    });

    setFormData({ title: '', content: '', image: '', metaTitle: '', metaDesc: '', status: 'Published' });
    if (window.tinymce && window.tinymce.activeEditor) window.tinymce.activeEditor.setContent('');
    setEditingId(null);
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    if (confirm('Delete this blog?')) {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    }
  };

  const editBlog = (blog) => {
    setEditingId(blog.id);
    setFormData(blog);
    if (window.tinymce && window.tinymce.activeEditor) {
      window.tinymce.activeEditor.setContent(blog.content || '');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.adminContainer}>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js" 
        strategy="afterInteractive"
      />
      <Script 
        src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" 
        referrerPolicy="origin"
        onLoad={() => {
          window.tinymce.init({
            selector: '#blog-editor',
            height: 500,
            plugins: 'link image lists table code help wordcount',
            toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | code help',
            setup: (editor) => {
              editor.on('change', () => {
                setFormData(prev => ({ ...prev, content: editor.getContent() }));
              });
            }
          });
        }}
      />

      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Blogs & News Management</h2>
      </div>

      <div className={styles.formCard}>
        <h3 className={styles.cardTitle}>{editingId ? 'Edit Post' : 'Create New Post'}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className={styles.inputField} />
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className={styles.inputField}>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
            <input type="text" placeholder="SEO Meta Title" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} className={styles.inputField} />
            <input type="text" placeholder="SEO Meta Description" value={formData.metaDesc} onChange={e => setFormData({...formData, metaDesc: e.target.value})} className={styles.inputField} />
          </div>

          <div style={{ margin: '20px 0' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 'bold' }}>
              Import from Word Document (.docx)
            </label>
            <input type="file" accept=".docx" onChange={handleDocxUpload} className={styles.inputField} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 'bold' }}>Content</label>
            <textarea id="blog-editor" defaultValue={formData.content}></textarea>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            {formData.image && <img src={formData.image} alt="Preview" style={{ width: '200px', borderRadius: '8px', marginBottom: '10px' }} />}
            <button type="button" onClick={() => setShowCropper(true)} className={styles.editButton}>
              {formData.image ? 'Change Banner' : 'Upload Banner'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className={styles.primaryButton}>{editingId ? 'Update Post' : 'Publish Post'}</button>
            {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', content: '', image: '', metaTitle: '', metaDesc: '', status: 'Published' }); if(window.tinymce) window.tinymce.activeEditor.setContent(''); }} className={styles.dangerButton}>Cancel</button>}
          </div>
        </form>

        {showCropper && (
          <ImageCropper 
            onImageCropped={(url) => { setFormData({...formData, image: url}); setShowCropper(false); }} 
            onCancel={() => setShowCropper(false)} 
          />
        )}
      </div>

      <div className={styles.listSection} style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 className={styles.cardTitle}>Recent Posts</h3>
          <input type="text" placeholder="Search blogs..." value={search} onChange={e => setSearch(e.target.value)} className={styles.inputField} style={{ width: '300px' }} />
        </div>
        <div className={styles.tableResponsive}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Banner</th>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase())).map(blog => (
                <tr key={blog.id}>
                  <td><img src={blog.image || '/placeholder.jpg'} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} alt="" /></td>
                  <td>{blog.title}</td>
                  <td><span className={styles.statusBadge}>{blog.status}</span></td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className={styles.actions}>
                    <button onClick={() => editBlog(blog)} className={styles.editButton}>Edit</button>
                    <button onClick={() => deleteBlog(blog.id)} className={styles.dangerButton}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
