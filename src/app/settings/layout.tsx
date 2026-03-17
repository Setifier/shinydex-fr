import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReturnButton } from "@/components/return-button";
import { SettingsSidebar } from "@/components/settings/settings-sidebar";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login");

  return (
    <div className="container mx-auto max-w-screen-lg px-6 py-16">
      <div className="mb-10">
        <ReturnButton href="/profile" />
      </div>

      <div className="flex gap-10">
        <aside className="w-52 shrink-0 space-y-5">
          <div>
            <h1 className="text-base font-semibold">Paramètres</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Préférences &amp; compte
            </p>
          </div>
          <SettingsSidebar />
        </aside>
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
