import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AvatarCustomizer } from "@/components/settings/avatar-customizer";
import { DEFAULT_AVATAR } from "@/lib/avatars";
import { DEFAULT_AVATAR_BACKGROUND } from "@/lib/avatar-backgrounds";

export default async function SettingsAvatarPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const avatar = session.user.avatar || DEFAULT_AVATAR;
  const avatarBg = session.user.avatarBackground || DEFAULT_AVATAR_BACKGROUND;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Avatar</h2>
        <p className="text-sm text-muted-foreground">
          Personnalisez votre avatar et sa couleur de fond.
        </p>
      </div>
      <AvatarCustomizer initialAvatar={avatar} initialBackground={avatarBg} />
    </div>
  );
}
