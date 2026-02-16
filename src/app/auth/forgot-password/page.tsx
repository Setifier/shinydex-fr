import Image from "next/image";
import Link from "next/link";
import { ReturnButton } from "@/components/return-button";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-8">
        <div className="w-full mb-6">
          <ReturnButton href="/auth/login" label="Connexion" />
        </div>
        <h1 className="mb-12 text-center font-heading text-3xl text-primary">
          Mot de passe oublié ?
        </h1>

        <div className="mb-8 flex w-full max-w-md flex-col items-center bg-form gap-4 rounded-xl p-6 shadow-lg">
          <p className="text-center text-muted-foreground">
            Entre ton adresse mail et nous t&apos;enverrons un lien pour
            réinitialiser ton mot de passe.
          </p>
          <ForgotPasswordForm />
        </div>

        <p className="mb-8 text-center">
          <Link
            href="/auth/login"
            className="font-link text-secondary hover:text-secondary-light hover:underline"
          >
            Retour à la connexion
          </Link>
        </p>

        <Image
          src="/ui/artworks/28-Shiny-Sablaireau.png"
          alt="Sablaireau chromatique"
          width={320}
          height={320}
          className="w-64 lg:w-72"
          priority
        />
      </div>
    </main>
  );
}
