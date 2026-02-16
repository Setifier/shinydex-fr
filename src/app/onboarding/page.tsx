"use client";

import { useState } from "react";
import { Step1Identity } from "@/components/onboarding/step1-identity";
import { Step2Preferences } from "@/components/onboarding/step2-preferences";
import { Step3Avatar } from "@/components/onboarding/step3-avatar";
import { Step4Shinydex } from "@/components/onboarding/step4-shinydex";

interface OnboardingData {
  step1: { hunterName: string; birthDay: string; birthMonth: string };
  step2: { favoritePokemonId: string | null; favoriteRegion: string | null };
  step3: { avatar: string };
}

const DEFAULT_DATA: OnboardingData = {
  step1: { hunterName: "", birthDay: "", birthMonth: "" },
  step2: { favoritePokemonId: null, favoriteRegion: null },
  step3: { avatar: "/avatars/default.png" },
};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(DEFAULT_DATA);

  const updateStep1 = (values: OnboardingData["step1"]) => {
    setData((prev) => ({ ...prev, step1: values }));
    setStep(2);
  };

  const updateStep2 = (values: OnboardingData["step2"]) => {
    setData((prev) => ({ ...prev, step2: values }));
    setStep(3);
  };

  const updateStep3 = (values: OnboardingData["step3"]) => {
    setData((prev) => ({ ...prev, step3: values }));
    setStep(4);
  };

  switch (step) {
    case 1:
      return (
        <Step1Identity
          onNext={updateStep1}
          initialData={data.step1}
        />
      );
    case 2:
      return (
        <Step2Preferences
          onNext={updateStep2}
          onBack={() => setStep(1)}
          initialData={data.step2}
        />
      );
    case 3:
      return (
        <Step3Avatar
          onNext={updateStep3}
          onBack={() => setStep(2)}
          initialData={data.step3}
        />
      );
    case 4:
      return <Step4Shinydex onBack={() => setStep(3)} />;
    default:
      return (
        <Step1Identity
          onNext={updateStep1}
          initialData={data.step1}
        />
      );
  }
}
