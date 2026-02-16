import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile"];
const adminRoutes = ["/admin"];

async function fetchSession(req: NextRequest) {
  try {
    const response = await fetch(new URL("/api/auth/get-session", req.url), {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = getSessionCookie(req);

  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isOnAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isOnOnboardingRoute = nextUrl.pathname.startsWith("/onboarding");

  // Non connecte sur route protegee/admin/onboarding → login
  if ((isOnProtectedRoute || isOnAdminRoute || isOnOnboardingRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Connecte + route protegee ou admin
  if ((isOnProtectedRoute || isOnAdminRoute) && isLoggedIn) {
    const session = await fetchSession(req);
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (!session.user.onboardingCompleted) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    if (isOnAdminRoute && session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Connecte + /onboarding
  if (isOnOnboardingRoute && isLoggedIn) {
    const session = await fetchSession(req);
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (session.user.onboardingCompleted) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  // Connecte + route auth → redirect selon onboarding
  if (isOnAuthRoute && isLoggedIn) {
    const session = await fetchSession(req);
    if (session) {
      if (session.user.onboardingCompleted) {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)",
  ],
};
