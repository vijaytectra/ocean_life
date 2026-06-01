"use client";

import Styles from "./AboutHeader.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useCountUpOnView } from "@/hooks/useCountUpOnView";

gsap.registerPlugin(ScrollTrigger);

const COUNTER_TARGETS = [
  { id: "employees", end: 650 },
  { id: "projects", end: 550 },
  { id: "experience", end: 30 },
];

function AboutHeader() {
  const { containerRef: counterRef, values: counters } =
    useCountUpOnView(COUNTER_TARGETS);

  const textRef = useRef(null);
  const imageRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });

      imageRefs.current.forEach((img, index) => {
        if (!img) return;
        gsap.from(img, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
          },
        });
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section className={Styles.aboutHeader} ref={sectionRef}>
      <div ref={counterRef} className={Styles.rowAh}>
        <div className={Styles.columnAboutHeader}>
          <img
            ref={(el) => {
              imageRefs.current[0] = el;
            }}
            className={Styles.imageOneAbout}
            src="/about/header-left.webp"
            alt="Ocean Lifespaces workspace"
          />
        </div>
        <div className={Styles.columnAboutHeader}>
          <div className={Styles.innercolumnAh} ref={textRef}>
            <h2 className="h2">Experience the difference</h2>
            <p className="description">
              To create exceptional interior design solutions and accumulate an
              expertise that is the best in the industry.
            </p>
          </div>
          <div className={Styles.innercolumnAh}>
            <h3 className="h4 align-self-end">
              Outstanding <br></br>Results
            </h3>
            <div className={Styles.aboutCounter}>
              <div className={Styles.counterBox}>
                <p className="description">Number of Employees</p>
                <h4 className="h3">{counters.employees}+</h4>
              </div>
              <div className={Styles.counterBox}>
                <p className="description">Projects Completed</p>
                <h4 className="h3">{counters.projects}+</h4>
              </div>
              <div className={Styles.counterBox}>
                <p className="description">Years in Operation</p>
                <h4 className="h3">{counters.experience}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.columnAboutHeader}>
          <Image
            width={300}
            height={200}
            ref={(el) => {
              imageRefs.current[1] = el;
            }}
            src="/about/header-right.webp"
            alt="Ocean Lifespaces project"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutHeader;