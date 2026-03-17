import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Shield, Settings, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/components/sign-out-button";
import { AvatarEditButton } from "@/components/profile/avatar-edit-button";
import {
  getAllRegions,
  getAllForms,
  getImagePath,
  getPokemonById,
  getRegionalForms,
} from "@/lib/pokemon-data";
import { DEFAULT_AVATAR } from "@/lib/avatars";
import { ProfileInteractive } from "@/components/profile/profile-interactive";
import { PokeballLink } from "@/components/profile/pokeball-link";
import { BIO_PHRASES } from "@/lib/bio-phrases";
import { COUNTRIES, getFlagUrl, getFlagSrcSet } from "@/lib/countries";

function getTotalCount() {
  const regionTotal = getAllRegions().reduce((acc, r) => acc + r.pokemons.length, 0);
  const formTotal = getRegionalForms().reduce((acc, f) => acc + f.pokemons.length, 0);
  return regionTotal + formTotal;
}

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  USER:      { label: "Dresseur",    color: "bg-slate-700/60 text-slate-300 border-slate-600/40" },
  EDITOR:    { label: "Éditeur",     color: "bg-blue-900/40 text-blue-300 border-blue-600/40" },
  MODERATOR: { label: "Modérateur",  color: "bg-purple-900/40 text-purple-300 border-purple-600/40" },
  STAR:      { label: "Vedette",     color: "bg-yellow-900/40 text-yellow-300 border-yellow-600/40" },
  ADMIN:     { label: "Admin",       color: "bg-red-900/40 text-red-300 border-red-600/40" },
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const [user, caughtPokemons] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        hunterName: true,
        avatar: true,
        avatarBackground: true,
        biography: true,
        pronouns: true,
        country: true,
        favoritePokemonId: true,
        favoriteRegion: true,
        favoriteGame: true,
        showFavoritePokemon: true,
        showFavoriteRegion: true,
        showFavoriteGame: true,
        shinydexDesign: true,
        role: true,
        createdAt: true,
        birthDay: true,
        birthMonth: true,
      },
    }),
    prisma.caughtPokemon.findMany({
      where: { userId: session.user.id },
      select: { pokemonId: true },
    }),
  ]);

  if (!user) redirect("/auth/login");

  const total        = getTotalCount();
  const caughtCount  = caughtPokemons.length;
  const pct          = total > 0 ? Math.round((caughtCount / total) * 100) : 0;
  const avatar       = user.avatar ?? DEFAULT_AVATAR;
  const avatarBg     = user.avatarBackground ?? "#1e293b";
  const design       = user.shinydexDesign ?? "classic";
  const roleInfo     = ROLE_LABELS[user.role ?? "USER"] ?? ROLE_LABELS.USER;
  const isAdmin      = user.role === "ADMIN";

  const memberSince = new Intl.DateTimeFormat("fr-FR", {
    month: "long", year: "numeric",
  }).format(user.createdAt);

  // Date d'anniversaire formatée
  const MONTHS_FR = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  const birthday = (user.birthDay && user.birthMonth)
    ? `${user.birthDay} ${MONTHS_FR[user.birthMonth - 1]}`
    : null;

  // Résoudre les IDs de phrases en texte
  const bioPhrases = (user.biography ?? [])
    .map((id) => BIO_PHRASES.find((p) => p.id === id)?.text)
    .filter((t): t is string => !!t);

  // Résoudre le pays
  const countryData = user.country
    ? COUNTRIES.find((c) => c.code === user.country) ?? null
    : null;

  // Stats par région
  const caughtIdSet = new Set(caughtPokemons.map((cp) => cp.pokemonId));
  const regionStats = getAllRegions().map((r) => {
    const name   = r.region.replace(/^\d+[bB]?\s*-\s*/, "");
    const caught = r.pokemons.filter((p) => caughtIdSet.has(p.id)).length;
    const tot    = r.pokemons.length;
    return { name, caught, total: tot, pct: tot > 0 ? Math.round((caught / tot) * 100) : 0 };
  });

  // Pokémon favori
  const favPokemon     = user.favoritePokemonId ? getPokemonById(user.favoritePokemonId) : null;
  const favPokemonData = favPokemon
    ? { id: favPokemon.id, name: favPokemon.name, imagePath: getImagePath(favPokemon.image), types: favPokemon.types as string[] }
    : null;

  // Suggestions Pokémon populaires
  const POPULAR_IDS = ["0025", "0006", "0150", "0133", "0143"];
  const allPokemon  = [
    ...getAllRegions().flatMap((r) => r.pokemons),
    ...getAllForms().flatMap((f)  => f.pokemons),
  ];
  const popularPokemon = POPULAR_IDS
    .map((id) => allPokemon.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .map((p) => ({ id: p.id, name: p.name, imagePath: getImagePath(p.image), types: p.types as string[] }));

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-xl space-y-10">

        {/* ── Identité ─────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6 text-center">
          <PokeballLink href="/shinydex/perso" />

          <div className="mt-4">
            <AvatarEditButton initialAvatar={avatar} initialAvatarBg={avatarBg} />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-heading tracking-tight">
              {user.hunterName ?? session.user.name ?? "Dresseur"}
            </h1>

            {/* Badge rôle */}
            <div className="flex justify-center">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${roleInfo.color}`}>
                {user.role === "ADMIN" && <Shield className="size-3.5" />}
                {user.role === "STAR"  && <Star   className="size-3.5 fill-current" />}
                {roleInfo.label}
              </span>
            </div>

            {/* Pays */}
            {countryData && (
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-muted/60 border border-border/50 text-muted-foreground">
                  <img
                    src={getFlagUrl(countryData.code, 20)}
                    srcSet={getFlagSrcSet(countryData.code)}
                    alt={countryData.code}
                    width={16}
                    height={12}
                    className="rounded-[2px] object-cover shrink-0"
                  />
                  {countryData.name}
                </span>
              </div>
            )}

            <p className="text-xs text-muted-foreground">Membre depuis {memberSince}</p>
          </div>
        </div>

        {/* ── Biographie (bulles BD) ────────────────────── */}
        {bioPhrases.length > 0 && (
          <div className="space-y-5 px-2">
            {bioPhrases.map((text, i) => (
              <div
                key={i}
                className={`relative px-6 py-4 rounded-3xl border-2 border-foreground/80 bg-card text-foreground font-medium text-sm leading-relaxed
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,0.7)]
                  ${i % 2 === 0 ? "ml-2 mr-8 rounded-tl-sm" : "ml-8 mr-2 rounded-tr-sm"}`}
              >
                {/* Pointe de bulle */}
                <span
                  className={`absolute bottom-[-18px] w-4 h-4 border-b-2 border-foreground/80
                    ${i % 2 === 0
                      ? "left-6 border-l-2 [clip-path:polygon(0_0,100%_0,0_100%)] bg-card"
                      : "right-6 border-r-2 [clip-path:polygon(0_0,100%_0,100%_100%)] bg-card"
                    }`}
                />
                {text}
              </div>
            ))}
          </div>
        )}

        {/* ── Section interactive ───────────────────────── */}
        <ProfileInteractive
          caughtCount={caughtCount}
          total={total}
          pct={pct}
          regionStats={regionStats}
          favoritePokemon={favPokemonData}
          favoriteRegion={user.favoriteRegion ?? null}
          favoriteGame={user.favoriteGame ?? null}
          showFavoritePokemon={user.showFavoritePokemon ?? true}
          showFavoriteRegion={user.showFavoriteRegion ?? true}
          showFavoriteGame={user.showFavoriteGame ?? true}
          shinydexDesign={design}
          popularPokemon={popularPokemon}
          birthday={birthday}
        />

        {/* ── Actions ──────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/40">
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted/40 hover:bg-muted/70 border border-border/50 hover:border-border transition-all"
          >
            <Settings className="size-4" />
            Paramètres
          </Link>

          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-900/20 hover:bg-red-900/30 border border-red-700/30 text-red-300 transition-all"
            >
              <Shield className="size-4" />
              Admin
            </Link>
          )}

          <div className="ml-auto">
            <SignOutButton />
          </div>
        </div>

      </div>
    </div>
  );
}
