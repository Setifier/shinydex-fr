"use client";

const POKEBALLS = [
  {
    size: 280,
    top: "-2%",
    left: "-3%",
    color: "var(--primary)",
    animation: "blob-1 20s ease-in-out infinite",
  },
  {
    size: 220,
    top: "25%",
    right: "-4%",
    color: "var(--secondary)",
    animation: "blob-2 25s ease-in-out infinite",
  },
  {
    size: 240,
    bottom: "5%",
    left: "15%",
    color: "var(--primary-light)",
    animation: "blob-3 22s ease-in-out infinite",
  },
  {
    size: 180,
    top: "8%",
    right: "20%",
    color: "var(--secondary-light)",
    animation: "blob-4 28s ease-in-out infinite",
  },
  {
    size: 200,
    top: "55%",
    left: "60%",
    color: "var(--primary)",
    animation: "blob-1 24s ease-in-out infinite",
  },
  {
    size: 160,
    bottom: "-3%",
    right: "30%",
    color: "var(--secondary)",
    animation: "blob-3 26s ease-in-out infinite",
  },
];

export function BackgroundBlobs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {POKEBALLS.map((ball, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-35 dark:opacity-20"
          style={{
            width: ball.size,
            height: ball.size,
            top: ball.top,
            left: ball.left,
            right: ball.right,
            bottom: ball.bottom,
            background: `linear-gradient(to bottom, ${ball.color} 42%, color-mix(in srgb, ${ball.color} 80%, #1a1a2e) 42%, color-mix(in srgb, ${ball.color} 80%, #1a1a2e) 58%, #f0f0f0 58%)`,
            filter: "blur(35px)",
            animation: ball.animation,
          }}
        />
      ))}
    </div>
  );
}
