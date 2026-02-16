import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";
import { ReturnButton } from "@/components/return-button";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div>
        <ReturnButton href="/" />
      </div>

      <div className="space-y-8">
        <h1>Profil</h1>
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Button asChild variant="destructive" size="lg">
            <Link href="/admin/dashboard">
              <Shield className="mr-2 h-5 w-5" />
              Tableau de bord Admin
            </Link>
          </Button>
        )}
        <SignOutButton />
      </div>

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
