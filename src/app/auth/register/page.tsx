import Image from "next/image";
import { RegisterForm } from "@/components/register-form";
import Link from "next/link";
import { ReturnButton } from "@/components/return-button";
import { SocialAuthButtons } from "@/components/social-auth-buttons";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-8">
        <div className="w-full mb-6">
          <ReturnButton href="/" />
        </div>
        <h1 className="mb-12 text-center font-heading text-3xl text-primary">
          Rejoins la communauté Shinydex !
        </h1>

        <div className="mb-8 flex w-full flex-col items-center gap-6 lg:flex-row lg:justify-around lg:gap-8">
          <div className="mt-4 flex w-full max-w-md flex-col items-center bg-form gap-4 rounded-xl p-6 shadow-lg lg:mt-0">
            <h2 className="text-2xl text-primary">Inscription</h2>

            {/* Boutons de connexion sociale */}
            <SocialAuthButtons />

            {/* Séparateur OU */}
            <div className="flex w-full items-center justify-center py-4">
              <div className="flex-1 h-px bg-border"></div>
              <span className="px-4 text-lg font-heading text-primary font-bold">
                OU
              </span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <RegisterForm />
            <p className="mt-4 text-center">
              Déjà un compte ?{" "}
              <Link
                href="/auth/login"
                className="font-link text-secondary hover:text-secondary-light hover:underline"
              >
                Connecte-toi maintenant !
              </Link>
            </p>
          </div>
        </div>

        <Image
          src="/ui/artworks/0235-Shiny-Queulorior.png"
          alt="Queulorior"
          width={320}
          height={320}
          className="w-64 lg:w-72"
          priority
        />
      </div>
    </main>
  );
}
