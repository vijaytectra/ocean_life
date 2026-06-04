"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isValidScrollTriggerTarget } from "@/lib/scrollTriggerSafe";
import { revealOnScroll } from "@/lib/aboutAnimations";
import styles from "./AboutVision.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutVision() {
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
            gsap.set("[data-vision-reveal], [data-vision-mission]", {
              opacity: 1,
              y: 0,
            });
            return;
          }

          revealOnScroll(section, "[data-vision-reveal]", section, {
            duration: 0.75,
            stagger: 0.1,
          });

          const mission = section.querySelector(`.${styles.mission}`);
          if (mission) {
            revealOnScroll(section, "[data-vision-mission]", mission, {
              duration: 0.7,
              stagger: 0.1,
            });
          }
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
    <div className={styles.visionWrap} ref={sectionRef}>
      <section className={styles.quoteSection}>
        <div className="container">
          <div className={styles.quoteCard} data-vision-reveal>
            <span className={styles.quotePill}>Industry partnerships</span>
            <blockquote className={styles.quoteBlock}>
              <Image
                width={48}
                height={30}
                src="/about/quote.webp"
                alt=""
                className={styles.quoteIcon}
              />
              <p className={styles.quoteText}>
                We have collaborated with some of the leading Architects and
                Project Management Consultants (PMCs) in India, on one-of-a-kind
                projects.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionLayout}>
            <div className={styles.missionMain} data-vision-mission>
              <div className={styles.missionHighlight}>
                <span className={styles.eyebrow}>Our purpose</span>
                <h2 className={styles.missionTitle}>Mission and Vision</h2>

                <div className={styles.missionPoints}>
                  <article className={styles.pointCard}>
      
                    <p className={styles.missionText}>
                      We strive for excellence by continuously evolving our
                      systems, processes, and teams to stay ahead of our
                      clients&apos; present and future needs. Through innovation
                      and dedication, we ensure unparalleled service and
                      customer satisfaction. <br/> 

                      <br/> To establish ourselves as the most trusted and
                      sought-after name across industries, building lasting
                      partnerships and achieving success that transcends
                      boundaries.
                    </p>
                  </article>
                </div>
              </div>

              <div className={styles.missionImgWide}>
                <Image
                  width={560}
                  height={280}
                  src="/about/vision-left.webp"
                  alt="Ocean Lifespaces mission"
                  className={styles.missionImg}
                  sizes="(max-width: 900px) 100vw, 60vw"
                />
              </div>
            </div>

            <aside className={styles.missionAside} data-vision-mission>
              <div className={styles.asideFrame}>
                <Image
                  width={420}
                  height={520}
                  src="/about/vision-right.webp"
                  alt="Ocean Lifespaces vision"
                  className={styles.sideImg}
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
