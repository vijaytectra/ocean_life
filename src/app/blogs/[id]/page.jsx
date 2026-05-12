import prisma from '@/lib/prisma';
import Image from 'next/image';
import Styles from '../../components/NewsAndEvents.module.css';

export async function generateMetadata({ params }) {
  const blog = await prisma.blog.findUnique({
    where: { id: parseInt((await params).id) }
  });

  return {
    title: blog ? `${blog.title} | Ocean Lifespaces` : 'Blog Not Found',
  };
}

export default async function BlogPage({ params }) {
  const blog = await prisma.blog.findUnique({
    where: { id: parseInt((await params).id) }
  });

  if (!blog) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h1>Blog Not Found</h1>
      </div>
    );
  }

  return (
    <article style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '120px 20px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>{blog.title}</h1>
          <p style={{ color: '#64748b', marginBottom: '30px' }}>Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
          
          {blog.image && (
            <div style={{ width: '100%', height: '400px', position: 'relative', marginBottom: '40px', borderRadius: '12px', overflow: 'hidden' }}>
              <Image 
                src={blog.image} 
                alt={blog.title} 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </div>
          )}

          <div style={{ 
            fontSize: '1.1rem', 
            lineHeight: '1.8', 
            color: '#334155',
            whiteSpace: 'pre-wrap'
          }}>
            {blog.content}
          </div>
        </div>
      </div>
    </article>
  );
}
