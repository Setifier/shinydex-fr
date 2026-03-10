"use client";

import { useState, useRef, useEffect } from "react";
import { Palette } from "lucide-react";
import { SHINYDEX_DESIGNS } from "@/lib/shinydex-designs";

const DESIGN_COLORS: Record<string, string> = {
  classic: "#a0a8b5",
  device:  "#ffaa33",
  neon:    "#00ff70",
  rose:    "#d94f8a",
  cobalt:  "#1ec8f0",
  manga:   "#e8383b",
};

interface DesignSwitcherBtnProps {
  currentDesign: string;
  btnClassName: string;
  onDesignChange: (design: string) => void;
  dropdownSide?: "left" | "right";
}

export function DesignSwitcherBtn({
  currentDesign,
  btnClassName,
  onDesignChange,
  dropdownSide = "right",
}: DesignSwitcherBtnProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className={btnClassName}
        title="Changer de design"
        onClick={() => setOpen((o) => !o)}
      >
        <Palette className="h-5 w-5" />
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 z-[100] bg-card border border-border/50 rounded-xl shadow-2xl overflow-hidden min-w-[160px] ${
            dropdownSide === "left" ? "left-0" : "right-0"
          }`}
        >
          {SHINYDEX_DESIGNS.map((design) => {
            const isActive = design.value === currentDesign;
            const color = DESIGN_COLORS[design.value] ?? "#fff";
            return (
              <button
                key={design.value}
                type="button"
                onClick={() => { onDesignChange(design.value); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted/60 ${isActive ? "bg-muted/40" : ""}`}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 6px ${color}88` }} />
                <span style={{ color: isActive ? color : undefined }}>{design.label}</span>
                {isActive && <span className="ml-auto text-xs opacity-50">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
