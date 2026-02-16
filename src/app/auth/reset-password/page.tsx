import Image from "next/image";
import { ReturnButton } from "@/components/return-button";
import { ResetPasswordForm } from "@/components/reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-8">
        <div className="w-full mb-6">
          <ReturnButton href="/auth/login" label="Connexion" />
        </div>
        <h1 className="mb-12 text-center font-heading text-3xl text-primary">
          Réinitialiser ton mot de passe
        </h1>

        <div className="mb-8 flex w-full max-w-md flex-col items-center bg-form gap-4 rounded-xl p-6 shadow-lg">
          {token ? (
            <ResetPasswordForm token={token} />
          ) : (
            <p className="text-center text-destructive">
              Lien de réinitialisation invalide ou expiré.
            </p>
          )}
        </div>

        <Image
          src="/ui/artworks/37-Shiny-Goupix.png"
          alt="Goupix chromatique"
          width={320}
          height={320}
          className="w-64 lg:w-72"
          priority
        />
      </div>
    </main>
  );
}
