"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPokemonById } from "@/lib/pokemon-data";
import { VALID_SHINYDEX_DESIGNS } from "@/lib/shinydex-designs";

export async function onboardingStep4Action(data: {
  shinydexDesign: string;
  pokemonIds: string[];
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Non authentifié" };

  const { shinydexDesign, pokemonIds } = data;

  if (!(VALID_SHINYDEX_DESIGNS as string[]).includes(shinydexDesign)) {
    return { error: "Design invalide" };
  }

  // Valider chaque pokemonId
  for (const id of pokemonIds) {
    if (!getPokemonById(id)) {
      return { error: `Pokémon invalide: ${id}` };
    }
  }

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: { shinydexDesign },
      }),
      ...(pokemonIds.length > 0
        ? [
            prisma.caughtPokemon.createMany({
              data: pokemonIds.map((pokemonId) => ({
                userId: session.user.id,
                pokemonId,
              })),
              skipDuplicates: true,
            }),
          ]
        : []),
    ]);
    return { success: true };
  } catch {
    return { error: "Erreur lors de la sauvegarde" };
  }
}
