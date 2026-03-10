"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfilePrefsAction(data: {
  favoritePokemonId?: string | null;
  favoriteRegion?: string | null;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Non authentifié" };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(data.favoritePokemonId !== undefined && { favoritePokemonId: data.favoritePokemonId }),
        ...(data.favoriteRegion !== undefined && { favoriteRegion: data.favoriteRegion }),
      },
    });
    return { success: true };
  } catch {
    return { error: "Erreur lors de la sauvegarde" };
  }
}
