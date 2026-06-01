"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdSupportAgent } from "react-icons/md";

const FloatingEnquiry = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const checkSetting = async () => {
      try {
        const res = await fetch("/api/content/");
        const data = await res.json();
        if (!Array.isArray(data)) return;
        const setting = data.find((i) => i.id === "show-floating-enquiry");
        if (setting) {
          setVisible(setting.value === "true");
        } else {
          setVisible(true);
        }
      } catch {
        setVisible(true);
      }
    };
    checkSetting();
  }, []);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/contact") || !visible) {
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
