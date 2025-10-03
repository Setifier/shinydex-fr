"use server";

import { auth } from "@/lib/auth";

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
  } catch (er) {
    if (er instanceof Error) {
      return { error: "Oups, une erreur est survenue" };
    }
    return { error: "Internal Server Error" };
  }
}
