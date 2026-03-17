"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updatePublicProfileAction } from "@/actions/update-public-profile.action";

const PRONOUNS_OPTIONS = [
  { value: "il/lui",         label: "il / lui" },
  { value: "elle",           label: "elle / la" },
  { value: "iel",            label: "iel / ellui" },
  { value: "non-specifie",   label: "Non précisé" },
] as const;

interface PronounsPickerProps {
  initialValue: string | null;
}

export function PronounsPicker({ initialValue }: PronounsPickerProps) {
  const [value, setValue] = useState<string | null>(initialValue);
  const [isPending, startTransition] = useTransition();

  const handleSelect = (v: string) => {
    const next = value === v ? null : v;
    setValue(next);
    startTransition(async () => {
      const res = await updatePublicProfileAction({ pronouns: next });
      if (res.error) toast.error(res.error);
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {PRONOUNS_OPTIONS.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={isPending}
            onClick={() => handleSelect(opt.value)}
            className={cn(
              "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
              isActive
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
