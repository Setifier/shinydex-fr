// Organisation : Neutrals → Basiques (vives) → Claires (pastels) → Foncées
// Ordre de teinte commun aux 3 groupes colorés :
//   rouge → orange → ambre → jaune → lime → vert → émeraude → sarcelle → cyan → ciel → bleu → indigo → violet → fuchsia → rose

export const AVATAR_BACKGROUNDS = [
  // — Claires — pastels, même ordre de teinte —
  { key: "red-light", hex: "#fecdd3", label: "Rose poudré" },
  { key: "orange-light", hex: "#fed7aa", label: "Pêche" },
  { key: "amber-light", hex: "#fde68a", label: "Miel" },
  { key: "yellow-light", hex: "#fef08a", label: "Jaune pâle" },
  { key: "lime-light", hex: "#d9f99d", label: "Citron pâle" },
  { key: "green-light", hex: "#bbf7d0", label: "Menthe" },
  { key: "emerald-light", hex: "#a7f3d0", label: "Émeraude pâle" },
  { key: "teal-light", hex: "#99f6e4", label: "Turquoise" },
  { key: "cyan-light", hex: "#a5f3fc", label: "Cyan pâle" },
  { key: "sky-light", hex: "#bae6fd", label: "Ciel pâle" },
  { key: "blue-light", hex: "#bfdbfe", label: "Bleu pâle" },
  { key: "indigo-light", hex: "#c7d2fe", label: "Indigo pâle" },
  { key: "violet-light", hex: "#ddd6fe", label: "Lavande" },
  { key: "fuchsia-light", hex: "#f5d0fe", label: "Lilas" },
  { key: "pink-light", hex: "#fce7f3", label: "Rose pâle" },

  // — Basiques — vives et saturées —
  { key: "red-flash", hex: "#ef4444", label: "Rouge" },
  { key: "orange-flash", hex: "#f97316", label: "Orange" },
  { key: "amber-flash", hex: "#f59e0b", label: "Ambre" },
  { key: "yellow-flash", hex: "#eab308", label: "Or" },
  { key: "lime-flash", hex: "#84cc16", label: "Lime" },
  { key: "green-flash", hex: "#22c55e", label: "Vert" },
  { key: "emerald-flash", hex: "#10b981", label: "Émeraude" },
  { key: "teal-flash", hex: "#14b8a6", label: "Sarcelle" },
  { key: "cyan-flash", hex: "#06b6d4", label: "Cyan" },
  { key: "sky-flash", hex: "#0ea5e9", label: "Ciel" },
  { key: "blue-flash", hex: "#3b82f6", label: "Bleu" },
  { key: "indigo-flash", hex: "#6366f1", label: "Indigo" },
  { key: "violet-flash", hex: "#8b5cf6", label: "Violet" },
  { key: "fuchsia-flash", hex: "#d946ef", label: "Fuchsia" },
  { key: "pink-flash", hex: "#ec4899", label: "Rose" },

  // — Foncées — même ordre de teinte —
  { key: "red-dark", hex: "#7f1d1d", label: "Bordeaux" },
  { key: "orange-dark", hex: "#7c2d12", label: "Brique" },
  { key: "amber-dark", hex: "#78350f", label: "Caramel" },
  { key: "yellow-dark", hex: "#713f12", label: "Moutarde" },
  { key: "lime-dark", hex: "#365314", label: "Olive" },
  { key: "green-dark", hex: "#14532d", label: "Forêt" },
  { key: "emerald-dark", hex: "#064e3b", label: "Émeraude foncé" },
  { key: "teal-dark", hex: "#134e4a", label: "Jade" },
  { key: "cyan-dark", hex: "#164e63", label: "Cyan foncé" },
  { key: "sky-dark", hex: "#0c4a6e", label: "Ciel foncé" },
  { key: "blue-dark", hex: "#1e3a8a", label: "Marine" },
  { key: "indigo-dark", hex: "#312e81", label: "Indigo foncé" },
  { key: "violet-dark", hex: "#4c1d95", label: "Prune" },
  { key: "fuchsia-dark", hex: "#701a75", label: "Fuchsia foncé" },
  { key: "pink-dark", hex: "#881337", label: "Bordeaux rose" },

  // — Neutrals — du blanc pur au noir —
  { key: "white-pure", hex: "#ffffff", label: "Blanc" },
  { key: "gray-light", hex: "#d4d4d4", label: "Gris clair" },
  { key: "gray", hex: "#7a7a7a", label: "Gris" },
  { key: "dark-red", hex: "#573333", label: "Brique sombre" },
  { key: "dark-olive", hex: "#5e5223", label: "Sépia" },
  { key: "dark-khaki", hex: "#575033", label: "Kaki" },
  { key: "dark-moss", hex: "#465733", label: "Mousse" },
  { key: "dark-forest", hex: "#335744", label: "Forêt sombre" },
  { key: "dark-slate", hex: "#334d57", label: "Ardoise" },
  { key: "deep-teal", hex: "#1c323d", label: "Abysse" },
  { key: "dark-indigo", hex: "#363357", label: "Minuit" },
  { key: "dark-purple", hex: "#473357", label: "Prune sombre" },
  { key: "dark-fuchsia", hex: "#573356", label: "Aubergine" },
  { key: "mure", hex: "#5e2351", label: "Mûre" },
  { key: "black", hex: "#000000", label: "Noir" },
] as const;

export type AvatarBackgroundKey = (typeof AVATAR_BACKGROUNDS)[number]["key"];

export const DEFAULT_AVATAR_BACKGROUND = "#1e293b";
