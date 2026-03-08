export const AVATARS = [
  { id: "serena",  path: "/avatars/serena.png",  label: "Serena"  },
  { id: "aldo",    path: "/avatars/aldo.png",    label: "Aldo"    },
  { id: "ludvina", path: "/avatars/ludvina.png", label: "Ludvina" },
  { id: "pierre",  path: "/avatars/pierre.png",  label: "Pierre"  },
] as const;

export const DEFAULT_AVATAR = AVATARS[0].path;
