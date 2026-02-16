"use client";

import { ALL_REGIONS, type RegionName } from "@/types/pokemon";

interface RegionSelectorProps {
  value: RegionName | null;
  onChange: (region: RegionName | null) => void;
}

export function RegionSelector({ value, onChange }: RegionSelectorProps) {
  const handleToggle = (region: RegionName) => {
    onChange(value === region ? null : region);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {ALL_REGIONS.map((region) => {
        const isSelected = value === region;
        const label = region.split(" - ")[1] || region;

        return (
          <button
            key={region}
            type="button"
            onClick={() => handleToggle(region)}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
              isSelected
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50 text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
