"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ShinyButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const [isSqueezing, setIsSqueezing] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSqueezing(true);
    setTimeout(() => {
      router.push(href);
    }, 400);
  };

  return (
    <Button
      asChild
      size="lg"
      className={`group relative overflow-hidden rounded-full px-8 text-lg font-bold ${
        isSqueezing ? "animate-squeeze" : ""
      } ${className}`}
    >
      <a href={href} onClick={handleClick}>
        {/* Shiny sparkle sweep on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden rounded-full">
          <div className="absolute inset-0 animate-shiny-sparkle bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
        </div>

        {/* Star sparkles on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden rounded-full">
          <Sparkle className="top-[15%] left-[10%] animate-sparkle-1" />
          <Sparkle className="bottom-[20%] left-[25%] animate-sparkle-2" size="sm" />
          <Sparkle className="top-[40%] left-[50%] animate-sparkle-3" />
          <Sparkle className="top-[20%] right-[15%] animate-sparkle-4" size="sm" />
          <Sparkle className="bottom-[30%] right-[20%] animate-sparkle-1" />
          <Sparkle className="top-[60%] left-[15%] animate-sparkle-3" size="sm" />
        </div>

        <span className="relative z-10">{children}</span>
      </a>
    </Button>
  );
}

function Sparkle({ className, size = "md" }: { className: string; size?: "sm" | "md" }) {
  const s = size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5";
  return (
    <div className={`absolute ${className}`}>
      <div className={`relative ${s}`}>
        <div className="absolute inset-0 bg-white rotate-0 scale-x-[3] scale-y-[0.5] rounded-full" />
        <div className="absolute inset-0 bg-white rotate-90 scale-x-[3] scale-y-[0.5] rounded-full" />
      </div>
    </div>
  );
}
