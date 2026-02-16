import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";
import {
  signInLimiter,
  signUpLimiter,
  forgotPasswordLimiter,
} from "@/lib/rate-limit";

const rateLimitedPaths: Record<
  string,
  { limiter: typeof signInLimiter; keyFrom: "ip" | "body-email" }
> = {
  "/sign-in/email": { limiter: signInLimiter, keyFrom: "ip" },
  "/sign-up/email": { limiter: signUpLimiter, keyFrom: "ip" },
  "/forget-password": { limiter: forgotPasswordLimiter, keyFrom: "body-email" },
};

async function getRateLimitKey(
  req: NextRequest,
  keyFrom: "ip" | "body-email"
): Promise<string> {
  if (keyFrom === "body-email") {
    try {
      const cloned = req.clone();
      const body = await cloned.json();
      if (body?.email) return body.email;
    } catch {
      // fallback to IP
    }
  }
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
}

const { POST: originalPOST, GET } = toNextJsHandler(auth);

async function POST(req: NextRequest) {
  // Extraire le sous-chemin Better-Auth depuis l'URL
  const url = new URL(req.url);
  const authPath = url.pathname.replace("/api/auth", "");

  const config = rateLimitedPaths[authPath];
  if (config) {
    const key = await getRateLimitKey(req, config.keyFrom);
    const { success } = await config.limiter.limit(key);

    if (!success) {
      return NextResponse.json(
        { message: "Trop de tentatives. Réessayez plus tard." },
        { status: 429 }
      );
    }
  }

  return originalPOST(req);
}

export { POST, GET };
