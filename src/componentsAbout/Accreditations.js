"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Accreditations.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AccredItems = [
  {
    image: "/about/awr-1.png.webp",
    title: "IMS",
    description: `
      ISO 9001:2015 - Quality <br>
      ISO 14001:2015 - EMS <br>
      OHSAS 18001:2007 Certified for Occupational Health and Safety Assessment Series.
    `,
  },
  {
    image: "/about/awr-2.png.webp",
    title: `CCR A- / STABLE RATING`,
    description: `CRISIL has upgraded our corporate credit rating to CCR A Stable from CCR BBB+/Positive.`,
  },
  {
    image: "/about/awr-3.png.webp",
    title: `D&B D-U-N-S`,
    description: `
      Ocean has been evaluated and is now part of the Dun & Bradstreet Global Database.
    `,
  },
  {
    image: "/about/awr-4.png.webp",
    title: "IMS",
    description: `
      Ocean is a member of Indian Green Building Council.
    `,
  },
  {
    image: "/about/awr-8.png.webp",
    title: "ESA License",
    description: `
      Ocean has an in-house electrical team and SA grade license to carry out electrical works of any kind.
    `,
  },
  {
    image: "/about/awr-9.png.webp",
    title: "FIDIC",
    description: `
      Ocean is a member of the Consulting Engineers Association of India.
    `,
  },
];

function Accreditations() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const accredRefs = useRef([]);

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

      // Animate heading
      tl.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      });

      // Staggered animation for accreditation boxes
      tl.from(
        accredRefs.current,
        {
          opacity: 0,
          y: 50,
          duration: 0.5,
          stagger: 0.2,
        },
        "-=0.5"
      ); // Start member animation just after heading
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.accreditations}>
      <div className="container">
        <div className={styles.mainRowAccred}>
          <div className={styles.rowAccred}>
            <h3 ref={headingRef}>Accreditations</h3>
          </div>
          <div className={styles.rowAccred}>
            {AccredItems.map((item, index) => (
              <div
                key={index}
                className={styles.accredBox}
                ref={(el) => (accredRefs.current[index] = el)}
              >
                <Image width={200} height={100} src={item.image} alt="image" />
                <h4 className="h4">{item.title}</h4>
                <p dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Accreditations;
