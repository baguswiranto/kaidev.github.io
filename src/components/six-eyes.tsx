"use client";

import { useEffect, useState } from "react";

/**
 * Six Eyes (Rikugan) glow effect — accurate Gojo blue.
 * Deep neon blue #1F5AFF to #D1E6FF with intense glow.
 * Appears on scroll, intensity grows with page progress.
 */
export function SixEyes() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollProgress(progress);
      setIsVisible(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isMobile) return null;

  const glowIntensity = Math.min(scrollProgress * 3, 1);
  const eyeSize = 10 + glowIntensity * 14;

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? glowIntensity * 0.5 : 0,
        transition: "opacity 0.8s ease",
        zIndex: 5,
      }}
    >
      <div className="flex gap-14">
        {/* Left eye */}
        <div
          className="relative"
          style={{
            width: eyeSize,
            height: eyeSize,
            animation: "six-eyes-blink 4s ease-in-out infinite",
          }}
        >
          {/* Outer glow */}
          <div
            className="absolute rounded-full"
            style={{
              inset: -(eyeSize * 2),
              background: `radial-gradient(circle, rgba(31, 90, 255, ${glowIntensity * 0.35}) 0%, rgba(209, 230, 255, ${glowIntensity * 0.15}) 40%, transparent 70%)`,
              filter: `blur(${12 + glowIntensity * 18}px)`,
            }}
          />
          {/* Core - bright blue */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #D1E6FF 0%, #1F5AFF 40%, rgba(31, 90, 255, 0.5) 70%, transparent 100%)",
              boxShadow: `0 0 ${eyeSize}px #1F5AFF, 0 0 ${eyeSize * 2}px rgba(31, 90, 255, ${glowIntensity * 0.5})`,
            }}
          />
          {/* Inner pupil hint */}
          <div
            className="absolute rounded-full"
            style={{
              top: "30%",
              left: "30%",
              width: "40%",
              height: "40%",
              background: "radial-gradient(circle, #FFFFFF 0%, rgba(209, 230, 255, 0.4) 60%, transparent 100%)",
            }}
          />
        </div>

        {/* Right eye */}
        <div
          className="relative"
          style={{
            width: eyeSize,
            height: eyeSize,
            animation: "six-eyes-blink 4s ease-in-out 0.1s infinite",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              inset: -(eyeSize * 2),
              background: `radial-gradient(circle, rgba(31, 90, 255, ${glowIntensity * 0.35}) 0%, rgba(209, 230, 255, ${glowIntensity * 0.15}) 40%, transparent 70%)`,
              filter: `blur(${12 + glowIntensity * 18}px)`,
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #D1E6FF 0%, #1F5AFF 40%, rgba(31, 90, 255, 0.5) 70%, transparent 100%)",
              boxShadow: `0 0 ${eyeSize}px #1F5AFF, 0 0 ${eyeSize * 2}px rgba(31, 90, 255, ${glowIntensity * 0.5})`,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              top: "30%",
              left: "30%",
              width: "40%",
              height: "40%",
              background: "radial-gradient(circle, #FFFFFF 0%, rgba(209, 230, 255, 0.4) 60%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
