"use client";

import React, { useRef, useEffect } from "react";
import Styles from "./ScrollSection.module.css";
import Link from "next/link";
import { whenNearViewport } from "@/lib/lazyGsap";

/**
 * Pinned horizontal "About" section.
 *
 * The behaviour is unchanged; what changed is *when* GSAP arrives. gsap,
 * ScrollTrigger and @gsap/react used to be static imports, so ~120 KB of
 * animation code was parsed and executed during hydration — and ScrollTrigger's
 * pin setup reads layout synchronously, which is where the forced reflows in
 * the trace came from. Everything now loads in one dynamic import on idle,
 * after the page is interactive.
 */
function ScrollSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const linkRef = useRef(null);
  const contentRef = useRef(null);
  const mainSectionRef = useRef(null);
  const circleContainerRef = useRef(null);
  const circleRefs = useRef([]);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    return whenNearViewport(trigger, ({ gsap }) => {
      const scrub = {
        trigger: mainSectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 3,
      };

      const ctx = gsap.context(() => {
        gsap
          .timeline()
          .from(contentRef.current, {
            opacity: 0,
            y: 200,
            duration: 1,
            scrollTrigger: { ...scrub, start: "top 80%" },
          })
          .from(headingRef.current, {
            opacity: 0,
            y: 200,
            duration: 1,
            scrollTrigger: { ...scrub },
          })
          .from(descriptionRef.current, {
            opacity: 0,
            y: 200,
            duration: 1,
            scrollTrigger: { ...scrub },
          })
          .from(linkRef.current, {
            opacity: 0,
            y: 200,
            duration: 1,
            scrollTrigger: { ...scrub },
          });

        // Horizontal pin
        gsap.fromTo(
          sectionRef.current,
          { translateX: 0 },
          {
            translateX: "-100vw",
            ease: "none",
            duration: 1,
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top",
              end: "2000 top",
              scrub: 0.6,
              pin: true,
            },
          }
        );
      });

      // Circles fade in/out as they cross the viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            gsap.to(entry.target, {
              opacity: entry.isIntersecting ? 1 : 0,
              y: entry.isIntersecting ? 0 : 200,
              duration: 1,
            });
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.1 }
      );
      circleRefs.current.forEach((el) => el && observer.observe(el));

      return () => {
        observer.disconnect();
        ctx.revert();
      };
    });
  }, []);

  return (
    <section className={Styles.scrollSectionOuter}>
      <div ref={triggerRef}>
        <div ref={sectionRef} className={Styles.scrollSectionInner}>
          <div className={Styles.scrollSection} ref={mainSectionRef}>
            <div className={Styles.sectionAbout}>
              <div className={Styles.aboutContent} ref={contentRef}>
                <h2 className={Styles.aboutHeading} ref={headingRef}>
                  About Us
                </h2>
                <p className={Styles.aboutDescription} ref={descriptionRef}>
                  Established in 1996 as Ocean Interiors Limited,{" "}
                  <Link href={"https://www.olipl.com/"}>
                    Ocean Lifespaces India Private Limited
                  </Link>{" "}
                  has evolved into a premier name in the industry. Under the
                  visionary leadership of Mr. S.K. Peter, MD & CEO, the company
                  has expanded its expertise to encompass General Contracting,
                  including MEP, Design & Build, Civil Construction, and Façade
                  works, delivering excellence across all sectors.
                </p>
                <Link href={"/about"} ref={linkRef} aria-label="Learn more about Ocean Lifespaces">
                  <button type="button" className={Styles.cta}>
                    <span>Learn More<span className="visually-hidden"> about Ocean Lifespaces</span></span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10" aria-hidden="true">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className={Styles.scrollSection} ref={circleContainerRef}>
            <div className={Styles.sectionAboutTwo}>
              <div className={Styles.circlesContainer}>
                <div className={Styles.circlesRow}>
                  <Link href={"/services/turnkey-solutions"}>
                    <div
                      className={Styles.circle}
                      ref={(el) => (circleRefs.current[0] = el)}
                    >
                      <h3 className={Styles.circleText}>Turnkey Solutions</h3>
                    </div>
                  </Link>
                  <Link href={"/services/interior-fit-out-services"}>
                    <div
                      className={Styles.circle}
                      ref={(el) => (circleRefs.current[1] = el)}
                    >
                      <h3 className={Styles.circleText}>
                        Interior Fit-Out Services
                      </h3>
                    </div>
                  </Link>
                  <Link href={"/services/civil-construction"}>
                    <div
                      className={Styles.circle}
                      ref={(el) => (circleRefs.current[2] = el)}
                    >
                      <h3 className={Styles.circleText}>Civil Construction</h3>
                    </div>
                  </Link>
                </div>
                <div
                  className={Styles.circlesRow}
                  style={{ marginTop: "clamp(-40px, -6vh, -6vh)" }}
                >
                  <Link href={"/services/real-estate-development"}>
                    <div
                      className={Styles.circle}
                      ref={(el) => (circleRefs.current[3] = el)}
                    >
                      <h3 className={Styles.circleText}>
                        Real Estate <br></br>Development
                      </h3>
                    </div>
                  </Link>
                  <Link href={"/services/infrastructure-development"}>
                    <div
                      className={Styles.circle}
                      ref={(el) => (circleRefs.current[4] = el)}
                    >
                      <h3 className={Styles.circleText}>
                        Infrastructure<br></br> Development
                      </h3>
                    </div>
                  </Link>
                  <Link href={"/services/hospitals-and-hospitality"}>
                    <div
                      className={Styles.circle}
                      ref={(el) => (circleRefs.current[5] = el)}
                    >
                      <h3 className={Styles.circleText}>
                        Hospitals and <br></br>Hospitality
                      </h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScrollSection;
