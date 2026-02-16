"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { signInEmailAction } from "@/actions/sign-in-email.action";
import { signIn } from "@/lib/auth-client";
import type { AuthActionResult } from "@/types/auth-action-result";

export const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [accountConflict, setAccountConflict] = useState<AuthActionResult["accountConflict"]>();

  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setAccountConflict(undefined);
    setIsPending(true);

    const formData = new FormData(evt.target as HTMLFormElement);

    const result = await signInEmailAction(formData);

    if (result.error) {
      if (result.accountConflict) {
        setAccountConflict(result.accountConflict);
      } else {
        toast.error(result.error);
      }
      setIsPending(false);
    } else {
      toast.success("Connexion réussie !");
      router.refresh();
      router.push("/profile");

      setTimeout(() => window.location.reload(), 100);
    }
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <div className="w-full space-y-3">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">
              Surnom ou Adresse Mail :
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              className="w-full py-3 px-4 text-base bg-form border-2 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-medium">
              Mot de passe :
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              className="w-full py-3 px-4 text-base bg-form border-2 rounded-lg"
            />
          </div>
          <div className="text-right">
            <Link
              href="/auth/forgot-password"
              className="text-sm font-link text-secondary hover:text-secondary-light hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </div>

        <Button
          variant="default"
          size="lg"
          className="w-full py-3 font-semibold bg-primary hover:bg-primary-dark text-white rounded-lg"
          type="submit"
          disabled={isPending}
        >
          Se connecter
        </Button>
      </form>

      {accountConflict && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 space-y-3">
          <p className="text-sm text-amber-800">
            {accountConflict.type === "signin_no_credential"
              ? `Ce compte a été créé avec ${accountConflict.providers.map((p) => p.displayName).join(" / ")}. Utilisez ce fournisseur pour vous connecter.`
              : "Un compte existe déjà avec cette adresse."}
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
        </div>
      )}
    </div>
  );
};
