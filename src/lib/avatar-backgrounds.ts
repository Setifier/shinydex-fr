// Organisation : Neutrals → Flash (vives, arc-en-ciel) → Claires (pastels) → Foncées
// Chaque groupe suit le même ordre de teinte : rouge → orange → jaune → vert → cyan → bleu → violet → rose
export const AVATAR_BACKGROUNDS = [

  // — Neutrals —
  { key: "white",         hex: "#f8fafc", label: "Blanc"         },
  { key: "pearl",         hex: "#e2e8f0", label: "Gris perle"    },
  { key: "gray",          hex: "#64748b", label: "Gris"          },
  { key: "charcoal",      hex: "#1e293b", label: "Anthracite"    },
  { key: "night",         hex: "#020617", label: "Nuit"          },

  // — Flash — vives et saturées, arc-en-ciel —
  { key: "red-flash",     hex: "#ef4444", label: "Rouge"         },
  { key: "orange-flash",  hex: "#f97316", label: "Orange"        },
  { key: "amber-flash",   hex: "#f59e0b", label: "Ambre"         },
  { key: "yellow-flash",  hex: "#eab308", label: "Or"            },
  { key: "lime-flash",    hex: "#84cc16", label: "Lime"          },
  { key: "green-flash",   hex: "#22c55e", label: "Vert"          },
  { key: "teal-flash",    hex: "#14b8a6", label: "Sarcelle"      },
  { key: "sky-flash",     hex: "#0ea5e9", label: "Ciel"          },
  { key: "blue-flash",    hex: "#3b82f6", label: "Bleu"          },
  { key: "indigo-flash",  hex: "#6366f1", label: "Indigo"        },
  { key: "violet-flash",  hex: "#8b5cf6", label: "Violet"        },
  { key: "fuchsia-flash", hex: "#d946ef", label: "Fuchsia"       },
  { key: "pink-flash",    hex: "#ec4899", label: "Rose"          },

  // — Claires — pastels, même ordre de teinte —
  { key: "red-light",     hex: "#fecdd3", label: "Rose poudré"   },
  { key: "orange-light",  hex: "#fed7aa", label: "Pêche"         },
  { key: "amber-light",   hex: "#fde68a", label: "Miel"          },
  { key: "yellow-light",  hex: "#fef08a", label: "Jaune pâle"    },
  { key: "lime-light",    hex: "#d9f99d", label: "Citron pâle"   },
  { key: "green-light",   hex: "#bbf7d0", label: "Vert menthe"   },
  { key: "teal-light",    hex: "#99f6e4", label: "Turquoise"     },
  { key: "sky-light",     hex: "#bae6fd", label: "Ciel pâle"     },
  { key: "blue-light",    hex: "#bfdbfe", label: "Bleu pâle"     },
  { key: "indigo-light",  hex: "#c7d2fe", label: "Indigo pâle"   },
  { key: "violet-light",  hex: "#ddd6fe", label: "Lavande"       },
  { key: "fuchsia-light", hex: "#f5d0fe", label: "Lilas"         },
  { key: "pink-light",    hex: "#fce7f3", label: "Rose pâle"     },

  // — Foncées — même ordre de teinte —
  { key: "red-dark",      hex: "#7f1d1d", label: "Bordeaux"      },
  { key: "orange-dark",   hex: "#7c2d12", label: "Brique"        },
  { key: "amber-dark",    hex: "#78350f", label: "Caramel"       },
  { key: "lime-dark",     hex: "#365314", label: "Olive"         },
  { key: "green-dark",    hex: "#14532d", label: "Forêt"         },
  { key: "teal-dark",     hex: "#134e4a", label: "Jade"          },
  { key: "blue-dark",     hex: "#1e3a8a", label: "Marine"        },
  { key: "violet-dark",   hex: "#4c1d95", label: "Prune"         },
  { key: "pink-dark",     hex: "#881337", label: "Rose foncé"    },

] as const;

export type AvatarBackgroundKey = (typeof AVATAR_BACKGROUNDS)[number]["key"];

export const DEFAULT_AVATAR_BACKGROUND = "#1e293b";
