"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";

interface ShinydexDesignWrapperProps {
  design: string;
  children: ReactNode;
}

/**
 * Encapsule le contenu du Shinydex personnel dans le design choisi.
 * Ajouter un design = ajouter un case ici + les classes CSS correspondantes.
 */
export function ShinydexDesignWrapper({ design, children }: ShinydexDesignWrapperProps) {

  // Verrouille le scroll du body — tous les designs sont plein-écran
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* ── Design: Classique — cadre épuré ── */
  if (design === "classic") {
    return (
      <div className="classic-dex-surface fixed inset-0 z-50 overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 max-w-screen-2xl w-full mx-auto px-3 sm:px-6 lg:px-10 py-4 flex flex-col">
          <div className="classic-dex-device flex-1 min-h-0">

            <div className="classic-dex-top-bar">
              <Link href="/profile" className="classic-dex-back-btn" title="Retour au profil">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <span className="classic-dex-label">SHINYDEX</span>
              <div className="flex items-center gap-2">
                <div className="classic-dex-indicator" />
                <Link href="/settings" className="classic-dex-back-btn" title="Paramètres">
                  <Settings className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="classic-dex-screen-area">{children}</div>

            <div className="classic-dex-bottom-bar">
              <span className="classic-dex-footer-text">◆ Setifier D&D v1.0 ◆</span>
            </div>

          </div>
        </div>
      </div>
    );
  }

  /* ── Design: Terminal (boîtier métallique) ── */
  if (design === "device") {
    return (
      <div className="personal-dex-surface fixed inset-0 z-50 overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 max-w-screen-2xl w-full mx-auto px-3 sm:px-6 lg:px-10 py-4 flex flex-col">
          <div className="personal-dex-device flex-1 min-h-0">

            <div className="personal-dex-top-bar">
              <div className="flex items-center gap-3">
                <Link href="/profile" className="personal-dex-back-btn" title="Retour au profil">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className="personal-dex-buttons hidden sm:flex">
                  <div className="personal-dex-btn personal-dex-btn-blue" />
                  <div className="personal-dex-btn personal-dex-btn-green" />
                  <div className="personal-dex-btn personal-dex-btn-gray" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="personal-dex-led" />
                <span className="personal-dex-label hidden sm:block">SHINYDEX</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="personal-dex-vents hidden sm:flex">
                  {Array.from({ length: 7 }, (_, i) => <div key={i} className="personal-dex-vent" />)}
                </div>
                <Link href="/settings" className="personal-dex-back-btn" title="Paramètres">
                  <Settings className="h-5 w-5" />
                </Link>
                <div className="personal-dex-rivet" />
              </div>
            </div>

            <div className="personal-dex-screen-area">{children}</div>

            <div className="personal-dex-bottom-bar">
              <div className="flex items-center gap-3">
                <div className="personal-dex-rivet" />
                <div className="personal-dex-vents hidden sm:flex">
                  {Array.from({ length: 10 }, (_, i) => <div key={i} className="personal-dex-vent" />)}
                </div>
              </div>
              <span className="personal-dex-label hidden sm:block">◆ Setifier D&D v1.0 ◆</span>
              <div className="flex items-center gap-3">
                <div className="personal-dex-buttons hidden sm:flex">
                  <div className="personal-dex-btn personal-dex-btn-gray" />
                  <div className="personal-dex-btn personal-dex-btn-gray" />
                  <div className="personal-dex-btn personal-dex-btn-blue" />
                </div>
                <div className="personal-dex-rivet" />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  /* ── Design: Néon (cyberpunk) ── */
  if (design === "neon") {
    return (
      <div className="neon-dex-surface fixed inset-0 z-50 overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 max-w-screen-2xl w-full mx-auto px-3 sm:px-6 lg:px-10 py-4 flex flex-col">
          <div className="neon-dex-frame flex-1 min-h-0">

            {/* Accents de coin */}
            <span className="neon-corner neon-corner-tl" aria-hidden="true" />
            <span className="neon-corner neon-corner-tr" aria-hidden="true" />
            <span className="neon-corner neon-corner-bl" aria-hidden="true" />
            <span className="neon-corner neon-corner-br" aria-hidden="true" />

            {/* Contour lumineux continu sauf aux angles */}
            <span className="neon-edge neon-edge-top"    aria-hidden="true" />
            <span className="neon-edge neon-edge-right"  aria-hidden="true" />
            <span className="neon-edge neon-edge-bottom" aria-hidden="true" />
            <span className="neon-edge neon-edge-left"   aria-hidden="true" />

            <div className="neon-dex-header">
              <div className="flex items-center gap-2 shrink-0">
                <Link href="/profile" className="neon-dex-back-btn" title="Retour au profil">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <Link href="/settings" className="neon-dex-back-btn" title="Paramètres">
                  <Settings className="h-5 w-5" />
                </Link>
              </div>
              <div className="neon-vents" aria-hidden="true"><div className="neon-vent-slot" /></div>
              <span className="neon-dex-header-title shrink-0 px-4">SHINYDEX</span>
              <div className="neon-vents" aria-hidden="true"><div className="neon-vent-slot" /></div>
              <div className="neon-dex-status shrink-0">
                <div className="neon-dex-dot neon-dex-dot-purple" />
                <div className="neon-dex-dot" />
              </div>
            </div>

            <div className="neon-dex-content-area">{children}</div>

            <div className="neon-dex-footer">
              <div className="neon-vents" aria-hidden="true"><div className="neon-vent-slot-footer" /></div>
              <span className="neon-dex-footer-text shrink-0 px-4">◆ Setifier D&D v1.0 ◆</span>
              <div className="neon-vents" aria-hidden="true"><div className="neon-vent-slot-footer" /></div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  /* ── Design: Cristal Rose (métallique rose) ── */
  if (design === "rose") {
    return (
      <div className="rose-dex-surface fixed inset-0 z-50 overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 max-w-screen-2xl w-full mx-auto px-3 sm:px-6 lg:px-10 py-4 flex flex-col">
          <div className="rose-dex-device flex-1 min-h-0">
            <div className="rose-dex-top-bar">
              <Link href="/profile" className="rose-dex-back-btn" title="Retour au profil">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <span className="rose-dex-label">SHINYDEX</span>
              <div className="flex items-center gap-2">
                <div className="rose-dex-indicator" />
                <Link href="/settings" className="rose-dex-back-btn" title="Paramètres">
                  <Settings className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="rose-dex-screen-area">{children}</div>
            <div className="rose-dex-bottom-bar">
              <span className="rose-dex-footer-text">◆ Setifier D&D v1.0 ◆</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Design: Acier Cobalt (blindage industriel) ── */
  if (design === "cobalt") {
    return (
      <div className="cobalt-dex-surface fixed inset-0 z-50 overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 max-w-screen-2xl w-full mx-auto px-3 sm:px-6 lg:px-10 py-4 flex flex-col">
          <div className="cobalt-dex-device flex-1 min-h-0">
            <div className="cobalt-dex-top-bar">
              <Link href="/profile" className="cobalt-dex-back-btn" title="Retour au profil">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-2.5">
                <div className="cobalt-dex-led" />
                <span className="cobalt-dex-label">SHINYDEX</span>
              </div>
              <Link href="/settings" className="cobalt-dex-back-btn" title="Paramètres">
                <Settings className="h-5 w-5" />
              </Link>
            </div>
            <div className="cobalt-dex-screen-area">{children}</div>
            <div className="cobalt-dex-bottom-bar">
              <span className="cobalt-dex-footer-text">◆ Setifier D&D v1.0 ◆</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Design: Manga (cartoon tech) ── */
  if (design === "manga") {
    return (
      <div className="manga-dex-surface fixed inset-0 z-50 overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 max-w-screen-2xl w-full mx-auto px-3 sm:px-6 lg:px-10 py-4 flex flex-col">
          <div className="manga-dex-device flex-1 min-h-0">
            <div className="manga-dex-top-bar">
              <Link href="/profile" className="manga-dex-back-btn" title="Retour au profil">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <span className="manga-dex-label">SHINYDEX</span>
              <div className="flex items-center gap-2">
                <div className="manga-dex-status">
                  <div className="manga-dex-dot" />
                  <div className="manga-dex-dot manga-dex-dot-accent" />
                </div>
                <Link href="/settings" className="manga-dex-back-btn" title="Paramètres">
                  <Settings className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="manga-dex-screen-area">{children}</div>
            <div className="manga-dex-bottom-bar">
              <span className="manga-dex-footer-text">◆ Setifier D&D v1.0 ◆</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Fallback */
  return (
    <div className="classic-dex-surface fixed inset-0 z-50 overflow-hidden flex flex-col">
      <div className="flex-1 min-h-0 max-w-screen-2xl w-full mx-auto px-3 sm:px-6 lg:px-10 py-4 flex flex-col">
        <div className="classic-dex-device flex-1 min-h-0">
          <div className="classic-dex-top-bar">
            <Link href="/profile" className="classic-dex-back-btn" title="Retour au profil">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="classic-dex-label">SHINYDEX</span>
            <div className="classic-dex-indicator" />
          </div>
          <div className="classic-dex-screen-area">{children}</div>
          <div className="classic-dex-bottom-bar">
            <span className="classic-dex-footer-text">◆ Setifier D&D v1.0 ◆</span>
          </div>
        </div>
      </div>
    </div>
  );
}
