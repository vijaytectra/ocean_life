"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isValidScrollTriggerTarget } from "@/lib/scrollTriggerSafe";
import {
  initAboutStatCounters,
  revealOnScroll,
} from "@/lib/aboutAnimations";
import styles from "./AboutHeader.module.css";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 650, suffix: "+", label: "Employees" },
  { value: 550, suffix: "+", label: "Projects completed" },
  { value: 30, suffix: "", label: "Years in operation" },
];

export default function AboutHeader() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      let ctx = null;
      let cancelled = false;

      const init = () => {
        if (cancelled || !isValidScrollTriggerTarget(section)) {
          requestAnimationFrame(init);
          return;
        }

        ctx = gsap.context(function registerAboutHeader() {
          initAboutStatCounters(section, reducedMotion);

          if (!reducedMotion) {
            revealOnScroll(section, "[data-about-reveal]", section, {
              duration: 0.75,
              stagger: 0.09,
            });
          } else {
            gsap.set("[data-about-reveal]", { opacity: 1, y: 0 });
          }
        }, section);
      };

      requestAnimationFrame(init);

      return () => {
        cancelled = true;
        ctx?.revert();
      };
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section className={styles.aboutHeader} ref={sectionRef}>
      <Image
        src="/about/header-bg.webp"
        alt=""
        aria-hidden
        fill
        priority
        className={styles.heroBg}
        sizes="100vw"
      />
      <div className={styles.topBand} aria-hidden />
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.mediaCol} data-about-reveal>
            <div className={styles.mediaFrame}>
              <Image
                src="/about/header-left.webp"
                alt="Ocean Lifespaces workspace"
                width={480}
                height={560}
                className={styles.mediaImg}
                priority
              />
            </div>
          </div>

          <div className={styles.contentCol} data-about-reveal>
            <p className={styles.eyebrowLight}>About Ocean Lifespaces</p>
            <h1 className={styles.title}>Experience the difference</h1>
            <p className={styles.lead}>
              We create exceptional interior design solutions and build expertise
              that stands among the best in the industry.
            </p>

            <p className={styles.results}>Outstanding results</p>

            <div className={styles.statsRow} data-about-stats>
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

          <div className={styles.mediaCol} data-about-reveal>
            <div className={styles.mediaFrame}>
              <Image
                src="/about/header-right.webp"
                alt="Ocean Lifespaces project"
                width={480}
                height={560}
                className={styles.mediaImg}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
