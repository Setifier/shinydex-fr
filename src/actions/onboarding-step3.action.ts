"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function onboardingStep3Action(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Non authentifié" };

  const avatar = (formData.get("avatar") as string) || "/avatars/default.png";

  if (!avatar.startsWith("/avatars/")) {
    return { error: "Avatar invalide" };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { avatar },
    });
    return { success: true };
  } catch {
    return { error: "Erreur lors de la sauvegarde" };
  }
}
