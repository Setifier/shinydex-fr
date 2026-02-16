"use client";

import { MailCheck } from "lucide-react";
import Link from "next/link";

export const VerifyEmailContent = () => {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <MailCheck className="w-16 h-16 text-primary" />
      <p className="text-lg">
        Un email de vérification a été envoyé. Clique sur le lien pour activer
        ton compte.
      </p>
      <p className="text-sm text-muted-foreground">
        Pense à vérifier tes spams si tu ne le trouves pas.
      </p>
      <Link
        href="/auth/login"
        className="font-link text-secondary hover:text-secondary-light hover:underline"
      >
        Retour à la connexion
      </Link>
    </div>
  );
};
