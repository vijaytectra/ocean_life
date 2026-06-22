"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Script from "next/script";
import ImageCropper from "@/components/ImageCropper";
import ConfirmModal from "@/components/admin/ConfirmModal";
import styles from "../admin.module.css";
import blogStyles from "./blogsAdmin.module.css";
import { resolveBlogImageUrl } from "@/lib/blogImage";
import { slugifyBlog, blogPublicPath } from "@/lib/blogSlug";

const TINYMCE_VERSION = "6.8.3";
const TINYMCE_CDN_BASE = `https://cdn.jsdelivr.net/npm/tinymce@${TINYMCE_VERSION}`;
const BANNER_FALLBACK = "/foot-logo.svg";

const tinymceCloudKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY?.trim();

function resolveBannerSrc(url) {
  if (!url || typeof url !== "string" || !url.trim()) return BANNER_FALLBACK;
  return resolveBlogImageUrl(url);
}

function normalizeStatusForForm(status) {
  if (!status || typeof status !== "string") return "Published";
  return status.toLowerCase() === "draft" ? "Draft" : "Published";
}

function BlogThumb({ src }) {
  const [imgSrc, setImgSrc] = useState(() => resolveBannerSrc(src));

  useEffect(() => {
    setImgSrc(resolveBannerSrc(src));
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt=""
      className={blogStyles.postThumb}
      loading="lazy"
      decoding="async"
      onError={() => setImgSrc(BANNER_FALLBACK)}
    />
  );
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    image: "",
    metaTitle: "",
    metaDesc: "",
    status: "Published",
  });
  const [slugTouched, setSlugTouched] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [plainEditorFallback, setPlainEditorFallback] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, blogId: null });
  const tinymceInitOnce = useRef(false);

  const tinymceScriptSrc = tinymceCloudKey
    ? `https://cdn.tiny.cloud/1/${tinymceCloudKey}/tinymce/6/tinymce.min.js`
    : `${TINYMCE_CDN_BASE}/tinymce.min.js`;

  const getEditorHtml = useCallback(() => {
    if (typeof window === "undefined") return formData.content;
    const editor = window.tinymce?.get?.("blog-editor");
    if (editor && !editor.removed) return editor.getContent();
    return formData.content;
  }, [formData.content]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    return () => {
      const editor = typeof window !== "undefined" ? window.tinymce?.get?.("blog-editor") : null;
      if (editor && !editor.removed) {
        try {
          editor.remove();
        } catch {
          /* ignore */
        }
      }
      setEditorReady(false);
      tinymceInitOnce.current = false;
    };
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs/", { cache: "no-store", credentials: "include" });
    const data = await res.json();
    if (Array.isArray(data)) setBlogs(data);
  };

  const initTinyMce = useCallback(() => {
    if (typeof window === "undefined" || !window.tinymce || plainEditorFallback) return;
    if (tinymceInitOnce.current) return;
    tinymceInitOnce.current = true;

    const existing = window.tinymce.get?.("blog-editor");
    if (existing && !existing.removed) {
      try {
        existing.remove();
      } catch {
        /* ignore */
      }
    }

    const initConfig = {
      selector: "#blog-editor",
      height: 520,
      menubar: false,
      branding: false,
      promotion: false,
      plugins: "link image lists table code help wordcount",
      toolbar:
        "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | code help",
      init_instance_callback: (editor) => {
        setEditorReady(true);
        const sync = () => {
          setFormData((prev) => ({ ...prev, content: editor.getContent() }));
        };
        editor.on("change keyup Undo Redo", sync);
      },
    };

    if (!tinymceCloudKey) {
      initConfig.base_url = TINYMCE_CDN_BASE;
      initConfig.suffix = ".min";
    }

    window.tinymce.init(initConfig);
  }, [plainEditorFallback]);

  useLayoutEffect(() => {
    if (plainEditorFallback) return;
    if (typeof window === "undefined" || !window.tinymce?.init) return;
    initTinyMce();
  }, [plainEditorFallback, initTinyMce]);

  const handleDocxUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || typeof window === "undefined" || !window.mammoth) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result;
        const result = await window.mammoth.convertToHtml({ arrayBuffer });
        const html = result.value || "";
        setFormData((prev) => ({ ...prev, content: html }));
        const editor = window.tinymce?.get?.("blog-editor");
        if (editor && !editor.removed) editor.setContent(html);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = getEditorHtml();
    const payload = { ...formData, content };

    const url = editingId ? `/api/blogs/${editingId}` : "/api/blogs";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const empty = {
      title: "",
      slug: "",
      content: "",
      image: "",
      metaTitle: "",
      metaDesc: "",
      status: "Published",
    };
    setFormData(empty);
    setSlugTouched(false);
    const editor = typeof window !== "undefined" ? window.tinymce?.get?.("blog-editor") : null;
    if (editor && !editor.removed) editor.setContent("");
    setEditingId(null);
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    setModal({ isOpen: true, blogId: id });
  };

  const confirmDelete = async () => {
    const id = modal.blogId;
    setModal({ isOpen: false, blogId: null });
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  const editBlog = (blog) => {
    setEditingId(blog.id);
    setSlugTouched(Boolean(blog.slug));
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      content: blog.content || "",
      image: blog.image || "",
      metaTitle: blog.metaTitle || "",
      metaDesc: blog.metaDesc || "",
      status: normalizeStatusForForm(blog.status),
    });
    queueMicrotask(() => {
      const editor = typeof window !== "undefined" ? window.tinymce?.get?.("blog-editor") : null;
      if (editor && !editor.removed) editor.setContent(blog.content || "");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSlugTouched(false);
    setFormData({
      title: "",
      slug: "",
      content: "",
      image: "",
      metaTitle: "",
      metaDesc: "",
      status: "Published",
    });
    const editor = typeof window !== "undefined" ? window.tinymce?.get?.("blog-editor") : null;
    if (editor && !editor.removed) editor.setContent("");
  };

  const filtered = blogs.filter((b) => {
    const q = search.toLowerCase();
    return (
      (b.title || "").toLowerCase().includes(q) ||
      (b.slug || "").toLowerCase().includes(q)
    );
  });

  const handleTitleChange = (title) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: slugTouched ? prev.slug : slugifyBlog(title),
    }));
  };

  return (
    <div className={blogStyles.page}>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js" strategy="afterInteractive" />
      {!plainEditorFallback && (
        <Script
          src={tinymceScriptSrc}
          referrerPolicy="origin"
          strategy="afterInteractive"
          onLoad={initTinyMce}
          onError={() => {
            setPlainEditorFallback(true);
            tinymceInitOnce.current = false;
            setEditorReady(false);
          }}
        />
      )}

      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Blogs & News Management</h2>
      </div>

      {!tinymceCloudKey && !plainEditorFallback ? (
        <p className={blogStyles.editorNote}>
          Rich text editor loads from Tiny&apos;s open-source package on jsDelivr (no API key). For Tiny Cloud features, add{" "}
          <code>NEXT_PUBLIC_TINYMCE_API_KEY</code> to <code>.env</code> from{" "}
          <a href="https://www.tiny.cloud/" target="_blank" rel="noopener noreferrer">
            tiny.cloud
          </a>
          .
        </p>
      ) : null}

      {plainEditorFallback ? (
        <p className={blogStyles.editorNote} role="status">
          TinyMCE could not load from the network. Using a plain HTML textarea — you can paste HTML from Word or other tools.
        </p>
      ) : null}

      <div className={styles.formCard}>
        <h3 className={styles.cardTitle}>{editingId ? "Edit Post" : "Create New Post"}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.inputWrapper}>
              <label className={blogStyles.docLabel}>Post Title</label>
              <input
                type="text"
                placeholder="Enter a catchy title..."
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                className={styles.inputField}
                style={{ width: '100%' }}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label className={blogStyles.docLabel}>URL Slug</label>
              <input
                type="text"
                placeholder="my-blog-post"
                value={formData.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setFormData({ ...formData, slug: slugifyBlog(e.target.value) });
                }}
                className={styles.inputField}
                style={{ width: '100%' }}
              />
              <p className={blogStyles.slugHint}>
                Public URL:{" "}
                <code>
                  {blogPublicPath({ slug: formData.slug || slugifyBlog(formData.title) || "your-slug" })}
                </code>
              </p>
            </div>
            <div className={styles.inputWrapper}>
              <label className={blogStyles.docLabel}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={styles.inputField}
                style={{ width: '100%' }}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div className={styles.inputWrapper}>
              <label className={blogStyles.docLabel}>SEO Meta Title</label>
              <input
                type="text"
                placeholder="Meta title for search engines"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className={styles.inputField}
                style={{ width: '100%' }}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label className={blogStyles.docLabel}>SEO Meta Description</label>
              <input
                type="text"
                placeholder="Short description for search results"
                value={formData.metaDesc}
                onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })}
                className={styles.inputField}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div className={blogStyles.importSection}>
            <div className={blogStyles.docRow}>
              <label className={blogStyles.docLabel}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Import from Word Document (.docx)
                </span>
              </label>
              <input type="file" accept=".docx" onChange={handleDocxUpload} className={styles.inputField} disabled={isUploading} style={{ fontSize: '13px' }} />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label className={blogStyles.contentLabel} htmlFor="blog-editor">
              Content
            </label>
            <textarea
              id="blog-editor"
              className={`${blogStyles.textareaFallback} ${
                editorReady && !plainEditorFallback ? blogStyles.textareaHidden : ""
              }`}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              readOnly={editorReady && !plainEditorFallback}
            />
          </div>

          <div className={blogStyles.bannerRow}>
            {formData.image ? (
              <img
                src={resolveBannerSrc(formData.image)}
                alt=""
                className={blogStyles.bannerPreview}
                onError={(e) => {
                  e.currentTarget.src = BANNER_FALLBACK;
                }}
              />
            ) : null}
            <button type="button" onClick={() => setShowCropper(true)} className={styles.editButton}>
              {formData.image ? "Change banner" : "Upload banner"}
            </button>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button type="submit" className={styles.primaryButton}>
              {editingId ? "Update post" : "Publish post"}
            </button>
            {editingId ? (
              <button type="button" onClick={cancelEdit} className={styles.dangerButton}>
                Cancel edit
              </button>
            ) : null}
          </div>
        </form>
      </div>

      {showCropper ? (
        <div
          className={blogStyles.cropOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Crop banner image"
          onMouseDown={(e) => e.target === e.currentTarget && setShowCropper(false)}
        >
          <div className={blogStyles.cropDialog} onMouseDown={(e) => e.stopPropagation()}>
            <ImageCropper
              freeAspect
              onImageCropped={(url) => {
                setFormData((prev) => ({ ...prev, image: url }));
                setShowCropper(false);
              }}
              onCancel={() => setShowCropper(false)}
            />
          </div>
        </div>
      ) : null}

      <section>
        <div className={blogStyles.postsHeader}>
          <h3 className={styles.cardTitle} style={{ margin: 0 }}>
            Recent posts
          </h3>
          <input
            type="search"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${styles.inputField} ${blogStyles.searchInput}`}
            aria-label="Search blog posts"
          />
        </div>

        <div className={blogStyles.postsGrid}>
          {filtered.map((blog) => (
            <article key={blog.id} className={blogStyles.postCard}>
              <div className={blogStyles.postMedia}>
                <BlogThumb src={blog.image} />
              </div>
              <div className={blogStyles.postBody}>
                <h4 className={blogStyles.postTitle}>{blog.title}</h4>
                {blog.slug ? (
                  <p className={blogStyles.postSlug}>
                    <code>{blogPublicPath(blog)}</code>
                  </p>
                ) : null}
                <div className={blogStyles.postMeta}>
                  <span
                    className={`${blogStyles.statusPill} ${
                      (blog.status || "").toLowerCase() === "draft" ? blogStyles.statusPillDraft : ""
                    }`}
                  >
                    {normalizeStatusForForm(blog.status)}
                  </span>
                  <time dateTime={blog.createdAt}>{new Date(blog.createdAt).toLocaleDateString()}</time>
                </div>
                <div className={blogStyles.postActions}>
                  <button type="button" onClick={() => editBlog(blog)} className={styles.editButton}>
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteBlog(blog.id)} className={styles.dangerButton}>
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ConfirmModal 
        isOpen={modal.isOpen}
        title="Delete Blog Post?"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setModal({ isOpen: false, blogId: null })}
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
