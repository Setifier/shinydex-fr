"use client";

import Image from "next/image";
import type { Pokemon } from "@/types/pokemon";
import { getImagePath } from "@/lib/pokemon-data";

interface PokemonCardProps {
  pokemon: Pokemon;
  fontSize: string;
  padding: string;
  onClick?: (pokemon: Pokemon) => void;
}

export function PokemonCard({ pokemon, fontSize, padding, onClick }: PokemonCardProps) {
  const imagePath = getImagePath(
    pokemon.image || "src/public/pokemon/placeholder/shiny-lock.png"
  );

  // Extraire uniquement le numéro de base (enlever les suffixes comme -mega, -alola, etc.)
  const baseNumber = pokemon.id.split("-")[0];

  const handleClick = () => {
    if (onClick) {
      onClick(pokemon);
    }
  };

  return (
    <div className="pokemon-card group" onClick={handleClick}>
      <div className="relative aspect-square pokemon-card-bg rounded-lg border-2 pokemon-card-border transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:scale-110 cursor-pointer">
        {/* Image du Pokémon */}
        <Image
          src={imagePath}
          alt={pokemon.name}
          fill
          className={`object-contain ${padding} group-hover:scale-110 transition-transform duration-300`}
          sizes="(max-width: 640px) 25vw, (max-width: 768px) 16vw, (max-width: 1024px) 12vw, 10vw"
        />

        {/* Numéro du Pokémon */}
        <div
          className={`absolute top-1 left-1 bg-black/70 text-primary ${fontSize} font-bold px-2 py-1 rounded`}
        >
          #{baseNumber}
        </div>

        {/* Nom du Pokémon au survol */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className={`${fontSize} font-semibold truncate px-1`}>
            {pokemon.name}
          </p>
        </div>
      </div>
    </div>
  );
}
