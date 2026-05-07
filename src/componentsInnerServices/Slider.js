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
      <button className={styles.prevButton} onClick={prevSlide}>
        <BsArrowLeft />
      </button>
      <div className={styles.slider}>
        <div className={styles.imageWrapper}>
          <Image
            width={475}
            height={705}
            src={images[currentIndex]}
            alt="Slide"
            className={styles.sliderImage}
          />
          <Image
            width={475}
            height={705}
            src={images[(currentIndex + 1) % images.length]}
            alt="Next Slide"
            className={styles.sliderImage}
          />
        </div>
      </div>
      <button className={styles.nextButton} onClick={nextSlide}>
        <BsArrowRight />
      </button>
    </div>
  );
};

export default Slider;
