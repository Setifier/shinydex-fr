"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { OnboardingLayout } from "./onboarding-layout";
import { AvatarGrid } from "./avatar-grid";
import { onboardingStep3Action } from "@/actions/onboarding-step3.action";

interface Step3AvatarProps {
  onNext: (data: { avatar: string }) => void;
  onBack: () => void;
  initialData?: { avatar: string };
}

export function Step3Avatar({ onNext, onBack, initialData }: Step3AvatarProps) {
  const [avatar, setAvatar] = useState(initialData?.avatar ?? "/avatars/default.png");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set("avatar", avatar);

    const result = await onboardingStep3Action(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    onNext({ avatar });
  };

  const handleSkip = async () => {
    const formData = new FormData();
    formData.set("avatar", "/avatars/default.png");
    await onboardingStep3Action(formData);
    onNext({ avatar: "/avatars/default.png" });
  };

  return (
    <OnboardingLayout
      step={3}
      totalSteps={4}
      title="Votre avatar"
      description="Choisissez un avatar pour votre profil."
      onBack={onBack}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Sélectionnez un avatar</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Vous pourrez le changer plus tard dans vos paramètres.
          </p>
          <AvatarGrid value={avatar} onChange={setAvatar} />
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSkip}
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
