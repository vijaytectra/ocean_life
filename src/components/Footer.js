"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Styles from "./Footer.module.css";
import Link from "next/link";
import Footer1 from "./Footer1";
import { usePathname } from "next/navigation";
import { parseMainVideoValue, resolveMediaPublicUrl } from "@/lib/mainVideoContent";

function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const [logo, setLogo] = useState("/foot-logo.svg");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function loadLogo() {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        const footerLogo = data.find((item) => item.id === "site-logo-footer");
        const fallbackLogo = data.find((item) => item.id === "site-logo");
        const logoItem = footerLogo || fallbackLogo;
        
        if (logoItem) {
          const { active } = parseMainVideoValue(logoItem.value);
          if (active) setLogo(resolveMediaPublicUrl(active));
        }
      } catch (err) {
        console.error("Logo fetch error:", err);
      }
    }
    loadLogo();
  }, []);

  if (isAdmin) return null;

  return (
    <footer className={Styles.sectionFooter}>
      <div className="container">
        <div className={Styles.rowFooter}>
          <div className={Styles.columnFooter}>
            <Link href={"https://www.olipl.com/"}>
              <Image
                key={logo}
                className={Styles.footerLogo}
                width={260}
                height={180}
                src={logo}
                alt="Ocean Lifespaces logo"
                style={{ objectFit: 'contain' }}
                unoptimized
                priority
              />
            </Link>
          </div>
          <Footer1 />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
