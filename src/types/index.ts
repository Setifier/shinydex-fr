/**
 * Point d'entrée principal pour tous les types du projet
 * Permet d'importer facilement les types depuis n'importe où :
 * import { Pokemon, PokemonType, PokemonFormType } from "@/types"
 */

// Export des types élémentaires
export type { PokemonType } from "./pokemon-types";
export {
  POKEMON_TYPES_FR_TO_EN,
  POKEMON_TYPES_EN_TO_FR,
  ALL_POKEMON_TYPES,
} from "./pokemon-types";

// Export des talents
export type { GenerationCode, PokemonAbility, PokemonAbilities } from "./talents";

// Export des formes alternatives
export type { PokemonFormType, PokemonFormCategory } from "./forms";
export {
  FORM_TYPE_TO_CATEGORY,
  ALL_FORM_TYPES,
  ALL_FORM_CATEGORIES,
} from "./forms";

// Export des types Pokémon principaux
export type {
  Pokemon,
  PokemonRegion,
  PokemonFormCollection,
  RegionName,
} from "./pokemon";
export { REGION_NUMBERS, ALL_REGIONS } from "./pokemon";
