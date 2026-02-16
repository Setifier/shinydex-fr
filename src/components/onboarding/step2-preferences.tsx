"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { OnboardingLayout } from "./onboarding-layout";
import { PokemonAutocomplete } from "./pokemon-autocomplete";
import { RegionSelector } from "./region-selector";
import { onboardingStep2Action } from "@/actions/onboarding-step2.action";
import { getPokemonById } from "@/lib/pokemon-data";
import type { Pokemon } from "@/types/pokemon";
import type { RegionName } from "@/types/pokemon";

interface Step2PreferencesProps {
  onNext: (data: { favoritePokemonId: string | null; favoriteRegion: string | null }) => void;
  onBack: () => void;
  initialData?: { favoritePokemonId: string | null; favoriteRegion: string | null };
}

export function Step2Preferences({ onNext, onBack, initialData }: Step2PreferencesProps) {
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon | null>(
    initialData?.favoritePokemonId ? getPokemonById(initialData.favoritePokemonId) ?? null : null
  );
  const [favoriteRegion, setFavoriteRegion] = useState<RegionName | null>(
    (initialData?.favoriteRegion as RegionName) ?? null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    if (favoritePokemon) formData.set("favoritePokemonId", favoritePokemon.id);
    if (favoriteRegion) formData.set("favoriteRegion", favoriteRegion);

    const result = await onboardingStep2Action(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    onNext({
      favoritePokemonId: favoritePokemon?.id ?? null,
      favoriteRegion: favoriteRegion ?? null,
    });
  };

  const handleSkip = () => {
    onNext({ favoritePokemonId: null, favoriteRegion: null });
  };

  return (
    <OnboardingLayout
      step={2}
      totalSteps={4}
      title="Vos préférences"
      description="Partagez vos Pokémon et régions préférés avec la communauté."
      onBack={onBack}
    >
      <div className="space-y-6">
        {/* Favorite Pokemon */}
        <div className="space-y-2">
          <Label>Pokémon favori</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Quel est votre Pokémon chromatique préféré ?
          </p>
          <PokemonAutocomplete
            value={favoritePokemon}
            onChange={setFavoritePokemon}
          />
        </div>

        {/* Favorite Region */}
        <div className="space-y-2">
          <Label>Région favorite</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Quelle région du monde Pokémon préférez-vous ?
          </p>
          <RegionSelector
            value={favoriteRegion}
            onChange={setFavoriteRegion}
          />
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
