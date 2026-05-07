"use client";

import React, { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { gsap } from "gsap";
import Image from "next/image";
import styles from "./ImageSlider.module.css"; // Import the CSS Module

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const images = [
    "/about/driveSlide1.webp",
    "/about/driveSlide2.webp",
    "/about/driveSlide3.webp",
    "/about/driveSlide4.webp",
    "/about/driveSlide5.webp",
    "/about/driveSlide6.webp",
  ];

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    gsap.to(sliderRef.current, {
      x: "-50%", // Change this to -50% for sliding two images at a time
      duration: 0.5,
      onComplete: () => {
        setCurrentIndex(nextIndex);
        gsap.set(sliderRef.current, { x: "0%" });
      },
    });
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    gsap.to(sliderRef.current, {
      x: "50%", // Change this to 50% for sliding two images at a time
      duration: 0.5,
      onComplete: () => {
        setCurrentIndex(prevIndex);
        gsap.set(sliderRef.current, { x: "0%" });
      },
    });
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        <div ref={sliderRef} className={styles.slider}>
          <div className={styles.slide}>
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              width={400}
              height={250}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className={styles.slide}>
            <Image
              src={images[(currentIndex + 1) % images.length]}
              alt={`Slide ${((currentIndex + 1) % images.length) + 1}`}
              width={400}
              height={250}
              style={{ borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>
      <div className={styles.arrows}>
        <FaArrowLeft onClick={prevSlide} className={styles.arrow} />
        <FaArrowRight onClick={nextSlide} className={styles.arrow} />
      </div>
    </div>
  );
};

export default ImageSlider;
