"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { POKEMON_GAMES, SERIES_LABELS, SERIES_COLORS, type GameSeries } from "@/lib/pokemon-games";
import { updatePublicProfileAction } from "@/actions/update-public-profile.action";

interface GamePickerProps {
  initialValue: string | null;
}

const SERIES_ORDER: GameSeries[] = [
  "main", "remake", "legends", "lets-go",
  "mystery-dungeon", "ranger", "stadium", "snap", "mobile", "other",
];

export function GamePicker({ initialValue }: GamePickerProps) {
  const [selected, setSelected] = useState<string | null>(initialValue);
  const [openSeries, setOpenSeries] = useState<Set<GameSeries>>(new Set(["main"]));
  const [isPending, startTransition] = useTransition();

  const handleSelect = (id: string) => {
    const next = selected === id ? null : id;
    setSelected(next);
    startTransition(async () => {
      const res = await updatePublicProfileAction({ favoriteGame: next });
      if (res.error) toast.error(res.error);
    });
  };

  const toggleSeries = (series: GameSeries) => {
    setOpenSeries((prev) => {
      const next = new Set(prev);
      if (next.has(series)) next.delete(series);
      else next.add(series);
      return next;
    });
  };

  const grouped = SERIES_ORDER.map((series) => ({
    series,
    games: POKEMON_GAMES.filter((g) => g.series === series),
  })).filter((g) => g.games.length > 0);

  return (
    <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
      {grouped.map(({ series, games }) => {
        const isOpen = openSeries.has(series);
        const selectedGame = games.find((g) => g.id === selected);

        return (
          <div key={series}>
            {/* Header accordéon */}
            <button
              type="button"
              onClick={() => toggleSeries(series)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-medium">{SERIES_LABELS[series]}</span>
                <span className="text-xs text-muted-foreground">
                  {games.length} jeu{games.length > 1 ? "x" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Badge du jeu sélectionné dans cette série */}
                {selectedGame && (
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-semibold border",
                    SERIES_COLORS[series]
                  )}>
                    {selectedGame.name}
                  </span>
                )}
                <ChevronDown
                  className={cn(
                    "size-4 text-muted-foreground transition-transform duration-200 shrink-0",
                    isOpen && "rotate-180"
                  )}
                />
              </div>
            </button>

            {/* Contenu dépliable */}
            {isOpen && (
              <div className="px-4 pb-4 pt-2 flex flex-wrap gap-2 bg-muted/10">
                {games.map((game) => {
                  const isSelected = selected === game.id;
                  return (
                    <button
                      key={game.id}
                      type="button"
                      disabled={isPending}
                      onClick={() => handleSelect(game.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {game.name}
                      <span className={cn(
                        "ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold border",
                        SERIES_COLORS[series]
                      )}>
                        {game.year}
                      </span>
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
