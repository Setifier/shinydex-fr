"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchPokemon } from "@/lib/pokemon-search";
import { getImagePath } from "@/lib/pokemon-data";
import { POKEMON_TYPE_COLORS } from "@/types/pokemon-type-colors";
import type { Pokemon } from "@/types/pokemon";

interface PokemonAutocompleteProps {
  value: Pokemon | null;
  onChange: (pokemon: Pokemon | null) => void;
  placeholder?: string;
}

export function PokemonAutocomplete({
  value,
  onChange,
  placeholder = "Rechercher un Pokémon...",
}: PokemonAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchPokemon(query, 8));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (pokemon: Pokemon) => {
    onChange(pokemon);
    setQuery("");
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setQuery("");
  };

  if (value) {
    return (
      <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
        <Image
          src={getImagePath(value.image)}
          alt={value.name}
          width={48}
          height={48}
          className="object-contain"
        />
        <div className="flex-1">
          <p className="font-medium">{value.name}</p>
          <div className="flex gap-1 mt-1">
            {value.types.map((type) => (
              <span
                key={type}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: POKEMON_TYPE_COLORS[type].background,
                  color: POKEMON_TYPE_COLORS[type].text,
                }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleClear}
          className="p-1 hover:bg-muted rounded-full transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        onFocus={() => query.trim() && setIsOpen(true)}
      />

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {results.map((pokemon) => (
            <button
              key={pokemon.id}
              onClick={() => handleSelect(pokemon)}
              className="w-full flex items-center gap-3 p-2 hover:bg-muted transition-colors text-left"
            >
              <Image
                src={getImagePath(pokemon.image)}
                alt={pokemon.name}
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{pokemon.name}</p>
                <p className="text-xs text-muted-foreground">
                  #{pokemon.id.split("-")[0]}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: POKEMON_TYPE_COLORS[type].background,
                      color: POKEMON_TYPE_COLORS[type].text,
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border rounded-lg shadow-lg p-4 text-center text-sm text-muted-foreground">
          Aucun Pokémon trouvé
        </div>
      )}
    </div>
  );
}
