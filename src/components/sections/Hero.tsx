"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ArrowDown, Sparkles } from "lucide-react";
import { MONCITO_DATA } from "@/data/moncito";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => null,
});

const name = MONCITO_DATA.nickname.toUpperCase();

// Scramble decode characters
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>{}[]";

function scrambleDecode(
  el: HTMLElement,
  finalText: string,
  duration: number = 1.2
) {
  const length = finalText.length;
  const obj = { progress: 0 };

  gsap.to(obj, {
    progress: 1,
    duration,
    ease: "power2.inOut",
    onUpdate() {
      let display = "";
      for (let i = 0; i < length; i++) {
        const charProgress = (obj.progress - i / length / 1.5) * 2;
        if (charProgress >= 1) {
          display += finalText[i];
        } else {
          display +=
            GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }
      }
      el.textContent = display;
    },
    onComplete() {
      el.textContent = finalText;
    },
  });
}

export default function Hero() {
  const nameRef     = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Badge entrance
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.3
    );

    // Name scramble decode
    if (nameRef.current) {
      tl.add(() => scrambleDecode(nameRef.current!, name, 1.4), 0.6);
      tl.fromTo(
        nameRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8 },
        0.6
      );
    }

    // Subtitle entrance
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      1.4
    );

    // CTA buttons entrance
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      1.7
    );

    // Scroll indicator
    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      2.5
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 3D Canvas Background — z-index set in Scene.tsx to 0 */}
      <Scene />

      {/* Edge vignette — soft edges only, particles show through center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 80% at 50% 50%,
            transparent 55%,
            rgba(10,10,10,0.2) 75%,
            rgba(10,10,10,0.5) 100%
          )`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1rem",
            borderRadius: "999px",
            border: "1px solid rgba(99,102,241,0.3)",
            background: "rgba(99,102,241,0.08)",
            color: "var(--accent-glow)",
            fontSize: "0.8rem",
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.1em",
            marginBottom: "2rem",
            backdropFilter: "blur(10px)",
            opacity: 0,
          }}
        >
          <Sparkles size={12} />
          {MONCITO_DATA.year} · {MONCITO_DATA.school.split(" - ")[0]}
        </div>

        {/* Scramble Name */}
        <div
          ref={nameRef}
          style={{
            fontSize: "clamp(2.5rem, 10vw, 6rem)",
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "0.5rem",
            background:
              "linear-gradient(160deg, #ffffff 0%, #e0e7ff 25%, #a5b4fc 55%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 40px rgba(99,102,241,0.4))",
            opacity: 0,
          }}
        >
          {name}
        </div>

        {/* Role */}
        <p
          ref={subtitleRef}
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.15rem)",
            color: "var(--text-secondary)",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 400,
            letterSpacing: "0.02em",
            marginBottom: "2.5rem",
            lineHeight: 1.6,
            opacity: 0,
          }}
        >
          {MONCITO_DATA.role}
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: 0,
          }}
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            data-magnetic
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              color: "white",
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              letterSpacing: "0.05em",
              transition: "all 0.3s ease",
              boxShadow: "0 0 30px rgba(99,102,241,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.boxShadow =
                "0 0 50px rgba(99,102,241,0.6)";
              (e.target as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.boxShadow =
                "0 0 30px rgba(99,102,241,0.3)";
              (e.target as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            View My Work
          </a>

          {/* GitHub CTA */}
          <a
            href={MONCITO_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              background: "transparent",
              border: "1px solid rgba(99,102,241,0.4)",
              color: "var(--text-primary)",
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "#6366f1";
              (e.target as HTMLElement).style.background =
                "rgba(99,102,241,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor =
                "rgba(99,102,241,0.4)";
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--text-muted)",
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <div
          style={{
            animation: "float 1.5s ease-in-out infinite",
          }}
        >
          <ArrowDown size={16} />
        </div>
      </div>

      {/* Corner decorations */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "1.5rem",
          zIndex: 2,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
        }}
      >
        PORTFOLIO_OS v1.0
      </div>

      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 2,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
        }}
      >
        PH · 2026
      </div>
    </section>
  );
}
