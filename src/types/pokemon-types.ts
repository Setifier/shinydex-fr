/**
 * Types élémentaires des Pokémon
 * Liste exhaustive des 18 types Pokémon en français
 */
export type PokemonType =
  | "Acier"
  | "Combat"
  | "Dragon"
  | "Eau"
  | "Électrik"
  | "Fée"
  | "Feu"
  | "Glace"
  | "Insecte"
  | "Normal"
  | "Plante"
  | "Poison"
  | "Psy"
  | "Roche"
  | "Sol"
  | "Spectre"
  | "Ténèbres"
  | "Vol";

/**
 * Mapping des types Pokémon FR vers EN
 */
export const POKEMON_TYPES_FR_TO_EN: Record<PokemonType, string> = {
  Acier: "Steel",
  Combat: "Fighting",
  Dragon: "Dragon",
  Eau: "Water",
  Électrik: "Electric",
  Fée: "Fairy",
  Feu: "Fire",
  Glace: "Ice",
  Insecte: "Bug",
  Normal: "Normal",
  Plante: "Grass",
  Poison: "Poison",
  Psy: "Psychic",
  Roche: "Rock",
  Sol: "Ground",
  Spectre: "Ghost",
  Ténèbres: "Dark",
  Vol: "Flying",
};

/**
 * Mapping des types Pokémon EN vers FR
 */
export const POKEMON_TYPES_EN_TO_FR: Record<string, PokemonType> = {
  Steel: "Acier",
  Fighting: "Combat",
  Dragon: "Dragon",
  Water: "Eau",
  Electric: "Électrik",
  Fairy: "Fée",
  Fire: "Feu",
  Ice: "Glace",
  Bug: "Insecte",
  Normal: "Normal",
  Grass: "Plante",
  Poison: "Poison",
  Psychic: "Psy",
  Rock: "Roche",
  Ground: "Sol",
  Ghost: "Spectre",
  Dark: "Ténèbres",
  Flying: "Vol",
};

/**
 * Liste de tous les types Pokémon
 */
export const ALL_POKEMON_TYPES: PokemonType[] = [
  "Acier",
  "Combat",
  "Dragon",
  "Eau",
  "Électrik",
  "Fée",
  "Feu",
  "Glace",
  "Insecte",
  "Normal",
  "Plante",
  "Poison",
  "Psy",
  "Roche",
  "Sol",
  "Spectre",
  "Ténèbres",
  "Vol",
];
