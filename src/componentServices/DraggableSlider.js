"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import styles from "./DraggableSlider.module.css";

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

const ServiceHeaderSlider = () => {
  const sliderRef = useRef(null);
  const wrapRef = useRef(null);
  const isAnimating = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const numSets = 3;
  const totalOriginal = services.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateProgress = (currentX, totalSetWidth) => {
    // Calculate progress based on the position relative to one set
    const progress = (Math.abs(currentX) % totalSetWidth) / totalSetWidth;
    setScrollProgress(progress * 100);
  };

  const handleNext = () => {
    if (isAnimating.current || !mounted) return;
    const slider = sliderRef.current;
    if (!slider) return;

    isAnimating.current = true;
    const card = slider.children[0];
    const step = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
    const totalSetWidth = (slider.scrollWidth / numSets);

    gsap.to(slider, {
      x: `-=${step}`,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function () {
        updateProgress(gsap.getProperty(slider, "x"), totalSetWidth);
      },
      onComplete: () => {
        const currentX = gsap.getProperty(slider, "x");
        if (currentX <= -totalSetWidth) {
          gsap.set(slider, { x: currentX + totalSetWidth });
        }
        isAnimating.current = false;
      },
    });
  };

  const handlePrev = () => {
    if (isAnimating.current || !mounted) return;
    const slider = sliderRef.current;
    if (!slider) return;

    isAnimating.current = true;
    const card = slider.children[0];
    const step = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
    const totalSetWidth = (slider.scrollWidth / numSets);

    gsap.to(slider, {
      x: `+=${step}`,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function () {
        updateProgress(gsap.getProperty(slider, "x"), totalSetWidth);
      },
      onComplete: () => {
        const currentX = gsap.getProperty(slider, "x");
        if (currentX >= 0) {
          gsap.set(slider, { x: currentX - totalSetWidth });
        }
        isAnimating.current = false;
      },
    });
  };

  const allServices = [];
  for (let i = 0; i < numSets; i++) {
    allServices.push(...services);
  }

  const scrollToService = (index) => {
    if (isAnimating.current || !mounted) return;
    const slider = sliderRef.current;
    if (!slider) return;

    isAnimating.current = true;
    const card = slider.children[0];
    const step = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
    const totalSetWidth = (slider.scrollWidth / numSets);

    // Calculate destination X
    const targetX = -index * step;

    gsap.to(slider, {
      x: targetX,
      duration: 0.8,
      ease: "power3.inOut",
      onUpdate: function () {
        updateProgress(gsap.getProperty(slider, "x"), totalSetWidth);
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  };

  if (!mounted) {
    return <div style={{ height: "450px" }}></div>;
  }

  return (
    <div className={styles.sliderWrapper}>
      {/* Navigation and Scroller - Fixed and Visible */}
      <div className={styles.topControls}>
        <div className={styles.scrollerWrapper}>
          <div className={styles.scrollerTrack}>
            <div
              className={styles.scrollerBar}
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
        </div>
        <div className={styles.categoryNav}>
          {services.map((service, index) => {
            let label = service.title.split(' ')[0];
            if (service.title.includes("Data Centre")) label = "Data Centre";
            if (service.title.includes("Hospitals")) label = "Hospitals And Hospitality";
            if (service.title.includes("Infrastructure")) label = "Infrastructure";
            if (service.title.includes("Turnkey")) label = "Turnkey";
            if (service.title.includes("Interior")) label = "Interior";
            
            return (
              <button
                key={`nav-${service.id}`}
                className={styles.categoryBtn}
                onClick={() => scrollToService(index)}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className={styles.btnGroup}>
          <button
            className={`${styles.navBtn} ${styles.prev}`}
            onClick={handlePrev}
            aria-label="Previous"
          >
            <BsArrowLeft />
          </button>
          <button
            className={`${styles.navBtn} ${styles.next}`}
            onClick={handleNext}
            aria-label="Next"
          >
            <BsArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={wrapRef}
        className={styles.sliderContainer}
      >
        <div
          ref={sliderRef}
          className={styles.sliderTrack}
          style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          {allServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className={styles.sliderCard}
            >
              <Link href={service.link}>
                <div className={styles.cardImage}>
                  <Image
                    src={service.imgSrc}
                    alt={service.title}
                    fill
                    draggable={false}
                    style={{
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    sizes="(max-width: 768px) 80vw, 38vw"
                  />
                </div>
                <h3 className={styles.cardHeading}>
                  {service.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceHeaderSlider;
