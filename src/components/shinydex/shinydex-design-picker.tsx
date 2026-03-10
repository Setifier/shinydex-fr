"use client";

import Image from "next/image";
import { SHINYDEX_DESIGNS } from "@/lib/shinydex-designs";

const SELECTED_BORDER = "border-[#00c8ff] shadow-[0_0_14px_rgba(0,200,255,0.45)]";

// Previews screenshot pour les miniatures de la grille
const DESIGN_PREVIEWS: Record<string, string> = {
  classic: "/assets/preview_classique.png",
  device:  "/assets/preview_terminal.png",
  neon:    "/assets/preview_neon.png",
  rose:    "/assets/preview_rose.png",
  cobalt:  "/assets/preview_cobalt.png",
  manga:   "/assets/preview_manga.png",
};

interface ShinydexDesignPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ShinydexDesignPicker({ value, onChange }: ShinydexDesignPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {SHINYDEX_DESIGNS.map((design) => {
        const isSelected = value === design.value;
        const preview    = DESIGN_PREVIEWS[design.value] ?? "/assets/preview_classique.png";

        return (
          <button
            key={design.value}
            type="button"
            onClick={() => onChange(design.value)}
            className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 focus:outline-none ${
              isSelected
                ? `${SELECTED_BORDER} scale-[1.04]`
                : "border-border/40 hover:border-border/80 hover:scale-[1.02] opacity-70 hover:opacity-100"
            }`}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={preview}
                alt={`Aperçu ${design.label}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 33vw, 20vw"
              />
            </div>
            <div className={`py-1.5 px-2 text-center text-xs font-semibold bg-background/85 backdrop-blur-sm transition-colors ${
              isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
            }`}>
              {design.label}
              {isSelected && <span className="ml-1.5 opacity-50">✓</span>}
            </div>
          </button>
        );
      })}
    </div>
  );
}
