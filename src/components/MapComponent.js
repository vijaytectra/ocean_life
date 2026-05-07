// components/MapComponent.js
import React from "react";

const MapComponent = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "0",
        paddingBottom: "56.25%", // 16:9 aspect ratio for responsiveness
        overflow: "hidden",
        borderRadius: "8px", // Optional, rounded corners for a polished look
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional shadow for depth
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7774.64361334262!2d80.2008328!3d13.0151675!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e1eb5a7a5d%3A0xc16bd0a4217d52a6!2sOcean%20Lifespaces!5e0!3m2!1sen!2sin!4v1719586705221!5m2!1sen!2sin"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          border: "0",
          borderRadius: "8px", // Matching the border-radius for consistency
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapComponent;
