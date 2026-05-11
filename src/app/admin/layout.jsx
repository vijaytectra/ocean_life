import Link from 'next/link';
import styles from './admin.module.css';

export const metadata = {
  title: "Admin Dashboard - Ocean Lifespaces",
};

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Admin Panel</h2>
        <nav style={{ flex: 1 }}>
          <div className={styles.navItem}><Link href="/admin" className={styles.navLink}>Dashboard</Link></div>
          <div className={styles.navItem}><Link href="/admin/content" className={styles.navLink}>Site Content</Link></div>
          <div className={styles.navItem}><Link href="/admin/blogs" className={styles.navLink}>Blogs</Link></div>
          <div className={styles.navItem}><Link href="/admin/employees" className={styles.navLink}>Employees</Link></div>
        </nav>
        <Link href="/" className={styles.navLinkBack}>&larr; Exit to Website</Link>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
