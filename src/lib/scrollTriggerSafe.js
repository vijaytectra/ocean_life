import gsap from "gsap";

/** Minimum trigger height (px) before scrub / end-based ScrollTriggers are allowed */
const MIN_SCRUB_HEIGHT = 120;

/** Returns true when element can be used as a ScrollTrigger trigger */
export function isValidScrollTriggerTarget(trigger) {
  if (typeof window === "undefined") return false;
  if (!trigger?.isConnected) return false;

  let el = trigger;
  while (el) {
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    el = el.parentElement;
  }

  const rect = trigger.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

/** Guard ScrollTrigger config when the trigger element is not ready */
export function scrollTriggerConfig(trigger, config = {}) {
  if (!isValidScrollTriggerTarget(trigger)) return undefined;

  const height = trigger.getBoundingClientRect().height;
  const needsScrollRange =
    config.scrub != null ||
    (typeof config.end === "string" && config.end.length > 0);

  if (needsScrollRange && height < MIN_SCRUB_HEIGHT) return undefined;

  return { trigger, invalidateOnRefresh: true, ...config };
}

/** gsap.fromTo with optional ScrollTrigger — skips ST when trigger is invalid */
export function safeFromTo(target, fromVars, toVars, trigger, stPartial = {}) {
  if (!target) return null;

  const st = scrollTriggerConfig(trigger, stPartial);
  const tweenVars = { ...toVars };
  if (st) tweenVars.scrollTrigger = st;

  return gsap.fromTo(target, fromVars, tweenVars);
}
