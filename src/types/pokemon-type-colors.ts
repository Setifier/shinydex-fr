import type { PokemonType } from "./pokemon-types";

/**
 * Couleurs associées à chaque type de Pokémon
 * Format: couleur de fond / couleur de texte
 */
export interface TypeColorScheme {
  background: string;
  text: string;
  border: string;
}

/**
 * Mapping des types vers leurs schémas de couleurs
 */
export const POKEMON_TYPE_COLORS: Record<PokemonType, TypeColorScheme> = {
  Normal: {
    background: "#a4acaf",
    text: "#000000",
    border: "#6d7375",
  },
  Feu: {
    background: "#fc7c24",
    text: "#FFFFFF",
    border: "#a45117",
  },
  Eau: {
    background: "#4592c4",
    text: "#FFFFFF",
    border: "#2d6082",
  },
  Plante: {
    background: "#9bcc50",
    text: "#000000",
    border: "#678735",
  },
  Électrik: {
    background: "#eed434",
    text: "#000000",
    border: "#9d8d23",
  },
  Glace: {
    background: "#50c4e6",
    text: "#000000",
    border: "#358299",
  },
  Combat: {
    background: "#d56723",
    text: "#FFFFFF",
    border: "#8e4517",
  },
  Poison: {
    background: "#b97ec8",
    text: "#FFFFFF",
    border: "#7b5485",
  },
  Sol: {
    background: "#ddbb55",
    text: "#000000",
    border: "#937c38",
  },
  Vol: {
    background: "#81b9ef",
    text: "#000000",
    border: "#567b9f",
  },
  Psy: {
    background: "#f267b9",
    text: "#FFFFFF",
    border: "#a1457b",
  },
  Insecte: {
    background: "#82a236",
    text: "#000000",
    border: "#566c24",
  },
  Roche: {
    background: "#aea881",
    text: "#000000",
    border: "#747056",
  },
  Spectre: {
    background: "#7a63a3",
    text: "#FFFFFF",
    border: "#51426c",
  },
  Dragon: {
    background: "#5060e1",
    text: "#FFFFFF",
    border: "#354096",
  },
  Ténèbres: {
    background: "#50413f",
    text: "#FFFFFF",
    border: "#352b2a",
  },
  Acier: {
    background: "#9fb6b8",
    text: "#000000",
    border: "#6a797a",
  },
  Fée: {
    background: "#fdb9e9",
    text: "#000000",
    border: "#a97b9b",
  },
};

/**
 * Obtenir le schéma de couleurs pour un type donné
 */
export function getTypeColors(type: PokemonType): TypeColorScheme {
  return POKEMON_TYPE_COLORS[type];
}
