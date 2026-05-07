"use client";

import React, { useRef, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { gsap } from "gsap";
import styles from "./RecentProjects.module.css";
import Image from "next/image";
import Link from "next/link";

const RecentProjects = ({ projects }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3); // Default for desktop

  const updateSlidesToShow = () => {
    if (window.innerWidth < 768) {
      setSlidesToShow(1); // Mobile
    } else if (window.innerWidth < 1024) {
      setSlidesToShow(2); // Tablet
    } else {
      setSlidesToShow(3); // Desktop
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const handleNext = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % (projects.length - slidesToShow + 1)
    );
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + (projects.length - slidesToShow + 1)) %
        (projects.length - slidesToShow + 1)
    );
  };

  useEffect(() => {
    const slideWidth =
      sliderRef.current.children[0].offsetWidth +
      parseFloat(window.getComputedStyle(sliderRef.current).gap);
    gsap.to(sliderRef.current, {
      x: -currentSlide * slideWidth,
      duration: 0.7,
      ease: "power2.inOut",
    });
  }, [currentSlide, slidesToShow]);

  return (
    <section className={styles.recentProjects}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <h2>Recent Projects</h2>
            <p>
              Ever since inception, Ocean Lifespaces has taken pride in its
              portfolio of completed Turnkey Interiors & Civil Construction.
            </p>
            <div className={styles.arrowContainer}>
              <div className={styles.arrow} onClick={handlePrev}>
                <FaArrowLeft />
              </div>
              <div className={styles.arrow} onClick={handleNext}>
                <FaArrowRight />
              </div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.slider} ref={sliderRef}>
              {projects.map((project, index) => (
                <Link key={index} href={project.link} className={styles.slide}>
                  <Image
                    width={500}
                    height={200}
                    src={project.imgSrc}
                    alt={project.title}
                  />
                  <div className={styles.projectInfo}>
                    <h3>{project.title}</h3>
                    <p>{project.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;
