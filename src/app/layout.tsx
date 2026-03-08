import type { Metadata } from "next";
import {
  Inter,
  Plus_Jakarta_Sans,
  Mochiy_Pop_One,
  Itim,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/layout/navigation";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { BackgroundBlobs } from "@/components/layout/background-blobs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mochiyPopOne = Mochiy_Pop_One({
  variable: "--font-mochiy-pop-one",
  subsets: ["latin"],
  weight: "400",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const itim = Itim({
  variable: "--font-itim",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Shinydex",
  description:
    "Créez votre Shinydex de Pokémon chromatiques, suivez vos chasses et comparez avec vos amis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${mochiyPopOne.variable} ${plusJakartaSans.variable} ${itim.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundBlobs />
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-30 w-full px-4 pt-3">
              <Navigation />
            </header>

            <main className="flex-1">{children}</main>

            <Footer />
          </div>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
