"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function uncatchPokemonAction(pokemonId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Non authentifié" };

  await prisma.caughtPokemon.deleteMany({
    where: {
      userId: session.user.id,
      pokemonId,
    },
  });

  return { success: true };
}
