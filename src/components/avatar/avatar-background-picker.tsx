"use client";

import { AVATAR_BACKGROUNDS } from "@/lib/avatar-backgrounds";
import { cn } from "@/lib/utils";

// Chaque groupe occupe sa propre ligne
const GROUPS = [
  AVATAR_BACKGROUNDS.slice(0, 15),  // Neutrals (15)
  AVATAR_BACKGROUNDS.slice(15, 30), // Basiques (15)
  AVATAR_BACKGROUNDS.slice(30, 45), // Claires (15)
  AVATAR_BACKGROUNDS.slice(45, 60), // Foncées (15)
] as const;

interface AvatarBackgroundPickerProps {
  value: string;
  onChange: (hex: string) => void;
}

export function AvatarBackgroundPicker({
  value,
  onChange,
}: AvatarBackgroundPickerProps) {
  return (
    <div className="flex flex-col gap-3">
      {GROUPS.map((group, i) => (
        <div key={i} className="flex gap-2 flex-wrap">
          {group.map(({ key, hex, label }) => {
            const isSelected = value === hex;
            return (
              <button
                key={key}
                type="button"
                title={label}
                onClick={() => onChange(hex)}
                className={cn(
                  "size-8 rounded-full border-2 transition-all shrink-0",
                  "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "border-white ring-2 ring-primary scale-110"
                    : "border-transparent hover:border-white/50"
                )}
                style={{ backgroundColor: hex }}
                aria-label={label}
                aria-pressed={isSelected}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
