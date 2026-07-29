// Slider.js
"use client";
import { useEffect, useRef, useState } from "react";
import { BsArrowLeft, BsArrowRight, BsArrowUpRight } from "react-icons/bs";
import Styles from "./TestimonialHome.module.css";
import Link from "next/link";
import Image from "next/image";
import { whenNearViewport } from "@/lib/lazyGsap";

// Sample images array
const images = [
  {
    id: 1,
    testiImage: "/testimonial1.webp",
    quoteImage: "/quote.webp",
    name: "Mr. C.K. Narayanan",
    designation: "CEO, Caterpillar",
    description:
      "Ocean Lifespaces India Private Limited is the best example of perfection. They have an excellent quality assurance system that ensures that the interiors remain fresh and new.",
  },
  {
    id: 2,
    testiImage: "/testimonial2.webp",
    quoteImage: "/quote.webp",
    name: "Mr. Suresh Aldrin",
    designation: "Manager Facility",
    description:
      "We used Ocean Lifespaces India Private Limited's services at a very critical period when we were fighting against time to get the project completed. They took the project up like a challenge and completed it in a very short span of time.",
  },
  {
    id: 3,
    testiImage: "/testimonial3.webp",
    quoteImage: "/quote.webp",
    name: "Ms. Anitha Vaidhyanathan",
    designation: "Manager Administration, Standard Chartered",
    description:
      "Perfect to the core. Ocean Lifespaces India Private Limited has won our complete trust and appreciation.",
  },
  {
    id: 4,
    testiImage: "/testimonial4.webp",
    quoteImage: "/quote.webp",
    name: "Inautix",
    designation: "",
    description:
      "What we like the most about Ocean Interiors is the fact that they are addicted to speed. Every project they take up is a challenge to them—a race to finish and a masterpiece to beautify.",
  },
  {
    id: 5,
    testiImage: "/testimonial5.webp",
    quoteImage: "/quote.webp",
    name: "Royal Sundaram",
    designation: "",
    description:
      "In our opinion, Ocean Interiors is a process-driven firm, dedicated to completing work exactly at the specified time, come what may. This dedication and commitment to timelines make us want to associate with them for future projects as well.",
  },
  {
    id: 6,
    testiImage: "/testimonial6.webp",
    quoteImage: "/quote.webp",
    name: "Daimler",
    designation: "",
    description:
      "Ocean Interiors Ltd has done a commendable job in terms of developing shop drawings, erecting interiors while maintaining quality, ensuring safety, and completing the project on time.",
  },
  {
    id: 7,
    testiImage: "/testimonial7.webp",
    quoteImage: "/quote.webp",
    name: "HCL",
    designation: "",
    description:
      "The interior work has been coordinated and executed professionally as per specification and completed successfully.",
  },
  {
    id: 8,
    testiImage: "/testimonial8.webp",
    quoteImage: "/quote.webp",
    name: "Parksons",
    designation: "",
    description:
      "Indeed, the entire Ocean team has given us memories to cherish forever by executing our first unit in the south region. Considering the scope of the project, it is highly commendable that the manufacturing facility was inaugurated on the target date.",
  },
  {
    id: 9,
    testiImage: "/testimonial9.webp",
    quoteImage: "/quote.webp",
    name: "Panimalar Medical College Hospital & Research Institute",
    designation: "Secretary & Correspondent",
    description:
      "Your extensive quality of work and efficiency in dealing with time and resources to complete the project with excellent standards is commendable.",
  },
  {
    id: 10,
    testiImage: "/testimonial10.webp",
    quoteImage: "/quote.webp",
    name: "B. Ayyapan",
    designation: "President",
    description:
      "I must appreciate Civil, Plumbing, Fire Fighting, Road works, PEB, and Interior Site teams for their dedicated efforts to shape an unforgettable milestone for us.",
  },
  {
    id: 11,
    testiImage: "/testimonial11.webp",
    quoteImage: "/quote.webp",
    name: "Sitna Abraham",
    designation: "Chief Manager",
    description:
      "M/s Ocean has maintained high quality and time standards, setting a benchmark in the industry that is difficult for others to emulate.",
  },
  {
    id: 12,
    testiImage: "/testimonial12.webp",
    quoteImage: "/quote.webp",
    name: "Hari Krishnan Pratap",
    designation: "Director",
    description:
      "We appreciate the personal involvement of Mr. Gopinath of Ocean Interiors in ensuring the completion of the project within the timeline to our utmost satisfaction.",
  },
  {
    id: 13,
    testiImage: "/testimonial13.webp",
    quoteImage: "/quote.webp",
    name: "A. S. Anantha Padmanabhan",
    designation: "Director",
    description:
      "We are glad to certify that they completed their work as per the tight time schedule specified by us, ensuring high-quality finishes. They have the ability to coordinate well with all agencies.",
  },
  {
    id: 14,
    testiImage: "/testimonial14.webp",
    quoteImage: "/quote.webp",
    name: "Sathavalli G. Gopinath",
    designation: "Country Director",
    description:
      "We are pleased to certify that they have completed the works on time and to the required standards and quality. The work was done to our complete satisfaction.",
  },
  {
    id: 15,
    testiImage: "/testimonial15.webp",
    quoteImage: "/quote.webp",
    name: "R. Narasimhan",
    designation: "Vice President & Branch Head",
    description:
      "Our experience with Ocean Lifespaces has been quite satisfactory, and they were able to complete the work with good standards and finishes.",
  },
];

const TestimonialHome = () => {
  const sliderRef = useRef(null);
  const TestimonialHomeRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // gsap, ScrollTrigger and @gsap/react were static imports here, which put
  // ~110 KB of animation code into the page's initial chunks even though none
  // of it runs until the section is scrolled to or an arrow is clicked. It is
  // now fetched once, on idle, and cached in a ref for the slide transition.
  const gsapRef = useRef(null);

  useEffect(() => {
    const section = TestimonialHomeRef.current;
    if (!section) return;

    return whenNearViewport(section, ({ gsap }) => {
      gsapRef.current = gsap;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(section.querySelectorAll("a, h2, p, img"), {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        });
      }, section);

      return () => ctx.revert();
    });
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Until GSAP has loaded, move the track with a plain transform so the
    // arrows work immediately.
    const gsap = gsapRef.current;
    if (!gsap) {
      slider.style.transform = `translateX(${-currentIndex * 100}%)`;
      return;
    }

    gsap.to(slider, {
      xPercent: -currentIndex * 100,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [currentIndex]);

  return (
    <section
      className={`${Styles.sectionTestimonialHome} deferred-section`}
      ref={TestimonialHomeRef}
    >
      <div className="container" id="TestimonialHomeContainer">
        <div className={Styles.rowTestimonialHome}>
          <div className={Styles.columnTestimonialHome}>
            <Image
              src="/testimonialLeftImage.webp"
              alt=""
              width={500}
              height={500}
            />
          </div>
          <div className={Styles.columnTestimonialHome}>
            <div className={Styles.sliderWrapper}>
              <div className={Styles.slider} ref={sliderRef}>
                {images.map((image, index) => (
                  <div className={Styles.slide} key={index}>
                    <Image
                      width={200}
                      height={100}
                      className={Styles.testiImage}
                      src={image.testiImage}
                      alt=""
                    />
                    <Image
                      width={200}
                      height={100}
                      className={Styles.quoteImage}
                      src={image.quoteImage}
                      alt=""
                    />
                    <p>{image.description}</p>
                    <div>
                      <p className={Styles.testiName}>{image.name}</p>
                      <p className={Styles.testiRole}>{image.designation}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className={Styles.navigation}>
                <button type="button" className={Styles.prevButton} onClick={handlePrev} aria-label="Previous testimonial">
                  <BsArrowLeft />
                </button>
                <button type="button" className={Styles.nextButton} onClick={handleNext} aria-label="Next testimonial">
                  <BsArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialHome;
