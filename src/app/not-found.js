import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        background: "linear-gradient(135deg, #00376a, black)",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "10px" }}>404</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
        Oops! Page Not Found
      </p>
      <Link
        href="/"
        style={{
          textDecoration: "none",
          backgroundColor: "white",
          color: "#00376a",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          display: "inline-block",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
