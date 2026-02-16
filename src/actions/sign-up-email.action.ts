"use server";

import { headers } from "next/headers";
import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { validatePassword } from "@/lib/password-validation";
import { getSocialProviders } from "@/lib/account-providers";
import type { AuthActionResult } from "@/types/auth-action-result";

export async function signUpEmailAction(formData: FormData): Promise<AuthActionResult> {
  const name = String(formData.get("name"));
  if (!name) return { error: "Veuillez renseigner un nom de dresseur" };

  const email = String(formData.get("email"));
  if (!email) return { error: "Veuillez renseigner une adresse mail" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Veuillez renseigner un mot de passe" };

  const passwordError = validatePassword(password);
  if (passwordError) return { error: passwordError };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN_ERROR";

      if (errCode === "USER_ALREADY_EXISTS") {
        const socialProviders = await getSocialProviders(email);

        if (socialProviders.length > 0) {
          const providerNames = socialProviders.map((p) => p.displayName).join(" / ");
          return {
            error: `Un compte existe déjà avec cette adresse via ${providerNames}.`,
            accountConflict: {
              providers: socialProviders,
              type: "signup_account_exists",
            },
          };
        }

        return { error: "Un compte existe déjà avec cette adresse. Connectez-vous ou utilisez le mot de passe oublié." };
      }

      return { error: err.message };
    }
    return { error: "Une erreur est survenue. Veuillez réessayer." };
  }
}
