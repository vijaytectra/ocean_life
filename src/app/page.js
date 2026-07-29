import Home from "@/components/Home";
import DreamSection from "@/components/DreamSection";
import ServiceGrid from "@/componentsAbout/ServiceGrid";
import ProjectSlider from "@/components/ProjectSlider";
import NewsAndEvents from "@/components/NewsAndEvents";
import Transform from "@/components/Transform";
import TestimonialHome from "@/components/TestimonialHome";
import LogoScroll from "@/components/LogoScroll";
import Newsletter from "@/components/Newsletter";
import Styles from "./page.module.css";
import {
  getCounterTargets,
  getClientLogoImages,
  getHeroSources,
} from "@/lib/siteContent";

export const metadata = {
  title: "Ocean Lifespaces | Civil Construction Company in Chennai",
  description:
    "Build with confidence! Ocean Lifespaces India Pvt Ltd delivers Civil Construction Company in Chennai with innovation and trust.",
  alternates: {
    canonical: "https://www.olipl.com/",
  },
};

/**
 * Home page — a Server Component.
 *
 * It was previously `"use client"` and gated every section behind
 * `useState(true)` + `useEffect` + `setTimeout(500)`, so the prerendered HTML
 * contained nothing but the "Loading…" spinner. Lighthouse measured LCP at
 * 6.4 s with 93% of it spent in render delay for exactly this reason: no
 * content could paint until the client bundle downloaded, hydrated and burned
 * the timer. The sections below are now server-rendered, and the hero video
 * source and counter targets are resolved at build time instead of through
 * post-hydration fetches.
 */
export default function HomeMain() {
  const counterTargets = getCounterTargets();
  const clientLogos = getClientLogoImages();
  const hero = getHeroSources();

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      {/* The poster is the LCP element. Preloading it with a high priority hint
          makes it discoverable in the initial document instead of waiting for
          the <video> to be parsed — Lighthouse's LCP-discovery check was
          failing on both "priority hinted" and "discoverable in document". */}
      <link
        rel="preload"
        as="image"
        href={hero.poster}
        fetchPriority="high"
      />
      <Home videoSrc={hero.src} webm={hero.webm} poster={hero.poster} />
      <DreamSection counterTargets={counterTargets} />
      <ServiceGrid />
      <ProjectSlider />
      <NewsAndEvents />
      <Transform />
      <TestimonialHome />
      <section className={`${Styles.logoScroll} deferred-section`}>
        <h2>Our Recent Clients</h2>
        <LogoScroll logos={clientLogos} />
      </section>
      <Newsletter />
    </main>
  );
}
