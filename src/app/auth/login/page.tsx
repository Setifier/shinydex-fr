import React from "react";
import Image from "next/image";
import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="content-container min-h-screen p-8">
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
              <div className="space-y-4 w-80">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-3 py-3 text-base  border-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Se connecter avec Google</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-3 py-3 text-base border-2"
                >
                  <svg className="w-5 h-5" fill="#5865F2" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.946 2.4189-2.1569 2.4189Z" />
                  </svg>
                  <span>Se connecter avec Discord</span>
                </Button>
              </div>
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
