"use client";

import { useEffect } from "react";
import { whenNearViewport } from "@/lib/lazyGsap";

/**
 * Headless scroll-reveal island.
 *
 * Several homepage sections were Client Components for one reason only: they
 * ran a GSAP ScrollTrigger timeline over their own markup. That pulled their
 * entire subtree — markup, icons, data — into the client bundle and into
 * hydration, which is most of what kept TBT above 1.5 s.
 *
 * This component renders nothing. It attaches the same timeline to a section
 * that is rendered on the server, so the section itself can stay a Server
 * Component. GSAP is imported dynamically on idle, so it never sits on the
 * hydration critical path.
 *
 * @param {string} rootId  id of the server-rendered section to animate
 * @param {Array}  steps   [{ targets, vars, position }] — `targets` is a
 *                         selector resolved inside the section; each entry maps
 *                         to one `timeline.from(...)` call, so a multi-step
 *                         sequence reproduces exactly what the component did
 *                         inline before
 * @param {object} trigger ScrollTrigger options (start/end/scrub/toggleActions)
 */
export default function SectionReveal({ rootId, steps = [], trigger = {} }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    return whenNearViewport(root, ({ gsap }) => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, ...trigger },
        });

        for (const step of steps) {
          const nodes = step.targets
            ? root.querySelectorAll(step.targets)
            : [root];
          if (!nodes.length) continue;
          if (step.position !== undefined) {
            tl.from(nodes, step.vars, step.position);
          } else {
            tl.from(nodes, step.vars);
          }
        }
      }, root);

      return () => ctx.revert();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootId]);

  return null;
}
