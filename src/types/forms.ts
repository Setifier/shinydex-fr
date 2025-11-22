/**
 * Types de formes alternatives des Pokémon
 */
export type PokemonFormType =
  | "mega"
  | "mega-x"
  | "mega-y"
  | "giga"
  | "alola"
  | "galar"
  | "hisui"
  | "paldea"
  | "origin"
  | "primo"
  | "infini";

/**
 * Catégories de formes alternatives
 */
export type PokemonFormCategory =
  | "MÉGA-ÉVOLUTIONS"
  | "GIGAMAX"
  | "ALOLA"
  | "GALAR"
  | "HISUI"
  | "PALDEA"
  | "FORME ORIGINELLE"
  | "PRIMO-RÉSURGENCE"
  | "DYNAMAX INFINI";

/**
 * Mapping des formes vers leurs catégories
 */
export const FORM_TYPE_TO_CATEGORY: Record<PokemonFormType, PokemonFormCategory> = {
  mega: "MÉGA-ÉVOLUTIONS",
  "mega-x": "MÉGA-ÉVOLUTIONS",
  "mega-y": "MÉGA-ÉVOLUTIONS",
  giga: "GIGAMAX",
  alola: "ALOLA",
  galar: "GALAR",
  hisui: "HISUI",
  paldea: "PALDEA",
  origin: "FORME ORIGINELLE",
  primo: "PRIMO-RÉSURGENCE",
  infini: "DYNAMAX INFINI",
};

/**
 * Liste de toutes les formes alternatives
 */
export const ALL_FORM_TYPES: PokemonFormType[] = [
  "mega",
  "mega-x",
  "mega-y",
  "giga",
  "alola",
  "galar",
  "hisui",
  "paldea",
  "origin",
  "primo",
  "infini",
];

/**
 * Liste de toutes les catégories de formes
 */
export const ALL_FORM_CATEGORIES: PokemonFormCategory[] = [
  "MÉGA-ÉVOLUTIONS",
  "GIGAMAX",
  "ALOLA",
  "GALAR",
  "HISUI",
  "PALDEA",
  "FORME ORIGINELLE",
  "PRIMO-RÉSURGENCE",
  "DYNAMAX INFINI",
];
