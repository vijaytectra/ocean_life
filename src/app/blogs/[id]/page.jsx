import prisma from '@/lib/prisma';
import Image from 'next/image';

export async function generateMetadata({ params }) {
  const blog = await prisma.blog.findUnique({
    where: { id: parseInt((await params).id) }
  });

  return {
    title: blog?.metaTitle || (blog ? `${blog.title} | Ocean Lifespaces` : 'Blog Not Found'),
    description: blog?.metaDesc || '',
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

          <style dangerouslySetInnerHTML={{ __html: `
            .blog-content h1 { font-size: 2.2rem; margin: 30px 0 15px; color: #0f172a; font-weight: 700; }
            .blog-content h2 { font-size: 1.8rem; margin: 25px 0 12px; color: #1e293b; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; font-weight: 600; }
            .blog-content h3 { font-size: 1.5rem; margin: 20px 0 10px; color: #334155; font-weight: 600; }
            .blog-content p { margin-bottom: 20px; color: #475569; }
            .blog-content ul, .blog-content ol { margin-bottom: 20px; padding-left: 25px; color: #475569; }
            .blog-content li { margin-bottom: 10px; }
            .blog-content strong { font-weight: 700; color: #0f172a; }
            .blog-content a { color: #2563eb; text-decoration: underline; font-weight: 500; }
            .blog-content blockquote { border-left: 4px solid #cbd5e1; padding: 10px 20px; font-style: italic; color: #64748b; background: #f8fafc; margin: 25px 0; border-radius: 0 8px 8px 0; }
            .blog-content img { max-width: 100%; height: auto; border-radius: 12px; margin: 20px 0; }
          `}} />
          <div 
            className="blog-content"
            style={{ 
              fontSize: '1.15rem', 
              lineHeight: '1.85', 
              color: '#334155',
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </article>
  );
}
