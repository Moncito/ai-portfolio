"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Track mouse position
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Ring follows with lag
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    // Magnetic effect on interactive elements
    const onEnterInteractive = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      isHovering.current = true;

      gsap.to(dot, { scale: 0.5, opacity: 0.5, duration: 0.3 });
      gsap.to(ring, {
        scale: 1.8,
        borderColor: "rgba(99,102,241,0.6)",
        duration: 0.3,
      });

      // Magnetic pull toward element center
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const onMoveInside = (ev: MouseEvent) => {
        const dx = ev.clientX - centerX;
        const dy = ev.clientY - centerY;
        gsap.to(target, {
          x: dx * 0.2,
          y: dy * 0.15,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      target.addEventListener("mousemove", onMoveInside as EventListener);
      target.dataset.magneticHandler = "true";
      (target as unknown as Record<string, EventListener>)._magneticMove =
        onMoveInside as EventListener;
    };

    const onLeaveInteractive = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      isHovering.current = false;

      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(99,102,241,0.3)",
        duration: 0.3,
      });
      gsap.to(target, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1,0.4)" });

      const handler = (target as unknown as Record<string, EventListener>)
        ._magneticMove;
      if (handler) {
        target.removeEventListener("mousemove", handler);
      }
    };

    // Bind to all interactive elements
    const bindInteractives = () => {
      const elements = document.querySelectorAll(
        'a, button, [data-magnetic], [role="button"]'
      );
      elements.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
      return elements;
    };

    window.addEventListener("mousemove", onMove);

    // Slight delay to let DOM render
    const bindTimeout = setTimeout(() => bindInteractives(), 500);

    // Re-bind on DOM changes
    const observer = new MutationObserver(() => bindInteractives());
    observer.observe(document.body, { childList: true, subtree: true });

    // Hide on mobile / touch
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) {
      dot.style.display = "none";
      ring.style.display = "none";
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(bindTimeout);
      observer.disconnect();
    };
  }, []);

  const shared: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999,
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          ...shared,
          width: 8,
          height: 8,
          background: "#a5b4fc",
          mixBlendMode: "difference",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          ...shared,
          width: 36,
          height: 36,
          border: "1.5px solid rgba(99,102,241,0.3)",
          background: "transparent",
          mixBlendMode: "difference",
        }}
      />
      {/* Hide default cursor globally */}
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
