import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PersonalShinydex } from "@/components/shinydex/personal-shinydex";

export default async function PersonalShinydexPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const [caught, user] = await Promise.all([
    prisma.caughtPokemon.findMany({
      where: { userId: session.user.id },
      select: { pokemonId: true },
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { shinydexDesign: true },
    }),
  ]);

  const caughtIds = caught.map((c) => c.pokemonId);
  const shinydexDesign = user?.shinydexDesign ?? "classic";

  return <PersonalShinydex caughtIds={caughtIds} shinydexDesign={shinydexDesign} />;
}
