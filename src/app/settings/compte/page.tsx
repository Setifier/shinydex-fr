import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/components/sign-out-button";
import { Badge } from "@/components/ui/badge";

export default async function SettingsComptePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      emailVerified: true,
      accounts: { select: { providerId: true } },
    },
  });

  const providers = user?.accounts.map((a) => a.providerId) ?? [];
  const hasPassword = providers.includes("credential");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium">Mon compte</h2>
        <p className="text-sm text-muted-foreground">
          Gérez vos informations de connexion et votre session.
        </p>
      </div>

      {/* Adresse e-mail */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium border-b border-border pb-2">Adresse e-mail</h3>
        <div className="rounded-lg border border-border p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">{user?.email}</span>
            {user?.emailVerified && (
              <Badge variant="secondary" className="text-xs">Vérifiée</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            La modification d&apos;adresse e-mail sera disponible prochainement.
          </p>
        </div>
      </section>

      {/* Mot de passe */}
      {hasPassword && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium border-b border-border pb-2">Mot de passe</h3>
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm font-medium">Changer le mot de passe</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              La modification du mot de passe sera disponible prochainement.
            </p>
          </div>
        </section>
      )}

      {/* Connexions sociales */}
      {providers.filter((p) => p !== "credential").length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-medium border-b border-border pb-2">Connexions liées</h3>
          <div className="rounded-lg border border-border p-4 flex gap-2 flex-wrap">
            {providers
              .filter((p) => p !== "credential")
              .map((provider) => (
                <Badge key={provider} variant="outline" className="capitalize text-xs">
                  {provider}
                </Badge>
              ))}
          </div>
        </section>
      )}

      {/* Session */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium border-b border-border pb-2">Session</h3>
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div>
            <p className="text-sm font-medium">Se déconnecter</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Met fin à votre session sur cet appareil.
            </p>
          </div>
          <SignOutButton />
        </div>
      </section>

      {/* Zone dangereuse */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium border-b border-destructive/40 pb-2 text-destructive">
          Zone dangereuse
        </h3>
        <div className="rounded-lg border border-destructive/30 p-4">
          <p className="text-sm font-medium">Supprimer mon compte</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            La suppression de compte sera disponible prochainement. Cette action est irréversible.
          </p>
        </div>
      </section>
    </div>
  );
}
