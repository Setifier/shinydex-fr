"use client";

import Image from "next/image";
import { SHINYDEX_DESIGNS } from "@/lib/shinydex-designs";

interface ShinydexDesignPickerProps {
  value: string;
  onChange: (value: string) => void;
}

// Wrapper coloré autour du card = bordure de sélection (p-[2px] + bg)
const SELECTED_WRAPPER: Record<string, string> = {
  classic: "bg-primary shadow-lg shadow-primary/30",
  device:  "bg-slate-400/55 shadow-lg shadow-slate-900/50",
  neon:    "bg-[#00c8ff] shadow-[0_0_22px_rgba(0,200,255,0.45)]",
  rose:    "bg-[#d94f8a] shadow-[0_0_22px_rgba(217,79,138,0.45)]",
  cobalt:  "bg-[#3b7fd4] shadow-[0_0_22px_rgba(59,127,212,0.45)]",
  manga:   "bg-[#e8383b] shadow-[0_0_22px_rgba(232,56,59,0.45)]",
};

export function ShinydexDesignPicker({ value, onChange }: ShinydexDesignPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {SHINYDEX_DESIGNS.map((design) => {
        const isSelected = value === design.value;

        return (
          /* Wrapper — crée la bordure colorée quand sélectionné */
          <div
            key={design.value}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(design.value)}
            className={`group relative rounded-xl p-[2px] cursor-pointer transition-all duration-200 ${
              isSelected
                ? `${SELECTED_WRAPPER[design.value] ?? "bg-primary"} scale-[1.04]`
                : "bg-transparent hover:bg-border/50 hover:scale-[1.02] opacity-70 hover:opacity-100"
            }`}
          >
            {/* Card interne — overflow-hidden pour clipper la preview */}
            <div className="rounded-[10px] overflow-hidden">

              {/* Aperçu du design */}
              <div className={`sdp-preview sdp-preview-${design.value}`}>
                <div className="sdp-inner-frame">
                  <Image
                    src="/assets/screenshot.png"
                    alt={`Aperçu design ${design.label}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 33vw, 20vw"
                  />
                  {/* Overlay sombre pour designs sur fond noir */}
                  <div className="sdp-screenshot-overlay" />
                </div>
              </div>

              {/* Label */}
              <div className="sdp-label">{design.label}</div>

            </div>


          </div>
        );
      })}
    </div>
  );
}
