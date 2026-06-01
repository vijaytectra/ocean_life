"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./clients.module.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 550, suffix: "+", label: "Projects delivered" },
  { value: 35, suffix: "+", label: "Corporate clients" },
  { value: 30, suffix: "+", label: "Years of trust" },
];

function logoAlt(path) {
  const name = path.split("/").pop()?.replace(/\.[^.]+$/, "") || "Client";
  return `${name.replace(/[-_]/g, " ")} logo`;
}

function ClientLogoCard({ logo, index }) {
  return (
    <article
      className={`${styles.logoCard} ${styles.logoCardDark}`}
      data-client-card
    >
      <div className={styles.logoCardInner}>
        <div className={styles.logoMedia}>
          <Image
            src={logo.image}
            alt={logoAlt(logo.image)}
            fill
            className={styles.logoImgDark}
            sizes="(max-width: 768px) 45vw, (max-width: 1100px) 30vw, 22vw"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}

function MarqueeTrack({ logos, reverse = false }) {
  const items = [...logos, ...logos];
  return (
    <div
      className={`${styles.marquee} ${reverse ? styles.marqueeReverse : ""}`}
      data-marquee
      aria-hidden
    >
      <div className={styles.marqueeTrack}>
        {items.map((logo, i) => (
          <div key={`${logo.id}-${i}`} className={styles.marqueeItem}>
            <Image
              src={logo.image}
              alt=""
              width={160}
              height={80}
              className={styles.marqueeImg}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DarkLogoSection({
  sectionIndex,
  title,
  description,
  logos,
  loading,
  emptyMessage,
  marqueeReverse = false,
}) {
  return (
    <section className={styles.darkSection} data-dark-section>
      <div className={styles.darkSectionBg} aria-hidden />
      <div className={styles.darkOrb1} data-dark-orb aria-hidden />
      <div className={styles.darkOrb2} data-dark-orb aria-hidden />
      <div className={styles.darkAccentLine} data-dark-accent aria-hidden />

      <div className="container">
        <header className={`${styles.sectionHead} ${styles.darkSectionHeader}`}>
          <span className={styles.sectionIndexLight} data-header-index>
            {sectionIndex}
          </span>
          <div>
            <h2 className={styles.sectionTitleLight} data-header-title>
              {title}
            </h2>
            <p className={styles.sectionSubLight} data-header-desc>
              {description}
            </p>
          </div>
        </header>
      </div>

      {loading ? (
        <div className="container">
          <div className={styles.darkGrid}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.skeletonCardDark} />
            ))}
          </div>
        </div>
      ) : logos.length === 0 ? (
        <div className="container">
          <p className={styles.emptyLight}>{emptyMessage}</p>
        </div>
      ) : (
        <>
          <MarqueeTrack logos={logos} reverse={marqueeReverse} />
          <div className="container">
            <div className={styles.darkGrid} data-dark-grid>
              {logos.map((logo, i) => (
                <ClientLogoCard key={logo.id} logo={logo} index={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default function ClientContent() {
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [logos, setLogos] = useState([]);
  const [ongoingLogos, setOngoingLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clients/logos/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLogos(data.filter((l) => l.category === "corporate"));
          setOngoingLogos(data.filter((l) => l.category === "ongoing"));
        }
      })
      .catch((e) => console.error("Failed to fetch logos:", e))
      .finally(() => setLoading(false));
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const ctx = gsap.context(function registerAnimations() {
        const refresh = () => ScrollTrigger.refresh();

        if (reducedMotion) {
          gsap.set("[data-hero-reveal], [data-client-card], [data-cta-reveal]", {
            opacity: 1,
            y: 0,
            scale: 1,
          });
          return;
        }

        /* ─── Hero entrance (page load) ─── */
        const hero = root.querySelector(`.${styles.hero}`);
        if (hero) {
          const heroTl = gsap.timeline({
            defaults: { ease: "power3.out" },
            delay: 0.15,
          });

          heroTl
            .from("[data-hero-orb]", {
              scale: 0.6,
              opacity: 0,
              duration: 1.4,
              stagger: 0.2,
              ease: "power2.out",
            })
            .from(
              "[data-hero-reveal]",
              {
                y: 40,
                opacity: 0,
                duration: 0.95,
                stagger: 0.11,
                clearProps: "opacity",
              },
              "-=1"
            )
            .from(
              `.${styles.heroTitle}`,
              {
                clipPath: "inset(100% 0 0 0)",
                duration: 1.1,
                ease: "power4.out",
              },
              "-=0.75"
            );

          gsap.to("[data-hero-orb]", {
            y: "+=18",
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: { each: 0.6, from: "random" },
          });
        }

        /* ─── Stat counters ─── */
        root.querySelectorAll("[data-stat-value]").forEach((el) => {
          const end = Number(el.getAttribute("data-stat-value")) || 0;
          const suffix = el.getAttribute("data-stat-suffix") || "";
          const counter = { val: 0 };

          gsap.to(counter, {
            val: end,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el.closest(`.${styles.statsRow}`),
              start: "top 88%",
              once: true,
            },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.val)}${suffix}`;
            },
          });
        });

        /* ─── Dark sections ─── */
        root.querySelectorAll("[data-dark-section]").forEach((section) => {
          const header = section.querySelector(`.${styles.darkSectionHeader}`);
          const marquee = section.querySelector("[data-marquee]");
          const grid = section.querySelector("[data-dark-grid]");
          const cards = section.querySelectorAll("[data-client-card]");
          const orbs = section.querySelectorAll("[data-dark-orb]");
          const accent = section.querySelector("[data-dark-accent]");

          const sectionTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          });

          if (accent) {
            sectionTl.from(accent, {
              scaleX: 0,
              duration: 1.1,
              ease: "power3.inOut",
              transformOrigin: "left center",
            });
          }

          if (orbs.length) {
            sectionTl.from(
              orbs,
              {
                scale: 0.5,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power2.out",
              },
              "-=0.8"
            );

            gsap.to(orbs, {
              y: "+=24",
              x: "+=12",
              duration: 5,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              stagger: { each: 0.8, from: "center" },
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          }

          if (header) {
            const indexEl = header.querySelector("[data-header-index]");
            const titleEl = header.querySelector("[data-header-title]");
            const descEl = header.querySelector("[data-header-desc]");

            sectionTl
              .from(
                indexEl,
                { x: -32, opacity: 0, duration: 0.85, ease: "power3.out" },
                "-=0.5"
              )
              .from(
                titleEl,
                {
                  y: 28,
                  opacity: 0,
                  duration: 0.9,
                  ease: "power3.out",
                },
                "-=0.55"
              )
              .from(
                descEl,
                { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" },
                "-=0.5"
              );
          }

          if (marquee) {
            sectionTl.from(
              marquee,
              {
                opacity: 0,
                y: 24,
                scale: 0.98,
                duration: 0.9,
                ease: "power2.out",
              },
              "-=0.4"
            );
          }

          if (cards.length && grid) {
            sectionTl.from(
              cards,
              {
                y: 56,
                opacity: 0,
                scale: 0.88,
                rotationX: 12,
                transformOrigin: "center bottom",
                duration: 0.85,
                stagger: {
                  amount: 0.75,
                  grid: [4, 4],
                  from: "start",
                  ease: "power2.out",
                },
                ease: "power3.out",
                clearProps: "opacity,transform",
              },
              "-=0.35"
            );
          }

          /* Card hover micro-interaction */
          cards.forEach((card) => {
            const onEnter = () => {
              gsap.to(card, {
                y: -8,
                scale: 1.03,
                duration: 0.45,
                ease: "power2.out",
                overwrite: "auto",
              });
            };
            const onLeave = () => {
              gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
              });
            };
            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);
            this.add(() => {
              card.removeEventListener("mouseenter", onEnter);
              card.removeEventListener("mouseleave", onLeave);
            });
          });
        });

        /* ─── CTA ─── */
        const cta = root.querySelector("[data-cta-reveal]");
        if (cta) {
          gsap.from(cta, {
            y: 48,
            opacity: 0,
            scale: 0.94,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cta,
              start: "top 85%",
              once: true,
            },
          });

          const ctaBtn = cta.querySelector(`.${styles.ctaButton}`);
          if (ctaBtn) {
            gsap.to(ctaBtn, {
              boxShadow: "0 16px 40px rgba(245, 131, 31, 0.45)",
              duration: 1.8,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              scrollTrigger: {
                trigger: cta,
                start: "top 85%",
              },
            });
          }
        }

        requestAnimationFrame(refresh);
        window.addEventListener("load", refresh);
        this.add(() => window.removeEventListener("load", refresh));
      }, root);

      return () => ctx.revert();
    },
    { scope: rootRef, dependencies: [loading, reducedMotion, logos.length, ongoingLogos.length] }
  );

  return (
    <div ref={rootRef} className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden />
        <div className={styles.heroOrb1} data-hero-orb aria-hidden />
        <div className={styles.heroOrb2} data-hero-orb aria-hidden />
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow} data-hero-reveal>
              Trusted partnerships
            </p>
            <h1 className={styles.heroTitle} data-hero-reveal>
              Our Clients
            </h1>
            <p className={styles.heroLead} data-hero-reveal>
              Leading corporates across India choose Ocean Lifespaces for
              turnkey delivery, interior fit-out, and civil construction at
              scale.
            </p>
            <div className={styles.statsRow} data-hero-reveal>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <p className={styles.statValue}>
                    <span
                      data-stat-value={stat.value}
                      data-stat-suffix={stat.suffix}
                    >
                      0{stat.suffix}
                    </span>
                  </p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DarkLogoSection
        sectionIndex="01"
        title="Corporate Clients"
        description="Fit-out and construction partners who rely on us for precision, scale, and on-time delivery."
        logos={logos}
        loading={loading}
        emptyMessage="Corporate client logos coming soon."
      />

      <DarkLogoSection
        sectionIndex="02"
        title="Ongoing Projects"
        description="Active engagements we are delivering today across Chennai, Bangalore, and Hyderabad."
        logos={ongoingLogos}
        loading={loading}
        emptyMessage="Ongoing project logos coming soon."
        marqueeReverse
      />

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox} data-cta-reveal>
            <h2 className={styles.ctaTitle}>
              See the work behind these partnerships
            </h2>
            <Link href="/projects/" className={styles.ctaButton}>
              <span>Explore our projects</span>
              <svg width="15" height="10" viewBox="0 0 13 10" aria-hidden>
                <path d="M1,5 L11,5" stroke="currentColor" strokeWidth="2" />
                <polyline
                  points="8 1 12 5 8 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
