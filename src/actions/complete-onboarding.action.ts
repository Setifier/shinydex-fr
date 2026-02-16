"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function completeOnboardingAction() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Non authentifié" };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { onboardingCompleted: true },
    });
    return { success: true };
  } catch {
    return { error: "Erreur lors de la finalisation" };
  }
}
