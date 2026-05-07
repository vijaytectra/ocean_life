"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BsArrowLeft, BsArrowRight, BsArrowUpRight } from "react-icons/bs";
import Styles from "./ProjectSlider.module.css";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slider from "@/componentsInnerServices/Slider";

// Sample images array
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

const ProjectSlider = () => {
  const projectSliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  gsap.registerPlugin(ScrollTrigger);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectSliderRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(projectSliderRef.current.querySelectorAll("a, h2, p, img"), {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className={Styles.sectionProjectSlider} ref={projectSliderRef}>
      <div className="container">
        <div className={Styles.rowProjectSlider}>
          <div className={Styles.columnProjectSlider}>
            <h2>Our Recent Projects</h2>
            <p>
              Since its inception, Ocean Lifespaces has consistently showcased
              its expertise in Turnkey Interiors and Civil Construction. Our
              portfolio stands as a testament to our dedication, craftsmanship,
              and commitment to delivering high-quality projects.
            </p>
            <p>
              We take pride in our ability to manage every aspect of interior
              design and construction with precision, ensuring that each space
              is both functional and visually appealing. Our attention to
              detail, innovative approach, and client-centric focus allow us to
              create environments that inspire and endure.
            </p>
            <p>
              With a reputation for reliability and superior service, Ocean
              Lifespaces continues to push the boundaries of excellence. Every
              project we complete reinforces our legacy of quality, innovation,
              and trust, driving us to set new industry standards with each
              endeavor.
            </p>
            <Link href="/projects">
              <button className={Styles.cta}>
                <span>View All</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </Link>
          </div>
          <Slider />
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;
