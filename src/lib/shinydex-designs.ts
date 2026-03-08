export const SHINYDEX_DESIGNS = [
  {
    value: "classic",
    label: "Classique",
    description: "Interface épurée avec contours lumineux",
  },
  {
    value: "device",
    label: "Terminal",
    description: "Boîtier électronique métal brossé",
  },
  {
    value: "neon",
    label: "Néon",
    description: "Style cyberpunk avec lueurs électriques",
  },
  {
    value: "rose",
    label: "Cristal Rose",
    description: "Châssis métallique rose aux reflets irisés",
  },
  {
    value: "cobalt",
    label: "Acier Cobalt",
    description: "Boîtier métal brossé bleu profond ultra-texturé",
  },
  {
    value: "manga",
    label: "Manga",
    description: "Objet tech au style manga dynamique",
  },
] as const;

export type ShinydexDesign = (typeof SHINYDEX_DESIGNS)[number]["value"];
export const VALID_SHINYDEX_DESIGNS = SHINYDEX_DESIGNS.map((d) => d.value);
