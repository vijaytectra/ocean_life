import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { STATIC_SERVICES } from '@/lib/staticSiteData';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const services = type
    ? STATIC_SERVICES.filter((s) => s.type === type)
    : STATIC_SERVICES;
  return NextResponse.json(services);
}
