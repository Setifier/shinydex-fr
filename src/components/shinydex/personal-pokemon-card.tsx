"use client";

import Image from "next/image";
import type { Pokemon } from "@/types/pokemon";
import { getImagePath } from "@/lib/pokemon-data";

interface PersonalPokemonCardProps {
  pokemon: Pokemon;
  isCaught: boolean;
  fontSize: string;
  padding: string;
  onClick?: (pokemon: Pokemon) => void;
}

export function PersonalPokemonCard({
  pokemon,
  isCaught,
  fontSize,
  padding,
  onClick,
}: PersonalPokemonCardProps) {
  const imagePath = isCaught
    ? getImagePath(pokemon.image)
    : "/assets/interro.png";

  const baseNumber = pokemon.id.split("-")[0];

  return (
    <div
      className="pokemon-card group cursor-pointer"
      onClick={() => onClick?.(pokemon)}
    >
      <div
        className={`relative aspect-square pokemon-card-bg rounded-lg border-2 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:scale-110
          ${isCaught
            ? "pokemon-card-border"
            : "border-border/30 opacity-60"
          }`}
      >
        <Image
          src={imagePath}
          alt={isCaught ? pokemon.name : "???"}
          fill
          className={`object-contain ${padding} ${
            isCaught
              ? "group-hover:scale-110 transition-transform duration-300"
              : "translate-y-[6%]"
          }`}
          sizes="(max-width: 640px) 25vw, (max-width: 768px) 16vw, (max-width: 1024px) 12vw, 10vw"
        />

        {/* Numéro — toujours affiché */}
        <div className={`absolute top-1 left-1 bg-black/70 text-primary ${fontSize} font-bold px-2 py-1 rounded`}>
          #{baseNumber}
        </div>

        {/* Nom au survol — seulement si capturé */}
        {isCaught && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className={`${fontSize} font-semibold truncate px-1`}>
              {pokemon.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
