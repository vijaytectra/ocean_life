"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isValidScrollTriggerTarget } from "@/lib/scrollTriggerSafe";
import styles from "./CareersWhyJoin.module.css";

gsap.registerPlugin(ScrollTrigger);

const WHY_JOIN = [
  {
    value: 30,
    suffix: "+",
    title: "Years of Legacy",
    text: "Be part of a trusted name in construction and real estate development across South India.",
    theme: "blue",
  },
  {
    value: 550,
    suffix: "+",
    title: "Diverse Projects",
    text: "Work on corporate campuses, data centres, hospitals, and large-scale commercial builds.",
    theme: "orange",
  },
  {
    value: 100,
    suffix: "%",
    title: "Growth & Learning",
    text: "Structured roles with mentorship from experienced project and engineering leaders.",
    theme: "blue",
  },
  {
    value: 3,
    suffix: "+",
    title: "Multi-City Presence",
    text: "Opportunities in Chennai, Bangalore, Hyderabad, and expanding locations.",
    theme: "orange",
  },
];

function WhyJoinCard({ item }) {
  return (
    <article
      className={`${styles.card} ${styles[item.theme]}`}
      data-why-card
    >
      <p className={styles.metricValue}>
        <span data-stat-value={item.value} data-stat-suffix={item.suffix}>
          0{item.suffix}
        </span>
      </p>
      <p className={styles.statLabel}>{item.title}</p>
      <p className={styles.cardText}>{item.text}</p>
    </article>
  );
}

export default function CareersWhyJoin() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.querySelectorAll("[data-why-intro], [data-why-card]").forEach((el) => {
      el.style.removeProperty("opacity");
      el.style.removeProperty("visibility");
      el.style.removeProperty("transform");
    });
  }, []);

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

        ctx = gsap.context(function registerWhyJoinAnimations() {
          const refresh = () => ScrollTrigger.refresh();

          /* Stat counters — same as Our Clients hero */
          section.querySelectorAll("[data-stat-value]").forEach((el) => {
            const end = Number(el.getAttribute("data-stat-value")) || 0;
            const suffix = el.getAttribute("data-stat-suffix") || "";

            if (reducedMotion) {
              el.textContent = `${end}${suffix}`;
              return;
            }

            const counter = { val: 0 };
            gsap.to(counter, {
              val: end,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el.closest("[data-why-stats]") || section,
                start: "top 88%",
                once: true,
              },
              onUpdate: () => {
                el.textContent = `${Math.round(counter.val)}${suffix}`;
              },
            });
          });

          if (!reducedMotion) {
            gsap.fromTo(
              "[data-why-intro]",
              { y: 28 },
              {
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 88%",
                  once: true,
                },
              }
            );

            const grid = section.querySelector("[data-why-stats]");
            if (grid) {
              gsap.fromTo(
                "[data-why-card]",
                { y: 40 },
                {
                  y: 0,
                  duration: 0.8,
                  stagger: 0.1,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: grid,
                    start: "top 85%",
                    once: true,
                  },
                }
              );
            }
          }

          requestAnimationFrame(refresh);
          window.addEventListener("load", refresh);
          this.add(() => window.removeEventListener("load", refresh));
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
    <section className={styles.why} ref={sectionRef}>
      <div className="container">
        <div className={styles.layout}>
          <header className={styles.header} data-why-intro>
            <p className={styles.eyebrow}>Why Ocean</p>
            <h2 className={styles.title}>
              Why <span className={styles.titleHighlight}>Join Us</span>
            </h2>
            <div className={styles.divider} aria-hidden />
            <p className={styles.lead}>
              Scale, stability, and room to grow — backed by three decades of
              delivery excellence.
            </p>
          </header>

          <div className={styles.cardsWrap}>
            <div className={styles.accentBlock} aria-hidden />
            <div className={styles.grid} data-why-stats>
              {WHY_JOIN.map((item) => (
                <WhyJoinCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
