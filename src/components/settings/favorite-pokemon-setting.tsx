"use client";

import { useState, useTransition, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchPokemonAction, type PokemonSearchResult } from "@/actions/search-pokemon.action";
import { updateProfilePrefsAction } from "@/actions/update-profile-prefs.action";

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

function TypeBadge({ type }: { type: string }) {
  const colors = TYPE_COLORS[type] ?? { bg: "#888", text: "#fff" };
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[10px] font-bold"
      style={{ background: colors.bg, color: colors.text }}
    >
      {type}
    </span>
  );
}

interface FavoritePokemonSettingProps {
  initialPokemon: PokemonSearchResult | null;
}

export function FavoritePokemonSetting({ initialPokemon }: FavoritePokemonSettingProps) {
  const [selected, setSelected] = useState<PokemonSearchResult | null>(initialPokemon);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PokemonSearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!q.trim()) { setResults([]); setHasSearched(false); return; }
    debounceRef.current = setTimeout(() => {
      startTransition(async () => {
        const r = await searchPokemonAction(q);
        setResults(r);
        setHasSearched(true);
      });
    }, 200);
  };

  const handleSelect = (pokemon: PokemonSearchResult) => {
    setSelected(pokemon);
    setQuery("");
    setResults([]);
    startTransition(async () => {
      const res = await updateProfilePrefsAction({ favoritePokemonId: pokemon.id });
      if (res.error) toast.error(res.error);
      else toast.success("Pokémon favori mis à jour !");
    });
  };

  const handleClear = () => {
    setSelected(null);
    startTransition(async () => {
      await updateProfilePrefsAction({ favoritePokemonId: null });
    });
  };

  return (
    <div className="space-y-4">

      {/* Sélection actuelle — grande carte */}
      {selected ? (
        <div className="relative flex items-center gap-5 px-5 py-4 rounded-xl border border-primary bg-primary/8">
          <div
            className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(57,154,180,.18),rgba(53,190,124,.12))" }}
          >
            <Image src={selected.imagePath} alt={selected.name} fill className="object-contain p-1" sizes="96px" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">Pokémon favori</p>
            <p className="text-lg font-bold text-foreground leading-tight">{selected.name}</p>
            <p className="text-xs text-muted-foreground mb-2">#{selected.id.split("-")[0].padStart(4, "0")}</p>
            <div className="flex gap-1 flex-wrap">
              {selected.types.map(t => <TypeBadge key={t} type={t} />)}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-border/50 bg-muted/10">
          <div className="w-24 h-24 shrink-0 rounded-xl bg-muted/30 flex items-center justify-center text-3xl">?</div>
          <p className="text-sm text-muted-foreground italic">Aucun Pokémon sélectionné</p>
        </div>
      )}

      {/* Recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Rechercher un Pokémon…"
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-border bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Résultats */}
      {query.trim() && (
        <div className="rounded-xl border border-border overflow-hidden max-h-72 overflow-y-auto">
          {isPending && (
            <p className="text-center text-sm text-muted-foreground py-5">Recherche…</p>
          )}
          {!isPending && hasSearched && results.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-5">Aucun résultat</p>
          )}
          {!isPending && results.map((pokemon) => (
            <button
              key={pokemon.id}
              type="button"
              onClick={() => handleSelect(pokemon)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 text-sm text-left transition-colors hover:bg-muted/40 border-b border-border/50 last:border-0",
                selected?.id === pokemon.id && "bg-primary/8"
              )}
            >
              <div
                className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden"
                style={{ background: "linear-gradient(135deg,rgba(57,154,180,.15),rgba(53,190,124,.10))" }}
              >
                <Image src={pokemon.imagePath} alt={pokemon.name} fill className="object-contain p-0.5" sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{pokemon.name}</p>
                <p className="text-xs text-muted-foreground">#{pokemon.id.split("-")[0].padStart(4, "0")}</p>
              </div>
              <div className="flex gap-1 flex-wrap justify-end">
                {pokemon.types.map(t => <TypeBadge key={t} type={t} />)}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
