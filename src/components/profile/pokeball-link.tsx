"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PokeballLink({ href }: { href: string }) {
  const router = useRouter();
  const [squeezing, setSqueezing] = useState(false);
  const [hovering, setHovering]   = useState(false);

  const handleClick = () => {
    setSqueezing(true);
    setHovering(false);
    setTimeout(() => router.push(href), 420);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="flex flex-col items-center gap-4 cursor-pointer bg-transparent border-none outline-none"
    >
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          transform: hovering && !squeezing ? "scale(1.07)" : "scale(1)",
          filter: hovering && !squeezing
            ? "drop-shadow(0 0 16px rgba(57,154,180,0.55)) drop-shadow(0 0 32px rgba(53,190,124,0.3))"
            : "none",
        }}
      >
        {/* Ombre portée — fixe, ne tourne pas avec la ball */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-3 rounded-full bg-black/25 blur-[6px]" />

        <svg
          viewBox="0 0 100 100"
          className={`relative w-40 h-40 transition-none ${
            squeezing
              ? "animate-squeeze"
              : hovering
              ? "animate-pokeball-roll"
              : ""
          }`}
          onAnimationEnd={() => setSqueezing(false)}
        >
          <defs>
            <linearGradient id="pb-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#399ab4" />
              <stop offset="100%" stopColor="#35be7c" />
            </linearGradient>
            <radialGradient id="pb-shine" cx="36%" cy="26%" r="48%">
              <stop offset="0%" stopColor="white" stopOpacity="0.65" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="pb-dark" cx="50%" cy="80%" r="55%">
              <stop offset="0%" stopColor="#000" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            <clipPath id="pb-clip">
              <circle cx="50" cy="50" r="45" />
            </clipPath>
          </defs>

          {/* Moitié basse — blanc grisé */}
          <path d="M5 50 A45 45 0 0 0 95 50 Z" fill="#dde4ec" />

          {/* Moitié haute — dégradé bleu→vert */}
          <path d="M5 50 A45 45 0 0 1 95 50 Z" fill="url(#pb-grad)" />

          {/* Trait central */}
          <rect x="0" y="48" width="100" height="4" fill="#111827" clipPath="url(#pb-clip)" />

          {/* Bouton central — niveau 1 */}
          <circle cx="50" cy="50" r="13" fill="#dde4ec" />
          <circle cx="50" cy="50" r="13" fill="none" stroke="#111827" strokeWidth="3.5" />
          {/* Bouton central — niveau 2 */}
          <circle cx="50" cy="50" r="7.5" fill="none" stroke="#111827" strokeWidth="1.2" />

          {/* Brillance haut */}
          <path d="M5 50 A45 45 0 0 1 95 50 Z" fill="url(#pb-shine)" clipPath="url(#pb-clip)" />

          {/* Ombre bas */}
          <path d="M5 50 A45 45 0 0 0 95 50 Z" fill="url(#pb-dark)" clipPath="url(#pb-clip)" />

          {/* Reflet cartoon haut-gauche */}
          <ellipse cx="33" cy="27" rx="11" ry="7" fill="white" fillOpacity="0.35" transform="rotate(-25 33 27)" clipPath="url(#pb-clip)" />

          {/* Contour extérieur */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="#111827" strokeWidth="4" />
        </svg>
      </div>

      <span className="text-xl font-semibold text-primary">Mon Shinydex</span>
    </button>
  );
}
