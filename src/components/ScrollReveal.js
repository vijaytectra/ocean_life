"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/** Lazy-load + clip + scale reveal (agency-style scroll image) */
export function ScrollRevealImage({
  src,
  alt,
  width = 1200,
  height = 800,
  className = "",
  wrapClassName = "",
  priority = false,
  aspectRatio = "16 / 9",
}) {
  const wrapRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [revealed, setRevealed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 }
    );
    loadObserver.observe(el);

    return () => loadObserver.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !shouldLoad) return;

    if (reducedMotion) {
      setRevealed(true);
      return;
    }

    const media = wrap.querySelector(`.${styles.mediaInner}`);
    if (!media) return;

    const ctx = gsap.context(() => {
      gsap.set(wrap, { opacity: 1 });
      gsap.set(media, {
        scale: 1.14,
        yPercent: 6,
        filter: "blur(8px)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 88%",
          once: true,
        },
        onComplete: () => setRevealed(true),
      });

      tl.to(
        wrap,
        {
          clipPath: "inset(0% 0% 0% 0% round 12px)",
          duration: 1.15,
          ease: "power3.inOut",
        },
        0
      ).to(
        media,
        {
          scale: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 1.35,
          ease: "power3.out",
        },
        0.12
      );
    }, wrap);

    return () => ctx.revert();
  }, [shouldLoad, reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className={`${styles.imageWrap} ${wrapClassName}`}
      style={{ aspectRatio }}
      data-revealed={revealed ? "true" : "false"}
    >
      <div className={styles.imageShade} aria-hidden />
      {shouldLoad ? (
        <div className={`${styles.mediaInner} ${className}`}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority={priority}
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>
      ) : (
        <div className={styles.placeholder} aria-hidden />
      )}
    </div>
  );
}

/** Text / block fade + rise on scroll */
export function ScrollRevealBlock({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, reducedMotion]);

  return (
    <Tag ref={ref} className={`${styles.revealBlock} ${className}`}>
      {children}
    </Tag>
  );
}

/** Attach reveal to project grid images on /projects */
export function useProjectsGridReveal() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const cards = document.querySelectorAll("[data-project-card]");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const img = card.querySelector("img");
        const content = card.querySelector("[data-project-content]");
        if (!img) return;

        gsap.set(card, {
          clipPath: "inset(0% 0% 100% 0% round clamp(10px, 1vw, 1vw))",
        });
        gsap.set(img, { scale: 1.14, yPercent: 6, filter: "brightness(0.85)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });

        tl.to(card, {
          clipPath: "inset(0% 0% 0% 0% round clamp(10px, 1vw, 1vw))",
          duration: 1.15,
          ease: "power3.inOut",
          delay: (index % 3) * 0.1,
        })
          .to(
            img,
            {
              scale: 1,
              yPercent: 0,
              filter: "brightness(1)",
              duration: 1.35,
              ease: "power3.out",
            },
            0.12
          )
          .from(
            content,
            {
              opacity: 0,
              y: 32,
              duration: 0.75,
              ease: "power3.out",
            },
            0.25
          );
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);
}

export function ProjectsGridRevealInit() {
  useProjectsGridReveal();
  return null;
}
