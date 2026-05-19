"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #00376a, #001a33)",
          color: "#fff",
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>Application error</h1>
          <p style={{ marginBottom: "24px", opacity: 0.9 }}>
            The site hit an unexpected error. Please refresh or try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "12px 24px",
              borderRadius: "6px",
              border: "none",
              background: "#fff",
              color: "#00376a",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
