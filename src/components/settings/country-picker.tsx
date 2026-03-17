"use client";

import { useState, useTransition, useMemo } from "react";
import { toast } from "sonner";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { COUNTRIES, getFlagUrl, getFlagSrcSet } from "@/lib/countries";
import { updatePublicProfileAction } from "@/actions/update-public-profile.action";

interface CountryPickerProps {
  initialValue: string | null;
}

function FlagImg({ code, size = 20, className }: { code: string; size?: 20 | 40; className?: string }) {
  return (
    <img
      src={getFlagUrl(code, size)}
      srcSet={getFlagSrcSet(code)}
      alt={code}
      width={size}
      height={Math.round(size * 0.75)}
      className={cn("rounded-sm object-cover shrink-0", className)}
      loading="lazy"
    />
  );
}

export function CountryPicker({ initialValue }: CountryPickerProps) {
  const [selected, setSelected] = useState<string | null>(initialValue);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  const selectedCountry = COUNTRIES.find((c) => c.code === selected);

  const handleSelect = (code: string) => {
    const next = selected === code ? null : code;
    setSelected(next);
    setQuery("");
    startTransition(async () => {
      const res = await updatePublicProfileAction({ country: next });
      if (res.error) toast.error(res.error);
      else toast.success(next ? "Pays mis à jour" : "Pays retiré");
    });
  };

  return (
    <div className="space-y-3">
      {/* Selected display */}
      {selectedCountry && (
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-primary bg-primary/8 text-sm">
          <FlagImg code={selectedCountry.code} size={20} className="w-6 h-4" />
          <span className="font-medium flex-1">{selectedCountry.name}</span>
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleSelect(selectedCountry.code)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un pays…"
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* List */}
      <div className="max-h-64 overflow-y-auto rounded-lg border border-border divide-y divide-border/50">
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-6">Aucun pays trouvé</p>
        )}
        {filtered.map((country) => {
          const isSelected = selected === country.code;
          return (
            <button
              key={country.code}
              type="button"
              disabled={isPending}
              onClick={() => handleSelect(country.code)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left",
                isSelected
                  ? "bg-primary/8 text-primary"
                  : "hover:bg-muted/40 text-foreground"
              )}
            >
              <FlagImg code={country.code} size={20} className="w-6 h-4" />
              <span className={cn("flex-1", isSelected && "font-medium")}>
                {country.name}
              </span>
              <span className="text-xs text-muted-foreground">{country.code}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
