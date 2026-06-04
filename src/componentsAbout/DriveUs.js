"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isValidScrollTriggerTarget } from "@/lib/scrollTriggerSafe";
import { revealOnScroll } from "@/lib/aboutAnimations";
import styles from "./DriveUs.module.css";
import ImageSlider from "./ImageSlider";

gsap.registerPlugin(ScrollTrigger);

export default function DriveUs() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      let ctx = null;
      let cancelled = false;

      const init = () => {
        if (cancelled || !isValidScrollTriggerTarget(section)) {
          requestAnimationFrame(init);
          return;
        }

        ctx = gsap.context(() => {
          if (reducedMotion) {
            gsap.set("[data-drive-reveal]", { opacity: 1, y: 0 });
            return;
          }

          revealOnScroll(section, "[data-drive-reveal]", section, {
            duration: 0.8,
            stagger: 0.1,
          });
        }, section);
      };

      requestAnimationFrame(init);

      return () => {
        cancelled = true;
        ctx?.revert();
      };
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} className={styles.driveUs}>
      <div className="container">
        <div className={styles.mainRowDriveUs}>
          <header className={styles.intro} data-drive-reveal>
            <p className={styles.eyebrow}>Our ethos</p>
            <h2 className={styles.title}>What Drives Us</h2>
            <p className={styles.lead}>
              Our passion for excellence fuels every project we undertake. With a
              commitment to innovation, quality, and client satisfaction, we craft
              spaces that inspire and elevate experiences.
            </p>
          </header>
          <div className={styles.sliderWrap} data-drive-reveal>
            <ImageSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
