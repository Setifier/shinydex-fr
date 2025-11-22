"use client";

import type { Pokemon } from "@/types/pokemon";
import type { PokemonFormCategory } from "@/types/forms";
import { ShinydexSearchBar } from "@/components/shinydex/shinydex-search-bar";
import { ShinydexColumnsSlider } from "@/components/shinydex/shinydex-columns-slider";
import { ShinydexCollapseButton } from "@/components/shinydex/shinydex-collapse-button";

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

interface ShinydexNavbarProps {
  selectedView: "regions" | "forms";
  selectedForm: PokemonFormCategory | null;
  activeRegion: string;
  columnsPerRow: number;
  searchQuery: string;
  isNavbarCollapsed: boolean;
  isRotating: boolean;
  isSticky: boolean;
  filteredRegions: RegionWithResults[];
  filteredForms: FormWithResults[];
  sliderValues: number[];
  sliderIndex: number;
  handleBackToRegions: () => void;
  scrollToRegion: (regionName: string) => void;
  handleFormClick: (formName: PokemonFormCategory) => void;
  handleToggleNavbar: () => void;
  handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchQuery: (query: string) => void;
}

export function ShinydexNavbar({
  selectedView,
  selectedForm,
  activeRegion,
  columnsPerRow,
  searchQuery,
  isNavbarCollapsed,
  isRotating,
  isSticky,
  filteredRegions,
  filteredForms,
  sliderValues,
  sliderIndex,
  handleBackToRegions,
  scrollToRegion,
  handleFormClick,
  handleToggleNavbar,
  handleSliderChange,
  setSearchQuery,
}: ShinydexNavbarProps) {
  return (
    <div className="sticky top-0 z-30 pokedex-navbar backdrop-blur-sm border-b-4 border-primary/50 shadow-xl mb-4 transition-all duration-300">
      {/* Contenu de la navbar (collapsible) */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isNavbarCollapsed
            ? "max-h-0 opacity-0"
            : "max-h-[1000px] opacity-100"
        }`}
      >
        {/* Boutons de régions */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 p-4">
          {filteredRegions.map((region) => (
            <button
              key={region.region}
              onClick={() => {
                handleBackToRegions();
                setTimeout(() => scrollToRegion(region.region), 100);
              }}
              disabled={!region.hasResults && searchQuery.trim() !== ""}
              className={`console-button ${
                activeRegion === region.region && selectedView === "regions"
                  ? "console-button-primary-active"
                  : "console-button-primary"
              } ${
                !region.hasResults && searchQuery.trim() !== ""
                  ? "console-button-disabled"
                  : ""
              }`}
            >
              {region.region.replace(/^\d+[bB]?\s*-\s*/, "")}
            </button>
          ))}
        </div>

        {/* Slider pour le nombre de colonnes */}
        <ShinydexColumnsSlider
          columnsPerRow={columnsPerRow}
          sliderValues={sliderValues}
          sliderIndex={sliderIndex}
          handleSliderChange={handleSliderChange}
        />

        {/* Titre Formes alternatives */}
        <div className="text-center mb-3">
          <div className="forms-separator-line mb-2"></div>
          <span className="text-sm text-muted-foreground font-semibold tracking-wide">
            FORMES ALTERNATIVES
          </span>
        </div>

        {/* Boutons de formes régionales */}
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {filteredForms
            .filter((form) =>
              ["ALOLA", "GALAR", "HISUI", "PALDEA"].includes(form.form)
            )
            .map((form) => (
              <button
                key={form.form}
                onClick={() =>
                  handleFormClick(form.form as PokemonFormCategory)
                }
                disabled={!form.hasResults && searchQuery.trim() !== ""}
                className={`console-button ${
                  selectedForm === form.form
                    ? "console-button-secondary-active"
                    : "console-button-secondary"
                } ${
                  !form.hasResults && searchQuery.trim() !== ""
                    ? "console-button-disabled"
                    : ""
                }`}
              >
                {form.form}
              </button>
            ))}
        </div>

        {/* Boutons des autres formes spéciales */}
        <div className="flex flex-wrap justify-center gap-2">
          {filteredForms
            .filter(
              (form) =>
                !["ALOLA", "GALAR", "HISUI", "PALDEA"].includes(form.form)
            )
            .map((form) => (
              <button
                key={form.form}
                onClick={() =>
                  handleFormClick(form.form as PokemonFormCategory)
                }
                disabled={!form.hasResults && searchQuery.trim() !== ""}
                className={`console-button ${
                  selectedForm === form.form
                    ? "console-button-accent-active"
                    : "console-button-accent"
                } ${
                  !form.hasResults && searchQuery.trim() !== ""
                    ? "console-button-disabled"
                    : ""
                }`}
              >
                {form.form}
              </button>
            ))}
        </div>

        {/* Bouton retour aux régions */}
        {selectedView === "forms" && (
          <div className="flex justify-center mt-3">
            <button
              onClick={handleBackToRegions}
              className="px-6 py-2 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-lg transition-all duration-200"
            >
              ← Retour aux régions
            </button>
          </div>
        )}

        {/* Barre de recherche */}
        <ShinydexSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Bouton flèche collapse/expand - visible uniquement quand sticky - EN BAS */}
      <ShinydexCollapseButton
        isSticky={isSticky}
        isNavbarCollapsed={isNavbarCollapsed}
        isRotating={isRotating}
        handleToggleNavbar={handleToggleNavbar}
      />
    </div>
  );
}
