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

          <div 
            style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8', 
              color: '#334155',
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <style jsx>{`
            div :global(h1) { font-size: 2rem; margin: 30px 0 15px; color: #0f172a; }
            div :global(h2) { font-size: 1.75rem; margin: 25px 0 12px; color: #1e293b; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; }
            div :global(h3) { font-size: 1.5rem; margin: 20px 0 10px; color: #334155; }
            div :global(p) { margin-bottom: 15px; }
            div :global(ul), div :global(ol) { margin-bottom: 15px; padding-left: 20px; }
            div :global(li) { margin-bottom: 8px; }
            div :global(strong) { font-weight: 700; color: #0f172a; }
            div :global(a) { color: #2563eb; text-decoration: underline; }
            div :global(blockquote) { border-left: 4px solid #e2e8f0; padding-left: 20px; font-style: italic; color: #64748b; margin: 20px 0; }
          `}</style>
        </div>
      </div>
    </article>
  );
}
