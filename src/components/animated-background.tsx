"use client";

const STARS = Array.from({ length: 80 }, (_, i) => {
  const h1 = ((i * 157 + 31) % 100) / 100;
  const h2 = ((i * 89 + 17) % 100) / 100;
  const h3 = ((i * 233 + 7) % 100) / 100;
  const h4 = ((i * 67 + 43) % 100) / 100;
  return {
    top: `${h1 * 100}%`,
    left: `${h2 * 100}%`,
    size: 0.5 + h3 * 2,
    opacity: 0.15 + h4 * 0.5,
    duration: 3 + h3 * 5,
    delay: h4 * 4,
  };
});

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Nebula glow */}
      <div
        className="absolute rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{
          top: "10%",
          left: "20%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{
          top: "60%",
          right: "10%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Stars */}
      {STARS.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: i % 5 === 0 ? "#22d3ee" : i % 7 === 0 ? "#818cf8" : "#fff",
            "--star-opacity": star.opacity,
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
