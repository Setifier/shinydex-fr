"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { VALID_SHINYDEX_DESIGNS } from "@/lib/shinydex-designs";

export async function updateShinydexDesignAction(data: { shinydexDesign: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Non authentifié" };

  if (!(VALID_SHINYDEX_DESIGNS as string[]).includes(data.shinydexDesign)) {
    return { error: "Design invalide" };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { shinydexDesign: data.shinydexDesign },
    });
    return { success: true };
  } catch {
    return { error: "Erreur lors de la sauvegarde" };
  }
}
