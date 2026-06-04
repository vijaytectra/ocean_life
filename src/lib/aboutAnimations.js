import gsap from "gsap";

/** Keep scroll animations snappy for UX and SEO (total reveal under 4s). */
export const ABOUT_REVEAL_DURATION = 0.8;
export const ABOUT_STAGGER = 0.08;
export const ABOUT_EASE = "power3.out";
export const ABOUT_SCROLL_START = "top 86%";

export function initAboutStatCounters(section, reducedMotion) {
  if (!section) return;

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
        trigger: el.closest("[data-about-stats]") || section,
        start: ABOUT_SCROLL_START,
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${Math.round(counter.val)}${suffix}`;
      },
    });
  });
}

export function revealOnScroll(scope, selector, trigger, options = {}) {
  if (!scope) return;

  const targets = scope.querySelectorAll(selector);
  if (!targets.length) return;

  const {
    y = 28,
    duration = ABOUT_REVEAL_DURATION,
    stagger = ABOUT_STAGGER,
    delay = 0,
  } = options;

  gsap.fromTo(
    targets,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: ABOUT_EASE,
      scrollTrigger: {
        trigger: trigger || scope,
        start: ABOUT_SCROLL_START,
        once: true,
      },
      clearProps: "opacity",
    }
  );
}
