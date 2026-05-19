"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "60vh",
        padding: "24px",
        textAlign: "center",
        gap: "16px",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "#00376a" }}>Something went wrong</h1>
      <p style={{ maxWidth: "480px", color: "#475569" }}>
        We could not load this page. Please try again.
      </p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            background: "#00376a",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            background: "#f1f5f9",
            color: "#00376a",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
