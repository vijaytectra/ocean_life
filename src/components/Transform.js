"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Styles from "./Transform.module.css";
import Link from "next/link";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Transform() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const linkRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 100%",
          scrub: 1,
        },
      });

      tl.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      })
        .from(
          paragraphRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          linkRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.9,
            duration: 1,
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section className={Styles.sectionTransform} ref={sectionRef}>
      <div className="container">
        <div className={Styles.rowTransform}>
          <div className={Styles.columnTransform}>
            <h2 ref={headingRef}>Real Estate and Infrastructure</h2>
            <p ref={paragraphRef}>
              Specializing in bespoke interior design and turnkey solutions, we
              excel in creating personalized sanctuaries and functional marvels.
              Whether it&apos;s crafting a cutting-edge office environment to
              enhance productivity or designing a luxurious residential retreat
              that reflects your style, we are dedicated to making your dreams
              come true. Contact us today to discover how we can bring your
              vision to life with our commitment to quality craftsmanship and
              client satisfaction.
            </p>
            <Link
              href="/contact"
              className={Styles.linkTransform}
              ref={linkRef}
            >
              Learn More
            </Link>
          </div>
          <div className={Styles.columnTransform}>
            <Image
              src="/transform.webp"
              alt="transform"
              width={516}
              height={514}
              ref={imageRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transform;
