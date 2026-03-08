"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronRight, Search, Star } from "lucide-react";
import { getAllRegions, getRegionalForms } from "@/lib/pokemon-data";
import type { Pokemon } from "@/types/pokemon";
import { PersonalPokemonCard } from "@/components/shinydex/personal-pokemon-card";
import { PersonalPokemonModal } from "@/components/shinydex/personal-pokemon-modal";
import { ShinydexColumnsSlider } from "@/components/shinydex/shinydex-columns-slider";
import { ShinydexDesignWrapper } from "@/components/shinydex/shinydex-design-wrapper";

// Labels d'affichage (uppercase) pour les formes régionales
const FORM_LABELS: Record<string, string> = {
  ALOLA:  "FORMES D'ALOLA",
  GALAR:  "FORMES DE GALAR",
  HISUI:  "FORMES DE HISUI",
  PALDEA: "FORMES DE PALDEA",
};

interface Section {
  name: string;
  id: string;
  pokemons: Pokemon[];
  type: "region" | "form";
  formKey?: string; // clé du form (ex: "ALOLA")
}

function nameToId(name: string): string {
  return (
    "section-" +
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  );
}

const SLIDER_VALUES = [6, 9, 12, 15, 18];

const GRID_CONFIG: Record<number, { gap: string; fontSize: string; padding: string }> = {
  6:  { gap: "gap-4",   fontSize: "text-sm",        padding: "p-4"   },
  9:  { gap: "gap-2.5", fontSize: "text-xs",        padding: "p-3"   },
  12: { gap: "gap-1.5", fontSize: "text-[0.65rem]", padding: "p-2"   },
  15: { gap: "gap-1",   fontSize: "text-[0.6rem]",  padding: "p-1.5" },
  18: { gap: "gap-0.5", fontSize: "text-[0.55rem]", padding: "p-1"   },
};

interface PersonalShinydexProps {
  caughtIds: string[];
  shinydexDesign: string;
}

// Sections unifiées — calculées une fois au niveau module
const ALL_SECTIONS: Section[] = [
  ...getAllRegions().map((r) => {
    const name = r.region.replace(/^\d+[bB]?\s*-\s*/, "");
    return { name, id: nameToId(name), pokemons: r.pokemons, type: "region" as const };
  }),
  ...getRegionalForms().map((f) => {
    const name = FORM_LABELS[f.form] ?? f.form;
    return { name, id: nameToId(name), pokemons: f.pokemons, type: "form" as const, formKey: f.form };
  }),
];

const REGION_SECTIONS = ALL_SECTIONS.filter((s) => s.type === "region");
const FORM_SECTIONS   = ALL_SECTIONS.filter((s) => s.type === "form");

export function PersonalShinydex({ caughtIds: initialCaughtIds, shinydexDesign }: PersonalShinydexProps) {
  const [caughtIds, setCaughtIds] = useState(initialCaughtIds);
  const caughtSet = useMemo(() => new Set(caughtIds), [caughtIds]);

  const [searchQuery, setSearchQuery]             = useState("");
  const [columnsPerRow, setColumnsPerRow]         = useState(12);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [selectedPokemon, setSelectedPokemon]     = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen]             = useState(false);
  // false = vue régions classiques ; true = vue toutes les formes régionales
  const [showForms, setShowForms]                 = useState(false);
  const [activeFormKey, setActiveFormKey]         = useState<string | null>(null);

  // Défaut responsive : 12 desktop, 9 mobile
  useEffect(() => {
    if (window.innerWidth < 768) setColumnsPerRow(9);
  }, []);

  const gridConfig = GRID_CONFIG[columnsPerRow] ?? GRID_CONFIG[6];

  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Applique la recherche sur toutes les sections
  const filteredSections = useMemo(() =>
    ALL_SECTIONS.map((s) => ({
      ...s,
      pokemons: searchQuery.trim()
        ? s.pokemons.filter((p) => {
            const q = normalize(searchQuery);
            return normalize(p.name).includes(q) || p.id.split("-")[0].includes(searchQuery.trim());
          })
        : s.pokemons,
    })).filter((s) => s.pokemons.length > 0),
  [searchQuery]);

  // Sections effectivement affichées : régions classiques ou toutes les formes régionales
  const displayedSections = useMemo(() => {
    if (showForms) {
      return filteredSections.filter((s) => s.type === "form");
    }
    return filteredSections.filter((s) => s.type === "region");
  }, [filteredSections, showForms]);

  const sliderIndex = SLIDER_VALUES.indexOf(columnsPerRow);
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setColumnsPerRow(SLIDER_VALUES[parseInt(e.target.value)]);

  const toggleSection = (name: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const handleCatch = (pokemonId: string) => {
    setCaughtIds((prev) => [...prev, pokemonId]);
  };

  const handleUncatch = (pokemonId: string) => {
    setCaughtIds((prev) => prev.filter((id) => id !== pokemonId));
  };

  const allPokemonList = useMemo(
    () => displayedSections.flatMap((s) => s.pokemons),
    [displayedSections]
  );

  // Tous les designs sont maintenant plein-écran avec scroll interne
  const isLockedScroll = true;

  // --- Handlers chips ---
  const handleRegionChipClick = (section: Section) => {
    setShowForms(false);
    setActiveFormKey(null);
    setTimeout(() => {
      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleFormChipClick = (formKey: string) => {
    const alreadyVisible = showForms;
    setShowForms(true);
    setActiveFormKey(formKey);
    const section = FORM_SECTIONS.find((s) => s.formKey === formKey);
    if (!section) return;
    setTimeout(() => {
      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, alreadyVisible ? 0 : 50);
  };

  return (
    <>
      <ShinydexDesignWrapper design={shinydexDesign}>
        <div className={isLockedScroll ? "flex-1 min-h-0 flex flex-col" : ""}>

          {/* Stats par région */}
          <div className={`flex flex-wrap justify-center gap-1.5 shrink-0 ${isLockedScroll ? "mb-3" : "mb-4"}`}>
            {REGION_SECTIONS.map((section) => {
              const caught = section.pokemons.filter((p) => caughtSet.has(p.id)).length;
              const total  = section.pokemons.length;
              const pct    = total > 0 ? Math.round((caught / total) * 100) : 0;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleRegionChipClick(section)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted/50 hover:bg-muted transition-all hover:scale-105"
                >
                  <span className="text-foreground/80">{section.name}</span>
                  <span className={
                    pct === 100 ? "text-yellow-400 font-bold"
                    : pct >= 50  ? "text-primary"
                    : pct > 0    ? "text-primary/70"
                    :              "text-muted-foreground/50"
                  }>{caught}/{total} ({pct}%)</span>
                </button>
              );
            })}
          </div>

          {/* Chips formes régionales — agissent comme filtres */}
          <div className={`flex flex-wrap justify-center gap-1.5 shrink-0 ${isLockedScroll ? "mb-3" : "mb-6"}`}>
            {FORM_SECTIONS.map((section) => {
              const formKey = section.formKey!;
              const isActive = showForms && activeFormKey === formKey;
              const caught = section.pokemons.filter((p) => caughtSet.has(p.id)).length;
              const total  = section.pokemons.length;
              const pct    = total > 0 ? Math.round((caught / total) * 100) : 0;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleFormChipClick(formKey)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted/30 hover:bg-muted/60 border border-border/50"
                  }`}
                >
                  <span>{section.name}</span>
                  <span className={isActive ? "opacity-80" : (
                    pct === 100 ? "text-yellow-400 font-bold"
                    : pct >= 50  ? "text-primary"
                    : pct > 0    ? "text-primary/70"
                    :              "text-muted-foreground/50"
                  )}>{caught}/{total} ({pct}%)</span>
                </button>
              );
            })}
          </div>

          {/* Barre de recherche + slider */}
          <div className="pokedex-screen shrink-0 mb-3">
            <div className="pokedex-content p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un Pokémon..."
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <ShinydexColumnsSlider
                    sliderIndex={sliderIndex}
                    columnsPerRow={columnsPerRow}
                    sliderValues={SLIDER_VALUES}
                    handleSliderChange={handleSliderChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Grille par section — scrolle en mode verrouillé */}
          <div className={`pokedex-screen ${isLockedScroll ? "flex-1 min-h-0" : ""}`}>
            <div className={`pokedex-content ${isLockedScroll ? "h-full" : ""}`}>
              <div className={`p-6 space-y-2 ${isLockedScroll ? "overflow-y-auto h-full" : ""}`}>
                {displayedSections.map((section, index) => {
                  const isCollapsed   = collapsedSections.has(section.name);
                  const sectionCaught = section.pokemons.filter((p) => caughtSet.has(p.id)).length;
                  const sectionTotal  = section.pokemons.length;
                  const isComplete    = sectionCaught === sectionTotal;

                  return (
                    <div key={section.id} id={section.id}>
                      {index > 0 && !isCollapsed && <div className="region-separator" />}

                      <button
                        type="button"
                        onClick={() => toggleSection(section.name)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted/40 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          {isCollapsed
                            ? <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            : <ChevronDown  className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          }
                          <h2 className="text-xl font-heading text-primary">{section.name}</h2>
                        </div>
                        <span className={`text-sm font-medium tabular-nums ${isComplete ? "text-yellow-400" : "text-muted-foreground"}`}>
                          {isComplete && <Star className="inline h-3.5 w-3.5 fill-yellow-400 mr-1 -mt-0.5" />}
                          {sectionCaught} / {sectionTotal}
                        </span>
                      </button>

                      {!isCollapsed && (
                        <div
                          className={`grid ${gridConfig.gap} mt-4 mb-6`}
                          style={{ gridTemplateColumns: `repeat(${columnsPerRow}, minmax(0, 1fr))` }}
                        >
                          {section.pokemons.map((pokemon) => (
                            <PersonalPokemonCard
                              key={pokemon.id}
                              pokemon={pokemon}
                              isCaught={caughtSet.has(pokemon.id)}
                              fontSize={gridConfig.fontSize}
                              padding={gridConfig.padding}
                              onClick={(p) => {
                                setSelectedPokemon(p);
                                setIsModalOpen(true);
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </ShinydexDesignWrapper>

      <PersonalPokemonModal
        isOpen={isModalOpen}
        pokemon={selectedPokemon}
        onClose={() => { setIsModalOpen(false); setSelectedPokemon(null); }}
        allPokemonList={allPokemonList}
        caughtSet={caughtSet}
        onNavigate={(p) => setSelectedPokemon(p)}
        onCatch={handleCatch}
        onUncatch={handleUncatch}
        design={shinydexDesign}
      />
    </>
  );
}
