"use client";

import { useState, useEffect, useRef, useTransition, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Search, Star } from "lucide-react";
import { updateProfilePrefsAction } from "@/actions/update-profile-prefs.action";
import { updateShinydexDesignAction } from "@/actions/update-shinydex-design.action";
import { searchPokemonAction, type PokemonSearchResult } from "@/actions/search-pokemon.action";
import { ShinydexDesignPicker } from "@/components/shinydex/shinydex-design-picker";
import { SHINYDEX_DESIGNS } from "@/lib/shinydex-designs";

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Acier:    { bg: "#B7B7CE", text: "#2a2a3a" },
  Combat:   { bg: "#C03028", text: "#fff"    },
  Dragon:   { bg: "#6F35FC", text: "#fff"    },
  Eau:      { bg: "#6390F0", text: "#fff"    },
  Électrik: { bg: "#F7D02C", text: "#2a2000" },
  Fée:      { bg: "#D685AD", text: "#fff"    },
  Feu:      { bg: "#EE8130", text: "#fff"    },
  Glace:    { bg: "#96D9D6", text: "#1a2a2a" },
  Insecte:  { bg: "#A6B91A", text: "#1a2200" },
  Normal:   { bg: "#A8A77A", text: "#1a1a00" },
  Plante:   { bg: "#7AC74C", text: "#0a2000" },
  Poison:   { bg: "#A33EA1", text: "#fff"    },
  Psy:      { bg: "#F95587", text: "#fff"    },
  Roche:    { bg: "#B6A136", text: "#1a1a00" },
  Sol:      { bg: "#E2BF65", text: "#1a1000" },
  Spectre:  { bg: "#735797", text: "#fff"    },
  Ténèbres: { bg: "#705746", text: "#fff"    },
  Vol:      { bg: "#A98FF3", text: "#1a0a3a" },
};

const REGION_LABELS: Record<string, string> = {
  kanto: "Kanto", johto: "Johto", hoenn: "Hoenn", sinnoh: "Sinnoh",
  unys: "Unys", kalos: "Kalos", alola: "Alola", galar: "Galar",
  hisui: "Hisui", paldea: "Paldea",
};

const REGION_OPTIONS = [
  { value: "kanto",  label: "Kanto",  gen: "Gén. I"    },
  { value: "johto",  label: "Johto",  gen: "Gén. II"   },
  { value: "hoenn",  label: "Hoenn",  gen: "Gén. III"  },
  { value: "sinnoh", label: "Sinnoh", gen: "Gén. IV"   },
  { value: "unys",   label: "Unys",   gen: "Gén. V"    },
  { value: "kalos",  label: "Kalos",  gen: "Gén. VI"   },
  { value: "alola",  label: "Alola",  gen: "Gén. VII"  },
  { value: "galar",  label: "Galar",  gen: "Gén. VIII" },
  { value: "hisui",  label: "Hisui",  gen: "Gén. IX*"  },
  { value: "paldea", label: "Paldea", gen: "Gén. IX"   },
];

interface RegionStat {
  name: string;
  caught: number;
  total: number;
  pct: number;
}

interface FavPokemonData {
  id: string;
  name: string;
  imagePath: string;
  types: string[];
}

interface ProfileInteractiveProps {
  caughtCount: number;
  total: number;
  pct: number;
  regionStats: RegionStat[];
  favoritePokemon: FavPokemonData | null;
  favoriteRegion: string | null;
  shinydexDesign: string;
  popularPokemon: PokemonSearchResult[];
}

function TypeBadge({ type }: { type: string }) {
  const colors = TYPE_COLORS[type] ?? { bg: "#888", text: "#fff" };
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[10px] font-bold leading-tight"
      style={{ background: colors.bg, color: colors.text }}
    >
      {type}
    </span>
  );
}

export function ProfileInteractive({
  caughtCount,
  total,
  pct,
  regionStats,
  favoritePokemon: initialFavPokemon,
  favoriteRegion: initialRegion,
  shinydexDesign: initialDesign,
  popularPokemon,
}: ProfileInteractiveProps) {
  const [mounted, setMounted]   = useState(false);
  const [modal, setModal]       = useState<"stats" | "pokemon" | "region" | "design" | null>(null);
  const [favPokemon, setFavPokemon] = useState(initialFavPokemon);
  const [region, setRegion]     = useState(initialRegion);
  const [design, setDesign]     = useState(initialDesign);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PokemonSearchResult[]>(popularPokemon);
  const [isPending, startTransition] = useTransition();
  const searchRef   = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const closeModal = () => { setModal(null); setSearchQuery(""); setSearchResults(popularPokemon); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (modal === "pokemon") setTimeout(() => searchRef.current?.focus(), 50);
  }, [modal]);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      startTransition(async () => {
        const results = await searchPokemonAction(q);
        setSearchResults(results);
      });
    }, 180);
  };

  const designLabel = SHINYDEX_DESIGNS.find(d => d.value === design)?.label ?? "Classique";
  const regionLabel = region ? (REGION_LABELS[region.toLowerCase()] ?? region) : null;

  const handlePokemonSelect = async (pokemon: PokemonSearchResult) => {
    setFavPokemon({ id: pokemon.id, name: pokemon.name, imagePath: pokemon.imagePath, types: pokemon.types });
    closeModal();
    await updateProfilePrefsAction({ favoritePokemonId: pokemon.id });
  };

  const handleRegionSelect = async (value: string) => {
    setRegion(value);
    closeModal();
    await updateProfilePrefsAction({ favoriteRegion: value });
  };

  const handleDesignChange = async (value: string) => {
    setDesign(value);
    closeModal();
    await updateShinydexDesignAction({ shinydexDesign: value });
  };

  return (
    <>
      {/* Stats — zone entière cliquable */}
      <button
        type="button"
        onClick={() => setModal("stats")}
        className="w-full px-8 py-6 text-left group cursor-pointer hover:bg-muted/10 transition-colors"
      >
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-muted-foreground font-medium">Collection de chromatiques</span>
          <span className={`font-bold tabular-nums group-hover:underline decoration-dotted underline-offset-2 ${pct === 100 ? "text-yellow-400" : "text-primary"}`}>
            {pct === 100 && <Star className="inline h-3.5 w-3.5 fill-yellow-400 mr-1 -mt-0.5" />}
            {caughtCount} / {total}
            <span className="text-muted-foreground font-normal ml-1.5">({pct}%)</span>
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-muted/50 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: pct === 100
                ? "linear-gradient(90deg, #facc15, #f59e0b)"
                : "linear-gradient(90deg, #399ab4, #35be7c)",
            }}
          />
        </div>
      </button>

      <div className="h-px bg-border/40 mx-6" />

      {/* Info grid */}
      <div className="px-8 py-6 grid sm:grid-cols-2 gap-4">
        {/* Pokémon favori */}
        <button
          type="button"
          onClick={() => setModal("pokemon")}
          className="group cursor-pointer flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-border/30 hover:border-border/60 hover:bg-muted/30 transition-all text-left w-full"
        >
          {favPokemon ? (
            <>
              <div
                className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(57,154,180,0.15), rgba(53,190,124,0.10))" }}
              >
                <Image src={favPokemon.imagePath} alt={favPokemon.name} fill className="object-contain p-1.5" sizes="64px" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">Pokémon favori</p>
                <p className="text-base font-semibold text-foreground leading-tight">{favPokemon.name}</p>
                <p className="text-xs text-muted-foreground mb-1.5">#{favPokemon.id.split("-")[0].padStart(4, "0")}</p>
                <div className="flex gap-1 flex-wrap">
                  {favPokemon.types.map(t => <TypeBadge key={t} type={t} />)}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 shrink-0 rounded-xl bg-muted/20 flex items-center justify-center">
                <span className="text-2xl">?</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">Pokémon favori</p>
                <p className="text-sm text-muted-foreground italic">Cliquer pour choisir</p>
              </div>
            </>
          )}
        </button>

        {/* Région + Design */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setModal("region")}
            className="w-full cursor-pointer p-3 rounded-xl bg-muted/20 border border-border/30 hover:border-border/60 hover:bg-muted/30 transition-all text-left"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Région favorite</p>
            {regionLabel
              ? <p className="text-sm font-semibold text-foreground mt-0.5">{regionLabel}</p>
              : <p className="text-xs italic text-muted-foreground mt-0.5">Cliquer pour choisir</p>
            }
          </button>

          <button
            type="button"
            onClick={() => setModal("design")}
            className="w-full cursor-pointer p-3 rounded-xl bg-muted/20 border border-border/30 hover:border-border/60 hover:bg-muted/30 transition-all text-left"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Design Shinydex</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{designLabel}</p>
          </button>
        </div>
      </div>

      {/* ====== MODALS ====== */}
      {mounted && modal && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors z-10 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Stats Modal */}
            {modal === "stats" && (
              <div>
                <div className="px-6 pt-6 pb-4 border-b border-border/30">
                  <h2 className="text-lg font-heading text-foreground">Collection de chromatiques</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {caughtCount} / {total} —{" "}
                    <span className={`font-semibold ${pct === 100 ? "text-yellow-400" : "text-primary"}`}>{pct}%</span>
                  </p>
                </div>
                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                  {regionStats.map(stat => (
                    <div key={stat.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-foreground">{stat.name}</span>
                        <span className={`text-xs font-semibold tabular-nums ${
                          stat.pct === 100 ? "text-yellow-400" : stat.pct >= 50 ? "text-primary" : "text-muted-foreground"
                        }`}>
                          {stat.caught} / {stat.total}
                          {stat.pct === 100 && <Star className="inline h-3 w-3 fill-yellow-400 ml-1 -mt-0.5" />}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${stat.pct}%`,
                            background: stat.pct === 100
                              ? "linear-gradient(90deg, #facc15, #f59e0b)"
                              : stat.pct >= 50
                              ? "linear-gradient(90deg, #399ab4, #35be7c)"
                              : "linear-gradient(90deg, #6b7280, #9ca3af)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pokémon Modal */}
            {modal === "pokemon" && (
              <div>
                <div className="px-6 pt-6 pb-4 border-b border-border/30">
                  <h2 className="text-lg font-heading text-foreground">Pokémon favori</h2>
                  <div className="relative mt-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => handleSearchChange(e.target.value)}
                      placeholder="Rechercher un Pokémon..."
                      className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 ml-0.5">
                    {searchQuery ? (isPending ? "Recherche…" : `${searchResults.length} résultat(s)`) : "Suggestions populaires"}
                  </p>
                </div>
                <div className="p-4 max-h-[55vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {searchResults.map(pokemon => {
                      const isSelected = favPokemon?.id === pokemon.id;
                      return (
                        <button
                          key={pokemon.id}
                          type="button"
                          onClick={() => handlePokemonSelect(pokemon)}
                          className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-border/30 hover:border-border/60 hover:bg-muted/30"
                          }`}
                        >
                          <div
                            className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden"
                            style={{ background: "linear-gradient(135deg, rgba(57,154,180,0.15), rgba(53,190,124,0.10))" }}
                          >
                            <Image src={pokemon.imagePath} alt={pokemon.name} fill className="object-contain p-1" sizes="48px" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate leading-tight">{pokemon.name}</p>
                            <p className="text-xs text-muted-foreground mb-1">#{pokemon.id.split("-")[0].padStart(4, "0")}</p>
                            <div className="flex gap-1 flex-wrap">
                              {pokemon.types.map(t => <TypeBadge key={t} type={t} />)}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {!isPending && searchQuery && searchResults.length === 0 && (
                    <p className="text-center text-muted-foreground text-sm py-8">Aucun Pokémon trouvé</p>
                  )}
                </div>
              </div>
            )}

            {/* Région Modal */}
            {modal === "region" && (
              <div>
                <div className="px-6 pt-6 pb-4 border-b border-border/30">
                  <h2 className="text-lg font-heading text-foreground">Région favorite</h2>
                </div>
                <div className="p-4 grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto">
                  {REGION_OPTIONS.map(opt => {
                    const isSelected = region?.toLowerCase() === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleRegionSelect(opt.value)}
                        className={`cursor-pointer flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border/30 hover:border-border/60 hover:bg-muted/30"
                        }`}
                      >
                        <span className={`font-semibold text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {opt.label}
                        </span>
                        <span className="text-xs text-muted-foreground">{opt.gen}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Design Modal */}
            {modal === "design" && (
              <div>
                <div className="px-6 pt-6 pb-4 border-b border-border/30">
                  <h2 className="text-lg font-heading text-foreground">Design Shinydex</h2>
                </div>
                <div className="p-6">
                  <ShinydexDesignPicker value={design} onChange={handleDesignChange} />
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
