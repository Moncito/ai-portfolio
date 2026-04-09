"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MONCITO_DATA } from "@/data/moncito";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>{}[]";
const DISPLAY_NAME = MONCITO_DATA.nickname.toUpperCase();

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [, setForceRender] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    const container = containerRef.current;
    const bar = barRef.current;
    const nameEl = nameRef.current;
    const counter = counterRef.current;
    if (!container || !bar || !nameEl || !counter) return;

    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    // Scramble name decode
    const nameLength = DISPLAY_NAME.length;
    const scrambleObj = { progress: 0 };

    // Phase 1: Loading bar + counter + name scramble
    tl.to(scrambleObj, {
      progress: 1,
      duration: 2,
      ease: "power2.inOut",
      onUpdate() {
        let display = "";
        for (let i = 0; i < nameLength; i++) {
          const charProgress = (scrambleObj.progress - i / nameLength / 1.5) * 2;
          if (charProgress >= 1) {
            display += DISPLAY_NAME[i];
          } else {
            display +=
              GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
        }
        nameEl.textContent = display;
      },
      onComplete() {
        nameEl.textContent = DISPLAY_NAME;
      },
    }, 0);

    // Loading bar fill
    tl.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 2,
        ease: "power2.inOut",
        onUpdate() {
          const pct = Math.round(gsap.getProperty(bar, "scaleX") as number * 100);
          counter.textContent = `${pct}`;
        },
      },
      0
    );

    // Phase 2: Hold briefly
    tl.to({}, { duration: 0.3 });

    // Phase 3: Wipe out
    tl.to(nameEl, {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: "power3.in",
    });

    tl.to(
      [barTrackRef.current, counter],
      { opacity: 0, duration: 0.3, ease: "power3.in" },
      "-=0.2"
    );

    // Curtain reveal — split up/down
    tl.to(container, {
      clipPath: "inset(50% 0 50% 0)",
      duration: 0.8,
      ease: "power4.inOut",
      onComplete() {
        document.body.style.overflow = "";
        onComplete();
        setForceRender((v) => v + 1);
      },
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      {/* Scramble name */}
      <div
        ref={nameRef}
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2rem, 6vw, 4rem)",
          letterSpacing: "-0.02em",
          background:
            "linear-gradient(160deg, #ffffff 0%, #e0e7ff 25%, #a5b4fc 55%, #6366f1 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {DISPLAY_NAME}
      </div>

      {/* Loading bar track */}
      <div
        ref={barTrackRef}
        style={{
          position: "relative",
          width: "min(300px, 60vw)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 2,
            background: "rgba(99,102,241,0.15)",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <div
            ref={barRef}
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, #6366f1, #a855f7)",
              transformOrigin: "left",
              transform: "scaleX(0)",
              borderRadius: 1,
            }}
          />
        </div>
        {/* Counter */}
        <span
          ref={counterRef}
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          0
        </span>
      </div>
    </div>
  );
}
