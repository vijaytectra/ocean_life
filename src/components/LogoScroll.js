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
    fetch("/api/clients/logos/", { cache: "no-store", credentials: "same-origin" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data.map((l) => l.image));
        }
      })
      .catch((err) => console.error("LogoScroll fetch error:", err));
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const logoWidth = isMobile ? "100px" : "160px";
  const logoHeight = isMobile ? "50px" : "90px";
  const gap = isMobile ? "40px" : "80px";
  const duplicatedImages = [...images, ...images, ...images, ...images];

  return (
    <div
      className="logo-scroll-container"
      style={{
        overflow: "hidden",
        width: "100%",
        maxWidth: "100vw",
        position: "relative",
        padding: "40px 0",
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div
        className="logo-scroll-track"
        style={{
          display: "flex",
          gap: gap,
          width: "max-content",
          alignItems: "center",
          animation: `scroll ${isMobile ? '100s' : '160s'} linear infinite`,
        }}
      >
        {duplicatedImages.map((src, index) => (
          <div 
            key={index} 
            style={{ 
              flexShrink: 0, 
              width: logoWidth, 
              height: logoHeight, 
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Image
              src={src}
              alt={`logo-${index}`}
              fill
              style={{ objectFit: "contain" }}
              sizes={logoWidth}
              unoptimized={src?.startsWith("/uploads/")}
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
