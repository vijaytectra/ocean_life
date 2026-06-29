"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Styles from "./Footer.module.css";
import Link from "next/link";
import Footer1 from "./Footer1";
import { usePathname } from "next/navigation";
import { parseMainVideoValue, resolveMediaPublicUrl } from "@/lib/mainVideoContent";

const FOOTER_LOGO = "/logo/ocean_footer.png";

function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const [logo, setLogo] = useState(FOOTER_LOGO);

  useEffect(() => {
    async function loadLogo() {
      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        const data = await res.json();
        const footerLogo = data.find((item) => item.id === "site-logo-footer");
        if (footerLogo?.value) {
          const { active } = parseMainVideoValue(footerLogo.value);
          if (active) {
            setLogo(resolveMediaPublicUrl(active));
            return;
          }
        }
        setLogo(FOOTER_LOGO);
      } catch (err) {
        console.error("Logo fetch error:", err);
        setLogo(FOOTER_LOGO);
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
            <Link href={"https://www.olipl.com/"} className={Styles.footerLogoLink}>
              <Image
                key={logo}
                className={Styles.footerLogo}
                width={1080}
                height={1080}
                src={logo}
                alt="Ocean Lifespaces — Delivering Excellence"
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
