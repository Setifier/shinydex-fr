/**
 * Codes de génération Pokémon
 */
export type GenerationCode =
  | "RS" // Rubis/Saphir (Gen 3)
  | "DP" // Diamant/Perle (Gen 4)
  | "NB" // Noir/Blanc (Gen 5)
  | "XY" // X/Y (Gen 6)
  | "SL" // Soleil/Lune (Gen 7)
  | "EB"; // Épée/Bouclier (Gen 8)

/**
 * Interface pour un talent/capacité de Pokémon
 */
export interface PokemonAbility {
  /**
   * Code de la génération où le talent a été introduit
   */
  gen_code: GenerationCode;

  /**
   * Index numérique du talent
   */
  index: string;

  /**
   * Nom du talent en français
   */
  name_fr: string;

  /**
   * Nom du talent en anglais
   */
  name_en: string;

  /**
   * Description du talent en français
   */
  description: string;
}

/**
 * Structure des talents d'un Pokémon individuel
 */
export interface PokemonAbilities {
  /**
   * Talent(s) régulier(s)
   * Peut être un tableau de talents ou un seul talent
   */
  regular: string[] | string;

  /**
   * Talent caché (DW/HA)
   * Peut être null si le Pokémon n'a pas de talent caché
   */
  hidden: string | null;
}
