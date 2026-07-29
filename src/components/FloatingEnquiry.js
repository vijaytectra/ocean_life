"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdSupportAgent } from "react-icons/md";

const FloatingEnquiry = ({ enabled = true }) => {
  const pathname = usePathname();

  // `enabled` is resolved on the server. This used to be a post-hydration
  // fetch of /api/content just to read one boolean flag.
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/contact") || !enabled) {
    return null;
  }

  return (
    <Link href="/contact/" className="floating-contact-wrap" aria-label="Contact us">
      <span className="floating-contact-button">
        <MdSupportAgent size={26} aria-hidden />
      </span>
      <span className="floating-contact-label">Contact us</span>
    </Link>
  );
};

export default FloatingEnquiry;
