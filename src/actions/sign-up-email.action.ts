"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { ErrorCode } from "@/lib/auth";

export async function signUpEmailAction(formData: FormData) {
  const name = String(formData.get("name"));
  if (!name) return { error: "Veuillez renseigner un nom de dresseur" };

  const email = String(formData.get("email"));
  if (!email) return { error: "Veuillez renseigner une adresse mail" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Veuillez renseigner un mot de passe" };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN_ERROR";

      switch (errCode) {
        default:
          return { error: err.message };
      }
    }
    return { error: "Internal Server Error" };
  }
}
