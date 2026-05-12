"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectEmployees() {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/team');
  }, [router]);
  return null;
}
