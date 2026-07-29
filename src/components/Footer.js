import Image from "next/image";
import Styles from "./Footer.module.css";
import Link from "next/link";
import Footer1 from "./Footer1";

/**
 * Footer — now a Server Component.
 *
 * It previously ran `fetch("/api/content", {cache:"no-store"})` after hydration
 * purely to resolve the logo; the logo now arrives as a prop from the root
 * layout, which removes a client round-trip and takes the whole footer subtree
 * out of the client bundle. The logo itself was `priority` + `unoptimized` at
 * 1080×1080 — a ~100 KB PNG fetched at high priority for a below-the-fold
 * element, competing with the hero for bandwidth. It is now lazily loaded and
 * goes through the image optimizer at its real display size.
 */
function Footer({ logo }) {
  const src = logo || "/logo/ocean_footer.png";

  return (
    <footer className={Styles.sectionFooter}>
      <div className="container">
        <div className={Styles.rowFooter}>
          <div className={Styles.columnFooter}>
            <Link
              href={"https://www.olipl.com/"}
              className={Styles.footerLogoLink}
              aria-label="Ocean Lifespaces — go to home page"
            >
              <Image
                className={Styles.footerLogo}
                width={1080}
                height={1080}
                src={src}
                alt="Ocean Lifespaces — Delivering Excellence"
                sizes="(max-width: 768px) 60vw, 320px"
                loading="lazy"
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
