import Image from "next/image";
import { ReturnButton } from "@/components/return-button";
import { VerifyEmailContent } from "@/components/verify-email-content";

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-8">
        <div className="w-full mb-6">
          <ReturnButton href="/" />
        </div>
        <h1 className="mb-12 text-center font-heading text-3xl text-primary">
          Vérifie ta boîte mail !
        </h1>

        <div className="mb-8 flex w-full max-w-md flex-col items-center bg-form gap-4 rounded-xl p-6 shadow-lg">
          <VerifyEmailContent />
        </div>

        <Image
          src="/ui/artworks/goupix_shiny.png"
          alt="Goupix chromatique"
          width={320}
          height={320}
          className="w-64 lg:w-72"
          priority
        />
      </div>
    </main>
  );
}
