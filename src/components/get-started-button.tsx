"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const GetStartedButton = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isSqueezing, setIsSqueezing] = useState(false);

  const handleClick = () => {
    const href = session ? "/profile" : "/auth/login";
    setIsSqueezing(true);
    setTimeout(() => {
      router.push(href);
    }, 400);
  };

  if (isPending) {
    return (
      <button
        disabled
        className="relative px-16 py-8 text-2xl font-bold text-white uppercase tracking-wider rounded-2xl cursor-not-allowed opacity-70 bg-gradient-to-br from-slate-400 to-slate-600 shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
        <div className="relative z-10 flex items-center justify-center gap-3">
          <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          Chargement...
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`group relative px-16 py-8 text-2xl font-bold text-white uppercase tracking-wider rounded-2xl shadow-xl border-4 border-primary-light/50 transition-all duration-300 ${
        isSqueezing ? "animate-squeeze" : ""
      }`}
      style={{
        background:
          "linear-gradient(to bottom right, #399ab4, #1c5b6c, #0f323c)",
        transition: "filter 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.filter = "brightness(1.2) saturate(1.3)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.filter = "brightness(1) saturate(1)")
      }
    >
      {/* Effet de brillance supérieure */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-t-xl pointer-events-none"></div>

      {/* Effet de profondeur */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl pointer-events-none"></div>

      {/* Effet de scintillement shiny au survol */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl pointer-events-none overflow-hidden">
        <div className="absolute inset-0 animate-shiny-sparkle bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"></div>
      </div>

      {/* Scintillements en forme d'étoiles - aléatoires avec délais */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[15%] animate-sparkle-1">
          <div className="relative w-1.5 h-1.5">
            <div className="absolute inset-0 bg-white rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-white rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-[25%] left-[20%] animate-sparkle-2">
          <div className="relative w-1.5 h-1.5">
            <div className="absolute inset-0 bg-white rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-white rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-[40%] left-[12%] animate-sparkle-3">
          <div className="relative w-1 h-1">
            <div className="absolute inset-0 bg-primary-lighter rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-primary-lighter rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-[50%] left-[25%] animate-sparkle-4">
          <div className="relative w-1.5 h-1.5">
            <div className="absolute inset-0 bg-white rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-white rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-[80%] left-[40%] animate-sparkle-1">
          <div className="relative w-1.5 h-1.5">
            <div className="absolute inset-0 bg-primary-lighter rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-primary-lighter rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-[35%] left-[35%] animate-sparkle-2">
          <div className="relative w-1 h-1">
            <div className="absolute inset-0 bg-white rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-white rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-[15%] left-[60%] animate-sparkle-3">
          <div className="relative w-1 h-1">
            <div className="absolute inset-0 bg-white rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-white rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-[50%] left-[65%] animate-sparkle-4">
          <div className="relative w-1.5 h-1.5">
            <div className="absolute inset-0 bg-primary-lighter rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-primary-lighter rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-[15%] left-[70%] animate-sparkle-1">
          <div className="relative w-1 h-1">
            <div className="absolute inset-0 bg-white rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-white rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-[20%] right-[10%] animate-sparkle-2">
          <div className="relative w-1 h-1">
            <div className="absolute inset-0 bg-primary-lighter rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-primary-lighter rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-[70%] right-[20%] animate-sparkle-3">
          <div className="relative w-1 h-1">
            <div className="absolute inset-0 bg-primary-lighter rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-primary-lighter rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-[60%] right-[15%] animate-sparkle-4">
          <div className="relative w-1 h-1">
            <div className="absolute inset-0 bg-white rotate-0 scale-x-[3] scale-y-[0.5] rounded-full"></div>
            <div className="absolute inset-0 bg-white rotate-90 scale-x-[3] scale-y-[0.5] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Texte */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        <span className="drop-shadow-lg">
          {session ? `Carte de ${session.user.name}` : "Se connecter"}
        </span>
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </button>
  );
};
