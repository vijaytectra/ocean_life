"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import styles from "./partners.module.css";
import { ARCHITECT_PARTNERS, PMC_PARTNERS } from "./partnersData";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "37+", label: "Leading architects" },
  { value: "14+", label: "PMC partners" },
  { value: "30+", label: "Years of collaboration" },
];

function PartnerMarquee({ names, reverse = false }) {
  const items = [...names, ...names];
  return (
    <div className={`${styles.marquee} ${reverse ? styles.marqueeReverse : ""}`} aria-hidden>
      <div className={styles.marqueeTrack}>
        {items.map((name, i) => (
          <span key={`${name}-${i}`} className={styles.marqueeChip}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function PartnerSection({ sectionIndex, title, description, partners, reverseMarquee = false }) {
  return (
    <section className={styles.section} data-partner-section>
      <div className={styles.sectionBg} aria-hidden />
      <div className={styles.sectionOrb1} data-section-orb aria-hidden />
      <div className={styles.sectionOrb2} data-section-orb aria-hidden />
      <div className={styles.accentLine} data-section-accent aria-hidden />

      <div className="container">
        <header className={styles.sectionHead}>
          <span className={styles.sectionIndex} data-section-index>
            {sectionIndex}
          </span>
          <div>
            <h2 className={styles.sectionTitle} data-section-title>
              {title}
            </h2>
            <p className={styles.sectionSub} data-section-desc>
              {description}
            </p>
          </div>
        </header>
      </div>

      <PartnerMarquee names={partners} reverse={reverseMarquee} />

      <div className="container">
        <div className={styles.partnerGrid} data-partner-grid>
          {partners.map((name) => (
            <article key={name} className={styles.partnerCard} data-partner-card>
              <span className={styles.partnerIcon} aria-hidden>
                <RiArrowRightDoubleFill />
              </span>
              <h3 className={styles.partnerName}>{name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PartnersContent() {
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const ctx = gsap.context(function registerAnimations() {
        const refresh = () => ScrollTrigger.refresh();

        if (reducedMotion) {
          gsap.set(
            "[data-hero-reveal], [data-partner-card], [data-cta-reveal], [data-section-index], [data-section-title], [data-section-desc], [data-section-accent]",
            { opacity: 1, y: 0, scale: 1, scaleX: 1, clearProps: "opacity,transform" }
          );
          return;
        }

        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });
        heroTl.from("[data-hero-orb]", {
          scale: 0.6,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          immediateRender: false,
        }).from(
          "[data-hero-reveal]",
          { y: 24, duration: 0.9, stagger: 0.1, immediateRender: false },
          "-=0.6"
        );

        root.querySelectorAll("[data-partner-section]").forEach((section) => {
          const headerEls = section.querySelectorAll(
            "[data-section-index], [data-section-title], [data-section-desc]"
          );
          const accent = section.querySelector("[data-section-accent]");
          const cards = section.querySelectorAll("[data-partner-card]");

          if (accent) {
            gsap.from(accent, {
              scaleX: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 80%", once: true },
              immediateRender: false,
            });
          }

          if (headerEls.length) {
            gsap.from(headerEls, {
              y: 32,
              opacity: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 78%", once: true },
              immediateRender: false,
            });
          }

          if (cards.length) {
            gsap.from(cards, {
              y: 36,
              opacity: 0,
              duration: 0.7,
              stagger: 0.04,
              ease: "power2.out",
              scrollTrigger: { trigger: section.querySelector("[data-partner-grid]"), start: "top 85%", once: true },
              immediateRender: false,
            });
          }
        });

        const cta = root.querySelector("[data-cta-reveal]");
        if (cta) {
          gsap.from(cta, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: cta, start: "top 88%", once: true },
            immediateRender: false,
          });
        }

        requestAnimationFrame(refresh);
        window.addEventListener("load", refresh);
        this.add(() => window.removeEventListener("load", refresh));
      }, root);

      return () => ctx.revert();
    },
    { scope: rootRef, dependencies: [reducedMotion] }
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
              Strategic alliances
            </p>
            <h1 className={styles.heroTitle} data-hero-reveal>
              Our Partners
            </h1>
            <p className={styles.heroLead} data-hero-reveal>
              We have collaborated with some of the leading Architects and Project Management
              Consultants (PMCs) in India, on one-of-a-kind projects.
            </p>
            <div className={styles.statsRow} data-hero-reveal>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PartnerSection
        sectionIndex="01"
        title="Leading Architects Collaborated with"
        description="Design partners who shape iconic commercial, institutional, and workplace environments across India."
        partners={ARCHITECT_PARTNERS}
      />

      <PartnerSection
        sectionIndex="02"
        title="Leading PMC's we Worked with"
        description="Project management consultants who trust us to deliver complex programmes on scope, schedule, and quality."
        partners={PMC_PARTNERS}
        reverseMarquee
      />

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox} data-cta-reveal>
            <h2 className={styles.ctaTitle}>Explore projects built with our partners</h2>
            <Link href="/projects/" className={styles.ctaButton}>
              <span>View our projects</span>
              <svg width="15" height="10" viewBox="0 0 13 10" aria-hidden>
                <path d="M1,5 L11,5" stroke="currentColor" strokeWidth="2" />
                <polyline points="8 1 12 5 8 9" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
