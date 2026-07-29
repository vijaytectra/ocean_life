"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { IoCloseCircle } from "react-icons/io5";

export default function AdPopup({ imageUrl: imageUrlProp }) {
  const pathname = usePathname();
  const isPublicSite = !pathname?.startsWith("/admin");

  const [isVisible, setIsVisible] = useState(false);
  const showTimerRef = useRef(null);
  // Resolved on the server; this used to be a `no-store` fetch of
  // /api/content, one of six identical requests the home page fired for the
  // same compile-time constant.
  const imageUrl = imageUrlProp || null;

  useEffect(() => {
    if (!isPublicSite || !imageUrl) {
      setIsVisible(false);
      return;
    }

    let cancelled = false;

    const clearTimer = () => {
      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }
    };

    clearTimer();

    showTimerRef.current = setTimeout(() => {
      if (!cancelled) setIsVisible(true);
    }, 2000);

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [isPublicSite, imageUrl]);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible || !imageUrl) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "900px",
          width: "calc(100% - 40px)",
          backgroundColor: "transparent",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          animation: "fadeInScale 0.5s ease-out forwards",
        }}
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close advertisement"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            color: "#333",
            display: "flex",
            zIndex: 1,
          }}
        >
          <IoCloseCircle size={32} />
        </button>
        <img
          src={imageUrl}
          alt="Advertisement"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
