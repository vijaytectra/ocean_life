"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Styles from "./home.module.css";
import ScrollSection from "./ScrollSection";

export default function Home() {
  const videoContainer = useRef(null);
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(headingRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5,
    });

    tl.from(descriptionRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5,
    });
  }, []);

  return (
    <div>
      <section className={Styles.videoSection} ref={videoContainer}>
        <video
          className={Styles.bgVideo}
          autoPlay
          muted
          loop
          preload="metadata"
          playsInline
          ref={videoRef}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay content */}
        <div className={Styles.content}>
          <h1 className={Styles.h1}>
            Ocean Lifespaces <br></br>India Private Limited
          </h1>
          <h2 className={Styles.heading} ref={headingRef}>
            Revolutionizing Spaces Through Innovation
          </h2>
          <p className={Styles.description} ref={descriptionRef}>
            Dive Into A World Of Possibilities Where Ideas Turn Into Reality
          </p>
        </div>
      </section>
      <ScrollSection />
    </div>
  );
}
