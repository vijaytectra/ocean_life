"use client";

import { usePathname } from "next/navigation";

/**
 * Hides its children on /admin routes.
 *
 * This exists so that chrome like the footer can stay a Server Component while
 * keeping the "not on admin pages" behaviour it used to implement itself with
 * `usePathname`. Children are rendered on the server and passed through, so
 * nothing inside them is pulled into the client bundle.
 */
export default function HideOnAdmin({ children }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return children;
}
