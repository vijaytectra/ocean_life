"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  scrollTriggerConfig,
  isValidScrollTriggerTarget,
} from "@/lib/scrollTriggerSafe";
import styles from "./ProjectsImpactScroll.module.css";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    id: "sustainable",
    title: "Sustainable Delivery",
    metric: { value: 85, suffix: "%", label: "of flagship projects" },
    body: [
      "Green building practices woven into every flagship delivery —",
      "from material selection to on-site execution.",
    ],
    image: "/projectsOcean/p1.webp",
    alt: "Sustainable delivery — Ocean Lifespaces project",
    layout: "split",
  },
  {
    id: "scale",
    title: "Built at Scale",
    metric: { value: 4, suffix: "M+", label: "sq. ft. delivered" },
    note: "30+ years of engineering excellence",
    body: [
      "Three decades of civil, interior, and turnkey delivery",
      "for India’s leading corporate campuses.",
    ],
    image: "/projectsOcean/p6.webp",
    alt: "Built at scale — Ocean Lifespaces",
    layout: "split",
  },
  {
    id: "energy",
    title: "Energy & Efficiency",
    metric: { value: 550, suffix: "+", label: "projects delivered" },
    secondary: { value: 650, suffix: "+", label: "team professionals" },
    body: [
      "LEED-focused design, MEP optimisation, and façade systems",
      "that lower operational energy across commercial campuses.",
    ],
    image: "/projectsOcean/p3.webp",
    alt: "Energy efficient build — Ocean Lifespaces",
    layout: "wide",
  },
  {
    id: "responsible",
    title: "Building Responsibly",
    metric: { value: 30, suffix: "+", label: "years in operation" },
    secondary: { display: "1", suffix: "Mn+", label: "saplings planted" },
    body: [
      "Committed to the communities we build in —",
      "long-term partnerships across South India.",
    ],
    image: "/projectsOcean/p15.webp",
    alt: "Building responsibly — Ocean Lifespaces",
    layout: "hero",
  },
];

function MaskLine({ children, className = "" }) {
  return (
    <div className={styles.maskLine}>
      <div className={`${styles.maskInner} ${className}`} data-dentsu-line>
        {children}
      </div>
    </div>
  );
}

function DentsuMetric({ value, suffix, label, note, reduced, blockRef }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    const block = blockRef?.current;
    if (!el || !block || reduced) {
      if (el) el.textContent = String(value);
      return;
    }

    let tween = null;
    let cancelled = false;

    const start = () => {
      if (cancelled || !isValidScrollTriggerTarget(block)) {
        requestAnimationFrame(start);
        return;
      }

      const obj = { val: 0 };
      const tweenVars = {
        val: value,
        duration: 1.6,
        ease: "power2.out",
        onUpdate() {
          el.textContent = String(Math.floor(obj.val));
        },
      };
      const st = scrollTriggerConfig(block, {
        start: "top 72%",
        once: true,
      });
      if (st) tweenVars.scrollTrigger = st;

      tween = gsap.fromTo(obj, { val: 0 }, tweenVars);
    };

    requestAnimationFrame(start);

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [value, reduced, blockRef]);

  return (
    <div className={styles.metricGroup} data-dentsu-metric>
      <div className={styles.metricAnim} data-dentsu-metric-anim>
        <p className={styles.metricRow}>
          <span ref={numRef} className={styles.metricNum}>
            0
          </span>
          <span className={styles.metricSuffix}>{suffix}</span>
        </p>
      </div>
      <p className={styles.metricLabel}>{label}</p>
      {note && <p className={styles.metricNote}>{note}</p>}
    </div>
  );
}

function DentsuImage({ src, alt, blockRef }) {
  const [load, setLoad] = useState(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const block = blockRef?.current;
    if (!frame || !block) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "280px 0px", threshold: 0 }
    );
    io.observe(frame);
    return () => io.disconnect();
  }, [blockRef]);

  return (
    <div ref={frameRef} className={styles.imageFrame} data-dentsu-image>
      {load ? (
        <div className={styles.imageInner} data-dentsu-image-inner>
          <Image
            src={src}
            alt={alt}
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className={styles.imagePlaceholder} aria-hidden />
      )}
    </div>
  );
}

function DentsuChapter({ chapter, reduced }) {
  const blockRef = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;

      let ctx = null;
      let cancelled = false;

      const init = () => {
        const block = blockRef.current;
        if (cancelled || !block) return;
        if (!isValidScrollTriggerTarget(block)) {
          requestAnimationFrame(init);
          return;
        }

        ctx = gsap.context(() => {
          const title = block.querySelector("[data-dentsu-title]");
          const rule = block.querySelector("[data-dentsu-rule]");
          const metric = block.querySelector("[data-dentsu-metric-anim]");
          const metricSecondary = block.querySelector(
            "[data-dentsu-metric-secondary-anim]"
          );
          const lines = block.querySelectorAll("[data-dentsu-line]");
          const imageFrame = block.querySelector("[data-dentsu-image]");
          const imageInner = block.querySelector("[data-dentsu-image-inner]");

          if (title) gsap.set(title, { yPercent: 108 });
          const metricCopy = block.querySelectorAll(
            `.${styles.metricLabel}, .${styles.metricNote}`
          );

          if (metric) gsap.set(metric, { y: 36, opacity: 0 });
          if (metricSecondary) gsap.set(metricSecondary, { y: 24, opacity: 0 });
          if (metricCopy.length) gsap.set(metricCopy, { y: 14, opacity: 0 });
          lines.forEach((line) => gsap.set(line, { yPercent: 110 }));
          if (imageFrame) {
            gsap.set(imageFrame, {
              clipPath: "inset(0% 0% 100% 0% round 0px)",
            });
          }
          if (imageInner) gsap.set(imageInner, { scale: 1.14, yPercent: 8 });

          const st = scrollTriggerConfig(block, {
            start: "top 78%",
            once: true,
          });
          if (!st) return;

          const tl = gsap.timeline({ scrollTrigger: st });

          if (title) {
            tl.to(title, {
              yPercent: 0,
              duration: 1.05,
              ease: "power3.out",
            });
          }

          if (rule) {
            tl.fromTo(
              rule,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.95,
                ease: "power3.inOut",
                transformOrigin: "left center",
              },
              "-=0.55"
            );
          }

          if (metric) {
            tl.to(
              metric,
              { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
              "-=0.45"
            );
          }

          if (metricSecondary) {
            tl.to(
              metricSecondary,
              { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
              "-=0.55"
            );
          }

          if (metricCopy.length) {
            tl.to(
              metricCopy,
              { y: 0, opacity: 1, duration: 0.65, ease: "power2.out", stagger: 0.1 },
              "-=0.5"
            );
          }

          if (lines.length) {
            tl.to(
              lines,
              {
                yPercent: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.14,
              },
              "-=0.35"
            );
          }

          if (imageFrame) {
            tl.to(
              imageFrame,
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                duration: 1.2,
                ease: "power3.inOut",
              },
              "-=0.65"
            );
          }

          if (imageInner) {
            tl.to(
              imageInner,
              {
                scale: 1,
                yPercent: 0,
                duration: 1.35,
                ease: "power3.out",
              },
              "-=0.95"
            );
          }
        }, block);
      };

      requestAnimationFrame(() => requestAnimationFrame(init));

      return () => {
        cancelled = true;
        ctx?.revert();
      };
    },
    { scope: blockRef, dependencies: [reduced] }
  );

  const isHero = chapter.layout === "hero";
  const isWide = chapter.layout === "wide";

  return (
    <article
      ref={blockRef}
      data-dentsu-chapter
      className={`${styles.chapter} ${styles[chapter.layout]}`}
    >
      <div className={styles.chapterInner}>
        <div className={styles.textCol}>
          <MaskLine>
            <h2 className={styles.title} data-dentsu-title>
              {chapter.title}
            </h2>
          </MaskLine>

          <div className={styles.rule} data-dentsu-rule aria-hidden />

          <DentsuMetric
            value={chapter.metric.value}
            suffix={chapter.metric.suffix}
            label={chapter.metric.label}
            note={chapter.note}
            reduced={reduced}
            blockRef={blockRef}
          />

          {chapter.secondary && (
            <div className={styles.secondaryMetric} data-dentsu-metric-secondary>
              <div
                className={styles.metricAnim}
                data-dentsu-metric-secondary-anim
              >
                <p className={styles.metricRow}>
                  <span className={styles.metricNum}>
                    {chapter.secondary.display ?? chapter.secondary.value}
                  </span>
                  <span className={styles.metricSuffix}>
                    {chapter.secondary.suffix}
                  </span>
                </p>
              </div>
              <p className={styles.metricLabel}>{chapter.secondary.label}</p>
            </div>
          )}

          <div className={styles.bodyCopy}>
            {chapter.body.map((line) => (
              <MaskLine key={line}>
                <p className={styles.bodyText}>{line}</p>
              </MaskLine>
            ))}
          </div>
        </div>

        <div className={`${styles.visualCol} ${isHero ? styles.visualHero : ""}`}>
          <DentsuImage src={chapter.image} alt={chapter.alt} blockRef={blockRef} />
        </div>
      </div>

      {isWide && <div className={styles.chapterDivider} aria-hidden />}
    </article>
  );
}

export default function ProjectsImpactScroll() {
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || reducedMotion) return;

      const header = root.querySelector("[data-dentsu-header]");
      if (header) {
        gsap.fromTo(
          header,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.35,
          }
        );
      }

    },
    { scope: rootRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-label="Ocean Lifespaces project impact"
    >
      <header className={styles.header} data-dentsu-header>
        <p className={styles.eyebrow}>Our impact at scale</p>
      </header>

      <div className={styles.topPair}>
        <DentsuChapter chapter={CHAPTERS[0]} reduced={reducedMotion} />
        <DentsuChapter chapter={CHAPTERS[1]} reduced={reducedMotion} />
      </div>

      <DentsuChapter chapter={CHAPTERS[2]} reduced={reducedMotion} />
      <DentsuChapter chapter={CHAPTERS[3]} reduced={reducedMotion} />
    </section>
  );
}
