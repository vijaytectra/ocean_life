import Image from "next/image";
import Styles from "./Transform.module.css";
import SectionReveal from "./SectionReveal";

/**
 * "Real Estate and Infrastructure" — now a Server Component.
 *
 * This section had no state, no handlers and no interactivity: it was a Client
 * Component solely to run a scrubbed GSAP timeline. The timeline now lives in
 * <SectionReveal>, which loads GSAP on idle, so this markup ships as HTML with
 * no hydration cost. The animation itself is unchanged — same targets, same
 * offsets, same scrub.
 */
function Transform() {
  return (
    <section id="transform-section" className={Styles.sectionTransform}>
      <div className="container">
        <div className={Styles.rowTransform}>
          <div className={Styles.columnTransform}>
            <h2>Real Estate and Infrastructure</h2>
            <p>
              Specializing in bespoke interior design and turnkey solutions, we
              excel in creating personalized sanctuaries and functional marvels.
              Whether it&apos;s crafting a cutting-edge office environment to
              enhance productivity or designing a luxurious residential retreat
              that reflects your style, we are dedicated to making your dreams
              come true. Contact us today to discover how we can bring your
              vision to life with our commitment to quality craftsmanship and
              client satisfaction.
            </p>
            <a
              href="https://oceaninfra.in/"
              className={Styles.linkTransform}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Learn more about Ocean real estate at oceaninfra.in"
            >
              Learn More
              <span className="visually-hidden">
                {" "}about Ocean real estate and infrastructure
              </span>
            </a>
          </div>
          <div className={Styles.columnTransform}>
            <Image
              src="/transform.webp"
              alt="Ocean Lifespaces real estate and infrastructure project"
              width={516}
              height={514}
              sizes="(max-width: 768px) 100vw, 40vw"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <SectionReveal
        rootId="transform-section"
        trigger={{ start: "top 80%", end: "bottom 100%", scrub: 1 }}
        steps={[
          { targets: "h2", vars: { opacity: 0, y: 50, duration: 1 } },
          {
            targets: "p",
            vars: { opacity: 0, y: 50, duration: 1 },
            position: "-=0.5",
          },
          {
            targets: "a",
            vars: { opacity: 0, y: 50, duration: 1 },
            position: "-=0.5",
          },
          {
            targets: "img",
            vars: { opacity: 0, scale: 0.9, duration: 1 },
            position: "-=0.5",
          },
        ]}
      />
    </section>
  );
}

export default Transform;
