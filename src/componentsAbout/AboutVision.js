"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Styles from "./AboutVision.module.css";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function AboutVision() {
  const visionTopRef = useRef(null);
  const visionSecRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: visionTopRef.current,
          start: "top 80%", // Trigger when the top of the section reaches 80% of the viewport
          end: "bottom 80%", // End when the bottom of the section hits the bottom of the viewport
          scrub: 1, // Smooth scrubbing
        },
      });

      // Animate the first section
      tl.from(visionTopRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
      })
        // Animate the second section
        .from(
          visionSecRef.current,
          {
            opacity: 0,
            y: 100,
            duration: 1,
          },
          "-=0.5"
        ); // Start this animation half a second before the previous one ends
    }, visionTopRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <>
      <section ref={visionTopRef} className={Styles.visionTop}>
        <div className={Styles.rowVisionTop}>
          <Image width={54} height={33} src="/about/quote.webp" alt="image" />
          <p className="h4">
            We have collaborated with some of the leading Architects and Project
            Management Consultants (PMCs) in India, on one-of-a-kind projects.
          </p>
        </div>
      </section>
      <section ref={visionSecRef} className={Styles.visionSec}>
        <div className={Styles.visionSecRow}>
          <div className={Styles.columnVsion}>
            <h3 className="h3">Mission and Vision</h3>
            <p className="description">
              We strive for excellence by continuously evolving our systems,
              processes, and teams to stay ahead of our clients present and
              future needs. Through innovation and dedication, we ensure
              unparalleled service and customer satisfaction.
            </p>
            <p className="description">
              To establish ourselves as the most trusted and sought-after name
              across industries, building lasting partnerships and achieving
              success that transcends boundaries.
            </p>
            <Image
              width={300}
              height={100}
              src="/about/vision-left.webp"
              alt="image"
            />
          </div>
          <div className={Styles.columnVsion}>
            <Image
              width={300}
              height={100}
              src="/about/vision-right.webp"
              alt="image"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutVision;
