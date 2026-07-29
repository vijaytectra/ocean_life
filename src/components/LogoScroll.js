import Image from "next/image";
import Styles from "./LogoScroll.module.css";
import { getClientLogoImages } from "@/lib/siteContent";

/**
 * Infinite client-logo marquee — now a Server Component.
 *
 * Logos come from the server instead of a post-hydration
 * `fetch("/api/clients/logos", {cache:"no-store"})`, the responsive sizing that
 * ran through `useState` + a resize listener is a CSS media query, and the
 * track is duplicated twice rather than four times: the keyframes translate by
 * -50%, so two copies are all a seamless loop needs. That halves the marquee's
 * DOM nodes (it was the page's largest element, 192 children). Duration is
 * halved to match, so the scroll speed is unchanged.
 */
export default function LogoScroll({ logos }) {
  const images = logos?.length ? logos : getClientLogoImages();
  if (!images.length) return null;

  const duplicated = [...images, ...images];

  return (
    <div className={Styles.container}>
      <div className={Styles.track}>
        {duplicated.map((src, index) => (
          <div key={`${src}-${index}`} className={Styles.item}>
            {/* Fixed width/height rather than `fill`: a `fill` image builds its
                srcset from every configured deviceSize, and at 140 logos that
                alone was ~90 KB of srcset markup in the HTML — then again in
                the RSC payload. A fixed-size image emits a 1x/2x pair instead,
                which is all a 160×90 logo can use. */}
            <Image
              src={src}
              alt=""
              aria-hidden="true"
              width={160}
              height={90}
              loading="lazy"
              unoptimized={src?.startsWith("/uploads/")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
