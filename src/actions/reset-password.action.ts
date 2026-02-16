"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { validatePassword } from "@/lib/password-validation";

export async function resetPasswordAction(newPassword: string, token: string) {
  if (!newPassword) return { error: "Veuillez renseigner un nouveau mot de passe" };
  if (!token) return { error: "Token de réinitialisation manquant" };

  const passwordError = validatePassword(newPassword);
  if (passwordError) return { error: passwordError };

  try {
    await auth.api.resetPassword({
      headers: await headers(),
      body: {
        newPassword,
        token,
      },
    });
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal Server Error" };
  }
}
