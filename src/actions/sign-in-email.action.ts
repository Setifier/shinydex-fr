"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function signInEmailAction(formData: FormData) {
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
  } catch (er) {
    if (er instanceof Error) {
      return { error: "Oups, une erreur est survenue" };
    }
    return { error: "Internal Server Error" };
  }
}
