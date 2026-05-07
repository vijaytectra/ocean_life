"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import styles from "./ServiceHeader.module.css";

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

function ServiceHeader() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);

  const nextSlide = () => {
    if (isAnimating.current) return;
    if (currentIndex < services.length - 2) {
      isAnimating.current = true;
      setCurrentIndex(currentIndex + 1);
      setTimeout(() => (isAnimating.current = false), 500);
    }
  };

  const prevSlide = () => {
    if (isAnimating.current) return;
    if (currentIndex > 0) {
      isAnimating.current = true;
      setCurrentIndex(currentIndex - 1);
      setTimeout(() => (isAnimating.current = false), 500);
    }
  };

  return (
    <section className={styles.serviceHead}>
      <div className="container">
        <div className={styles.heroCard}>
          <div className={styles.heroContent}>
            <div className={styles.leftCol}>
              <h1 className={styles.title}>Our Services</h1>
              <div className={styles.clientCard}>
                <Image
                  width={300}
                  height={120}
                  src="/services/677service.jpeg"
                  alt="677 Clients Globally"
                  className={styles.clientImage}
                />
              </div>
              <p className={styles.description}>
                We excel in innovation and problem-solving, transforming
                challenges that get into boundless possibilities. and
              </p>
            </div>
            
            <div className={styles.rightCol}>
              <div className={styles.sliderWrapper}>
                <div 
                  className={styles.sliderTrack}
                  style={{ transform: `translateX(-${currentIndex * 50}%)` }}
                >
                  {services.map((service) => (
                    <div key={service.id} className={styles.slide}>
                      <Link href={service.link}>
                        <div className={styles.imageBox}>
                          <Image
                            src={service.imgSrc}
                            alt={service.title}
                            fill
                            style={{ objectFit: "cover", borderRadius: "20px" }}
                          />
                        </div>
                        <h3>{service.title}</h3>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.navArrows}>
            <button 
              onClick={prevSlide} 
              className={`${styles.arrowBtn} ${currentIndex === 0 ? styles.disabled : ""}`}
            >
              <BsArrowLeft />
            </button>
            <button 
              onClick={nextSlide} 
              className={`${styles.arrowBtn} ${currentIndex >= services.length - 2 ? styles.disabled : ""}`}
            >
              <BsArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceHeader;
