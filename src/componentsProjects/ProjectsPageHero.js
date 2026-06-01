"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ProjectsPageHero({ className, children }) {
  const headingRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading || reducedMotion) return;

      gsap.fromTo(
        heading,
        { y: 48, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
          delay: 0.12,
        }
      );
    },
    { dependencies: [reducedMotion] }
  );

  return (
    <h1 ref={headingRef} className={className}>
      {children}
    </h1>
  );
}
