"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Styles from "@/app/page.module.css";
import {
  FaUsers,
  FaRegHandshake,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";
import { useCountUpOnView } from "@/hooks/useCountUpOnView";
import { whenNearViewport } from "@/lib/lazyGsap";

/**
 * "Delivering Excellence" section, extracted from the home page so the page
 * itself can be a Server Component.
 *
 * Counter targets are resolved on the server and passed in as props, replacing
 * the post-hydration `fetch("/api/content")` this section used to run. The
 * count-up (useCountUpOnView) and the GSAP reveal are unchanged; GSAP is now
 * imported dynamically on idle so it stays off the hydration critical path.
 */
export default function DreamSection({ counterTargets }) {
  const dreamSectionRef = useRef(null);
  const { containerRef: counterRef, values: counters } =
    useCountUpOnView(counterTargets);

  useEffect(() => {
    const section = dreamSectionRef.current;
    if (!section) return;

    return whenNearViewport(section, ({ gsap }) => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(
          section.querySelectorAll("h4, h2, p, img, .dreamFloat, .counterBox"),
          {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
          }
        );
      }, section);

      return () => ctx.revert();
    });
  }, []);

  return (
    <section ref={dreamSectionRef} className={Styles.dreamSection}>
      <div className="container">
        <div className={Styles.rowDream}>
          <div className={Styles.columnDream}>
            <h4>Exceeding Expectations, Building Excellence</h4>
            <h2>Delivering Excellence</h2>
            <p>
              With almost three decades of experience in the field of Civil
              Construction, Interior Fitout and Infrastructure Development, our
              efforts are always focussed on exceeding our client&apos;s
              expectations.
            </p>
            <p>
              With our Managing Director and CEO, Mr. S.K. Peter at the helm of
              the business, we have made strides in becoming one of the most
              sought-after companies in the field of turnkey interior fitout
              contracting and civil construction.
            </p>
            <p>
              We focus on creating world class structures and spaces, by
              consistently upgrading our systems, techniques, and teams, to
              ensure that we place the present and future needs of our
              clientele, above all else.
            </p>
            <div className={Styles.dreamCounter}>
              <div ref={counterRef} className={Styles.counterSection}>
                <div className={Styles.counterBox}>
                  <FaUsers
                    size={30}
                    color="var(--color-orange)"
                    style={{ marginBottom: "10px" }}
                    aria-hidden="true"
                  />
                  <h3>Number of Employees</h3>
                  <p>{counters.employees}+</p>
                </div>
                <div className={Styles.counterBox}>
                  <FaRegHandshake
                    size={30}
                    color="var(--color-orange)"
                    style={{ marginBottom: "10px" }}
                    aria-hidden="true"
                  />
                  <h3>Client Return Rate</h3>
                  <p>{counters.projects}%</p>
                </div>
                <div className={Styles.counterBox}>
                  <FaCalendarAlt
                    size={30}
                    color="var(--color-orange)"
                    style={{ marginBottom: "10px" }}
                    aria-hidden="true"
                  />
                  <h3>Years in Operation</h3>
                  <p>{counters.experience}</p>
                </div>
                <div className={Styles.counterBox}>
                  <FaBuilding
                    size={30}
                    color="var(--color-orange)"
                    style={{ marginBottom: "10px" }}
                    aria-hidden="true"
                  />
                  <h3>Projects Completed</h3>
                  <p>{counters.ongoing}+</p>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.columnDream}>
            <Image
              src="/dreamImage.webp"
              alt="Ocean Lifespaces project delivery"
              width={624}
              height={476}
              sizes="(max-width: 768px) 100vw, 40vw"
              loading="lazy"
            />
            <p className={Styles.dreamFloat}>
              Our motto is simple. Hardwork followed by the belief that nothing
              is impossible!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
