"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Use usePathname for App Router
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Home from "../components/Home";
import Styles from "./page.module.css";
import ServiceSlider from "../components/ServiceSlider";
import ProjectSlider from "../components/ProjectSlider";
import NewsAndEvents from "../components/NewsAndEvents";
import Transform from "../components/Transform";
import TestimonialHome from "../components/TestimonialHome";
import LogoScroll from "../components/LogoScroll";
import Newsletter from "../components/Newsletter";
import Loader from "../components/Loader";

function HomeMain() {
  const pathname = usePathname(); // Get the current path
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Show loader on initial load

    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false); // Hide loader after a delay (optional)
      }, 500); // Adjust delay as needed
    };

    // Call handleComplete when the component mounts (initial load)
    handleComplete();

    return () => {
      handleComplete(); // Clean up when the component unmounts
    };
  }, [pathname]); // Re-run when the path changes

  gsap.registerPlugin(ScrollTrigger);
  const [counters, setCounters] = useState({
    employees: 0,
    projects: 0,
    experience: 0,
    ongoing: 0,
  });

  const counterRef = useRef(null);
  const dreamSectionRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: dreamSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(
        dreamSectionRef.current.querySelectorAll(
          "h4, h2, p, img, .dreamFloat, .counterBox"
        ),
        {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      let ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: counterRef.current,
          start: "top 80%",
          onEnter: () => startCounting(),
        });
      }, counterRef);

      return () => {
        ctx.revert();
      };
    }
  }, [loading]);

  const startCounting = () => {
    const targets = [
      { id: "employees", end: 650 },
      { id: "projects", end: 60 },
      { id: "experience", end: 28 },
      { id: "ongoing", end: 550 },
    ];

    targets.forEach((target) => {
      gsap.to(
        { value: 0 },
        {
          value: target.end,
          duration: 2,
          ease: "power1.out",
          onUpdate: function () {
            setCounters((prev) => ({
              ...prev,
              [target.id]: Math.floor(this.targets()[0].value),
            }));
          },
        }
      );
    });
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Home />
          <section ref={dreamSectionRef} className={Styles.dreamSection}>
            <div className="container">
              <div className={Styles.rowDream}>
                <div className={Styles.columnDream}>
                  <h4>Exceeding Expectations, Building Excellence</h4>
                  <h2>Delivering Dreams</h2>
                  <p>
                    With almost three decades of experience in the field of Civil
                    Construction, Interior Fitout and Infrastructure Development,
                    our efforts are always focussed on exceeding our client&apos;s
                    expectations.
                  </p>
                  <p>
                    With our Managing Director and CEO, Mr. S.K. Peter at the helm
                    of the business, we have made strides in becoming one of the
                    most sought-after companies in the field of turnkey interior
                    fitout contracting and civil construction.
                  </p>
                  <p>
                    We focus on creating world class structures and spaces, by
                    consistently upgrading our systems, techniques, and teams, to
                    ensure that we place the present and future needs of our
                    clientele, above all else.
                  </p>
                  <div className={Styles.dreamCounter}>
                    <div ref={counterRef} className={Styles.counterSection}>
                      <div className={Styles.counterBox}>
                        <h3>Number of Employees</h3>
                        <p>{counters.employees}+</p>
                      </div>
                      <div className={Styles.counterBox}>
                        <h3>Client Return Rate</h3>
                        <p>{counters.projects}%</p>
                      </div>
                      <div className={Styles.counterBox}>
                        <h3>Years in Operation</h3>
                        <p>{counters.experience}</p>
                      </div>
                      <div className={Styles.counterBox}>
                        <h3>Projects Completed</h3>
                        <p>{counters.ongoing}+</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={Styles.columnDream}>
                  <Image
                    src="/dreamImage.webp"
                    alt="dream"
                    width={624}
                    height={476}
                  />
                  <p className={Styles.dreamFloat}>
                    Our motto is simple. Hardwork followed by the belief that
                    nothing is impossible!
                  </p>
                </div>
              </div>
            </div>
          </section>
          <ServiceSlider />
          <ProjectSlider />
          <NewsAndEvents />
          <Transform />
          <TestimonialHome />
          <section className={Styles.logoScroll}>
            <h2>Our Recent Clients</h2>
            <LogoScroll />
          </section>
          <Newsletter />
        </>
      )}
    </main>
  );
}

export default HomeMain;
