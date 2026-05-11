"use client";

import Image from "next/image";
import Styles from "./Footer.module.css";
import Link from "next/link";
import Footer1 from "./Footer1";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

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
                src="/foot-logo.svg"
                alt="Ocean Lifespaces logo"
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
