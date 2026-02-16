"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { getSocialProviders, hasCredentialAccount } from "@/lib/account-providers";
import type { AuthActionResult } from "@/types/auth-action-result";

export async function signInEmailAction(formData: FormData): Promise<AuthActionResult> {
  const email = String(formData.get("email"));
  if (!email) return { error: "Veuillez renseigner une adresse mail" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Veuillez renseigner un mot de passe" };

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN_ERROR";

      if (errCode === "EMAIL_NOT_VERIFIED") {
        return { error: "Votre adresse mail n'a pas encore été vérifiée. Consultez votre boîte mail." };
      }

      if (errCode === "INVALID_EMAIL_OR_PASSWORD") {
        const [socialProviders, hasCred] = await Promise.all([
          getSocialProviders(email),
          hasCredentialAccount(email),
        ]);

        if (socialProviders.length > 0 && !hasCred) {
          const providerNames = socialProviders.map((p) => p.displayName).join(" / ");
          return {
            error: `Ce compte a été créé avec ${providerNames}. Utilisez ce fournisseur pour vous connecter.`,
            accountConflict: {
              providers: socialProviders,
              type: "signin_no_credential",
            },
          };
        }

        return { error: "Adresse mail ou mot de passe incorrect." };
      }

      return { error: "Adresse mail ou mot de passe incorrect." };
    }
    return { error: "Une erreur est survenue. Veuillez réessayer." };
  }
}
