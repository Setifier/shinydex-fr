"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AVATARS } from "@/lib/avatars";
import { AVATAR_BACKGROUNDS } from "@/lib/avatar-backgrounds";

export async function updateAvatarAction(data: {
  avatar: string;
  avatarBackground: string;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Non authentifié" };

  const validAvatars = AVATARS.map((a) => a.path);
  if (!validAvatars.includes(data.avatar as (typeof validAvatars)[number])) {
    return { error: "Avatar invalide" };
  }

  const validBgs = AVATAR_BACKGROUNDS.map((b) => b.hex);
  if (!validBgs.includes(data.avatarBackground as (typeof validBgs)[number])) {
    return { error: "Couleur de fond invalide" };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        avatar: data.avatar,
        avatarBackground: data.avatarBackground,
      },
    });
    return { success: true };
  } catch {
    return { error: "Erreur lors de la sauvegarde" };
  }
}
