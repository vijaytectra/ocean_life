"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Styles from "./Footer.module.css";
import Link from "next/link";
import Footer1 from "./Footer1";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const [logo, setLogo] = useState("/foot-logo.svg");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        const logoItem = data.find((item) => item.id === "site-logo");
        if (logoItem) setLogo(logoItem.value);
      })
      .catch((err) => console.error("Logo fetch error:", err));
  }, []);

  if (isAdmin) return null;

  return (
    <footer className={Styles.sectionFooter}>
      <div className="container">
        <div className={Styles.rowFooter}>
          <div className={Styles.columnFooter}>
            <Link href={"https://www.olipl.com/"}>
              <Image
                className={Styles.footerLogo}
                width={455}
                height={401}
                src={logo}
                alt="Ocean Lifespaces logo"
                style={{ objectFit: 'contain' }}
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
