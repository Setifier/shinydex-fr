import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ShinyButton } from "@/components/shiny-button";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/profile");
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl tracking-tight mb-6">
            Shinydex
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
            Votre Pokédex de Pokémon chromatiques. Créez votre collection,
            suivez votre progression et partagez avec vos amis.
          </p>
          <ShinyButton href="/auth/register">Créer mon Shinydex</ShinyButton>
        </div>

      </section>

      {/* Tagline */}
      <section className="border-y border-border/40 bg-muted/20 px-6 py-16">
        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl mb-4">
              Voyez clair dans votre avancée
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Gardez une trace de chaque Pokémon chromatique obtenu, suivez votre
              progression par région et comparez votre collection avec celle de vos
              amis.
            </p>
          </div>
          <div className="hidden lg:flex absolute -right-12 xl:-right-20 top-1/2 -translate-y-1/2">
            <Image
              src="/ui/artworks/goupix_shiny.png"
              alt="Goupix chromatique"
              width={358}
              height={316}
              className="h-36 w-auto opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl text-center mb-12">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <FeatureCard
              title="Créez votre avatar"
              description="Personnalisez votre profil avec un avatar unique parmi une sélection exclusive."
              image="/ui/examples/image_exemple.png"
              color="primary"
            />
            <FeatureCard
              title="Complétez votre Shinydex"
              description="Ajoutez chaque Pokémon chromatique obtenu et suivez votre progression par région."
              image="/ui/examples/image_exemple.png"
              color="secondary"
            />
            <FeatureCard
              title="Comparez avec vos amis"
              description="Invitez vos amis et comparez vos collections pour voir qui est le meilleur chasseur."
              image="/ui/examples/image_exemple.png"
              color="secondary"
            />
            <FeatureCard
              title="Faites valider votre Shinydex"
              description="Soumettez votre collection pour validation et obtenez un badge officiel."
              image="/ui/examples/image_exemple.png"
              color="primary"
            />
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="border-y border-border/40 bg-muted/20 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl mb-4">
            Débloquez des récompenses
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
            Plus vous progressez, plus vous débloquez de nouveaux avatars et
            designs exclusifs pour votre Shinydex. Montrez votre dévouement !
          </p>
          <div className="flex justify-center gap-6">
            <Image
              src="/ui/artworks/Elekable_shiny.png"
              alt="Récompense"
              width={180}
              height={180}
              className="w-32 sm:w-40 h-auto opacity-90"
            />
            <Image
              src="/ui/artworks/goupix_shiny.png"
              alt="Récompense"
              width={180}
              height={180}
              className="w-32 sm:w-40 h-auto opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-8">
            Rejoignez la communauté et commencez votre aventure chromatique dès
            aujourd&apos;hui.
          </p>
          <ShinyButton href="/auth/register">Créer mon Shinydex</ShinyButton>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  title,
  description,
  image,
  color = "primary",
}: {
  title: string;
  description: string;
  image: string;
  color?: "primary" | "secondary";
}) {
  return (
    <div className="group rounded-xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-lg">
      <div className="flex items-start gap-3 mb-4">
        <PokeBallIcon className={`size-7 shrink-0 mt-0.5 ${color === "secondary" ? "text-secondary" : "text-primary"}`} />
        <div>
          <h3 className="text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-border/40 shadow-sm">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}

function PokeBallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" fill="none" />
      <path d="M2 50 A48 48 0 0 1 98 50 Z" fill="currentColor" />
      <rect x="2" y="46" width="96" height="8" fill="currentColor" opacity="0.8" />
      <circle cx="50" cy="50" r="14" fill="currentColor" stroke="currentColor" strokeWidth="4" />
      <circle cx="50" cy="50" r="8" fill="var(--background)" />
    </svg>
  );
}
