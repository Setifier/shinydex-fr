"use client";
import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  if (!mounted || !resolvedTheme) {
    return (
      <button
        className="inline-flex h-3 w-16 items-center justify-center rounded-full border-2 bg-slate-100 border-slate-300 opacity-50"
        disabled
        aria-label="Loading theme toggle"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-6 w-16 items-center rounded-full border-2
        ${
          isDark
            ? "bg-slate-800 border-slate-600"
            : "bg-slate-100 border-slate-300"
        }
        hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
      aria-label="Toggle theme"
    >
      {/* Slider button */}
      <div
        className={`
          absolute h-7 w-7 rounded-full bg-white shadow-md flex items-center justify-center -ml-1
          ${isDark ? "translate-x-10" : "translate-x-0.5"}
        `}
      >
        <Image
          src={isDark ? "/ui/icons/icon_moon.png" : "/ui/icons/icon_sun.png"}
          alt={isDark ? "Moon" : "Sun"}
          width={20}
          height={20}
          className="w-5 h-5"
        />
      </div>

      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
