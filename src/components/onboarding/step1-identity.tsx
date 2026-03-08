"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingLayout } from "./onboarding-layout";
import { onboardingStep1Action } from "@/actions/onboarding-step1.action";
import { checkHunterNameAction } from "@/actions/check-hunter-name.action";
import { formatHunterName, validateHunterName } from "@/lib/hunter-name-validation";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const SELECT_CLASS =
  "flex h-12 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
  "[&>option]:bg-card [&>option]:text-foreground";

interface Step1IdentityProps {
  onNext: (data: { hunterName: string; birthDay: string; birthMonth: string }) => void;
  initialData?: { hunterName: string; birthDay: string; birthMonth: string };
}

export function Step1Identity({ onNext, initialData }: Step1IdentityProps) {
  const [hunterName, setHunterName] = useState(initialData?.hunterName ?? "");
  const [birthDay, setBirthDay] = useState(initialData?.birthDay ?? "");
  const [birthMonth, setBirthMonth] = useState(initialData?.birthMonth ?? "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [nameValidation, setNameValidation] = useState<string | null>(null);
  const [nameAvailable, setNameAvailable] = useState<boolean | null>(null);
  const [checkingName, setCheckingName] = useState(false);

  const formatted = formatHunterName(hunterName);

  useEffect(() => {
    if (formatted.length === 0) {
      setNameValidation(null);
      setNameAvailable(null);
      return;
    }
    const err = validateHunterName(formatted);
    setNameValidation(err);
    if (err) setNameAvailable(null);
  }, [formatted]);

  const checkAvailability = useCallback(async (name: string) => {
    if (name.length < 2 || validateHunterName(name)) {
      setNameAvailable(null);
      return;
    }
    setCheckingName(true);
    const result = await checkHunterNameAction(name);
    setNameAvailable(result.available);
    setCheckingName(false);
  }, []);

  useEffect(() => {
    if (formatted.length < 2 || validateHunterName(formatted)) {
      setNameAvailable(null);
      return;
    }
    const timeout = setTimeout(() => checkAvailability(formatted), 400);
    return () => clearTimeout(timeout);
  }, [formatted, checkAvailability]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.target.value.replace(/[^a-zA-ZÀ-ÿ]/g, "");
    setHunterName(filtered);
  };

  const isValid =
    formatted.length >= 2 &&
    !nameValidation &&
    nameAvailable === true &&
    birthDay !== "" &&
    birthMonth !== "";

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set("hunterName", formatted);
    formData.set("birthDay", birthDay);
    formData.set("birthMonth", birthMonth);

    const result = await onboardingStep1Action(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    onNext({ hunterName: formatted, birthDay, birthMonth });
  };

  return (
    <OnboardingLayout
      step={1}
      totalSteps={4}
      title="Votre identité"
      description="Bienvenue, collectionneur(se) de Pokémon Shiny ! Quelques informations pour personnaliser votre expérience."
    >
      <div className="space-y-10">

        {/* Nom de collectionneur */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="hunterName" className="text-base font-semibold">
              Nom de Collectionneur(se)
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Ce nom sera visible par les autres collectionneurs. Lettres uniquement, sans espaces.
            </p>
          </div>

          <div className="relative">
            <Input
              id="hunterName"
              value={hunterName}
              onChange={handleNameChange}
              placeholder="Ex : Sacha"
              maxLength={20}
              className="h-12 text-base pr-10"
              autoFocus
            />
            {formatted.length >= 2 && !nameValidation && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {checkingName ? (
                  <div className="h-4 w-4 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
                ) : nameAvailable === true ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : nameAvailable === false ? (
                  <X className="h-4 w-4 text-destructive" />
                ) : null}
              </div>
            )}
          </div>

          {nameValidation && (
            <p className="text-sm text-destructive">{nameValidation}</p>
          )}
          {!nameValidation && nameAvailable === false && (
            <p className="text-sm text-destructive">Ce nom est déjà utilisé.</p>
          )}
          {!nameValidation && nameAvailable === true && (
            <p className="text-sm text-green-600 dark:text-green-400">✓ Nom disponible</p>
          )}
        </div>

        {/* Date de naissance */}
        <div className="space-y-3">
          <div>
            <Label className="text-base font-semibold">Date de naissance</Label>
            <p className="text-sm text-muted-foreground mt-1">
              On vous souhaitera un joyeux anniversaire !
            </p>
          </div>

          <div className="flex gap-3">
            <select
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              className={`${SELECT_CLASS} w-28`}
            >
              <option value="">Jour</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              className={`${SELECT_CLASS} flex-1`}
            >
              <option value="">Mois</option>
              {MONTHS.map((month, index) => (
                <option key={month} value={index + 1}>{month}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="space-y-4">
          <Button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="w-full"
            size="lg"
          >
            {loading ? "Enregistrement..." : "Continuer"}
          </Button>

          {/* Note discrète en bas */}
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70">
            <Lock className="h-3 w-3 shrink-0" />
            Ces informations ne pourront pas être modifiées après cette étape.
          </p>
        </div>

      </div>
    </OnboardingLayout>
  );
}
