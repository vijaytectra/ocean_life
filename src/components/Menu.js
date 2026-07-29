"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Styles from "./Menu.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCloseCircle } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { isHeroBackgroundImageUrl } from "@/lib/mainVideoContent";

const MenuItems = [
  { name: "Home", path: "/" },
  { name: "Our Services", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Clients", path: "/clients" },
  { name: "Our Partners", path: "/partners" },
  { name: "Careers", path: "/careers" },
  { name: "Blog", path: "/blog" },
];
const MobileMenuItems = [
  { name: "Home", path: "/" },
  { name: "Our Services", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Clients", path: "/clients" },
  { name: "Our Partners", path: "/partners" },
  { name: "Careers", path: "/careers" },
  { name: "Blog", path: "/blog" },
  { name: "News", path: "/news" },
  { name: "Contact Us", path: "/contact" },
];

// GSAP here only ever runs in response to a click, so it is imported lazily and
// warmed on idle instead of shipping in the critical bundle of every page.
let gsapPromise = null;
const loadGsap = () => {
  gsapPromise = gsapPromise || import("gsap").then((m) => m.gsap || m.default);
  return gsapPromise;
};

function Menu({ logo: serverLogo, heroVideoSrc, heroPoster }) {
  const heroIsImage = isHeroBackgroundImageUrl(heroVideoSrc);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  const popupMenuRef = useRef(null);
  const videoRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  // The popup's background media is the 32 MB hero clip. It used to mount with
  // autoPlay on every page of the site — a full second copy of the video
  // downloaded for a panel that is off-screen until the user opens the menu.
  // It is now created only once the menu is actually opened.
  const [mediaMounted, setMediaMounted] = useState(false);

  const isAdmin = pathname?.startsWith("/admin");

  const openMenu = useCallback(async () => {
    setMediaMounted(true);
    const gsap = await loadGsap();

    gsap.to(popupMenuRef.current, {
      right: "0%",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => setPopupVisible(true),
    });

    if (mobileMenuRef.current) {
      gsap.from(mobileMenuRef.current.children, {
        opacity: 0,
        y: -10,
        delay: 0.3,
        duration: 0.5,
        stagger: 0.2,
      });
    }

    // Animate the video div with opacity and upward movement
    if (videoRef.current) {
      gsap.from(videoRef.current, {
        opacity: 0,
        y: 20,
        delay: 1,
        duration: 1,
      });
    }
  }, []);

  const closeMenu = useCallback(async () => {
    const gsap = await loadGsap();

    gsap.to(popupMenuRef.current, {
      right: "-102%",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => setPopupVisible(false),
    });

    // Fade out the video div
    if (videoRef.current) {
      gsap.from(videoRef.current, {
        opacity: 0,
        y: 20,
        delay: 0.5,
        duration: 0.5,
      });
    }
  }, []);

  const togglePopup = useCallback(() => {
    if (isPopupVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isPopupVisible, openMenu, closeMenu]);

  useEffect(() => {
    // Passive + rAF-batched, so the scroll handler never forces a synchronous
    // layout read, and setState only fires when the boolean actually flips.
    let ticking = false;
    let last = false;

    const update = () => {
      ticking = false;
      const next = window.scrollY > 0;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Warm GSAP on the first real user interaction rather than on idle: idle
    // still lands inside the page-load window, where a ~110 KB parse shows up
    // directly as blocking time.
    const warm = () => loadGsap();
    const warmEvents = ["pointerdown", "keydown", "touchstart", "wheel"];
    warmEvents.forEach((e) =>
      window.addEventListener(e, warm, { once: true, passive: true })
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      warmEvents.forEach((e) => window.removeEventListener(e, warm));
    };
  }, []);

  const logo = serverLogo || "/logo-web.webp";

  if (isAdmin) return null;

  return (
    <div className={`${Styles.menu} ${scrolled ? Styles.scrolled : ""}`}>
      <Link href="/" aria-label="Ocean Lifespaces — go to home page">
        <Image
          className={Styles.logo}
          src={logo}
          alt="Ocean Lifespaces India Private Limited"
          width={209}
          height={52}
          priority
          sizes="209px"
          style={{ objectFit: "contain" }}
        />
      </Link>

      <div
        className={Styles.menuItemsContainerInner}
        role="navigation"
        aria-label="Primary"
      >
        <ul className={Styles.menuItems}>
          {MenuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  className={isActive ? Styles.active : ""}
                  href={item.path}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={togglePopup}
          className={Styles.popupButton}
          aria-label="Open navigation menu"
          aria-expanded={isPopupVisible}
          aria-controls="site-popup-menu"
        >
          <span>
            <RiMenu3Line size={20} aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className={Styles.popupMenu} ref={popupMenuRef} id="site-popup-menu">
        <div className={Styles.mobileLogo} style={{ display: "none" }}>
          <Link href="/" aria-label="Ocean Lifespaces — go to home page">
            <Image
              className={Styles.mobileLogoImage}
              src="/mobile-menu-logo-1.webp"
              alt="Ocean Lifespaces India Private Limited"
              width={209}
              height={52}
              sizes="209px"
            />
          </Link>
          <button
            type="button"
            className={Styles.closeButtonMenu}
            onClick={togglePopup}
            aria-label="Close navigation menu"
          >
            <RxCross1 aria-hidden="true" />
          </button>
        </div>
        <div className={Styles.popupContentMenu}>
          <div
            className={Styles.mobilemenu}
            role="navigation"
            aria-label="Full site navigation"
          >
            <ul className={Styles.mobileMenuItems} ref={mobileMenuRef}>
              {MobileMenuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path} className={Styles.mobileMenuItem}>
                    <Link
                      className={isActive ? Styles.mobileActive : ""}
                      href={item.path}
                      onClick={togglePopup}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Added the autoplay video with GSAP animation */}
          <div className={Styles.video} ref={videoRef}>
            {mediaMounted &&
              (heroIsImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={heroVideoSrc}
                  className={Styles.videoElement}
                  src={heroVideoSrc}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <video
                  key={heroVideoSrc}
                  className={Styles.videoElement}
                  src={heroVideoSrc}
                  poster={heroPoster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              ))}
          </div>

          <button
            type="button"
            className={Styles.closeButtonMenu}
            onClick={togglePopup}
            aria-label="Close navigation menu"
          >
            Close <IoCloseCircle aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
