"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateProfilePrefsAction } from "@/actions/update-profile-prefs.action";

const REGION_OPTIONS = [
  { value: "kanto",  label: "Kanto",  gen: "Gén. I"    },
  { value: "johto",  label: "Johto",  gen: "Gén. II"   },
  { value: "hoenn",  label: "Hoenn",  gen: "Gén. III"  },
  { value: "sinnoh", label: "Sinnoh", gen: "Gén. IV"   },
  { value: "unys",   label: "Unys",   gen: "Gén. V"    },
  { value: "kalos",  label: "Kalos",  gen: "Gén. VI"   },
  { value: "alola",  label: "Alola",  gen: "Gén. VII"  },
  { value: "galar",  label: "Galar",  gen: "Gén. VIII" },
  { value: "hisui",  label: "Hisui",  gen: "Lég. Arceus" },
  { value: "paldea", label: "Paldea", gen: "Gén. IX"   },
];

interface FavoriteRegionSettingProps {
  initialRegion: string | null;
}

export function FavoriteRegionSetting({ initialRegion }: FavoriteRegionSettingProps) {
  const [region, setRegion] = useState<string | null>(initialRegion);
  const [isPending, startTransition] = useTransition();

  const handleSelect = (value: string) => {
    const next = region === value ? null : value;
    setRegion(next);
    startTransition(async () => {
      const res = await updateProfilePrefsAction({ favoriteRegion: next });
      if (res.error) toast.error(res.error);
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {REGION_OPTIONS.map((opt) => {
        const isSelected = region === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={isPending}
            onClick={() => handleSelect(opt.value)}
            className={cn(
              "flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-all",
              isSelected
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50 text-foreground"
            )}
          >
            <span className="font-medium">{opt.label}</span>
            <span className="text-xs text-muted-foreground">{opt.gen}</span>
          </button>
        );
      })}
    </div>
  );
}
