"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
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
  const [visibleSlides, setVisibleSlides] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const syncVisibleSlides = () => {
      setVisibleSlides(window.innerWidth <= 767 ? 1 : 2);
    };

    syncVisibleSlides();
    window.addEventListener("resize", syncVisibleSlides);

    return () => window.removeEventListener("resize", syncVisibleSlides);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, services.length - visibleSlides),
    [visibleSlides]
  );

  useEffect(() => {
    setCurrentIndex((previousIndex) => Math.min(previousIndex, maxIndex));
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((previousIndex) => Math.min(previousIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((previousIndex) => Math.max(previousIndex - 1, 0));
  };

  const slideWidth = 100 / visibleSlides;

  return (
    <section className={styles.serviceHead}>
      <div className="container">
        <div className={styles.heroCard}>
          <div className={styles.heroTopBar}>
            <div className={styles.titleWrap}>
              <p className={styles.kicker}>
                Redefining Excellence, Delivering Perfection
              </p>
              <h1 className={styles.title}>Our Services</h1>
            </div>

            <div className={styles.actionGroup}>
              <Link href="/contact" className={styles.learnMoreButton}>
                <span>Learn More</span>
                <BsArrowRight />
              </Link>

              <div className={styles.navArrows}>
                <button
                  type="button"
                  onClick={prevSlide}
                  className={styles.arrowBtn}
                  disabled={currentIndex === 0}
                  aria-label="Previous services"
                >
                  <BsArrowLeft />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className={styles.arrowBtn}
                  disabled={currentIndex >= maxIndex}
                  aria-label="Next services"
                >
                  <BsArrowRight />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.leftCol}>
              <div className={styles.clientCard}>
                <Image
                  width={300}
                  height={120}
                  src="/services/677service.jpeg"
                  alt="677 Clients Globally"
                  className={styles.clientImage}
                  priority
                />
              </div>

              <p className={styles.description}>
                We excel in innovation and problem-solving, transforming
                challenges into boundless possibilities.
              </p>
            </div>

            <div className={styles.rightCol}>
              <div className={styles.sliderViewport}>
                <div
                  className={styles.sliderTrack}
                  style={{
                    transform: `translateX(-${currentIndex * slideWidth}%)`,
                  }}
                >
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={styles.slide}
                      style={{ flexBasis: `${slideWidth}%` }}
                    >
                      <Link href={service.link} className={styles.slideLink}>
                        <div className={styles.imageBox}>
                          <Image
                            src={service.imgSrc}
                            alt={service.title}
                            fill
                            sizes="(max-width: 767px) 100vw, 50vw"
                            style={{ objectFit: "cover" }}
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
        </div>
      </div>
    </section>
  );
}

export default ServiceHeader;
