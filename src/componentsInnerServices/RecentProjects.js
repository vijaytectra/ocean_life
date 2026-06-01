"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./RecentProjects.module.css";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_DESCRIPTION =
  "Ever since inception, Ocean Lifespaces has taken pride in its portfolio of completed Turnkey Interiors & Civil Construction.";

const padIndex = (n) => String(n).padStart(2, "0");
const GAP_PX = 20;

const RecentProjects = ({
  projects,
  description = DEFAULT_DESCRIPTION,
  title = "Recent Projects",
  eyebrow = "Interior portfolio",
}) => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const total = projects.length;
  const maxIndex = Math.max(0, total - slidesToShow);
  const canPrev = currentSlide > 0;
  const canNext = currentSlide < maxIndex;

  const visibleFrom = total ? currentSlide + 1 : 0;
  const visibleTo = total ? Math.min(currentSlide + slidesToShow, total) : 0;
  const progressPct = maxIndex > 0 ? (currentSlide / maxIndex) * 100 : 100;

  const updateSlidesToShow = useCallback(() => {
    const w = window.innerWidth;
    if (w < 640) setSlidesToShow(1);
    else if (w < 1024) setSlidesToShow(2);
    else setSlidesToShow(3);
  }, []);

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, [updateSlidesToShow]);

  useEffect(() => {
    setCurrentSlide((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const slideBasis = useMemo(() => {
    if (slidesToShow === 1) return "100%";
    const gaps = GAP_PX * (slidesToShow - 1);
    return `calc((100% - ${gaps}px) / ${slidesToShow})`;
  }, [slidesToShow]);

  const animateSlider = useCallback(() => {
    const slider = sliderRef.current;
    const firstCard = slider?.children[0];
    if (!slider || !firstCard) return;

    const offset = currentSlide * (firstCard.offsetWidth + GAP_PX);

    if (reducedMotion) {
      gsap.set(slider, { x: -offset });
      return;
    }

    gsap.to(slider, {
      x: -offset,
      duration: 0.85,
      ease: "power3.inOut",
    });
  }, [currentSlide, reducedMotion]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) gsap.set(slider, { clearProps: "transform" });
    setCurrentSlide(0);
  }, [slidesToShow]);

  useEffect(() => {
    animateSlider();
  }, [animateSlider, slideBasis]);

  useEffect(() => {
    const onResize = () => animateSlider();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [animateSlider]);

  const handleNext = () => {
    if (!canNext) return;
    setCurrentSlide((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    if (!canPrev) return;
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || reducedMotion) return;

      const ctx = gsap.context(() => {
        const intro = section.querySelectorAll("[data-recent-intro]");

        gsap.from(intro, {
          y: 24,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        });
      }, section);

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  if (!total) return null;

  return (
    <section
      className={styles.recentProjects}
      ref={sectionRef}
      aria-label={title}
    >
      <div className={styles.bgOrb1} aria-hidden />
      <div className={styles.bgOrb2} aria-hidden />

      <div className="container">
        <div className={styles.layout}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-recent-intro>
              {eyebrow}
            </p>
            <h2 className={styles.title} data-recent-intro>
              {title}
            </h2>
            <p className={styles.lead} data-recent-intro>
              {description}
            </p>

            <div className={styles.controls} data-recent-intro>
              <div className={styles.counter} aria-live="polite">
                <span className={styles.counterCurrent}>
                  {padIndex(visibleFrom)}
                </span>
                <span className={styles.counterSep}>–</span>
                <span className={styles.counterEnd}>{padIndex(visibleTo)}</span>
                <span className={styles.counterOf}>of</span>
                <span className={styles.counterTotal}>{padIndex(total)}</span>
              </div>

              <div className={styles.nav}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={handlePrev}
                  disabled={!canPrev}
                  aria-label="Previous projects"
                >
                  <MdOutlineArrowLeft size={22} aria-hidden />
                </button>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={handleNext}
                  disabled={!canNext}
                  aria-label="Next projects"
                >
                  <MdOutlineArrowRight size={22} aria-hidden />
                </button>
              </div>

              <div className={styles.progressTrack} aria-hidden>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </header>

          <div className={styles.viewport}>
            <div
              className={styles.slider}
              ref={sliderRef}
              style={{ "--slide-basis": slideBasis }}
            >
              {projects.map((project, index) => (
                <Link
                  key={project.link}
                  href={project.link}
                  className={styles.card}
                >
                  <div className={styles.cardMedia}>
                    <Image
                      src={project.imgSrc}
                      alt={project.title}
                      fill
                      className={styles.cardImage}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 32vw"
                    />
                    <div className={styles.cardGradient} aria-hidden />
                    <span className={styles.cardIndex}>{padIndex(index + 1)}</span>
                    <span className={styles.cardCta} aria-hidden>
                      <span>View project</span>
                      <MdOutlineArrowRight size={20} />
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    {project.location ? (
                      <p className={styles.cardMeta}>{project.location}</p>
                    ) : null}
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
