"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatHunterName, validateHunterName } from "@/lib/hunter-name-validation";

export async function onboardingStep1Action(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Non authentifié" };

  const rawName = String(formData.get("hunterName")).trim();
  const hunterName = formatHunterName(rawName);
  const birthDay = Number(formData.get("birthDay"));
  const birthMonth = Number(formData.get("birthMonth"));

  const nameError = validateHunterName(hunterName);
  if (nameError) return { error: nameError };

  if (!birthDay || birthDay < 1 || birthDay > 31) {
    return { error: "Jour de naissance invalide" };
  }

  if (!birthMonth || birthMonth < 1 || birthMonth > 12) {
    return { error: "Mois de naissance invalide" };
  }

  // Vérifier unicité du nom (case-insensitive)
  const nameTaken = await prisma.user.findFirst({
    where: {
      hunterName: { equals: hunterName, mode: "insensitive" },
      id: { not: session.user.id },
    },
    select: { id: true },
  });

  if (nameTaken) {
    return { error: "Ce nom est déjà utilisé par un autre collectionneur." };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { hunterName, birthDay, birthMonth },
    });
    return { success: true };
  } catch {
    return { error: "Erreur lors de la sauvegarde" };
  }
}
