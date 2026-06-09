"use client";

import { useState } from "react";

/**
 * Blindfold Reveal — Gojo's signature black blindfold (#1A1A1A).
 * On hover: blindfold slides away revealing Six Eyes (neon blue #1F5AFF).
 */
export function BlindfoldReveal() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div
      className="relative cursor-default"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      style={{ width: 128, height: 128 }}
    >
      {/* Profile photo */}
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-purple-500/50">
        <img
          src="/profile.jpg"
          alt="Bagus Wiranto Wicaksono"
          className="w-full h-full object-cover transition-all duration-500"
          style={{
            filter: isRevealed ? "brightness(1.15) contrast(1.1)" : "brightness(0.85)",
          }}
        />
      </div>

      {/* Black blindfold overlay — Gojo's signature */}
      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{
          top: "38%",
          left: "6%",
          right: "6%",
          height: "18%",
          background: isRevealed
            ? "linear-gradient(90deg, #1F5AFF, #1F5AFF)"
            : "linear-gradient(90deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)",
          borderRadius: "50%",
          transform: isRevealed ? "translateX(120%)" : "translateX(0)",
          transition: "transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
          zIndex: 10,
          border: isRevealed ? "none" : "1px solid #2a2a2a",
          boxShadow: isRevealed
            ? "none"
            : "inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Fabric texture */}
        {!isRevealed && (
          <div
            className="w-full h-full"
            style={{
              background: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(40, 40, 40, 0.3) 3px, rgba(40, 40, 40, 0.3) 4px)",
            }}
          />
        )}
      </div>

      {/* Six Eyes (Rikugan) — revealed on hover */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "42%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 24,
          opacity: isRevealed ? 1 : 0,
          transition: "opacity 0.3s ease 0.2s",
          zIndex: 5,
        }}
      >
        {/* Left eye */}
        <div
          className="rounded-full"
          style={{
            width: 12,
            height: 12,
            background: "radial-gradient(circle, #D1E6FF 0%, #1F5AFF 50%, rgba(31, 90, 255, 0.4) 80%, transparent 100%)",
            boxShadow: "0 0 15px #1F5AFF, 0 0 30px rgba(31, 90, 255, 0.6), 0 0 45px rgba(31, 90, 255, 0.3)",
            animation: "six-eyes-blink 3s ease-in-out infinite",
          }}
        />
        {/* Right eye */}
        <div
          className="rounded-full"
          style={{
            width: 12,
            height: 12,
            background: "radial-gradient(circle, #D1E6FF 0%, #1F5AFF 50%, rgba(31, 90, 255, 0.4) 80%, transparent 100%)",
            boxShadow: "0 0 15px #1F5AFF, 0 0 30px rgba(31, 90, 255, 0.6), 0 0 45px rgba(31, 90, 255, 0.3)",
            animation: "six-eyes-blink 3s ease-in-out 0.15s infinite",
          }}
        />
      </div>

      {/* Energy ring pulse when revealed */}
      {isRevealed && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -8,
            border: "1px solid rgba(31, 90, 255, 0.5)",
            animation: "blindfold-pulse 1s ease-out forwards",
          }}
        />
      )}
    </div>
  );
}
