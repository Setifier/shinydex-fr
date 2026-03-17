import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Lock } from "lucide-react";
import { BioPhrasesPicker } from "@/components/settings/bio-phrases-picker";
import { PronounsPicker } from "@/components/settings/pronouns-picker";
import { CountryPicker } from "@/components/settings/country-picker";
import { GamePicker } from "@/components/settings/game-picker";
import { VisibilityToggle } from "@/components/settings/visibility-toggle";
import { FavoritePokemonSetting } from "@/components/settings/favorite-pokemon-setting";
import { FavoriteRegionSetting } from "@/components/settings/favorite-region-setting";
import { getPokemonById, getImagePath } from "@/lib/pokemon-data";

export default async function SettingsProfilPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      hunterName: true,
      email: true,
      birthDay: true,
      birthMonth: true,
      biography: true,
      pronouns: true,
      country: true,
      emailPrivate: true,
      favoritePokemonId: true,
      favoriteRegion: true,
      favoriteGame: true,
      showFavoritePokemon: true,
      showFavoriteRegion: true,
      showFavoriteGame: true,
    },
  });

  if (!user) redirect("/auth/login");

  const favPokemonRaw = user.favoritePokemonId ? getPokemonById(user.favoritePokemonId) : null;
  const initialPokemon = favPokemonRaw
    ? { id: favPokemonRaw.id, name: favPokemonRaw.name, imagePath: getImagePath(favPokemonRaw.image), types: favPokemonRaw.types as string[] }
    : null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium">Profil public</h2>
        <p className="text-sm text-muted-foreground">
          Ces informations sont visibles sur votre profil public.
        </p>
      </div>

      {/* Nom de dresseur */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium border-b border-border pb-2">Nom de dresseur</h3>
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-muted/20">
          <span className="text-sm text-muted-foreground flex-1">{user.hunterName ?? "—"}</span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="size-3.5" />
            Non modifiable
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Le nom de dresseur est permanent. Pour le modifier, contactez le{" "}
          <a href="mailto:support@shinydex.fr" className="text-primary underline underline-offset-2 hover:no-underline">
            support
          </a>
          .
        </p>
      </section>

      {/* Date d'anniversaire */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium border-b border-border pb-2">Date d&apos;anniversaire</h3>
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-muted/20">
          <span className="text-sm text-muted-foreground flex-1">
            {user.birthDay && user.birthMonth
              ? `${user.birthDay} ${["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"][user.birthMonth - 1]}`
              : "—"}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="size-3.5" />
            Non modifiable
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          La date d&apos;anniversaire est permanente. Pour la modifier, contactez le{" "}
          <a href="mailto:support@shinydex.fr" className="text-primary underline underline-offset-2 hover:no-underline">
            support
          </a>
          .
        </p>
      </section>

      {/* Adresse e-mail */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium border-b border-border pb-2">Confidentialité</h3>
        <VisibilityToggle
          field="emailPrivate"
          initialValue={user.emailPrivate ?? true}
          label="Adresse e-mail privée"
          description="Votre e-mail ne sera pas visible sur votre profil public."
          invertedMeaning={false}
        />
      </section>

      {/* Biographie */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium border-b border-border pb-2">Biographie</h3>
        <p className="text-sm text-muted-foreground">
          Choisissez jusqu&apos;à 2 phrases qui vous correspondent.
        </p>
        <BioPhrasesPicker initialSelected={user.biography ?? []} />
      </section>

      {/* Pronoms */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium border-b border-border pb-2">Pronoms</h3>
        <PronounsPicker initialValue={user.pronouns ?? null} />
      </section>

      {/* Pays */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium border-b border-border pb-2">Pays</h3>
        <p className="text-xs text-muted-foreground">
          Pas nécessairement votre pays de résidence — votre pays Pokémon préféré par exemple.
        </p>
        <CountryPicker initialValue={user.country ?? null} />
      </section>

      {/* Pokémon favori */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="text-sm font-medium">Pokémon favori</h3>
          <VisibilityToggle
            field="showFavoritePokemon"
            initialValue={user.showFavoritePokemon ?? true}
            label="Afficher"
          />
        </div>
        <FavoritePokemonSetting initialPokemon={initialPokemon} />
      </section>

      {/* Région favorite */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="text-sm font-medium">Région favorite</h3>
          <VisibilityToggle
            field="showFavoriteRegion"
            initialValue={user.showFavoriteRegion ?? true}
            label="Afficher"
          />
        </div>
        <FavoriteRegionSetting initialRegion={user.favoriteRegion ?? null} />
      </section>

      {/* Jeu favori */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="text-sm font-medium">Jeu Pokémon favori</h3>
          <VisibilityToggle
            field="showFavoriteGame"
            initialValue={user.showFavoriteGame ?? true}
            label="Afficher"
          />
        </div>
        <GamePicker initialValue={user.favoriteGame ?? null} />
      </section>
    </div>
  );
}
