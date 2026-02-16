"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpEmailAction } from "@/actions/sign-up-email.action";
import { PasswordRequirements } from "@/components/password-requirements";
import { signIn } from "@/lib/auth-client";
import type { AuthActionResult } from "@/types/auth-action-result";

export const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [password, setPassword] = useState("");
  const [accountConflict, setAccountConflict] = useState<AuthActionResult["accountConflict"]>();

  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setAccountConflict(undefined);
    setIsPending(true);

    const formData = new FormData(evt.target as HTMLFormElement);

    const result = await signUpEmailAction(formData);

    if (result.error) {
      if (result.accountConflict) {
        setAccountConflict(result.accountConflict);
      } else {
        toast.error(result.error);
      }
      setIsPending(false);
    } else {
      toast.success("Inscription réussie ! Vérifie ta boîte mail.");
      router.push("/auth/verify-email");
    }
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <div className="w-full space-y-3">
          <Label htmlFor="name">Nom de dresseur</Label>
          <Input id="name" type="text" name="name" className="w-full" />
          <Label htmlFor="email">Adresse mail</Label>
          <Input id="email" type="email" name="email" className="w-full" />
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            name="password"
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordRequirements password={password} />
        </div>

        <Button
          variant="default"
          size="lg"
          className="w-full py-3 font-semibold bg-primary hover:bg-primary-dark text-white rounded-lg"
          type="submit"
          disabled={isPending}
        >
          S&apos;inscrire avec un Email
        </Button>
      </form>

      {accountConflict && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 space-y-3">
          <p className="text-sm text-amber-800">
            {`Un compte existe déjà avec cette adresse via ${accountConflict.providers.map((p) => p.displayName).join(" / ")}.`}
          </p>
          <div className="flex flex-col gap-2">
            {accountConflict.providers.map((provider) => (
              <Button
                key={provider.providerId}
                variant="outline"
                className="w-full border-amber-300 hover:bg-amber-100"
                onClick={() =>
                  signIn.social({
                    provider: provider.providerId as "google" | "discord",
                    callbackURL: "/profile",
                  })
                }
              >
                Se connecter avec {provider.displayName}
              </Button>
            ))}
          </div>
          <p className="text-xs text-amber-600">
            Ou{" "}
            <Link href="/login" className="underline hover:text-amber-800">
              connectez-vous à votre compte existant
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};
