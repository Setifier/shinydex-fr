"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function catchPokemonAction(pokemonId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Non authentifié" };

  try {
    await prisma.caughtPokemon.create({
      data: {
        userId: session.user.id,
        pokemonId,
      },
    });
    return { success: true };
  } catch {
    // Ignore l'erreur de doublon (unique constraint) — déjà capturé
    return { success: true };
  }
}
