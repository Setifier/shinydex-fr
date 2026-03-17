"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updatePublicProfileAction(data: {
  biography?: string[];
  pronouns?: string | null;
  country?: string | null;
  emailPrivate?: boolean;
  favoriteGame?: string | null;
  showFavoritePokemon?: boolean;
  showFavoriteRegion?: boolean;
  showFavoriteGame?: boolean;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Non authentifié" };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(data.biography !== undefined && { biography: data.biography }),
        ...(data.pronouns !== undefined && { pronouns: data.pronouns }),
        ...(data.country !== undefined && { country: data.country }),
        ...(data.emailPrivate !== undefined && { emailPrivate: data.emailPrivate }),
        ...(data.favoriteGame !== undefined && { favoriteGame: data.favoriteGame }),
        ...(data.showFavoritePokemon !== undefined && { showFavoritePokemon: data.showFavoritePokemon }),
        ...(data.showFavoriteRegion !== undefined && { showFavoriteRegion: data.showFavoriteRegion }),
        ...(data.showFavoriteGame !== undefined && { showFavoriteGame: data.showFavoriteGame }),
      },
    });
    return { success: true };
  } catch {
    return { error: "Erreur lors de la sauvegarde" };
  }
}
