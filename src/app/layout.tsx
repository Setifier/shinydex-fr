import type { Metadata } from "next";
import {
  Inter,
  Plus_Jakarta_Sans,
  Mochiy_Pop_One,
  Itim,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/layout/navigation";
import Sidebar from "@/components/layout/sidebar";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

// Main font for general text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Font for headings (manga/pokemon style)
const mochiyPopOne = Mochiy_Pop_One({
  variable: "--font-mochiy-pop-one",
  subsets: ["latin"],
  weight: "400",
});

// Font for links
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Font for footer
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
          <div className="relative flex min-h-screen justify-center">
            <div className="content-container relative flex w-full">
              <div className="fixed top-0 z-20 h-full w-60 bg-sidebar">
                <Sidebar />
              </div>

              <div className="ml-60 flex flex-1 flex-col">
                <div className="bg-navfoot z-10 mx-auto h-16 w-full max-w-7xl px-4 text-lg flex items-center justify-end">
                  <Navigation />
                </div>

                <main className="flex-1">{children}</main>

                <div className="bg-navfoot">
                  <div className="bg-navfoot mx-auto w-full max-w-7xl p-4 text-center text-lg">
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
