"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { updatePublicProfileAction } from "@/actions/update-public-profile.action";

type VisibilityKey = "showFavoritePokemon" | "showFavoriteRegion" | "showFavoriteGame" | "emailPrivate";

interface VisibilityToggleProps {
  field: VisibilityKey;
  initialValue: boolean;
  label: string;
  description?: string;
  /** If true, "checked" means hidden (emailPrivate) */
  invertedMeaning?: boolean;
}

export function VisibilityToggle({
  field,
  initialValue,
  label,
  description,
  invertedMeaning = false,
}: VisibilityToggleProps) {
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  const isVisible = invertedMeaning ? !value : value;

  const handleChange = (checked: boolean) => {
    setValue(checked);
    startTransition(async () => {
      const res = await updatePublicProfileAction({ [field]: checked });
      if (res.error) toast.error(res.error);
    });
  };

  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="flex items-center gap-2 min-w-0">
        {isVisible
          ? <Eye className="size-4 text-muted-foreground shrink-0" />
          : <EyeOff className="size-4 text-muted-foreground shrink-0" />
        }
        <div>
          <p className="text-sm font-medium">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        disabled={isPending}
        onClick={() => handleChange(!value)}
        className={cn(
          "relative shrink-0 w-10 h-5.5 rounded-full border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          value
            ? "bg-primary border-primary"
            : "bg-muted border-border"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
            value ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
