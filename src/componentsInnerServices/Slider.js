"use client";

import React, { useState } from "react";
import styles from "./Slider.module.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Image from "next/image";

const Slider = () => {
  const images = [
    "/project1.webp",
    "/project2.webp",
    "/project3.webp",
    "/project4.webp",
    "/project5.webp",
    "/project6.webp",
    "/project7.webp",
    "/project8.webp",
    "/project9.webp",
    "/project10.webp",
    "/project11.webp",
    "/project12.webp",
    "/project13.webp",
    "/project14.webp",
    "/project15.webp",
    "/project16.webp",
    "/project17.webp",
    "/project18.webp",
    "/project19.webp",
    "/project20.webp",
    "/project21.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={styles.sliderContainer}>
      <button
        type="button"
        className={styles.prevButton}
        onClick={prevSlide}
        aria-label="Previous project"
      >
        <BsArrowLeft aria-hidden="true" />
      </button>
      <div className={styles.slider}>
        <div className={styles.imageWrapper}>
          <Image
            width={475}
            height={705}
            src={images[currentIndex]}
            alt="Ocean Lifespaces completed project"
            className={styles.sliderImage}
          />
          <Image
            width={475}
            height={705}
            src={images[(currentIndex + 1) % images.length]}
            alt=""
            className={styles.sliderImage}
          />
        </div>
      </div>
      <button
        type="button"
        className={styles.nextButton}
        onClick={nextSlide}
        aria-label="Next project"
      >
        <BsArrowRight aria-hidden="true" />
      </button>
    </div>
  );
};

export default Slider;
