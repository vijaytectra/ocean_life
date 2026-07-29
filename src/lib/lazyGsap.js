"use client";

/**
 * Shared lazy GSAP loader.
 *
 * GSAP + ScrollTrigger is ~110 KB that costs well over a second of parse and
 * execute on a throttled mobile CPU. Loading it on `requestIdleCallback` still
 * put that cost inside the page-load window; loading it when the animated
 * section actually approaches the viewport keeps it out of the critical path
 * entirely, and users still get the animation before they can see it.
 */

let gsapPromise = null;

export function loadGsap() {
  gsapPromise =
    gsapPromise ||
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        return { gsap, ScrollTrigger };
      }
    );
  return gsapPromise;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

/**
 * Resolves on the visitor's first real engagement with the page.
 *
 * Scroll-reveal animations cannot matter before the visitor scrolls, so there
 * is no reason to spend main-thread time on GSAP during page load. Gating on
 * engagement keeps the whole library out of the load window; a visitor who
 * never scrolls simply sees the sections in their normal, final state.
 */
let engagementPromise = null;
function whenEngaged() {
  if (engagementPromise) return engagementPromise;

  engagementPromise = new Promise((resolve) => {
    if (typeof window === "undefined") return;
    // Already scrolled (e.g. restored scroll position or an anchor link).
    if (window.scrollY > 0) return resolve();

    const events = ["scroll", "pointerdown", "keydown", "touchstart", "wheel"];
    const done = () => {
      events.forEach((e) => window.removeEventListener(e, done));
      resolve();
    };
    events.forEach((e) =>
      window.addEventListener(e, done, { once: true, passive: true })
    );
  });

  return engagementPromise;
}

/**
 * Runs `callback({gsap, ScrollTrigger})` once the visitor has engaged with the
 * page *and* `element` is within `rootMargin` of the viewport. Returns a
 * cleanup function.
 */
export function whenNearViewport(element, callback, rootMargin = "300px") {
  if (!element || prefersReducedMotion()) return () => {};

  let cancelled = false;
  let cleanup;

  const start = async () => {
    await whenEngaged();
    if (cancelled) return;
    const lib = await loadGsap();
    if (cancelled) return;
    cleanup = callback(lib);
  };

  if (typeof IntersectionObserver === "undefined") {
    start();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        start();
      }
    },
    { rootMargin }
  );
  observer.observe(element);

  return () => {
    cancelled = true;
    observer.disconnect();
    cleanup?.();
  };
}
