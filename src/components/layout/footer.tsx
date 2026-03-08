import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Logo + description */}
          <div className="flex items-start gap-5 max-w-sm">
            <Link href="/" className="shrink-0">
              <Image
                src="/logo_shinydex.png"
                alt="Shinydex"
                width={80}
                height={80}
                className="h-20 w-auto"
              />
            </Link>
            <div className="space-y-2">
              <Link href="/" className="block font-heading text-xl text-primary hover:text-primary-light transition-colors pb-0.5">
                Shinydex
              </Link>
              <p className="text-base text-muted-foreground leading-relaxed">
                Votre Pokédex de Pokémon chromatiques. Suivez votre progression et partagez avec vos amis.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-12 text-base">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground pb-2">
                Produit
              </h4>
              <FooterLink href="/shinydex">Shinydex</FooterLink>
              <FooterLink href="/guide">Guide</FooterLink>
              <FooterLink href="/support">Nous soutenir</FooterLink>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground pb-2">
                Légal
              </h4>
              <FooterLink href="/conditions">Conditions</FooterLink>
              <FooterLink href="/politique">Confidentialité</FooterLink>
              <FooterLink href="/credits">Crédits</FooterLink>
            </div>
          </div>

          {/* Theme toggle */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground pb-2">
              Thème
            </h4>
            <ModeToggle />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Shinydex. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground">
            Pokémon et toutes les marques associées sont la propriété de Nintendo, Game Freak et The Pokémon Company.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all"
    >
      {children}
    </Link>
  );
}
