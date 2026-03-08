"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OnboardingLayout } from "./onboarding-layout";
import { AvatarGrid } from "./avatar-grid";
import { AvatarBackgroundPicker } from "@/components/avatar/avatar-background-picker";
import { UserAvatar } from "@/components/avatar/user-avatar";
import { onboardingStep3Action } from "@/actions/onboarding-step3.action";
import { DEFAULT_AVATAR } from "@/lib/avatars";
import { DEFAULT_AVATAR_BACKGROUND } from "@/lib/avatar-backgrounds";

interface Step3AvatarProps {
  onNext: (data: { avatar: string; avatarBackground: string }) => void;
  onBack: () => void;
  initialData?: { avatar: string; avatarBackground: string };
}

export function Step3Avatar({ onNext, onBack, initialData }: Step3AvatarProps) {
  const [avatar, setAvatar] = useState(
    initialData?.avatar ?? DEFAULT_AVATAR
  );
  const [background, setBackground] = useState(
    initialData?.avatarBackground ?? DEFAULT_AVATAR_BACKGROUND
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const result = await onboardingStep3Action({ avatar, avatarBackground: background });
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    onNext({ avatar, avatarBackground: background });
  };

  const handleSkip = async () => {
    setLoading(true);
    await onboardingStep3Action({
      avatar: DEFAULT_AVATAR,
      avatarBackground: DEFAULT_AVATAR_BACKGROUND,
    });
    onNext({ avatar: DEFAULT_AVATAR, avatarBackground: DEFAULT_AVATAR_BACKGROUND });
  };

  return (
    <OnboardingLayout
      step={3}
      totalSteps={4}
      title="Votre avatar"
      description="Choisissez un avatar et une couleur de fond pour votre profil."
      onBack={onBack}
    >
      <div className="space-y-6">

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

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSkip}
            disabled={loading}
            className="flex-1"
            size="lg"
          >
            Passer
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1"
            size="lg"
          >
            {loading ? "Enregistrement..." : "Continuer"}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
