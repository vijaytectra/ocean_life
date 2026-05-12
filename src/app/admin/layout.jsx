"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Admin Panel</h2>
        <nav style={{ flex: 1, overflowY: 'auto' }}>
          <div className={styles.navItem}><Link href="/admin" className={styles.navLink}>Dashboard</Link></div>
          
          <div className={styles.navSection}>Content Management</div>
          <div className={styles.navItem}><Link href="/admin/content" className={styles.navLink}>Main Content & Video</Link></div>
          <div className={styles.navItem}><Link href="/admin/services" className={styles.navLink}>Services Management</Link></div>
          <div className={styles.navItem}><Link href="/admin/blogs" className={styles.navLink}>Blogs & News</Link></div>
          <div className={styles.navItem}><Link href="/admin/team" className={styles.navLink}>Management Team</Link></div>
          <div className={styles.navItem}><Link href="/admin/clients" className={styles.navLink}>Client Logos</Link></div>
          
          <div className={styles.navSection}>User & Security</div>
          <div className={styles.navItem}><Link href="/admin/users" className={styles.navLink}>User Management</Link></div>
          <div className={styles.navItem}><Link href="/admin/roles" className={styles.navLink}>Roles & Permissions</Link></div>
          
          <div className={styles.navSection}>Communications</div>
          <div className={styles.navItem}><Link href="/admin/enquiries" className={styles.navLink}>Enquiries & Forms</Link></div>
          
          <div className={styles.navSection}>Global Settings</div>
          <div className={styles.navItem}><Link href="/admin/seo" className={styles.navLink}>SEO Management</Link></div>
          <div className={styles.navItem}><Link href="/admin/settings" className={styles.navLink}>Site Settings</Link></div>
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
