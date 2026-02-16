"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

export async function forgotPasswordAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Veuillez renseigner une adresse mail" };

  try {
    await auth.api.forgetPassword({
      headers: await headers(),
      body: {
        email,
        redirectTo: "/auth/reset-password",
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
