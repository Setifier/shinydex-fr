"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPokemonById } from "@/lib/pokemon-data";
import { ALL_REGIONS } from "@/types/pokemon";

export async function onboardingStep2Action(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Non authentifié" };

  const favoritePokemonId = formData.get("favoritePokemonId") as string | null;
  const favoriteRegion = formData.get("favoriteRegion") as string | null;

  if (favoritePokemonId && !getPokemonById(favoritePokemonId)) {
    return { error: "Pokémon invalide" };
  }

  if (favoriteRegion && !ALL_REGIONS.includes(favoriteRegion as typeof ALL_REGIONS[number])) {
    return { error: "Région invalide" };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        favoritePokemonId: favoritePokemonId || null,
        favoriteRegion: favoriteRegion || null,
      },
    });
    return { success: true };
  } catch {
    return { error: "Erreur lors de la sauvegarde" };
  }
}
