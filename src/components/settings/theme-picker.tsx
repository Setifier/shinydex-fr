"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const themes = [
  {
    value: "light",
    label: "Clair",
    preview: <LightPreview />,
  },
  {
    value: "dark",
    label: "Sombre",
    preview: <DarkPreview />,
  },
  {
    value: "system",
    label: "Système",
    preview: <SystemPreview />,
  },
] as const;

export function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-4">
        {themes.map((t) => (
          <div
            key={t.value}
            className="w-36 h-24 rounded-xl border-2 border-border animate-pulse bg-muted"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {themes.map((t) => {
        const isActive = theme === t.value;
        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={cn(
              "group flex flex-col gap-2 rounded-xl border-2 p-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isActive
                ? "border-primary"
                : "border-border hover:border-muted-foreground/40"
            )}
          >
            <div className="overflow-hidden rounded-lg">
              {t.preview}
            </div>
            <div className="flex items-center justify-between px-1 pb-0.5">
              <span className="text-xs font-medium">{t.label}</span>
              {isActive && (
                <Check className="size-3 text-primary" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function LightPreview() {
  return (
    <div className="w-36 h-24 bg-[#f8fafc] rounded-lg overflow-hidden flex flex-col">
      {/* Navbar */}
      <div className="h-5 bg-white border-b border-[#e2e8f0] flex items-center gap-1 px-2">
        <div className="w-8 h-1.5 bg-[#6366f1] rounded-full" />
        <div className="flex-1" />
        <div className="w-3 h-1.5 bg-[#e2e8f0] rounded-full" />
        <div className="w-3 h-1.5 bg-[#e2e8f0] rounded-full" />
      </div>
      {/* Content */}
      <div className="flex-1 p-2 flex gap-1.5">
        {/* Sidebar */}
        <div className="w-10 flex flex-col gap-1">
          <div className="w-full h-1.5 bg-[#e2e8f0] rounded-full" />
          <div className="w-8 h-1.5 bg-[#6366f1]/30 rounded-full" />
          <div className="w-full h-1.5 bg-[#e2e8f0] rounded-full" />
          <div className="w-6 h-1.5 bg-[#e2e8f0] rounded-full" />
        </div>
        {/* Main */}
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="w-full h-2 bg-[#e2e8f0] rounded-full" />
          <div className="w-3/4 h-1.5 bg-[#e2e8f0] rounded-full" />
          <div className="mt-1 flex gap-1">
            <div className="w-8 h-8 bg-[#e2e8f0] rounded-md" />
            <div className="w-8 h-8 bg-[#e2e8f0] rounded-md" />
            <div className="w-8 h-8 bg-[#e2e8f0] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DarkPreview() {
  return (
    <div className="w-36 h-24 bg-[#0f172a] rounded-lg overflow-hidden flex flex-col">
      {/* Navbar */}
      <div className="h-5 bg-[#1e293b] border-b border-[#334155] flex items-center gap-1 px-2">
        <div className="w-8 h-1.5 bg-[#6366f1] rounded-full" />
        <div className="flex-1" />
        <div className="w-3 h-1.5 bg-[#334155] rounded-full" />
        <div className="w-3 h-1.5 bg-[#334155] rounded-full" />
      </div>
      {/* Content */}
      <div className="flex-1 p-2 flex gap-1.5">
        {/* Sidebar */}
        <div className="w-10 flex flex-col gap-1">
          <div className="w-full h-1.5 bg-[#334155] rounded-full" />
          <div className="w-8 h-1.5 bg-[#6366f1]/50 rounded-full" />
          <div className="w-full h-1.5 bg-[#334155] rounded-full" />
          <div className="w-6 h-1.5 bg-[#334155] rounded-full" />
        </div>
        {/* Main */}
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="w-full h-2 bg-[#334155] rounded-full" />
          <div className="w-3/4 h-1.5 bg-[#334155] rounded-full" />
          <div className="mt-1 flex gap-1">
            <div className="w-8 h-8 bg-[#1e293b] rounded-md border border-[#334155]" />
            <div className="w-8 h-8 bg-[#1e293b] rounded-md border border-[#334155]" />
            <div className="w-8 h-8 bg-[#1e293b] rounded-md border border-[#334155]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemPreview() {
  return (
    <div className="w-36 h-24 rounded-lg overflow-hidden flex flex-col">
      {/* Split: left=light, right=dark */}
      <div className="flex-1 flex">
        {/* Light half */}
        <div className="flex-1 bg-[#f8fafc] flex flex-col">
          <div className="h-5 bg-white border-b border-[#e2e8f0] flex items-center gap-1 px-2">
            <div className="w-5 h-1.5 bg-[#6366f1] rounded-full" />
          </div>
          <div className="flex-1 p-1.5 flex flex-col gap-1">
            <div className="w-full h-1.5 bg-[#e2e8f0] rounded-full" />
            <div className="w-4/5 h-1.5 bg-[#e2e8f0] rounded-full" />
            <div className="mt-0.5 flex gap-0.5">
              <div className="w-6 h-6 bg-[#e2e8f0] rounded-sm" />
              <div className="w-6 h-6 bg-[#e2e8f0] rounded-sm" />
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="w-px bg-gradient-to-b from-[#e2e8f0] via-[#94a3b8] to-[#334155]" />
        {/* Dark half */}
        <div className="flex-1 bg-[#0f172a] flex flex-col">
          <div className="h-5 bg-[#1e293b] border-b border-[#334155] flex items-center gap-1 px-2">
            <div className="w-5 h-1.5 bg-[#6366f1] rounded-full" />
          </div>
          <div className="flex-1 p-1.5 flex flex-col gap-1">
            <div className="w-full h-1.5 bg-[#334155] rounded-full" />
            <div className="w-4/5 h-1.5 bg-[#334155] rounded-full" />
            <div className="mt-0.5 flex gap-0.5">
              <div className="w-6 h-6 bg-[#1e293b] rounded-sm border border-[#334155]" />
              <div className="w-6 h-6 bg-[#1e293b] rounded-sm border border-[#334155]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
