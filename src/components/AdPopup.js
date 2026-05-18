"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { IoCloseCircle } from "react-icons/io5";

const POPUP_ID = "popup-image";

function parsePopupUrl(data) {
  if (!Array.isArray(data)) return "";
  const item = data.find((i) => i.id === POPUP_ID);
  const raw = item?.value;
  return typeof raw === "string" ? raw.trim() : "";
}

export default function AdPopup() {
  const pathname = usePathname();
  const isPublicSite = !pathname?.startsWith("/admin");

  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const showTimerRef = useRef(null);

  useEffect(() => {
    if (!isPublicSite) {
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

    fetch("/api/content", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const url = parsePopupUrl(data);
        if (!url) {
          setImageUrl(null);
          setIsVisible(false);
          return;
        }
        setImageUrl(url);
        showTimerRef.current = setTimeout(() => {
          if (!cancelled) setIsVisible(true);
        }, 2000);
      })
      .catch(() => {
        if (!cancelled) {
          setImageUrl(null);
          setIsVisible(false);
        }
      });

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [isPublicSite]);

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
