import Styles from "./ProjectSlider.module.css";
import Link from "next/link";
import Slider from "@/componentsInnerServices/Slider";
import SectionReveal from "./SectionReveal";

/**
 * "Our Recent Projects" — now a Server Component.
 *
 * The only state it held (`currentIndex` plus `handleNext`/`handlePrev`) was
 * dead code: nothing in the JSX referenced it, since the actual carousel lives
 * in <Slider>. Removing it and moving the GSAP reveal into <SectionReveal>
 * leaves this section as plain server-rendered markup; <Slider> remains the
 * one client island here.
 */
const ProjectSlider = () => {
  return (
    <section id="project-slider-section" className={Styles.sectionProjectSlider}>
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
            <Link href="/projects" aria-label="View all Ocean Lifespaces projects">
              <button className={Styles.cta} type="button">
                <span>View All</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10" aria-hidden="true">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </Link>
          </div>
          <Slider />
        </div>
      </div>

      <SectionReveal
        rootId="project-slider-section"
        trigger={{ start: "top 80%", toggleActions: "play none none reverse" }}
        steps={[
          {
            targets: "a, h2, p, img",
            vars: {
              opacity: 0,
              y: 50,
              duration: 1,
              stagger: 0.2,
              ease: "power2.out",
            },
          },
        ]}
      />
    </section>
  );
};

export default ProjectSlider;
