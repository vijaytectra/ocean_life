import React from "react";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7774.64361334262!2d80.2008328!3d13.0151675!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e1eb5a7a5d%3A0xc16bd0a4217d52a6!2sOcean%20Lifespaces!5e0!3m2!1sen!2sin!4v1719586705221!5m2!1sen!2sin";

export default function MapComponent({ className }) {
  if (className) {
    return (
      <iframe
        src={MAP_SRC}
        className={className}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ocean Lifespaces location on Google Maps"
      />
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "0",
        paddingBottom: "56.25%",
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <iframe
        src={MAP_SRC}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          border: "0",
          borderRadius: "8px",
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ocean Lifespaces location on Google Maps"
      />
    </div>
  );
}
