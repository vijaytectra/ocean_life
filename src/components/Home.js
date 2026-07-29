import Styles from "./home.module.css";
import ScrollSection from "./ScrollSection";
import HeroMedia from "./HeroMedia";

/**
 * Home hero.
 *
 * Now a Server Component: the hero markup is fully prerendered, and the only
 * client code left in it is <HeroMedia>, which attaches the background video
 * after load. The heading/description intro that used to run through
 * gsap + @gsap/react is an equivalent CSS animation (see home.module.css), so
 * nothing in the hero blocks or competes with the first paint.
 */
export default function Home({ videoSrc, webm, poster }) {
  return (
    <div>
      <section className={Styles.videoSection}>
        <HeroMedia src={videoSrc} webm={webm} poster={poster} />

        {/* Overlay content */}
        <div className={Styles.content}>
          <h1 className={Styles.h1}>
            Ocean Lifespaces <br></br>India Private Limited
          </h1>
          <h2 className={Styles.heading}>
            Revolutionizing Spaces Through Innovation
          </h2>
          <p className={Styles.description}>
            Dive Into A World Of Possibilities Where Ideas Turn Into Reality
          </p>
        </div>
      </section>
      <ScrollSection />
    </div>
  );
}
