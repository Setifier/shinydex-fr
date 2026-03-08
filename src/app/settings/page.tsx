import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AvatarCustomizer } from "@/components/settings/avatar-customizer";
import { ShinydexDesignCustomizer } from "@/components/settings/shinydex-design-customizer";
import { ReturnButton } from "@/components/return-button";
import { DEFAULT_AVATAR } from "@/lib/avatars";
import { DEFAULT_AVATAR_BACKGROUND } from "@/lib/avatar-backgrounds";

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { shinydexDesign: true },
  });

  const avatar          = session.user.avatar          || DEFAULT_AVATAR;
  const avatarBg        = session.user.avatarBackground || DEFAULT_AVATAR_BACKGROUND;
  const shinydexDesign  = user?.shinydexDesign          ?? "classic";

  return (
    <div className="container mx-auto max-w-screen-md px-6 py-16 space-y-10">
      <div>
        <ReturnButton href="/profile" />
      </div>

      <div>
        <h1 className="text-2xl font-semibold mb-1">Paramètres</h1>
        <p className="text-muted-foreground text-sm">
          Personnalisez votre profil Shinydex.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium border-b border-border pb-2">Avatar</h2>
        <AvatarCustomizer
          initialAvatar={avatar}
          initialBackground={avatarBg}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium border-b border-border pb-2">Design du Shinydex</h2>
        <p className="text-sm text-muted-foreground">
          Choisissez l&apos;apparence de votre Shinydex personnel.
        </p>
        <ShinydexDesignCustomizer initialDesign={shinydexDesign} />
      </section>
    </div>
  );
}
