import React from "react";
import Image from "next/image";
import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import { ReturnButton } from "@/components/return-button";
import { SocialAuthButtons } from "@/components/social-auth-buttons";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="content-container min-h-screen p-8">
        <div className="mb-6">
          <ReturnButton href="/" label="Accueil" />
        </div>
        <div className="flex min-h-full flex-col">
          {/* Section supérieure */}
          <div className="flex-1 flex">
            {/* Partie gauche */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-heading text-primary mb-4">
                  Heureux de vous revoir !
                </h1>
              </div>

              <div className="flex items-center justify-center">
                <Image
                  src="/ui/artworks/Elekable_shiny.png"
                  alt="Elekable chromatique"
                  width={320}
                  height={320}
                  className="mb-4"
                />
              </div>
            </div>

            {/* Partie droite */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <h2 className="text-2xl font-heading text-primary">
                Connexion ?
              </h2>

              {/* Boutons de connexion sociale */}
              <SocialAuthButtons />
            </div>
          </div>

          {/* Séparateur OU */}
          <div className="flex w-full items-center justify-center py-8">
            <div className="flex-1 h-px bg-border"></div>
            <span className="px-8 text-2xl font-heading text-primary font-bold">
              OU
            </span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Section inférieure */}
          <div className="flex justify-around mt-8">
            <div className="flex w-[40%] flex-col items-center gap-4">
              <div className="mt-4 flex w-full max-w-md flex-col items-center bg-form gap-4 rounded-xl p-6 shadow-lg lg:mt-0">
                {/* Formulaire de connexion */}
                <h2 className="text-2xl text-primary">Adresse mail</h2>
                <LoginForm />
              </div>

              <p className="text-center space-y-1">
                Besoin d&apos;un compte ?
                <Link
                  href="/auth/register"
                  className="pl-1 font-link text-secondary hover:text-secondary-light hover:underline"
                >
                  Inscris toi maintenant !
                </Link>
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Image
                src="/ui/artworks/Nidoking_chroma.png"
                alt="Nidoking chromatique"
                width={320}
                height={320}
                className="drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
