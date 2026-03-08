"use client";

import { AVATARS } from "@/lib/avatars";
import { UserAvatar } from "@/components/avatar/user-avatar";
import { cn } from "@/lib/utils";

interface AvatarGridProps {
  value: string;
  background: string;
  onChange: (avatar: string) => void;
}

export function AvatarGrid({ value, background, onChange }: AvatarGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {AVATARS.map(({ id, path, label }) => {
        const isSelected = value === path;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(path)}
            className={cn(
              "flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-transparent hover:border-border"
            )}
          >
            <UserAvatar
              avatar={path}
              background={background}
              size="xl"
              className={cn(
                "transition-all",
                isSelected && "outline-primary/80"
              )}
            />
            <span
              className={cn(
                "text-xs font-medium",
                isSelected ? "text-primary" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
