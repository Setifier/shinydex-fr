"use client";

import Image from "next/image";

const AVATARS = [
  "/avatars/default.png",
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
];

interface AvatarGridProps {
  value: string;
  onChange: (avatar: string) => void;
}

export function AvatarGrid({ value, onChange }: AvatarGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
      {AVATARS.map((avatar) => {
        const isSelected = value === avatar;

        return (
          <button
            key={avatar}
            type="button"
            onClick={() => onChange(avatar)}
            className={`relative aspect-square rounded-xl border-2 overflow-hidden transition-all ${
              isSelected
                ? "border-primary ring-2 ring-primary/30 scale-105"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Image
              src={avatar}
              alt="Avatar"
              fill
              className="object-cover"
            />
            {isSelected && (
              <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                <div className="bg-primary text-primary-foreground rounded-full p-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
