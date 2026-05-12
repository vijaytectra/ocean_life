"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

// Extended list of logos to make the scroll smoother and more diverse
export default function LogoScroll() {
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/clients/logos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setImages(data.map(l => l.image));
        }
      })
      .catch(err => console.error("LogoScroll fetch error:", err));
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || images.length === 0) return;

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
