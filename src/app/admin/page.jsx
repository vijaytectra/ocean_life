import styles from './admin.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Global Site Content</h3>
          <p className={styles.cardDescription}>Manage the dynamic text and images across all your website pages including the Homepage, About Us, and more.</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Blogs Management</h3>
          <p className={styles.cardDescription}>Create, edit, and crop images for all your recent news and events articles.</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Team & Employees</h3>
          <p className={styles.cardDescription}>Keep your company's leadership and team profiles up to date with fresh cropped profile pictures.</p>
        </div>
      </div>
    </div>
  );
}
