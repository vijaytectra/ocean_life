"use client";

import { useCountUpOnView } from "@/hooks/useCountUpOnView";
import styles from "./AboutHeader.module.css";

const STATS = [
  { id: "employees", end: 750, suffix: "+", label: "Employees" },
  { id: "projects", end: 550, suffix: "+", label: "Projects completed" },
  { id: "years", end: 30, suffix: "", label: "Years in operation" },
];

export default function AboutHeaderStats() {
  const { containerRef, values } = useCountUpOnView(STATS, {
    duration: 2,
    rootMargin: "0px",
  });

  return (
    <div className={styles.statsRow} ref={containerRef}>
      {STATS.map((stat) => (
        <div key={stat.id} className={styles.stat}>
          <p className={styles.statValue}>
            {values[stat.id]}
            {stat.suffix}
          </p>
          <p className={styles.statLabel}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
