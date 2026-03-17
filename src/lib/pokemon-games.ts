export interface PokemonGame {
  id: string;
  name: string;
  year: number;
  series: GameSeries;
  color: string; // tailwind bg color
}

export type GameSeries =
  | "main"
  | "remake"
  | "legends"
  | "lets-go"
  | "mystery-dungeon"
  | "ranger"
  | "stadium"
  | "snap"
  | "mobile"
  | "other";

export const SERIES_LABELS: Record<GameSeries, string> = {
  main: "Série principale",
  remake: "Remakes",
  legends: "Légendes",
  "lets-go": "Let's Go",
  "mystery-dungeon": "Donjon Mystère",
  ranger: "Ranger",
  stadium: "Stadium / Arène",
  snap: "Snap",
  mobile: "Mobile",
  other: "Autres",
};

export const SERIES_COLORS: Record<GameSeries, string> = {
  main: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  remake: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  legends: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "lets-go": "bg-green-500/20 text-green-300 border-green-500/30",
  "mystery-dungeon": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  ranger: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  stadium: "bg-red-500/20 text-red-300 border-red-500/30",
  snap: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  mobile: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  other: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

export const POKEMON_GAMES: PokemonGame[] = [
  // Série principale
  { id: "rouge-bleu",        name: "Rouge & Bleu",               year: 1996, series: "main",           color: "" },
  { id: "jaune",             name: "Jaune",                      year: 1998, series: "main",           color: "" },
  { id: "or-argent",         name: "Or & Argent",                year: 1999, series: "main",           color: "" },
  { id: "cristal",           name: "Cristal",                    year: 2000, series: "main",           color: "" },
  { id: "rubis-saphir",      name: "Rubis & Saphir",             year: 2002, series: "main",           color: "" },
  { id: "emeraude",          name: "Émeraude",                   year: 2004, series: "main",           color: "" },
  { id: "diamant-perle",     name: "Diamant & Perle",            year: 2006, series: "main",           color: "" },
  { id: "platine",           name: "Platine",                    year: 2008, series: "main",           color: "" },
  { id: "noir-blanc",        name: "Noir & Blanc",               year: 2010, series: "main",           color: "" },
  { id: "noir2-blanc2",      name: "Noir 2 & Blanc 2",           year: 2012, series: "main",           color: "" },
  { id: "x-y",               name: "X & Y",                      year: 2013, series: "main",           color: "" },
  { id: "soleil-lune",       name: "Soleil & Lune",              year: 2016, series: "main",           color: "" },
  { id: "ultra-soleil-lune", name: "Ultra-Soleil & Ultra-Lune",  year: 2017, series: "main",           color: "" },
  { id: "epee-bouclier",     name: "Épée & Bouclier",            year: 2019, series: "main",           color: "" },
  { id: "ecarlate-violet",   name: "Écarlate & Violet",          year: 2022, series: "main",           color: "" },

  // Remakes
  { id: "rouge-feu-vert-feuille", name: "Rouge Feu & Vert Feuille",          year: 2004, series: "remake", color: "" },
  { id: "or-hg-argent-ss",        name: "Or HeartGold & Argent SoulSilver",  year: 2009, series: "remake", color: "" },
  { id: "rubis-omega-saphir-a",   name: "Rubis Oméga & Saphir Alpha",        year: 2014, series: "remake", color: "" },
  { id: "diamant-sp-perle-sp",    name: "Diamant Étincelant & Perle Scint.", year: 2021, series: "remake", color: "" },

  // Légendes
  { id: "legends-arceus",  name: "Légendes Pokémon : Arceus", year: 2022, series: "legends", color: "" },
  { id: "legends-za",      name: "Légendes Pokémon : Z-A",    year: 2025, series: "legends", color: "" },

  // Let's Go
  { id: "lets-go-pikachu", name: "Let's Go, Pikachu !",  year: 2018, series: "lets-go", color: "" },
  { id: "lets-go-evoli",   name: "Let's Go, Évoli !",    year: 2018, series: "lets-go", color: "" },

  // Donjon Mystère
  { id: "donjon-mystere-rouge-bleu",    name: "Donjon Mystère : Éq. de Secours R/B",   year: 2005, series: "mystery-dungeon", color: "" },
  { id: "donjon-mystere-temps-nuit",    name: "Donjon Mystère : Explorateurs T/O",      year: 2007, series: "mystery-dungeon", color: "" },
  { id: "donjon-mystere-ciel",          name: "Donjon Mystère : Explorateurs du Ciel",  year: 2009, series: "mystery-dungeon", color: "" },
  { id: "donjon-mystere-portes",        name: "Donjon Mystère : Portes de l'Infini",    year: 2012, series: "mystery-dungeon", color: "" },
  { id: "super-donjon-mystere",         name: "Super Donjon Mystère",                   year: 2015, series: "mystery-dungeon", color: "" },
  { id: "donjon-mystere-equipe-dx",     name: "Donjon Mystère : Éq. de Secours DX",    year: 2020, series: "mystery-dungeon", color: "" },

  // Ranger
  { id: "ranger",          name: "Pokémon Ranger",                    year: 2006, series: "ranger", color: "" },
  { id: "ranger-nuit",     name: "Ranger : Nuit des Ombres",          year: 2008, series: "ranger", color: "" },
  { id: "ranger-lumiere",  name: "Ranger : Lumière sur Almia",        year: 2010, series: "ranger", color: "" },

  // Stadium / Colosseum
  { id: "stadium",         name: "Pokémon Stadium",                   year: 1999, series: "stadium", color: "" },
  { id: "stadium-2",       name: "Pokémon Stadium 2",                 year: 2000, series: "stadium", color: "" },
  { id: "colosseum",       name: "Pokémon Colosseum",                 year: 2003, series: "stadium", color: "" },
  { id: "xd-tenebre",      name: "XD : Le Souffle des Ténèbres",     year: 2005, series: "stadium", color: "" },
  { id: "battle-revolution", name: "Pokémon Battle Revolution",       year: 2006, series: "stadium", color: "" },

  // Snap
  { id: "snap-64",         name: "Pokémon Snap",                      year: 1999, series: "snap", color: "" },
  { id: "new-snap",        name: "New Pokémon Snap",                  year: 2021, series: "snap", color: "" },

  // Mobile
  { id: "pokemon-go",      name: "Pokémon GO",                        year: 2016, series: "mobile", color: "" },
  { id: "masters-ex",      name: "Pokémon Masters EX",                year: 2019, series: "mobile", color: "" },
  { id: "cafe-remix",      name: "Pokémon Café ReMix",                year: 2020, series: "mobile", color: "" },
  { id: "unite",           name: "Pokémon UNITE",                     year: 2021, series: "mobile", color: "" },
  { id: "quest",           name: "Pokémon Quest",                     year: 2018, series: "mobile", color: "" },
  { id: "sleep",           name: "Pokémon Sleep",                     year: 2023, series: "mobile", color: "" },

  // Autres
  { id: "tcg-gb",          name: "Pokémon TCG (Game Boy)",            year: 1998, series: "other", color: "" },
  { id: "pinball",         name: "Pokémon Pinball",                   year: 1999, series: "other", color: "" },
  { id: "channel",         name: "Pokémon Channel",                   year: 2003, series: "other", color: "" },
  { id: "trozei",          name: "Pokémon Trozei !",                  year: 2005, series: "other", color: "" },
  { id: "rumble",          name: "Pokémon Rumble",                    year: 2009, series: "other", color: "" },
  { id: "pokepark",        name: "PokéPark",                          year: 2009, series: "other", color: "" },
  { id: "scramble",        name: "Pokémon Scramble U",                year: 2013, series: "other", color: "" },
  { id: "detective-pikachu", name: "Détective Pikachu",               year: 2016, series: "other", color: "" },
];
