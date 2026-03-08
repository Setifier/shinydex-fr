"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import type { Pokemon } from "@/types/pokemon";
import type { PokemonFormType } from "@/types/forms";
import { getPokemonById, getImagePath } from "@/lib/pokemon-data";
import { getTypeColors } from "@/types/pokemon-type-colors";
import { catchPokemonAction } from "@/actions/catch-pokemon.action";
import { uncatchPokemonAction } from "@/actions/uncatch-pokemon.action";
import { RotateCcw } from "lucide-react";

interface PersonalPokemonModalProps {
  isOpen: boolean;
  pokemon: Pokemon | null;
  onClose: () => void;
  allPokemonList: Pokemon[];
  caughtSet: Set<string>;
  onNavigate: (pokemon: Pokemon) => void;
  onCatch: (pokemonId: string) => void;
  onUncatch: (pokemonId: string) => void;
  design: string;
}

function PersonalNavButton({
  pokemon,
  direction,
  isCaught,
  onClick,
}: {
  pokemon: Pokemon;
  direction: "previous" | "next";
  isCaught: boolean;
  onClick: () => void;
}) {
  const imagePath = isCaught ? getImagePath(pokemon.image) : "/assets/interro.png";
  const baseNumber = pokemon.id.split("-")[0];
  const isPrevious = direction === "previous";

  return (
    <button
      onClick={onClick}
      className={`modal-nav-btn group flex items-center gap-5 px-8 py-5 rounded-lg
        transition-all duration-200 hover:scale-105
        ${isPrevious ? "flex-row" : "flex-row-reverse"}`}
      aria-label={`${isPrevious ? "Précédent" : "Suivant"}: ${isCaught ? pokemon.name : "????"}`}
    >
      <div className="modal-nav-arrow flex items-center justify-center w-12 h-12 rounded-full">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isPrevious
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          }
        </svg>
      </div>
      <div className="relative w-20 h-20 pokemon-card-bg rounded-lg border border-primary/30 overflow-hidden">
        <Image
          src={imagePath}
          alt={isCaught ? pokemon.name : "????"}
          fill
          className={`object-contain p-1 ${!isCaught ? "translate-y-[6%]" : ""}`}
          sizes="80px"
        />
      </div>
      <div className={`flex flex-col ${isPrevious ? "items-start" : "items-end"}`}>
        <span className="modal-nav-number text-base font-bold">#{baseNumber}</span>
        <span className="text-lg text-foreground font-semibold truncate max-w-[160px]">
          {isCaught ? pokemon.name : "????"}
        </span>
      </div>
    </button>
  );
}

export function PersonalPokemonModal({
  isOpen,
  pokemon,
  onClose,
  allPokemonList,
  caughtSet,
  onNavigate,
  onCatch,
  onUncatch,
  design,
}: PersonalPokemonModalProps) {
  const [selectedForm, setSelectedForm] = useState<PokemonFormType | null>(null);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(pokemon);
  const [originalPokemon, setOriginalPokemon] = useState<Pokemon | null>(pokemon);
  const [isPending, startTransition] = useTransition();

  const isCaught = !!(pokemon && caughtSet.has(pokemon.id));

  const getFormLabel = (form: PokemonFormType | null): string => {
    if (!pokemon) return "";
    const baseName = pokemon.name;
    if (!form) return baseName;
    const formPrefixes: Record<PokemonFormType, string> = {
      mega: "Méga-", "mega-x": "Méga-", "mega-y": "Méga-",
      giga: "Gigamax ", alola: "Alola ", galar: "Galar ",
      hisui: "Hisui ", paldea: "Paldea ", origin: "Forme Originelle ",
      primo: "Primo-", infini: "Dynamax Infini ",
    };
    const prefix = formPrefixes[form] || "";
    if (form === "mega-x") return `${prefix}${baseName} X`;
    if (form === "mega-y") return `${prefix}${baseName} Y`;
    return `${prefix}${baseName}`;
  };

  useEffect(() => {
    if (!pokemon) { setCurrentPokemon(null); return; }
    if (!selectedForm) { setCurrentPokemon(pokemon); return; }
    const formPokemon = getPokemonById(`${pokemon.id.split("-")[0]}-${selectedForm}`);
    if (formPokemon) setCurrentPokemon(formPokemon);
  }, [pokemon, selectedForm]);

  useEffect(() => {
    if (!pokemon) { setSelectedForm(null); setOriginalPokemon(null); return; }
    setOriginalPokemon(pokemon);
    const idParts = pokemon.id.split("-");
    setSelectedForm(idParts.length > 1 ? idParts.slice(1).join("-") as PokemonFormType : null);
  }, [pokemon]);

  const getBasePokemon = (poke: Pokemon) => getPokemonById(poke.id.split("-")[0]) || poke;

  const currentIndex = (() => {
    if (!originalPokemon) return -1;
    const base = getBasePokemon(originalPokemon);
    return allPokemonList.findIndex((p) => getBasePokemon(p).id === base.id);
  })();

  const previousPokemon = currentIndex > 0 ? allPokemonList[currentIndex - 1] : null;
  const nextPokemon = currentIndex >= 0 && currentIndex < allPokemonList.length - 1 ? allPokemonList[currentIndex + 1] : null;

  const handleCatch = () => {
    if (!pokemon) return;
    startTransition(async () => {
      await catchPokemonAction(pokemon.id);
      onCatch(pokemon.id);
    });
  };

  const handleUncatch = () => {
    if (!pokemon) return;
    startTransition(async () => {
      await uncatchPokemonAction(pokemon.id);
      onUncatch(pokemon.id);
    });
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !currentPokemon) return null;

  const imagePath = isCaught ? getImagePath(currentPokemon.image) : "/assets/interro.png";
  const baseNumber = currentPokemon.id.split("-")[0];
  const regularAbilities = Array.isArray(currentPokemon.abilities.regular)
    ? currentPokemon.abilities.regular
    : [currentPokemon.abilities.regular];

  return (
    <div
      className={`modal-design-${design} fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[80vw] h-[90vh] pokedex-screen flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="modal-close-btn absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 shadow-lg"
          aria-label="Fermer"
        >
          <span className="text-xl font-bold leading-none">✕</span>
        </button>

        {/* Bouton désattribution */}
        {isCaught && (
          <button
            onClick={handleUncatch}
            disabled={isPending}
            className="modal-uncatch-btn absolute bottom-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 shadow-lg disabled:opacity-40"
            title="Oups, je n'ai pas attrapé ce Pokémon finalement"
            aria-label="Annuler la capture"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}

        <div className="pokedex-content p-6 pr-12 flex flex-col h-full min-h-0">

          {/* Bloc 1 : Navigation */}
          <div className="flex items-center justify-between gap-3 mb-8 shrink-0">
            <div className="flex-1 flex justify-start pl-3">
              {previousPokemon && (
                <PersonalNavButton
                  pokemon={previousPokemon}
                  direction="previous"
                  isCaught={caughtSet.has(previousPokemon.id)}
                  onClick={() => onNavigate(previousPokemon)}
                />
              )}
            </div>
            <div className="text-center shrink-0">
              <div className="modal-number-badge inline-block rounded-lg px-3 py-1 mb-3">
                <span className="modal-number-text text-lg font-bold">#{baseNumber}</span>
              </div>
              <h2 className="modal-title text-2xl font-heading">
                {isCaught ? currentPokemon.name : "????"}
              </h2>
            </div>
            <div className="flex-1 flex justify-end pr-3">
              {nextPokemon && (
                <PersonalNavButton
                  pokemon={nextPokemon}
                  direction="next"
                  isCaught={caughtSet.has(nextPokemon.id)}
                  onClick={() => onNavigate(nextPokemon)}
                />
              )}
            </div>
          </div>

          {/* Bloc 2 : Sélecteur de formes (capturé seulement, conditionnel) */}
          {isCaught && pokemon?.forms && pokemon.forms.length > 0 && (
            <div className="flex justify-center mb-4 shrink-0">
              <div className="relative inline-block">
                <select
                  value={selectedForm || ""}
                  onChange={(e) => setSelectedForm((e.target.value as PokemonFormType) || null)}
                  className="pokemon-form-select appearance-none text-foreground font-semibold px-5 py-2 pr-10 rounded-lg border-2 border-primary/40 hover:border-primary/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer shadow-lg"
                >
                  <option value="">{getFormLabel(null)}</option>
                  {pokemon.forms.map((form) => (
                    <option key={form} value={form}>{getFormLabel(form)}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Bloc 3 : Image + Infos — remplit tout le reste */}
          <div className="grid sm:grid-cols-2 gap-6 flex-1 min-h-0 items-center">

            {/* Image */}
            <div className="flex items-center justify-center">
              <div className="relative h-[55vh] aspect-square pokemon-card-bg rounded-xl border-2 pokemon-card-border shadow-lg overflow-hidden">
                <Image
                  src={imagePath}
                  alt={isCaught ? currentPokemon.name : "????"}
                  fill
                  className={`object-contain p-6 ${!isCaught ? "translate-y-[6%]" : ""}`}
                  sizes="45vw"
                />
              </div>
            </div>

            {/* Infos */}
            <div className="space-y-3 overflow-y-auto pr-1">
              <div className="pokemon-info-section">
                <h3 className="pokemon-info-label">Description</h3>
                <p className="pokemon-info-value text-justify text-sm leading-relaxed">
                  {isCaught ? currentPokemon.description : "????"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="pokemon-info-section">
                  <h3 className="pokemon-info-label">Taille</h3>
                  <p className="pokemon-info-value">{isCaught ? currentPokemon.height : "?????"}</p>
                </div>
                <div className="pokemon-info-section">
                  <h3 className="pokemon-info-label">Poids</h3>
                  <p className="pokemon-info-value">{isCaught ? currentPokemon.weight : "?????"}</p>
                </div>
              </div>

              <div className="pokemon-info-section">
                <h3 className="pokemon-info-label">Type(s)</h3>
                {isCaught ? (
                  <div className="flex gap-2 flex-wrap">
                    {currentPokemon.types.map((type) => {
                      const c = getTypeColors(type);
                      return (
                        <span
                          key={type}
                          className="px-3 py-1 rounded-lg font-bold uppercase text-sm shadow-md"
                          style={{ backgroundColor: c.background, color: c.text, border: `2px solid ${c.border}` }}
                        >
                          {type}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="pokemon-info-value">????</p>
                )}
              </div>

              <div className="pokemon-info-section">
                <h3 className="pokemon-info-label">Talents</h3>
                {isCaught ? (
                  <div className="space-y-1">
                    {regularAbilities.map((ability, i) => (
                      <div key={i} className="px-3 py-1.5 bg-muted/30 border border-primary/20 rounded-lg">
                        <span className="text-foreground font-medium text-sm">{ability}</span>
                      </div>
                    ))}
                    {currentPokemon.abilities.hidden && (
                      <div className="px-3 py-1.5 bg-accent/30 border-2 border-accent/60 rounded-lg">
                        <span className="text-accent-foreground font-medium italic text-sm">
                          {currentPokemon.abilities.hidden}
                        </span>
                        <span className="text-xs text-accent-foreground/70 ml-2">(Talent Caché)</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="pokemon-info-value">????</p>
                )}
              </div>

              {/* Bouton Capturé ! */}
              {!isCaught && (
                <button
                  onClick={handleCatch}
                  disabled={isPending}
                  className="modal-catch-btn w-full py-2.5 px-6 rounded-lg font-bold text-base transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? "Enregistrement..." : "⭐ Capturé !"}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
