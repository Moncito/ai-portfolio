export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        fontFamily: "Syne, sans-serif",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
        PORTFOLIO OS
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
        Phase 1 Complete ✅ — Foundation is ready.
      </p>
      <p style={{ color: "var(--accent-primary)", fontSize: "0.9rem", fontFamily: "JetBrains Mono" }}>
        Next: Phase 2 — 3D Hero Scene
      </p>
    </main>
  );
}
