"use client";
import React, { useEffect, useRef, useState } from "react";
import Styles from "./ServiceGrid.module.css";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

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
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from([heading1Ref.current, headingRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
      });

      tl.from(sliderRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      }, "-=0.4");
    }, sectionRef);

    return () => context.revert();
  }, []);

  const nextSlide = () => {
    if (currentIndex < services.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section ref={sectionRef} className={Styles.serviceGridSection}>
      <div className="container">
        <div className={Styles.headerRow}>
          <div className={Styles.titleColumn}>
            <h4 ref={heading1Ref}>
              Redefining Excellence, Delivering Perfection
            </h4>
            <h2 ref={headingRef}>Our Services</h2>
          </div>
          <div className={Styles.navColumn}>
            <div className={Styles.arrows}>
              <button 
                onClick={prevSlide} 
                className={`${Styles.navButton} ${currentIndex === 0 ? Styles.disabled : ""}`}
              >
                <BsArrowLeft />
              </button>
              <button 
                onClick={nextSlide} 
                className={`${Styles.navButton} ${currentIndex >= services.length - 3 ? Styles.disabled : ""}`}
              >
                <BsArrowRight />
              </button>
            </div>
            <Link href="/services" className={Styles.learnMore}>
              <span className={Styles.orangeCircle}>
                <BsArrowRight />
              </span>
              <span>Learn More</span>
            </Link>
          </div>
        </div>

        <div className={Styles.sliderWrapper} ref={sliderRef}>
          <div 
            className={Styles.sliderTrack} 
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {services.map((service) => (
              <div key={service.id} className={Styles.sliderItem}>
                <Link href={service.link}>
                  <div className={Styles.imageContainer}>
                    <Image
                      width={500}
                      height={350}
                      src={service.imgSrc}
                      alt={service.title}
                      className={Styles.serviceImage}
                    />
                  </div>
                  <h3>{service.title}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
