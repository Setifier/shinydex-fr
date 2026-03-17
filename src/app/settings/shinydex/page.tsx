import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ShinydexDesignCustomizer } from "@/components/settings/shinydex-design-customizer";

export default async function SettingsShinydexPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { shinydexDesign: true },
  });

  const shinydexDesign = user?.shinydexDesign ?? "classic";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Design du Shinydex</h2>
        <p className="text-sm text-muted-foreground">
          Choisissez l&apos;apparence de votre Shinydex personnel.
        </p>
      </div>
      <ShinydexDesignCustomizer initialDesign={shinydexDesign} />
    </div>
  );
}
