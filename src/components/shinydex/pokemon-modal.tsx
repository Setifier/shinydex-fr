"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Pokemon } from "@/types/pokemon";
import type { PokemonFormType } from "@/types/forms";
import { getPokemonById, getImagePath } from "@/lib/pokemon-data";
import { getTypeColors } from "@/types/pokemon-type-colors";
import { PokemonNavigationButton } from "@/components/shinydex/pokemon-navigation-button";

interface PokemonModalProps {
  isOpen: boolean;
  pokemon: Pokemon | null;
  onClose: () => void;
  allPokemonList: Pokemon[];
  onNavigate: (pokemon: Pokemon) => void;
}

export function PokemonModal({ isOpen, pokemon, onClose, allPokemonList, onNavigate }: PokemonModalProps) {
  const [selectedForm, setSelectedForm] = useState<PokemonFormType | null>(
    null
  );
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(pokemon);
  const [originalPokemon, setOriginalPokemon] = useState<Pokemon | null>(pokemon);

  // Fonction pour obtenir le label de forme avec le nom du Pokémon
  const getFormLabel = (form: PokemonFormType | null): string => {
    if (!pokemon) return "";

    const baseName = pokemon.name;

    if (!form) return baseName;

    // Mapping des formes vers leurs préfixes
    const formPrefixes: Record<PokemonFormType, string> = {
      mega: "Méga-",
      "mega-x": "Méga-",
      "mega-y": "Méga-",
      giga: "Gigamax ",
      alola: "Alola ",
      galar: "Galar ",
      hisui: "Hisui ",
      paldea: "Paldea ",
      origin: "Forme Originelle ",
      primo: "Primo-",
      infini: "Dynamax Infini ",
    };

    const prefix = formPrefixes[form] || "";

    // Pour mega-x et mega-y, on ajoute le suffixe
    if (form === "mega-x") return `${prefix}${baseName} X`;
    if (form === "mega-y") return `${prefix}${baseName} Y`;

    return `${prefix}${baseName}`;
  };

  // Mettre à jour le Pokémon affiché quand on change de forme
  useEffect(() => {
    if (!pokemon) {
      setCurrentPokemon(null);
      return;
    }

    if (!selectedForm) {
      setCurrentPokemon(pokemon);
      return;
    }

    // Construire l'ID de la forme (ex: "0006" + "-mega-x" = "0006-mega-x")
    const baseId = pokemon.id.split("-")[0];
    const formId = `${baseId}-${selectedForm}`;
    const formPokemon = getPokemonById(formId);

    if (formPokemon) {
      setCurrentPokemon(formPokemon);
    }
  }, [pokemon, selectedForm]);

  // Réinitialiser la forme sélectionnée quand on change de Pokémon
  // Si le Pokémon cliqué a déjà une forme, on la sélectionne par défaut
  useEffect(() => {
    if (!pokemon) {
      setSelectedForm(null);
      setOriginalPokemon(null);
      return;
    }

    // Garder une référence au Pokémon d'origine (celui cliqué)
    setOriginalPokemon(pokemon);

    // Vérifier si le Pokémon cliqué a une forme alternative dans son ID
    const idParts = pokemon.id.split("-");
    if (idParts.length > 1) {
      // Le Pokémon a une forme (ex: "0006-mega-x")
      const formPart = idParts.slice(1).join("-") as PokemonFormType;
      setSelectedForm(formPart);
    } else {
      // Pas de forme, réinitialiser
      setSelectedForm(null);
    }
  }, [pokemon]);

  // Trouver le Pokémon de base (sans forme) pour la navigation
  const getBasePokemon = (poke: Pokemon): Pokemon => {
    const baseId = poke.id.split("-")[0];
    return getPokemonById(baseId) || poke;
  };

  // Navigation
  const getCurrentIndex = (): number => {
    if (!originalPokemon) return -1;
    // Toujours naviguer basé sur le Pokémon d'origine (sans forme)
    const basePokemon = getBasePokemon(originalPokemon);
    return allPokemonList.findIndex((p) => {
      const pBase = getBasePokemon(p);
      return pBase.id === basePokemon.id;
    });
  };

  const getPreviousPokemon = (): Pokemon | null => {
    const currentIndex = getCurrentIndex();
    if (currentIndex <= 0) return null;
    return allPokemonList[currentIndex - 1];
  };

  const getNextPokemon = (): Pokemon | null => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < 0 || currentIndex >= allPokemonList.length - 1) return null;
    return allPokemonList[currentIndex + 1];
  };

  const handlePrevious = () => {
    const prev = getPreviousPokemon();
    if (prev) {
      onNavigate(prev);
    }
  };

  const handleNext = () => {
    const next = getNextPokemon();
    if (next) {
      onNavigate(next);
    }
  };

  const previousPokemon = getPreviousPokemon();
  const nextPokemon = getNextPokemon();

  // Fermer la modale avec Échap
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

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

  const imagePath = getImagePath(currentPokemon.image);
  const baseNumber = currentPokemon.id.split("-")[0];

  // Gérer les talents (regular peut être string ou string[])
  const regularAbilities = Array.isArray(currentPokemon.abilities.regular)
    ? currentPokemon.abilities.regular
    : [currentPokemon.abilities.regular];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl w-full mx-4 min-h-[600px] max-h-[90vh] overflow-y-auto pokedex-screen"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-full transition-all duration-200 border-2 border-destructive/40 hover:border-destructive/60 shadow-lg"
          aria-label="Fermer"
        >
          <span className="text-2xl font-bold leading-none">✕</span>
        </button>

        <div className="pokedex-content p-8 pr-16">
          {/* Navigation entre Pokémon */}
          <div className="flex justify-between items-center mb-6 gap-4">
            <div className="flex-1 flex justify-start">
              {previousPokemon && (
                <PokemonNavigationButton
                  pokemon={previousPokemon}
                  direction="previous"
                  onClick={handlePrevious}
                />
              )}
            </div>

            {/* En-tête avec numéro et nom */}
            <div className="text-center flex-1">
              <div className="inline-block bg-primary/20 border-2 border-primary/40 rounded-lg px-4 py-2 mb-3">
                <span className="text-primary text-2xl font-bold">
                  #{baseNumber}
                </span>
              </div>
              <h2 className="text-4xl font-heading text-primary mb-2">
                {currentPokemon.name}
              </h2>
            </div>

            <div className="flex-1 flex justify-end">
              {nextPokemon && (
                <PokemonNavigationButton
                  pokemon={nextPokemon}
                  direction="next"
                  onClick={handleNext}
                />
              )}
            </div>
          </div>

          {/* Sélecteur de formes si disponible */}
          <div className="mb-6 flex justify-center min-h-[60px]">
            {pokemon?.forms && pokemon.forms.length > 0 && (
              <div className="relative inline-block">
                <select
                  value={selectedForm || ""}
                  onChange={(e) =>
                    setSelectedForm((e.target.value as PokemonFormType) || null)
                  }
                  className="pokemon-form-select appearance-none bg-gradient-to-b from-slate-700 to-slate-800 text-foreground font-semibold px-6 py-3 pr-12 rounded-lg border-2 border-primary/40 hover:border-primary/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200 cursor-pointer shadow-lg min-w-[280px]"
                >
                  <option value="">{getFormLabel(null)}</option>
                  {pokemon.forms.map((form) => (
                    <option key={form} value={form}>
                      {getFormLabel(form)}
                    </option>
                  ))}
                </select>
                {/* Flèche personnalisée */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-xl pokemon-card-bg rounded-lg border-2 pokemon-card-border p-8 shadow-xl">
                <Image
                  src={imagePath}
                  alt={currentPokemon.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Informations */}
            <div className="space-y-6">
              {/* Description */}
              <div className="pokemon-info-section">
                <h3 className="pokemon-info-label">Description</h3>
                <p className="pokemon-info-value text-justify">
                  {currentPokemon.description}
                </p>
              </div>

              {/* Caractéristiques physiques */}
              <div className="grid grid-cols-2 gap-4">
                <div className="pokemon-info-section">
                  <h3 className="pokemon-info-label">Taille</h3>
                  <p className="pokemon-info-value">{currentPokemon.height}</p>
                </div>
                <div className="pokemon-info-section">
                  <h3 className="pokemon-info-label">Poids</h3>
                  <p className="pokemon-info-value">{currentPokemon.weight}</p>
                </div>
              </div>

              {/* Types */}
              <div className="pokemon-info-section">
                <h3 className="pokemon-info-label">Type(s)</h3>
                <div className="flex gap-2">
                  {currentPokemon.types.map((type) => {
                    const typeColors = getTypeColors(type);
                    return (
                      <span
                        key={type}
                        className="px-4 py-2 rounded-lg font-bold uppercase text-sm shadow-md"
                        style={{
                          backgroundColor: typeColors.background,
                          color: typeColors.text,
                          border: `2px solid ${typeColors.border}`,
                        }}
                      >
                        {type}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Talents */}
              <div className="pokemon-info-section">
                <h3 className="pokemon-info-label">Talents</h3>
                <div className="space-y-2">
                  {regularAbilities.map((ability, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-muted/30 border border-primary/20 rounded-lg"
                    >
                      <span className="text-foreground font-medium">
                        {ability}
                      </span>
                    </div>
                  ))}
                  {currentPokemon.abilities.hidden && (
                    <div className="px-4 py-2 bg-accent/30 border-2 border-accent/60 rounded-lg">
                      <span className="text-accent-foreground font-medium italic">
                        {currentPokemon.abilities.hidden}
                      </span>
                      <span className="text-xs text-accent-foreground/70 ml-2">
                        (Talent Caché)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
