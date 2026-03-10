import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Shield, Settings, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/components/sign-out-button";
import { AvatarEditButton } from "@/components/profile/avatar-edit-button";
import { getAllRegions, getAllForms, getImagePath, getPokemonById, getRegionalForms } from "@/lib/pokemon-data";
import { DEFAULT_AVATAR } from "@/lib/avatars";
import { ProfileInteractive } from "@/components/profile/profile-interactive";

function getTotalCount() {
  const regionTotal = getAllRegions().reduce((acc, r) => acc + r.pokemons.length, 0);
  const formTotal   = getRegionalForms().reduce((acc, f) => acc + f.pokemons.length, 0);
  return regionTotal + formTotal;
}

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  USER:      { label: "Dresseur",   color: "bg-slate-700/60 text-slate-300 border-slate-600/40" },
  EDITOR:    { label: "Éditeur",    color: "bg-blue-900/40 text-blue-300 border-blue-600/40"   },
  MODERATOR: { label: "Modérateur", color: "bg-purple-900/40 text-purple-300 border-purple-600/40" },
  STAR:      { label: "Star",       color: "bg-yellow-900/40 text-yellow-300 border-yellow-600/40" },
  ADMIN:     { label: "Admin",      color: "bg-red-900/40 text-red-300 border-red-600/40" },
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const [user, caughtPokemons] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        hunterName:        true,
        avatar:            true,
        avatarBackground:  true,
        favoritePokemonId: true,
        favoriteRegion:    true,
        shinydexDesign:    true,
        role:              true,
        createdAt:         true,
      },
    }),
    prisma.caughtPokemon.findMany({
      where: { userId: session.user.id },
      select: { pokemonId: true },
    }),
  ]);

  if (!user) redirect("/auth/login");

  const total       = getTotalCount();
  const caughtCount = caughtPokemons.length;
  const pct         = total > 0 ? Math.round((caughtCount / total) * 100) : 0;
  const avatar      = user.avatar ?? DEFAULT_AVATAR;
  const avatarBg    = user.avatarBackground ?? "#1e293b";
  const design      = user.shinydexDesign ?? "classic";
  const roleInfo    = ROLE_LABELS[user.role ?? "USER"] ?? ROLE_LABELS.USER;
  const isAdmin     = user.role === "ADMIN";

  const memberSince = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(user.createdAt);

  const caughtIdSet = new Set(caughtPokemons.map(cp => cp.pokemonId));
  const regionStats = getAllRegions().map(r => {
    const name   = r.region.replace(/^\d+[bB]?\s*-\s*/, "");
    const caught = r.pokemons.filter(p => caughtIdSet.has(p.id)).length;
    const tot    = r.pokemons.length;
    return { name, caught, total: tot, pct: tot > 0 ? Math.round((caught / tot) * 100) : 0 };
  });

  const favPokemon = user.favoritePokemonId ? getPokemonById(user.favoritePokemonId) : null;
  const favPokemonData = favPokemon ? {
    id:        favPokemon.id,
    name:      favPokemon.name,
    imagePath: getImagePath(favPokemon.image),
    types:     favPokemon.types as string[],
  } : null;

  // Popular pokemon pour les suggestions (chargées server-side)
  const POPULAR_IDS = ["0025", "0006", "0150", "0133", "0143"];
  const allPokemon  = [...getAllRegions().flatMap(r => r.pokemons), ...getAllForms().flatMap(f => f.pokemons)];
  const popularPokemon = POPULAR_IDS
    .map(id => allPokemon.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .map(p => ({ id: p.id, name: p.name, imagePath: getImagePath(p.image), types: p.types as string[] }));

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-8">

        {/* Pokéball → Mon Shinydex */}
        <div className="flex flex-col items-center gap-2">
          <Link
            href="/shinydex/perso"
            className="group flex flex-col items-center gap-3"
            aria-label="Mon Shinydex"
          >
            <div className="relative w-36 h-36 transition-transform duration-200 group-hover:scale-105 group-active:scale-95 drop-shadow-[0_0_28px_rgba(57,154,180,0.45)]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="ballTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#399ab4" />
                    <stop offset="100%" stopColor="#35be7c" />
                  </linearGradient>
                  <linearGradient id="ballBotGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="ballCenterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#399ab4" />
                    <stop offset="100%" stopColor="#35be7c" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(57,154,180,0.55)" strokeWidth="2.5" />
                <path d="M3 50 A47 47 0 0 1 97 50 Z" fill="url(#ballTopGrad)" />
                <path d="M3 50 A47 47 0 0 0 97 50 Z" fill="url(#ballBotGrad)" />
                <rect x="3" y="45.5" width="94" height="9" fill="#0a1628" />
                <circle cx="50" cy="50" r="13" fill="#0a1628" stroke="rgba(57,154,180,0.6)" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="8" fill="url(#ballCenterGrad)" />
                <ellipse cx="28" cy="20" rx="13" ry="5.5" fill="rgba(255,255,255,0.18)" transform="rotate(-20 28 20)" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors tracking-wide uppercase">
              Mon Shinydex
            </span>
          </Link>
        </div>

        {/* Carte profil */}
        <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden">

          {/* Header */}
          <div
            className="relative px-8 pt-8 pb-6 flex flex-col items-center gap-4"
            style={{ background: "linear-gradient(135deg, rgba(57,154,180,0.08) 0%, rgba(53,190,124,0.05) 100%)" }}
          >
            <AvatarEditButton initialAvatar={avatar} initialAvatarBg={avatarBg} />
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-heading text-foreground">
                {user.hunterName ?? session.user.name ?? "Dresseur"}
              </h1>
              <div className="flex flex-col items-center gap-1.5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${roleInfo.color}`}>
                  {user.role === "ADMIN" && <Shield className="h-3 w-3" />}
                  {user.role === "STAR"  && <Star className="h-3 w-3 fill-current" />}
                  {roleInfo.label}
                </span>
                <span className="text-xs text-muted-foreground">Membre depuis {memberSince}</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-border/40 mx-6" />

          {/* Interactive — stats + info + modals */}
          <ProfileInteractive
            caughtCount={caughtCount}
            total={total}
            pct={pct}
            regionStats={regionStats}
            favoritePokemon={favPokemonData}
            favoriteRegion={user.favoriteRegion ?? null}
            shinydexDesign={design}
            popularPokemon={popularPokemon}
          />

          <div className="h-px bg-border/40 mx-6" />

          {/* Actions */}
          <div className="px-8 py-5 flex flex-wrap items-center gap-3">
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted/40 hover:bg-muted/70 border border-border/50 hover:border-border transition-all"
            >
              <Settings className="h-4 w-4" />
              Paramètres
            </Link>

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-900/20 hover:bg-red-900/30 border border-red-700/30 hover:border-red-700/50 text-red-300 transition-all"
              >
                <Shield className="h-4 w-4" />
                Dashboard Admin
              </Link>
            )}

            <div className="ml-auto">
              <SignOutButton />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
