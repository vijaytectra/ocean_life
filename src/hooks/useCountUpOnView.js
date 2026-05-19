"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Animates numeric counters when the container enters the viewport.
 * Uses IntersectionObserver (reliable on SSR/production) instead of ScrollTrigger-only.
 */
export function useCountUpOnView(targets, options = {}) {
  const { duration = 2, rootMargin = "0px 0px -15% 0px", enabled = true } = options;
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const [values, setValues] = useState(() =>
    Object.fromEntries((targets || []).map((t) => [t.id, t.end ?? 0]))
  );

  const animate = useCallback(() => {
    if (hasAnimatedRef.current || !targets?.length) return;
    hasAnimatedRef.current = true;

    setValues(Object.fromEntries(targets.map((t) => [t.id, 0])));

    targets.forEach((target) => {
      gsap.to(
        { value: 0 },
        {
          value: target.end,
          duration,
          ease: "power1.out",
          onUpdate: function () {
            setValues((prev) => ({
              ...prev,
              [target.id]: Math.floor(this.targets()[0].value),
            }));
          },
        }
      );
    });
  }, [targets, duration]);

  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    const tryAnimate = () => {
      if (hasAnimatedRef.current) return;
      const rect = el.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.85 && rect.bottom > rect.height * 0.15;
      if (inView) animate();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          animate();
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.15 }
    );

    observer.observe(el);
    requestAnimationFrame(tryAnimate);

    return () => observer.disconnect();
  }, [animate, rootMargin, enabled]);

  return { containerRef, values };
}
