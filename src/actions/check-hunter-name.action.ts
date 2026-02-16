"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function checkHunterNameAction(name: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { available: false };

  const existing = await prisma.user.findFirst({
    where: {
      hunterName: { equals: name, mode: "insensitive" },
      id: { not: session.user.id },
    },
    select: { id: true },
  });

  return { available: !existing };
}
