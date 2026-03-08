"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/avatar/user-avatar";
import { AvatarGrid } from "@/components/onboarding/avatar-grid";
import { AvatarBackgroundPicker } from "@/components/avatar/avatar-background-picker";
import { updateAvatarAction } from "@/actions/update-avatar.action";

interface AvatarCustomizerProps {
  initialAvatar: string;
  initialBackground: string;
}

export function AvatarCustomizer({
  initialAvatar,
  initialBackground,
}: AvatarCustomizerProps) {
  const router = useRouter();
  const [avatar, setAvatar] = useState(initialAvatar);
  const [background, setBackground] = useState(initialBackground);
  const [loading, setLoading] = useState(false);

  const hasChanges = avatar !== initialAvatar || background !== initialBackground;

  const handleSave = async () => {
    setLoading(true);
    const result = await updateAvatarAction({ avatar, avatarBackground: background });
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Avatar mis à jour !");
    router.refresh();
  };

  return (
    <div className="space-y-8">
      {/* Aperçu */}
      <div className="flex justify-center">
        <UserAvatar avatar={avatar} background={background} size="2xl" />
      </div>

      {/* Choix de l'avatar */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Avatar</p>
        <AvatarGrid value={avatar} background={background} onChange={setAvatar} />
      </div>

      {/* Couleur de fond */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Couleur de fond</p>
        <AvatarBackgroundPicker value={background} onChange={setBackground} />
      </div>

      <Button
        onClick={handleSave}
        disabled={loading || !hasChanges}
        className="w-full"
        size="lg"
      >
        {loading ? "Enregistrement..." : "Enregistrer les modifications"}
      </Button>
    </div>
  );
}
