"use client";

import { useEffect, useRef, useState } from "react";
import Styles from "./home.module.css";
import { guessVideoMimeType, isHeroBackgroundImageUrl } from "@/lib/mainVideoContent";

/**
 * Hero background media.
 *
 * The source is resolved on the server and passed in, replacing the
 * `useMainHeroVideoSrc` hook that fetched `/api/content` after hydration and
 * then swapped the `<video>` src — which made the browser download two copies
 * of the same 32 MB clip on every home page view.
 *
 * The poster paints immediately (it is the LCP element now), and the video
 * itself is only attached once the page has loaded, so it never competes with
 * the critical render. Autoplay/loop/muted behaviour is unchanged.
 */
export default function HeroMedia({ src, webm, poster }) {
  const videoRef = useRef(null);
  const [attach, setAttach] = useState(false);
  const isImage = isHeroBackgroundImageUrl(src);

  useEffect(() => {
    if (isImage) return;

    let idle;
    const start = () => {
      idle =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(() => setAttach(true), { timeout: 2500 })
          : setTimeout(() => setAttach(true), 300);
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      window.removeEventListener("load", start);
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle);
      } else {
        clearTimeout(idle);
      }
    };
  }, [isImage]);

  // Once the source is attached, kick off playback explicitly — `autoPlay`
  // alone does not always fire for a source added after mount.
  useEffect(() => {
    if (!attach) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    const played = video.play();
    if (played?.catch) played.catch(() => {});
  }, [attach]);

  if (isImage) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return (
      <img
        className={Styles.bgVideo}
        src={src}
        alt=""
        fetchPriority="high"
        decoding="async"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={Styles.bgVideo}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    >
      {attach && (
        <>
          {webm && <source src={webm} type="video/webm" />}
          <source src={src} type={guessVideoMimeType(src)} />
        </>
      )}
    </video>
  );
}
