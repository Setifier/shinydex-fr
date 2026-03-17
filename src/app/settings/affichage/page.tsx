import { ThemePicker } from "@/components/settings/theme-picker";

export default function SettingsAffichagePage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium">Affichage</h2>
        <p className="text-sm text-muted-foreground">
          Personnalisez l&apos;apparence de l&apos;interface.
        </p>
      </div>

      <section className="space-y-3">
        <h3 className="text-sm font-medium border-b border-border pb-2">Thème</h3>
        <p className="text-xs text-muted-foreground">
          Le mode Système suit automatiquement les préférences de votre appareil.
        </p>
        <ThemePicker />
      </section>
    </div>
  );
}
