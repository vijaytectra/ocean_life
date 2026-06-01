"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { PROJECTS_GALLERY, INTERIOR_FIT_OUT_SERVICE } from "@/data/projectsGallery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { safeFromTo, isValidScrollTriggerTarget } from "@/lib/scrollTriggerSafe";
import styles from "./ProjectsScrollGallery.module.css";

gsap.registerPlugin(ScrollTrigger);

const TOTAL = PROJECTS_GALLERY.length;
const padIndex = (n) => String(n).padStart(2, "0");

function getScrollOffset() {
  if (typeof window === "undefined") return 120;
  const w = window.innerWidth;
  if (w <= 480) return 88;
  if (w <= 900) return 104;
  if (w <= 1200) return 112;
  return 120;
}

export default function ProjectsScrollGallery() {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const railListRef = useRef(null);
  const mobileNavRef = useRef(null);
  const scrollRafRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const setPanelRef = useCallback((el, index) => {
    if (el) panelRefs.current[index] = el;
  }, []);

  const scrollToPanel = useCallback((index) => {
    const panel = panelRefs.current[index];
    if (!panel) return;

    const top =
      panel.getBoundingClientRect().top + window.scrollY - getScrollOffset();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  const updateActiveFromScroll = useCallback(() => {
    const panels = panelRefs.current.filter(Boolean);
    if (!panels.length) return;

    const marker = getScrollOffset() + 56;
    let bestIndex = 0;

    panels.forEach((panel, index) => {
      if (panel.getBoundingClientRect().top <= marker) {
        bestIndex = index;
      }
    });

    setActiveIndex((prev) => (prev === bestIndex ? prev : bestIndex));
  }, []);

  const syncRailListScroll = useCallback((index) => {
    const list = railListRef.current;
    if (!list) return;

    const items = list.querySelectorAll("li");
    const item = items[index];
    if (!item) return;

    const target =
      item.offsetTop - list.clientHeight / 2 + item.offsetHeight / 2;
    list.scrollTop = Math.max(
      0,
      Math.min(target, list.scrollHeight - list.clientHeight)
    );
  }, []);

  const syncMobileNavScroll = useCallback((index) => {
    const nav = mobileNavRef.current;
    if (!nav) return;

    const btn = nav.querySelector(`[data-mobile-index="${index}"]`);
    if (!btn) return;

    const target =
      btn.offsetLeft - nav.clientWidth / 2 + btn.offsetWidth / 2;
    nav.scrollLeft = Math.max(
      0,
      Math.min(target, nav.scrollWidth - nav.clientWidth)
    );
  }, []);

  const goToProject = useCallback(
    (index) => {
      setActiveIndex(index);
      scrollToPanel(index);
      syncRailListScroll(index);
      syncMobileNavScroll(index);
    },
    [scrollToPanel, syncRailListScroll, syncMobileNavScroll]
  );

  useEffect(() => {
    const onScroll = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        updateActiveFromScroll();
      });
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [updateActiveFromScroll]);

  useEffect(() => {
    syncMobileNavScroll(activeIndex);
  }, [activeIndex, syncMobileNavScroll]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const revealSelector =
      "[data-gallery-intro-item], [data-gallery-bar], [data-gallery-mobile-nav], [data-gallery-panel-inner]";

    const runPanelReveals = () => {
      const panels = root.querySelectorAll("[data-gallery-panel]");
      if (!panels.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const inner = entry.target.querySelector("[data-gallery-panel-inner]");
            if (!inner) return;

            gsap.fromTo(
              inner,
              { y: 44, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
            );
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
      );

      panels.forEach((panel) => observer.observe(panel));
      return () => observer.disconnect();
    };

    let panelCleanup = null;
    let cancelled = false;

    const init = () => {
      if (cancelled || !rootRef.current) return;
      if (!isValidScrollTriggerTarget(root)) {
        requestAnimationFrame(init);
        return;
      }

      panelCleanup = runPanelReveals();
    };

    requestAnimationFrame(() => requestAnimationFrame(init));

    return () => {
      cancelled = true;
      panelCleanup?.();
    };
  }, [reducedMotion]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      if (reducedMotion) {
        gsap.set(
          root.querySelectorAll(
            "[data-gallery-intro-item], [data-gallery-bar], [data-gallery-mobile-nav], [data-gallery-panel-inner]"
          ),
          { opacity: 1, y: 0, x: 0, scale: 1 }
        );
        return;
      }

      let ctx = null;
      let cancelled = false;

      const init = () => {
        if (cancelled || !rootRef.current) return;

        const introBand = root.querySelector("[data-gallery-intro]");
        if (!isValidScrollTriggerTarget(introBand)) {
          requestAnimationFrame(init);
          return;
        }

        ctx = gsap.context(function initGalleryScroll() {
          const introItems = Array.from(
            introBand.querySelectorAll("[data-gallery-intro-item]")
          );

          if (introItems.length) {
            gsap.set(introItems, { opacity: 1 });
            safeFromTo(
              introItems,
              { y: 36, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.95,
                stagger: 0.14,
                ease: "power3.out",
              },
              introBand,
              { start: "top 82%", once: true }
            );
          }

          const layout = root.querySelector("[data-gallery-layout]");
          if (!isValidScrollTriggerTarget(layout)) return;

          const bar = root.querySelector("[data-gallery-bar]");
          const mobileNav = root.querySelector("[data-gallery-mobile-nav]");
          const rail = root.querySelector(`.${styles.rail}`);

          safeFromTo(
            bar,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, ease: "power2.out" },
            layout,
            { start: "top 88%", once: true }
          );

          safeFromTo(
            mobileNav,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
            layout,
            { start: "top 86%", once: true }
          );

          if (rail && window.matchMedia("(min-width: 901px)").matches) {
            safeFromTo(
              rail,
              { x: -20, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
              layout,
              { start: "top 85%", once: true }
            );
          }
        }, root);
      };

      requestAnimationFrame(() => requestAnimationFrame(init));

      return () => {
        cancelled = true;
        ctx?.revert();
      };
    },
    { scope: rootRef, dependencies: [reducedMotion] }
  );

  const progressPct = TOTAL > 1 ? ((activeIndex + 1) / TOTAL) * 100 : 100;

  return (
    <section className={styles.gallery} ref={rootRef} aria-label="Project portfolio gallery">
      <div className={styles.introBand} data-gallery-intro>
        <div className={styles.introOrb1} aria-hidden />
        <div className={styles.introOrb2} aria-hidden />
        <div className="container">
          <div className={styles.introHeader}>
            <p className={styles.eyebrow} data-gallery-intro-item>
              Selected work
            </p>
            <h2 className={styles.introTitle} data-gallery-intro-item>
              Spaces we&apos;ve <span>built at scale</span>
            </h2>
            <p className={styles.introLead} data-gallery-intro-item>
              {TOTAL} flagship interior fit-out deliveries across South India —
              offices, campuses, and enterprise workspaces under our Interior
              Fit-Out practice.
            </p>
          </div>

          <div className={styles.introServiceFeature} data-gallery-intro-item>
            <Link
              href={INTERIOR_FIT_OUT_SERVICE.link}
              className={styles.introServiceCard}
            >
              <span className={styles.introServiceMedia}>
                <Image
                  src={INTERIOR_FIT_OUT_SERVICE.image}
                  alt={INTERIOR_FIT_OUT_SERVICE.title}
                  fill
                  className={styles.introServiceImage}
                  sizes="(max-width: 900px) 100vw, 480px"
                />
                <span className={styles.introServiceOverlay} aria-hidden />
              </span>
              <span className={styles.introServiceBody}>
                <span className={styles.introServiceEyebrow}>Service line</span>
                <span className={styles.introServiceTitle}>
                  {INTERIOR_FIT_OUT_SERVICE.title}
                </span>
                <span className={styles.introServiceMeta}>
                  {TOTAL} completed projects in this portfolio
                </span>
                <span className={styles.introServiceCta}>
                  <span>Explore interior fit-out</span>
                  <MdOutlineArrowRightAlt size={18} aria-hidden />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.galleryLayout} data-gallery-layout>
        <aside className={styles.rail} aria-label="Project navigation">
          <div className={styles.railSticky}>
            <p className={styles.railLabel}>Projects</p>
            <div className={styles.railTrack} aria-hidden>
              <div className={styles.railFill} style={{ height: `${progressPct}%` }} />
            </div>
            <ul className={styles.railList} ref={railListRef}>
              {PROJECTS_GALLERY.map((project, index) => (
                <li key={project.href}>
                  <button
                    type="button"
                    className={styles.railBtn}
                    data-active={index === activeIndex ? "true" : "false"}
                    onClick={() => goToProject(index)}
                    aria-label={`Go to ${project.title}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  >
                    <span className={styles.railDot} />
                    <span className={styles.railNum}>{padIndex(index + 1)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className={styles.main}>
          <div className={styles.galleryBar} data-gallery-bar>
            <div className={styles.barCard}>
              <div className={styles.barTop}>
                <div className={styles.barTitleWrap}>
                  <span className={styles.barTag}>Now viewing</span>
                  <p className={styles.barProjectTitle}>
                    {PROJECTS_GALLERY[activeIndex]?.title}
                  </p>
                </div>
                <div className={styles.counter} aria-live="polite">
                  <span className={styles.counterCurrent}>{padIndex(activeIndex + 1)}</span>
                  <span className={styles.counterSep}>/</span>
                  <span className={styles.counterTotal}>{padIndex(TOTAL)}</span>
                </div>
              </div>
              <div className={styles.progressTrack} aria-hidden>
                <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          </div>

          <nav
            className={styles.mobileNav}
            ref={mobileNavRef}
            data-gallery-mobile-nav
            aria-label="Jump to project"
          >
            {PROJECTS_GALLERY.map((project, index) => (
              <button
                key={project.href}
                type="button"
                className={styles.mobileNavBtn}
                data-mobile-index={index}
                data-active={index === activeIndex ? "true" : "false"}
                onClick={() => goToProject(index)}
                aria-label={`${padIndex(index + 1)} — ${project.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <span className={styles.mobileNavNum}>{padIndex(index + 1)}</span>
                <span className={styles.mobileNavLabel}>{project.title}</span>
              </button>
            ))}
          </nav>

          <div className={styles.panels}>
            {PROJECTS_GALLERY.map((project, index) => {
              const isActive = index === activeIndex;
              const isDark = index % 2 === 1;
              const imageFirst = index % 2 === 0;

              return (
                <article
                  key={project.href}
                  ref={(el) => setPanelRef(el, index)}
                  data-index={index}
                  data-gallery-panel
                  data-active={isActive ? "true" : "false"}
                  data-theme={isDark ? "dark" : "light"}
                  className={styles.panel}
                >
                  <span className={styles.watermark} aria-hidden>
                    {padIndex(index + 1)}
                  </span>
                  <div className={styles.panelGlow} aria-hidden />

                  <div className="container">
                    <div className={styles.panelInner} data-gallery-panel-inner>
                      <div
                        className={`${styles.panelGrid} ${imageFirst ? styles.imageLeft : styles.imageRight}`}
                      >
                        <div className={styles.mediaFrame}>
                          <div className={styles.mediaAccent} aria-hidden />
                          <div className={styles.mediaWrap}>
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className={styles.image}
                              sizes="(max-width: 480px) 100vw, (max-width: 900px) 100vw, (max-width: 1200px) 90vw, 55vw"
                              priority={index < 2}
                              loading={index < 2 ? "eager" : "lazy"}
                            />
                            <div className={styles.mediaGradient} aria-hidden />
                          </div>
                          <span className={styles.mediaIndex}>{padIndex(index + 1)}</span>
                        </div>

                        <div className={styles.copyCard}>
                          <div className={styles.copyRule} aria-hidden />
                          <span className={styles.copyEyebrow}>Interior fit-out</span>
                          <h3 className={styles.title}>{project.title}</h3>
                          <div className={styles.pills}>
                            <span className={styles.pill}>{project.location}</span>
                            <span className={styles.pillAccent}>{project.area}</span>
                          </div>
                          <p className={styles.copyNote}>
                            End-to-end interior fit-out — design, build, and handover
                            for enterprise-grade workspaces.
                          </p>
                          <Link href={project.href} className={styles.cta}>
                            <span>View case study</span>
                            <span className={styles.ctaIcon}>
                              <MdOutlineArrowRightAlt size={22} aria-hidden />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
