"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { UserMenu } from "./user-menu";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const { data: session, isPending } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`mx-auto rounded-2xl border border-border/40 bg-background/80 backdrop-blur-lg transition-[max-width] duration-500 ${
        scrolled ? "max-w-4xl" : "max-w-7xl"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left — Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo_shinydex.png"
            alt="Shinydex"
            width={64}
            height={64}
            className="h-16 w-auto"
            priority
          />
        </Link>

        {/* Center — Links */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/">Accueil</NavLink>
          <NavLink href="/shinydex">Shinydex</NavLink>
          <NavLink href="/guide">Guide</NavLink>
          <NavLink href="/support">Nous soutenir</NavLink>
        </nav>

        {/* Right — Auth */}
        <div className="flex items-center gap-3">
          {!isPending && !session && (
            <>
              <Link
                href="/auth/login"
                className="text-base font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                Connexion
              </Link>
              <Button asChild className="rounded-full px-5 font-bold text-base">
                <Link href="/auth/register">Commencer</Link>
              </Button>
            </>
          )}
          {!isPending && session && <UserMenu />}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-base font-bold text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
    >
      {children}
    </Link>
  );
}
