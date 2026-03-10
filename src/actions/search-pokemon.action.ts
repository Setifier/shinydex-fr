"use server";

import { getAllRegions, getAllForms, getImagePath } from "@/lib/pokemon-data";

export interface PokemonSearchResult {
  id: string;
  name: string;
  imagePath: string;
  types: string[];
}

const POPULAR_IDS = ["0025", "0006", "0150", "0133", "0143"];

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function searchPokemonAction(query: string): Promise<PokemonSearchResult[]> {
  const allPokemon = [
    ...getAllRegions().flatMap(r => r.pokemons),
    ...getAllForms().flatMap(f => f.pokemons),
  ];

  const toResult = (p: (typeof allPokemon)[number]): PokemonSearchResult => ({
    id:        p.id,
    name:      p.name,
    imagePath: getImagePath(p.image),
    types:     p.types as string[],
  });

  if (!query.trim()) {
    return POPULAR_IDS
      .map(id => allPokemon.find(p => p.id === id))
      .filter((p): p is (typeof allPokemon)[number] => !!p)
      .map(toResult);
  }

  const q = normalize(query);
  return allPokemon
    .filter(p =>
      normalize(p.name).includes(q) ||
      p.id.split("-")[0].includes(query.trim())
    )
    .slice(0, 8)
    .map(toResult);
}
