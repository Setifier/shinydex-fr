import type { PokemonType } from "./pokemon-types";
import type { PokemonAbilities } from "./talents";
import type { PokemonFormType } from "./forms";

/**
 * Interface principale pour un Pokémon
 */
export interface Pokemon {
  /**
   * Identifiant unique du Pokémon
   * Format: "0001" pour les Pokémon normaux
   * Format: "0003-mega", "0006-mega-x" pour les formes alternatives
   */
  id: string;

  /**
   * Nom du Pokémon en français
   */
  name: string;

  /**
   * Types du Pokémon (1 ou 2 types)
   */
  types: [PokemonType] | [PokemonType, PokemonType];

  /**
   * Chemin vers l'image du Pokémon chromatique
   */
  image: string;

  /**
   * Description du Pokémon
   */
  description: string;

  /**
   * Talents/Capacités du Pokémon
   */
  abilities: PokemonAbilities;

  /**
   * Poids du Pokémon
   * Format: "6.9 kg" ou "???,? kg" pour Gigamax
   */
  weight: string;

  /**
   * Taille du Pokémon
   * Format: "0.7 m" ou "Plus de 24.0 m" pour Gigamax
   */
  height: string;

  /**
   * Formes alternatives disponibles pour ce Pokémon
   * Optionnel - présent uniquement si le Pokémon a des formes alternatives
   */
  forms?: PokemonFormType[];
}

/**
 * Interface pour une collection de Pokémon par région
 */
export interface PokemonRegion {
  /**
   * Nom de la région
   * Exemples: "1 - KANTO", "2 - JOHTO", etc.
   */
  region: string;

  /**
   * Liste des Pokémon de cette région
   */
  pokemons: Pokemon[];
}

/**
 * Interface pour une collection de Pokémon par forme alternative
 */
export interface PokemonFormCollection {
  /**
   * Nom de la forme
   * Exemples: "MÉGA-ÉVOLUTIONS", "GIGAMAX", "ALOLA", etc.
   */
  form: string;

  /**
   * Liste des Pokémon de cette forme
   */
  pokemons: Pokemon[];
}

/**
 * Type pour les régions Pokémon
 */
export type RegionName =
  | "1 - KANTO"
  | "2 - JOHTO"
  | "3 - HOENN"
  | "4 - SINNOH"
  | "5 - UNYS"
  | "6 - KALOS"
  | "7 - ALOLA"
  | "7B - INCONNUE"
  | "8 - GALAR"
  | "8B - HISUI"
  | "9 - PALDEA";

/**
 * Mapping des numéros de région vers leurs noms
 */
export const REGION_NUMBERS: Record<string, RegionName> = {
  "1": "1 - KANTO",
  "2": "2 - JOHTO",
  "3": "3 - HOENN",
  "4": "4 - SINNOH",
  "5": "5 - UNYS",
  "6": "6 - KALOS",
  "7": "7 - ALOLA",
  "7b": "7B - INCONNUE",
  "8": "8 - GALAR",
  "8b": "8B - HISUI",
  "9": "9 - PALDEA",
};

/**
 * Liste de toutes les régions
 */
export const ALL_REGIONS: RegionName[] = [
  "1 - KANTO",
  "2 - JOHTO",
  "3 - HOENN",
  "4 - SINNOH",
  "5 - UNYS",
  "6 - KALOS",
  "7 - ALOLA",
  "7B - INCONNUE",
  "8 - GALAR",
  "8B - HISUI",
  "9 - PALDEA",
];
