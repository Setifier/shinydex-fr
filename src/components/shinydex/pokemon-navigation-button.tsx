"use client";

import Image from "next/image";
import type { Pokemon } from "@/types/pokemon";
import { getImagePath } from "@/lib/pokemon-data";

interface PokemonNavigationButtonProps {
  pokemon: Pokemon | null;
  direction: "previous" | "next";
  onClick: () => void;
  disabled?: boolean;
}

export function PokemonNavigationButton({
  pokemon,
  direction,
  onClick,
  disabled = false,
}: PokemonNavigationButtonProps) {
  if (!pokemon) return null;

  const imagePath = getImagePath(pokemon.image);
  const baseNumber = pokemon.id.split("-")[0];
  const isPrevious = direction === "previous";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative flex items-center gap-5 px-8 py-5 rounded-lg
        bg-gradient-to-b from-slate-200/90 to-slate-300/90 dark:from-slate-700/80 dark:to-slate-800/80
        border-2 border-primary/40 hover:border-primary/60
        transition-all duration-200
        hover:scale-105 hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${isPrevious ? "flex-row" : "flex-row-reverse"}
      `}
      aria-label={`${isPrevious ? "Précédent" : "Suivant"}: ${pokemon.name}`}
    >
      {/* Flèche directionnelle */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
        <svg
          className="w-7 h-7 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isPrevious ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          )}
        </svg>
      </div>

      {/* Image du Pokémon */}
      <div className="relative w-20 h-20 pokemon-card-bg rounded-lg border border-primary/30 overflow-hidden">
        <Image
          src={imagePath}
          alt={pokemon.name}
          fill
          className="object-contain p-1"
          sizes="80px"
        />
      </div>

      {/* Info Pokémon */}
      <div className={`flex flex-col ${isPrevious ? "items-start" : "items-end"}`}>
        <span className="text-base text-primary font-bold">#{baseNumber}</span>
        <span className="text-lg text-foreground font-semibold truncate max-w-[160px]">
          {pokemon.name}
        </span>
      </div>
    </button>
  );
}
