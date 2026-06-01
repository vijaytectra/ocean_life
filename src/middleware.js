import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const normalizedPathname =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const session = request.cookies.get('admin_session');

  // Protect all /admin routes except /admin/login (with or without trailing slash)
  if (normalizedPathname.startsWith('/admin') && normalizedPathname !== '/admin/login') {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (normalizedPathname.startsWith('/api/admin') && !session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Protect sensitive API routes (POST, PUT, DELETE)
  const sensitiveApis = ['/api/blogs', '/api/content', '/api/employees', '/api/upload', '/api/clients/logos'];
  const isSensitiveApi = sensitiveApis.some((api) => normalizedPathname.startsWith(api));

  if (isSensitiveApi && request.method !== 'GET') {
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
