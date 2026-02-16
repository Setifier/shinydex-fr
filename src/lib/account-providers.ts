import { prisma } from "@/lib/prisma";

export const PROVIDER_DISPLAY_NAMES: Record<string, string> = {
  credential: "Email",
  google: "Google",
  discord: "Discord",
};

export async function getAccountProviders(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      accounts: {
        select: { providerId: true },
      },
    },
  });

  if (!user) return [];

  return user.accounts.map((a) => ({
    providerId: a.providerId,
    displayName: PROVIDER_DISPLAY_NAMES[a.providerId] ?? a.providerId,
  }));
}

export async function getSocialProviders(email: string) {
  const providers = await getAccountProviders(email);
  return providers.filter((p) => p.providerId !== "credential");
}

export async function hasCredentialAccount(email: string) {
  const providers = await getAccountProviders(email);
  return providers.some((p) => p.providerId === "credential");
}
