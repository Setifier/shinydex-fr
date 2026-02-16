import type { Pokemon } from "@/types/pokemon";
import { getAllRegions, getAllForms } from "@/lib/pokemon-data";

const normalizeString = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function searchPokemon(query: string, limit: number = 8): Pokemon[] {
  if (!query.trim()) return [];

  const normalizedQuery = normalizeString(query);
  const regions = getAllRegions();
  const forms = getAllForms();

  const seen = new Set<string>();
  const results: Pokemon[] = [];

  const allCollections = [
    ...regions.map((r) => r.pokemons),
    ...forms.map((f) => f.pokemons),
  ];

  for (const pokemons of allCollections) {
    for (const pokemon of pokemons) {
      if (seen.has(pokemon.id)) continue;
      if (results.length >= limit) return results;

      const nameMatch = normalizeString(pokemon.name).includes(normalizedQuery);
      const baseNumber = pokemon.id.split("-")[0];
      const numberMatch = baseNumber.includes(query.trim());

      if (nameMatch || numberMatch) {
        seen.add(pokemon.id);
        results.push(pokemon);
      }
    }
  }

  return results;
}
