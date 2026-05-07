"use client";

import React, { useEffect, useRef } from "react";
import Styles from "./ServiceGrid.module.css";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: 1,
    title: "Turnkey Solutions",
    imgSrc: "/interior.webp",
    link: "/services/turnkey-solutions",
  },
  {
    id: 2,
    title: "Interior Fit-Out Services",
    imgSrc: "/fitOuts.webp",
    link: "/services/interior-fit-out-services",
  },
  {
    id: 3,
    title: "Civil Construction",
    imgSrc: "/civil.webp",
    link: "/services/civil-construction",
  },
  {
    id: 4,
    title: "Real Estate Development",
    imgSrc: "/designBuild.webp",
    link: "/services/real-estate-development",
  },
  {
    id: 5,
    title: "Infrastructure Development",
    imgSrc: "/marine.webp",
    link: "/services/infrastructure-development",
  },
  {
    id: 6,
    title: "Data Centre Project Expertise",
    imgSrc: "/interior/home-interior.webp",
    link: "/services/data-centre-project-expertise",
  },
  {
    id: 7,
    title: "Hospitals and Hospitality",
    imgSrc: "/services/hotelgreysuit.webp",
    link: "/services/hospitals-and-hospitality",
  },
];

const ServiceGrid = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const heading1Ref = useRef(null);
  const btnRef = useRef(null);
  const columnRefs = useRef([]);

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

      tl.from(heading1Ref.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      });

      tl.from(btnRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      });

      // Staggered animation for service items
      tl.from(
        columnRefs.current,
        {
          opacity: 0,
          y: 50,
          duration: 0.5,
          stagger: 0.2,
        },
        "-=0.5"
      ); // Start column animation just after heading
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={Styles.serviceGridSection}>
      <div className="container">
        <div className={Styles.rowServiceGrid}>
          <div className={Styles.columnServiceGrid}>
            <h4 ref={heading1Ref}>
              Redefining Excellence, Delivering Perfection
            </h4>
            <h2 ref={headingRef}>Our Services</h2>
          </div>
          <div className={Styles.columnServiceGrid} ref={btnRef}>
            <Link href="/services">
              <button className="inner-blue-button">
                <span>Read More</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Service Grid */}
        <div className={Styles.gridContainer}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className={Styles.gridItem}
              ref={(el) => (columnRefs.current[index] = el)}
            >
              <Link href={service.link}>
                <Image
                  width={500}
                  height={200}
                  src={service.imgSrc}
                  alt={service.title}
                  className={Styles.serviceImage}
                />
                <h3>{service.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
