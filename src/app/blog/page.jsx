import BlogsUpdates from "@/components/BlogsUpdates";
import { listPublishedBlogs } from "@/lib/blogData";
import styles from "./blog.module.css";

export const metadata = {
  title: "Blog | Ocean Lifespaces India Pvt Ltd",
  description:
    "Explore our latest blog posts and updates on civil construction, architecture, and design. Stay informed with Ocean Lifespaces India Pvt Ltd.",
  keywords: "Ocean Lifespaces India Pvt Ltd",
  alternates: {
    canonical: "https://www.olipl.com/blog/",
  },
};

export default async function BlogPage() {
  const blogs = await listPublishedBlogs();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <h1>Blog</h1>
            <p>
              Insights on civil construction, architecture, interior fit-outs, and the projects shaping
              Chennai and beyond.
            </p>
          </div>
        </div>
      </section>
      <BlogsUpdates list={100} initialBlogs={blogs} showHeading={false} animate={false} compact />
    </div>
  );
}
