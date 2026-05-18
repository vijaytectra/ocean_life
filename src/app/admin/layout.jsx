"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoginPage) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [isLoginPage]);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/admin/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else if (res.status === 401) {
        router.push('/admin/login');
      }
    } catch (e) {
      console.error("Auth check failed", e);
    } finally {
      setLoading(false);
    }
  };

  const isActiveNav = (href) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinkClass = (href) =>
    `${styles.navLink}${isActiveNav(href) ? ` ${styles.navLinkActive}` : ''}`;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const hasPermission = (moduleId) => {
    if (!user) return false;
    // If no role assigned, we assume it's the master admin or default
    if (!user.role) return true; 
    // Super admin check by name (optional)
    if (user.role.name === 'Admin') return true;
    
    const perms = user.role.permissions;
    if (!perms) return false;
    
    return perms[moduleId]?.view === true;
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ color: '#64748b', fontSize: '18px', fontWeight: '500' }}>Loading Admin Panel...</div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Admin Panel</h2>
        <div style={{ padding: '0 20px 15px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '15px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>Logged in as:</p>
          <p style={{ margin: 0, fontSize: '14px', color: '#fff', fontWeight: '600' }}>{user?.name || user?.username}</p>
          <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#38bdf8' }}>{user?.role?.name || 'Full Access'}</p>
        </div>
        <nav style={{ flex: 1 }}>
          <div className={styles.navItem}>
            <Link href="/admin" className={navLinkClass('/admin')} aria-current={isActiveNav('/admin') ? 'page' : undefined}>
              Dashboard
            </Link>
          </div>
          
          {(hasPermission('content') || hasPermission('services') || hasPermission('blogs') || hasPermission('team') || hasPermission('clients')) && (
            <div className={styles.navSection}>Content Management</div>
          )}
          
          {hasPermission('content') && (
            <div className={styles.navItem}>
              <Link href="/admin/content" className={navLinkClass('/admin/content')} aria-current={isActiveNav('/admin/content') ? 'page' : undefined}>
                Main Content & Video
              </Link>
            </div>
          )}
          {hasPermission('services') && (
            <div className={styles.navItem}>
              <Link href="/admin/services" className={navLinkClass('/admin/services')} aria-current={isActiveNav('/admin/services') ? 'page' : undefined}>
                Services Management
              </Link>
            </div>
          )}
          {hasPermission('blogs') && (
            <div className={styles.navItem}>
              <Link href="/admin/blogs" className={navLinkClass('/admin/blogs')} aria-current={isActiveNav('/admin/blogs') ? 'page' : undefined}>
                Blogs & News
              </Link>
            </div>
          )}
          {hasPermission('team') && (
            <div className={styles.navItem}>
              <Link href="/admin/team" className={navLinkClass('/admin/team')} aria-current={isActiveNav('/admin/team') ? 'page' : undefined}>
                Management Team
              </Link>
            </div>
          )}
          {hasPermission('clients') && (
            <div className={styles.navItem}>
              <Link href="/admin/clients" className={navLinkClass('/admin/clients')} aria-current={isActiveNav('/admin/clients') ? 'page' : undefined}>
                Client Logos
              </Link>
            </div>
          )}
          
          {(hasPermission('users') || user?.role?.name === 'Admin') && (
            <>
              <div className={styles.navSection}>User & Security</div>
              <div className={styles.navItem}>
                <Link href="/admin/users" className={navLinkClass('/admin/users')} aria-current={isActiveNav('/admin/users') ? 'page' : undefined}>
                  User Management
                </Link>
              </div>
              <div className={styles.navItem}>
                <Link href="/admin/roles" className={navLinkClass('/admin/roles')} aria-current={isActiveNav('/admin/roles') ? 'page' : undefined}>
                  Roles & Permissions
                </Link>
              </div>
            </>
          )}
          
          {hasPermission('enquiries') && (
            <>
              <div className={styles.navSection}>Communications</div>
              <div className={styles.navItem}>
                <Link href="/admin/enquiries" className={navLinkClass('/admin/enquiries')} aria-current={isActiveNav('/admin/enquiries') ? 'page' : undefined}>
                  Enquiries & Forms
                </Link>
              </div>
            </>
          )}
          
          {(hasPermission('seo') || hasPermission('settings')) && (
            <div className={styles.navSection}>Global Settings</div>
          )}
          
          {hasPermission('seo') && (
            <div className={styles.navItem}>
              <Link href="/admin/seo" className={navLinkClass('/admin/seo')} aria-current={isActiveNav('/admin/seo') ? 'page' : undefined}>
                SEO Management
              </Link>
            </div>
          )}
          {hasPermission('settings') && (
            <div className={styles.navItem}>
              <Link href="/admin/settings" className={navLinkClass('/admin/settings')} aria-current={isActiveNav('/admin/settings') ? 'page' : undefined}>
                Site Settings
              </Link>
            </div>
          )}
        </nav>
        <div style={{ padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={handleLogout} className={styles.dangerButton} style={{ width: '100%' }}>Logout</button>
          <Link href="/" className={styles.navLinkBack}>&larr; Exit to Website</Link>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
