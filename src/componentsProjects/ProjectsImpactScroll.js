"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCountUpOnView } from "@/hooks/useCountUpOnView";
import styles from "./ProjectsImpactScroll.module.css";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    id: "sustainable",
    title: "Sustainable Delivery",
    metric: { id: "sustainable", value: 85, suffix: "%", label: "of flagship projects" },
    body: [
      "Green building practices woven into every flagship delivery —",
      "from material selection to on-site execution.",
    ],
    image: "/projectsOcean/p1.webp",
    alt: "Sustainable delivery — Ocean Lifespaces project",
  },
  {
    id: "scale",
    title: "Built at Scale",
    metric: { id: "scale", value: 4, suffix: "M+", label: "sq. ft. delivered" },
    note: "30+ years of engineering excellence",
    body: [
      "Three decades of civil, interior, and turnkey delivery",
      "for India’s leading corporate campuses.",
    ],
    image: "/projectsOcean/p6.webp",
    alt: "Built at scale — Ocean Lifespaces",
  },
  {
    id: "energy",
    title: "Energy & Efficiency",
    metric: { id: "energy", value: 550, suffix: "+", label: "projects delivered" },
    secondary: { id: "energyTeam", display: 650, suffix: "+", label: "team professionals" },
    body: [
      "LEED-focused design, MEP optimisation, and façade systems",
      "that lower operational energy across commercial campuses.",
    ],
    image: "/projectsOcean/p3.webp",
    alt: "Energy efficient build — Ocean Lifespaces",
  },
  {
    id: "responsible",
    title: "Building Responsibly",
    metric: { id: "responsible", value: 30, suffix: "+", label: "years in operation" },
    secondary: { id: "saplings", display: "1", suffix: "Mn+", label: "saplings planted" },
    body: [
      "Committed to the communities we build in —",
      "long-term partnerships across South India.",
    ],
    image: "/projectsOcean/p15.webp",
    alt: "Building responsibly — Ocean Lifespaces",
  },
];

const COUNT_TARGETS = [
  { id: "sustainable", end: 85 },
  { id: "scale", end: 4 },
  { id: "energy", end: 550 },
  { id: "energyTeam", end: 650 },
  { id: "responsible", end: 30 },
];

function StatPill({ value, suffix, label }) {
  return (
    <div className={styles.statPill}>
      <p className={styles.statPillValue}>
        {value}
        <span>{suffix}</span>
      </p>
      <p className={styles.statPillLabel}>{label}</p>
    </div>
  );
}

function ImpactRow({ chapter, values }) {
  const primaryValue = values[chapter.metric.id] ?? chapter.metric.value;
  const secondaryValue = chapter.secondary
    ? chapter.secondary.id
      ? values[chapter.secondary.id] ?? chapter.secondary.display
      : chapter.secondary.display
    : null;

  return (
    <article className={styles.row} data-impact-row>
      <div className={styles.rowThumb}>
        <Image
          src={chapter.image}
          alt={chapter.alt}
          fill
          className={styles.rowImg}
          sizes="180px"
        />
      </div>

      <div className={styles.rowContent}>
        <h3 className={styles.rowTitle}>{chapter.title}</h3>

        <div className={styles.rowStats}>
          <StatPill
            value={primaryValue}
            suffix={chapter.metric.suffix}
            label={chapter.metric.label}
          />
          {chapter.secondary && (
            <StatPill
              value={secondaryValue}
              suffix={chapter.secondary.suffix}
              label={chapter.secondary.label}
            />
          )}
        </div>

        {chapter.note && <p className={styles.rowNote}>{chapter.note}</p>}

        <div className={styles.rowBody}>
          {chapter.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsImpactScroll() {
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { containerRef, values } = useCountUpOnView(COUNT_TARGETS, {
    enabled: !reducedMotion,
    duration: 1.6,
  });

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || reducedMotion) return;

      gsap.from("[data-impact-header]", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 88%", once: true },
        immediateRender: false,
      });

      gsap.from("[data-impact-row]", {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.querySelector(`.${styles.grid}`),
          start: "top 90%",
          once: true,
        },
        immediateRender: false,
      });
    },
    { scope: rootRef, dependencies: [reducedMotion] }
  );

  const displayValues = reducedMotion
    ? { sustainable: 85, scale: 4, energy: 550, energyTeam: 650, responsible: 30 }
    : values;

  return (
    <section ref={rootRef} className={styles.section} aria-label="Ocean Lifespaces project impact">
      <div className={styles.sectionBg} aria-hidden />
      <div className="container">
        <header className={styles.header} data-impact-header>
          <h2 className={styles.heading}>Our impact at scale</h2>
          <p className={styles.lead}>
            Measurable outcomes across sustainability, scale, efficiency, and community commitment.
          </p>
        </header>

        <div ref={containerRef} className={styles.grid}>
          {CHAPTERS.map((chapter) => (
            <ImpactRow key={chapter.id} chapter={chapter} values={displayValues} />
          ))}
        </div>
      </div>
    </section>
  );
}
