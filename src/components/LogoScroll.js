"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

// Extended list of logos to make the scroll smoother and more diverse
const images = [
  "/clients/1.webp", "/clients/2.webp", "/clients/3.webp", "/clients/4.webp", "/clients/5.webp",
  "/clients/6.webp", "/clients/7.webp", "/clients/8.webp", "/clients/9.webp", "/clients/10.webp",
  "/clients/11.webp", "/clients/12.webp", "/clients/13.webp", "/clients/14.webp", "/clients/15.webp",
  "/clients/16.webp", "/clients/17.webp", "/clients/18.webp", "/clients/19.webp", "/clients/20.webp",
  "/clients/21.webp", "/clients/22.webp", "/clients/23.webp", "/clients/24.webp", "/clients/25.webp",
  "/clients/26.webp", "/clients/27.webp", "/clients/28.webp", "/clients/29.webp", "/clients/30.webp",
];

export default function LogoScroll() {
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ctx = gsap.context(() => {
      const updateAnimation = () => {
        const totalWidth = track.scrollWidth / 2;
        if (totalWidth <= 0) {
          setTimeout(updateAnimation, 100);
          return;
        }
        
        gsap.to(track, {
          x: -totalWidth,
          duration: isMobile ? 30 : 50, 
          ease: "none",
          repeat: -1,
        });
      };

      setTimeout(updateAnimation, 500);
    }, trackRef);

    return () => ctx.revert();
  }, [isMobile]);

  const logoWidth = isMobile ? "100px" : "160px";
  const logoHeight = isMobile ? "50px" : "90px";
  const gap = isMobile ? "40px" : "80px";

  return (
    <div
      className="logo-scroll-container"
      style={{
        overflow: "hidden",
        width: "100%",
        maxWidth: "100vw",
        position: "relative",
        padding: "20px 0",
      }}
    >
      <div
        className="logo-scroll-track"
        ref={trackRef}
        style={{
          display: "flex",
          gap: gap,
          width: "max-content",
          alignItems: "center",
          willChange: "transform",
        }}
      >
        {[...images, ...images].map((src, index) => (
          <div 
            key={index} 
            style={{ 
              flexShrink: 0, 
              width: logoWidth, 
              height: logoHeight, 
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              src={src}
              alt={`logo-${index}`}
              fill
              style={{ objectFit: "contain" }}
              sizes={logoWidth}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
