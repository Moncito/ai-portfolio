"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

const Preloader = dynamic(() => import("@/components/ui/Preloader"), {
  ssr: false,
});

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  const handleComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Preloader onComplete={handleComplete} />}
      <CustomCursor />
      <div className="film-grain" />
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
