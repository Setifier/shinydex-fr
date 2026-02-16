import type { Pokemon, PokemonRegion, PokemonFormCollection } from "@/types/pokemon";
import type { PokemonFormCategory } from "@/types/forms";

// Import des données de régions
import kanto from "@/data/regions/1-kanto.json";
import johto from "@/data/regions/2-johto.json";
import hoenn from "@/data/regions/3-hoenn.json";
import sinnoh from "@/data/regions/4-sinnoh.json";
import unys from "@/data/regions/5-unys.json";
import kalos from "@/data/regions/6-kalos.json";
import alola from "@/data/regions/7-alola.json";
import inconnue from "@/data/regions/7b-inconnue.json";
import galar from "@/data/regions/8-galar.json";
import hisui from "@/data/regions/8b-hisui.json";
import paldea from "@/data/regions/9-paldea.json";

// Import des données de formes
import formMega from "@/data/forms/form-mega.json";
import formGiga from "@/data/forms/form-giga.json";
import formAlola from "@/data/forms/form-alola.json";
import formGalar from "@/data/forms/form-galar.json";
import formHisui from "@/data/forms/form-hisui.json";
import formPaldea from "@/data/forms/form-paldea.json";
import formOrigin from "@/data/forms/form-origin.json";
import formPrimo from "@/data/forms/form-primo.json";
import formInfini from "@/data/forms/form-infini.json";

/**
 * Récupère toutes les régions avec leurs Pokémon
 */
export function getAllRegions(): PokemonRegion[] {
  return [
    kanto as PokemonRegion,
    johto as PokemonRegion,
    hoenn as PokemonRegion,
    sinnoh as PokemonRegion,
    unys as PokemonRegion,
    kalos as PokemonRegion,
    alola as PokemonRegion,
    inconnue as PokemonRegion,
    galar as PokemonRegion,
    hisui as PokemonRegion,
    paldea as PokemonRegion,
  ];
}

/**
 * Récupère toutes les formes alternatives avec leurs Pokémon
 */
export function getAllForms(): PokemonFormCollection[] {
  return [
    formMega as PokemonFormCollection,
    formGiga as PokemonFormCollection,
    formAlola as PokemonFormCollection,
    formGalar as PokemonFormCollection,
    formHisui as PokemonFormCollection,
    formPaldea as PokemonFormCollection,
    formOrigin as PokemonFormCollection,
    formPrimo as PokemonFormCollection,
    formInfini as PokemonFormCollection,
  ];
}

/**
 * Récupère uniquement les formes régionales (Alola, Galar, Hisui, Paldea)
 */
export function getRegionalForms(): PokemonFormCollection[] {
  return [
    formAlola as PokemonFormCollection,
    formGalar as PokemonFormCollection,
    formHisui as PokemonFormCollection,
    formPaldea as PokemonFormCollection,
  ];
}

/**
 * Récupère une région spécifique par son nom
 */
export function getRegionByName(regionName: string): PokemonRegion | undefined {
  const regions = getAllRegions();
  return regions.find((r) => r.region === regionName);
}

/**
 * Récupère une forme spécifique par son nom
 */
export function getFormByName(formName: PokemonFormCategory): PokemonFormCollection | undefined {
  const forms = getAllForms();
  return forms.find((f) => f.form === formName);
}

/**
 * Récupère un Pokémon par son ID
 */
export function getPokemonById(id: string): Pokemon | undefined {
  const regions = getAllRegions();
  const forms = getAllForms();

  // Chercher dans les régions
  for (const region of regions) {
    const pokemon = region.pokemons.find((p) => p.id === id);
    if (pokemon) return pokemon;
  }

  // Chercher dans les formes
  for (const form of forms) {
    const pokemon = form.pokemons.find((p) => p.id === id);
    if (pokemon) return pokemon;
  }

  return undefined;
}

/**
 * Convertit le chemin image du JSON vers le path Next.js
 * "public/pokemon/shiny/1 - KANTO/0001.png" => "/pokemon/shiny/1 - KANTO/0001.png"
 */
export function getImagePath(imagePath: string): string {
  return imagePath.replace(/^public/, "");
}
