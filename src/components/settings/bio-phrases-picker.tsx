"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BIO_PHRASES } from "@/lib/bio-phrases";
import { updatePublicProfileAction } from "@/actions/update-public-profile.action";

interface BioPhrasePickerProps {
  initialSelected: string[];
}

export function BioPhrasesPicker({ initialSelected }: BioPhrasePickerProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const selectedPhrases = BIO_PHRASES.filter((p) => selected.includes(p.id));

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : selected.length < 2
        ? [...selected, id]
        : selected;

    if (next === selected) return;
    setSelected(next);
    startTransition(async () => {
      const res = await updatePublicProfileAction({ biography: next });
      if (res.error) toast.error(res.error);
    });
  };

  return (
    <div className="space-y-3">
      {/* Selected phrases — toujours visibles */}
      {selectedPhrases.length > 0 ? (
        <div className="space-y-2">
          {selectedPhrases.map((phrase) => (
            <div
              key={phrase.id}
              className="flex items-start gap-3 px-4 py-3 rounded-lg border border-primary bg-primary/8 text-sm"
            >
              <span className="leading-relaxed flex-1 text-foreground">{phrase.text}</span>
              <button
                type="button"
                disabled={isPending}
                onClick={() => toggle(phrase.id)}
                className="shrink-0 mt-0.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Retirer cette phrase"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">Aucune phrase sélectionnée.</p>
      )}

      {/* Compteur + bouton */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
        <span>
          {isOpen ? "Masquer les phrases" : "Choisir des phrases"}
        </span>
        {selected.length < 2 && (
          <span className="text-xs text-muted-foreground/60">
            ({selected.length}/2)
          </span>
        )}
      </button>

      {/* Liste dépliable */}
      {isOpen && (
        <div className="space-y-2 pt-1">
          {BIO_PHRASES.filter((p) => !selected.includes(p.id)).map((phrase) => {
            const isDisabled = selected.length >= 2;

            return (
              <button
                key={phrase.id}
                type="button"
                disabled={isDisabled || isPending}
                onClick={() => toggle(phrase.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border text-sm transition-all",
                  isDisabled
                    ? "border-border/30 text-muted-foreground/40 cursor-not-allowed"
                    : "border-border hover:border-primary/50 hover:bg-muted/30 text-foreground"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center" />
                  <span className="leading-relaxed">{phrase.text}</span>
                </div>
              </button>
            );
          })}

          {selected.length >= 2 && (
            <p className="text-xs text-muted-foreground text-center pt-1">
              2/2 — retirez une phrase pour en choisir une autre.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
