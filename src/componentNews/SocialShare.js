import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialShare = () => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : ""; // Get current page URL

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Facebook Share */}
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook size={30} style={{ color: "#17315A" }} />
      </Link>

      {/* X Share (formerly Twitter) */}
      <Link
        href={`https://twitter.com/share?url=${encodeURIComponent(
          currentUrl
        )}&text=Check this out!`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaXTwitter size={30} style={{ color: "#17315A" }} />
      </Link>

      {/* Instagram (Instagram does not allow direct link sharing like FB or Twitter) */}
      <Link
        href={`https://www.instagram.com`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram size={30} style={{ color: "#17315A" }} />
      </Link>
    </div>
  );
};

export default SocialShare;
