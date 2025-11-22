"use client";

import type { Pokemon } from "@/types/pokemon";
import { PokemonCard } from "@/components/shinydex/pokemon-card";

interface RegionWithResults {
  region: string;
  pokemons: Pokemon[];
  hasResults: boolean;
}

interface FormWithResults {
  form: string;
  pokemons: Pokemon[];
  hasResults: boolean;
}

interface GridConfig {
  gap: string;
  fontSize: string;
  padding: string;
}

interface ShinydexGridProps {
  selectedView: "regions" | "forms";
  filteredRegions: RegionWithResults[];
  currentFormData: FormWithResults | null;
  gridConfig: GridConfig;
  columnsPerRow: number;
  regionRefs?: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  onPokemonClick?: (pokemon: Pokemon) => void;
}

export function ShinydexGrid({
  selectedView,
  filteredRegions,
  currentFormData,
  gridConfig,
  columnsPerRow,
  regionRefs,
  onPokemonClick,
}: ShinydexGridProps) {
  return (
    <>
      {selectedView === "regions" ? (
        // Mode Régions - UN SEUL CADRE POUR TOUT
        <div className="pokedex-screen">
          <div className="pokedex-content">
            <div className="p-6 space-y-8">
              {filteredRegions
                .filter((region) => region.pokemons.length > 0)
                .map((region, index) => (
                  <div
                    key={region.region}
                    ref={(el) => {
                      if (regionRefs) {
                        regionRefs.current[region.region] = el;
                      }
                    }}
                    data-region={region.region}
                  >
                    {/* Séparation de région */}
                    {index > 0 && <div className="region-separator" />}

                    {/* Titre de la région */}
                    <div className="mb-8">
                      <h2 className="text-xl font-heading text-primary text-center">
                        {region.region.replace(/^\d+[bB]?\s*-\s*/, "")}
                      </h2>
                    </div>

                    {/* Grille de Pokémon */}
                    <div
                      className={`grid ${gridConfig.gap}`}
                      style={{
                        gridTemplateColumns: `repeat(${columnsPerRow}, minmax(0, 1fr))`,
                      }}
                    >
                      {region.pokemons.map((pokemon) => (
                        <PokemonCard
                          key={pokemon.id}
                          pokemon={pokemon}
                          fontSize={gridConfig.fontSize}
                          padding={gridConfig.padding}
                          onClick={onPokemonClick}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        // Mode Formes alternatives
        currentFormData && (
          <div className="pokedex-screen">
            <div className="pokedex-content">
              <div className="p-6">
                {/* Titre de la forme */}
                <div className="mb-4">
                  <h2 className="text-xl font-heading text-secondary text-center">
                    {currentFormData.form}
                  </h2>
                </div>

                {/* Grille de Pokémon */}
                <div
                  className={`grid ${gridConfig.gap}`}
                  style={{
                    gridTemplateColumns: `repeat(${columnsPerRow}, minmax(0, 1fr))`,
                  }}
                >
                  {currentFormData.pokemons.map((pokemon) => (
                    <PokemonCard
                      key={pokemon.id}
                      pokemon={pokemon}
                      fontSize={gridConfig.fontSize}
                      padding={gridConfig.padding}
                      onClick={onPokemonClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
