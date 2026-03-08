"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { OnboardingLayout } from "./onboarding-layout";
import { PokemonSelectionGrid } from "./pokemon-selection-grid";
import { onboardingStep4Action } from "@/actions/onboarding-step4.action";
import { completeOnboardingAction } from "@/actions/complete-onboarding.action";
import { getAllRegions, getRegionalForms } from "@/lib/pokemon-data";
import { ShinydexDesignPicker } from "@/components/shinydex/shinydex-design-picker";
import { toast } from "sonner";

interface Step4ShinydexProps {
  onBack: () => void;
}

export function Step4Shinydex({ onBack }: Step4ShinydexProps) {
  const router = useRouter();
  const [view, setView] = useState<"regions" | "forms">("regions");
  const [shinydexDesign, setShinydexDesign] = useState("classic");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const regions = useMemo(() => getAllRegions(), []);
  const forms = useMemo(() => getRegionalForms(), []);

  const sections = useMemo(() => {
    if (view === "regions") {
      return regions.map((r) => ({ name: r.region, pokemons: r.pokemons }));
    }
    return forms.map((f) => ({ name: f.form, pokemons: f.pokemons }));
  }, [view, regions, forms]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleSection = (ids: string[], selected: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const id of ids) {
        if (selected) {
          next.add(id);
        } else {
          next.delete(id);
        }
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const result = await onboardingStep4Action({
      shinydexDesign,
      pokemonIds: Array.from(selectedIds),
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    const completeResult = await completeOnboardingAction();
    if (completeResult.error) {
      setError(completeResult.error);
      setLoading(false);
      return;
    }

    toast.success("Bienvenue sur Shinydex !");
    router.push("/profile");
  };

  const handleSkip = async () => {
    setLoading(true);
    const result = await completeOnboardingAction();
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    toast.success("Bienvenue sur Shinydex !");
    router.push("/profile");
  };

  return (
    <OnboardingLayout
      step={4}
      totalSteps={4}
      title="Votre Shinydex"
      description="Ajoutez les Pokémon chromatiques que vous possédez déjà."
      onBack={onBack}
    >
      <div className="space-y-6">

        {/* Design du Shinydex */}
        <div className="space-y-3">
          <Label>Design du Shinydex</Label>
          <ShinydexDesignPicker value={shinydexDesign} onChange={setShinydexDesign} />
        </div>

        <div className="forms-separator-line" />

        {/* Import collection existante */}
        <div className="space-y-3">
          <Label>Importer votre collection existante</Label>
          <p className="text-xs text-muted-foreground">
            Sélectionnez les Pokémon chromatiques que vous possédez déjà. Vous pourrez en ajouter d&apos;autres plus tard.
          </p>

          {/* View toggle */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setView("regions")}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "regions"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Formes de base
            </button>
            <button
              type="button"
              onClick={() => setView("forms")}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "forms"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Formes régionales
            </button>
          </div>

          {/* Counter */}
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">{selectedIds.size}</span>{" "}
            Pokémon sélectionnés
          </div>

          {/* Pokemon selection */}
          <div className="max-h-[40vh] overflow-y-auto rounded-lg border">
            <PokemonSelectionGrid
              sections={sections}
              selectedIds={selectedIds}
              onToggle={handleToggle}
              onToggleSection={handleToggleSection}
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

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
            {loading ? "Finalisation..." : "Terminer"}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
