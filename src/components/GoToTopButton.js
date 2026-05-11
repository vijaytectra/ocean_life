"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show button when the user scrolls down 100px from the top
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="go-to-top-button"
        aria-label="Go to top"
      >
        ↑
      </button>
    )
  );
};

export default GoToTopButton;
