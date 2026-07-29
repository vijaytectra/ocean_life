"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

    // This used to `import gsap from "gsap"` at module scope purely to tween
    // four numbers, which pulled the whole animation library into the initial
    // bundle of every page using the hook. `power1.out` is `1 - (1 - t)^2`, so
    // the same curve is reproduced here in a plain rAF loop with no dependency
    // and no library parse cost.
    const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
    const totalMs = duration * 1000;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / totalMs, 1);
      const eased = easeOutQuad(progress);

      setValues(
        Object.fromEntries(
          targets.map((t) => [t.id, Math.floor(eased * (t.end ?? 0))])
        )
      );

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
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
