"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingLayoutProps {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  onBack?: () => void;
  children: React.ReactNode;
}

export function OnboardingLayout({
  step,
  totalSteps,
  title,
  description,
  onBack,
  children,
}: OnboardingLayoutProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pokedex-page-bg">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Étape {step} sur {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-card rounded-xl shadow-lg p-8">
          {/* Back button */}
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mb-4 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour
            </Button>
          )}

          {/* Title */}
          <h1 className="text-3xl font-heading text-primary mb-2">{title}</h1>
          <p className="text-muted-foreground mb-8">{description}</p>

          {children}
        </div>
      </div>
    </div>
  );
}
