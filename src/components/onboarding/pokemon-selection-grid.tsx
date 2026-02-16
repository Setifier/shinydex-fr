"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { getImagePath } from "@/lib/pokemon-data";
import { POKEMON_TYPE_COLORS } from "@/types/pokemon-type-colors";
import type { Pokemon } from "@/types/pokemon";

interface PokemonSection {
  name: string;
  pokemons: Pokemon[];
}

interface PokemonSelectionGridProps {
  sections: PokemonSection[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleSection: (ids: string[], selected: boolean) => void;
}

export function PokemonSelectionGrid({
  sections,
  selectedIds,
  onToggle,
  onToggleSection,
}: PokemonSelectionGridProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (name: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const handleSelectAll = useCallback(
    (section: PokemonSection) => {
      const sectionIds = section.pokemons.map((p) => p.id);
      const allSelected = sectionIds.every((id) => selectedIds.has(id));
      onToggleSection(sectionIds, !allSelected);
    },
    [selectedIds, onToggleSection]
  );

  return (
    <div>
      {sections.map((section) => {
        const isOpen = openSections.has(section.name);
        const sectionIds = section.pokemons.map((p) => p.id);
        const selectedCount = sectionIds.filter((id) =>
          selectedIds.has(id)
        ).length;
        const allSelected =
          section.pokemons.length > 0 && selectedCount === section.pokemons.length;

        return (
          <div key={section.name}>
            {/* Header sticky — collé au top du conteneur scrollable parent */}
            <div className="sticky top-0 z-10 bg-card border-b border-t first:border-t-0">
              <div className="flex items-center justify-between p-3">
                <button
                  type="button"
                  onClick={() => toggleSection(section.name)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span className="font-medium text-sm">
                    {section.name.split(" - ").pop() || section.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selectedCount}/{section.pokemons.length}
                  </span>
                </button>

                {isOpen && (
                  <button
                    type="button"
                    onClick={() => handleSelectAll(section)}
                    className="text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    {allSelected ? "Tout désélectionner" : "Tout sélectionner"}
                  </button>
                )}
              </div>
            </div>

            {/* Grille Pokémon */}
            {isOpen && (
              <div className="p-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {section.pokemons.map((pokemon) => {
                  const isSelected = selectedIds.has(pokemon.id);

                  return (
                    <button
                      key={pokemon.id}
                      type="button"
                      onClick={() => onToggle(pokemon.id)}
                      className={`relative flex flex-col items-center p-2 rounded-lg border transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-transparent hover:bg-muted/50"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                      <Image
                        src={getImagePath(pokemon.image)}
                        alt={pokemon.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                      <span className="text-xs truncate w-full text-center mt-1">
                        {pokemon.name}
                      </span>
                      <div className="flex gap-0.5 mt-1">
                        {pokemon.types.map((type) => (
                          <span
                            key={type}
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor:
                                POKEMON_TYPE_COLORS[type].background,
                            }}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
