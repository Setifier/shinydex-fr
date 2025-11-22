import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GetStartedButton } from "@/components/get-started-button";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main>
      {/* Section Hero/Banner */}
      <section className="hero-section">
        <div className="w-full">
          <Image
            src="/ui/backgrounds/BannerPkmn.png"
            alt="Header"
            width={1920}
            height={128}
            priority
            className="w-full object-cover h-[200px]"
          />
        </div>
      </section>
      <div className="mt-8 flex w-full flex-grow flex-col items-center">
        {/* Section Introduction */}
        <section className="introduction-section">
          <div className="text-center">
            <h1 className="mb-2">Bienvenue sur</h1>
            <h1 className="text-5xl text-secondary">Shinydex</h1>
          </div>
          <div className="mb-[50px] mt-4 grid w-full max-w-4xl grid-cols-12 items-center">
            <div className="col-span-2" />
            <p className="col-span-8 text-center text-xl">
              Découvrez <strong>Shinydex</strong>, l&apos;outil interactif qui
              vous offre la possibilité de concevoir votre propre Pokédex de{" "}
              <strong>Pokémon chromatiques</strong> et de le partager avec vos
              amis ainsi qu&apos;avec la communauté de passionnés de Shasse.
            </p>
            <Image
              src="/ui/artworks/goupix_shiny.png"
              alt="Goupix chromatique"
              width={358}
              height={316}
              className="col-span-2 justify-self-center w-32 h-auto"
              priority
            />
          </div>
          <div className="mt-8 flex justify-center">
            <GetStartedButton />
          </div>
        </section>

        {/* Sections visibles uniquement si non connecté */}
        {!session && (
          <>
            {/* Section Navigation/CTA */}
            <section>
              <div className="relative my-12 flex w-full flex-col items-center justify-center">
                <span className="text-block">
                  Pour bien démarrer, nous vous conseillons de suivre notre{" "}
                  <Link href="/guide" className="link-underline-animate">
                    guide d&apos;utilisation
                  </Link>{" "}
                  et de suivre toutes les étapes pour la création de votre
                  compte.
                </span>
                <span className="text-block">
                  Si ce n&apos;est pas votre première visite, vous pouvez
                  simplement{" "}
                  <Link href="/auth/login" className="link-underline-animate">
                    vous connecter
                  </Link>
                  .
                </span>
                <span className="text-block">
                  Si vous préférez simplement explorer sans créer de compte,
                  vous pouvez librement parcourir les Shinydex de la{" "}
                  <Link href="/community" className="link-underline-animate">
                    communauté
                  </Link>{" "}
                  ainsi que de découvrir leurs créateurs.
                </span>
              </div>
            </section>

            {/* Section Fonctionnalités */}
            <section className="grid w-full max-w-4xl grid-cols-2 gap-8">
              <div className="card-guide">
                <h3>Créez votre avatar</h3>
                <Image
                  src="/ui/examples/image_exemple.png"
                  alt="Exemple de création d'avatar"
                  width={256}
                  height={256}
                  className="mx-auto h-52 w-full rounded-xl object-cover"
                />
              </div>
              <div className="card-guide">
                <h3>Complétez votre Shinydex</h3>
                <Image
                  src="/ui/examples/image_exemple.png"
                  alt="Exemple de Shinydex complété"
                  width={256}
                  height={256}
                  className="mx-auto h-52 w-full rounded-xl object-cover"
                />
              </div>
              <div className="card-guide">
                <h3>Invitez vos amis</h3>
                <Image
                  src="/ui/examples/image_exemple.png"
                  alt="Exemple d'invitation d'amis"
                  width={256}
                  height={256}
                  className="mx-auto h-52 w-full rounded-xl object-cover"
                />
              </div>
              <div className="card-guide">
                <h3>Soumettez votre shasse</h3>
                <Image
                  src="/ui/examples/image_exemple.png"
                  alt="Exemple de soumission de shasse"
                  width={256}
                  height={256}
                  className="mx-auto h-52 w-full rounded-xl object-cover"
                />
              </div>
            </section>
          </>
        )}

        {/* Section Footer décoration */}
        <section className="footer-decoration">
          <Image
            src="/ui/artworks/28-Shiny-Sablaireau.png"
            alt="Sablaireau chromatique"
            width={256}
            height={256}
          />
        </section>
      </div>
    </main>
  );
}
