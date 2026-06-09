"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Cursed technique decorative animations — accurate to Gojo's abilities.
 * Blue (蒼/Ao), Red (赫/Aka), Hollow Purple (茈/Murasaki).
 */

type Technique = {
  name: string;
  kanji: string;
  romaji: string;
  color: string;
  colorRgb: string;
  desc: string;
};

const TECHNIQUES: Technique[] = [
  {
    name: "Blue",
    kanji: "蒼",
    romaji: "Ao",
    color: "#1F5AFF",
    colorRgb: "31, 90, 255",
    desc: "Negative attraction",
  },
  {
    name: "Red",
    kanji: "赫",
    romaji: "Aka",
    color: "#FF2D2D",
    colorRgb: "255, 45, 45",
    desc: "Positive repulsion",
  },
  {
    name: "Purple",
    kanji: "茈",
    romaji: "Murasaki",
    color: "#8A2BE2",
    colorRgb: "138, 43, 226",
    desc: "Hollow Purple",
  },
];

function TechniqueOrb({
  technique,
  size = 60,
  delay = 0,
}: {
  technique: Technique;
  size?: number;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-default pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: size,
        height: size,
        animation: `technique-float 5s ease-in-out ${delay}s infinite`,
      }}
    >
      {/* Outer energy ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid rgba(${technique.colorRgb}, ${isHovered ? 0.7 : 0.25})`,
          animation: "technique-ring-spin 8s linear infinite",
          transition: "border-color 0.3s ease",
        }}
      />

      {/* Pulsing glow */}
      <div
        className="absolute rounded-full"
        style={{
          inset: -size * 0.35,
          background: `radial-gradient(circle, rgba(${technique.colorRgb}, ${isHovered ? 0.35 : 0.12}) 0%, transparent 70%)`,
          filter: `blur(${isHovered ? 18 : 12}px)`,
          transition: "all 0.3s ease",
          animation: "technique-pulse 3s ease-in-out infinite",
        }}
      />

      {/* Core orb */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "20%",
          background: `radial-gradient(circle, ${technique.color} 0%, rgba(${technique.colorRgb}, 0.4) 50%, transparent 100%)`,
          boxShadow: isHovered
            ? `0 0 ${size * 0.5}px ${technique.color}, 0 0 ${size}px rgba(${technique.colorRgb}, 0.4)`
            : `0 0 ${size * 0.25}px rgba(${technique.colorRgb}, 0.35)`,
          transition: "box-shadow 0.3s ease",
        }}
      />

      {/* Kanji + name label */}
      <div
        className="absolute text-center pointer-events-none"
        style={{
          bottom: -28,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: isHovered ? 1 : 0.5,
          transition: "opacity 0.3s ease",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontSize: 16,
            display: "block",
            color: technique.color,
            fontWeight: 700,
            textShadow: isHovered ? `0 0 8px rgba(${technique.colorRgb}, 0.5)` : "none",
          }}
        >
          {technique.kanji}
        </span>
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            color: technique.color,
            fontWeight: 600,
            opacity: 0.8,
          }}
        >
          {technique.romaji}
        </span>
      </div>
    </div>
  );
}

/**
 * Floating cursed technique orbs in hero background.
 */
export function CursedTechniques() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {/* Blue (蒼) — gravitational attraction */}
      <div className="absolute" style={{ top: "18%", left: "5%", opacity: 0.7 }}>
        <TechniqueOrb technique={TECHNIQUES[0]} size={50} delay={0} />
      </div>

      {/* Red (赫) — repulsion explosion */}
      <div className="absolute" style={{ bottom: "22%", right: "3%", opacity: 0.6 }}>
        <TechniqueOrb technique={TECHNIQUES[1]} size={45} delay={1.5} />
      </div>

      {/* Hollow Purple (茈) — annihilation */}
      <div className="absolute" style={{ top: "32%", right: "10%", opacity: 0.5 }}>
        <TechniqueOrb technique={TECHNIQUES[2]} size={40} delay={3} />
      </div>
    </div>
  );
}
