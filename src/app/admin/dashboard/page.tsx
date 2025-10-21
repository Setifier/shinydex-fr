import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { StatsCard } from "@/components/admin/stats-card";
import { UsersTable } from "@/components/admin/users-table";
import { getDashboardStats, getUsers } from "@/actions/admin.action";
import {
  Users,
  FileText,
  UserPlus,
  TrendingUp,
  Shield,
  Star,
  Edit3,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Vérifier si l'utilisateur est connecté et est admin
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/");

  // Récupérer les données du dashboard
  const [statsResult, usersResult] = await Promise.all([
    getDashboardStats(),
    getUsers(1, 50),
  ]);

  if (!statsResult.success || !usersResult.success) {
    return (
      <div className="px-8 py-16 container mx-auto max-w-screen-xl">
        <h1 className="text-destructive">
          Erreur lors du chargement des données
        </h1>
      </div>
    );
  }

  const stats = statsResult.data!;
  const { users } = usersResult.data!;

  // Calculer les tendances (exemple simple)
  const userTrend =
    stats.totalUsers > 0
      ? Math.round((stats.usersThisMonth / stats.totalUsers) * 100)
      : 0;
  const postTrend =
    stats.totalPosts > 0
      ? Math.round((stats.postsThisMonth / stats.totalPosts) * 100)
      : 0;

  return (
    <div className="px-8 py-12 container mx-auto max-w-screen-xl space-y-8">
      {/* En-tête du dashboard */}
      <div className="space-y-2">
        <h1 className="text-left">Dashboard Admin</h1>
        <p className="text-muted-foreground text-left">
          Gérez les utilisateurs et surveillez les statistiques de la plateforme
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Utilisateurs"
          value={stats.totalUsers}
          description={`+${stats.usersThisMonth} ce mois`}
          icon={Users}
          trend={{ value: userTrend, isPositive: userTrend > 0 }}
        />
        <StatsCard
          title="Total Posts"
          value={stats.totalPosts}
          description={`+${stats.postsThisMonth} ce mois`}
          icon={FileText}
          trend={{ value: postTrend, isPositive: postTrend > 0 }}
        />
        <StatsCard
          title="Nouveaux ce mois"
          value={stats.usersThisMonth}
          description="Utilisateurs actifs"
          icon={UserPlus}
        />
        <StatsCard
          title="Croissance"
          value={`${userTrend}%`}
          description="Taux de croissance mensuel"
          icon={TrendingUp}
        />
      </div>

      {/* Répartition par rôles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-left">
            Répartition des rôles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {/* TODO: Ces cartes de rôles pourraient être extraites dans un composant RoleStatsCard */}
            <div className="flex items-center gap-3 rounded-lg border p-4 transition-all hover:shadow-md">
              <Shield className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Admins</p>
                <p className="text-2xl font-bold">
                  {stats.usersByRole.ADMIN || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4 transition-all hover:shadow-md">
              <Shield className="h-8 w-8 text-chart-1" />
              <div>
                <p className="text-sm text-muted-foreground">Modérateurs</p>
                <p className="text-2xl font-bold">
                  {stats.usersByRole.MODERATOR || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4 transition-all hover:shadow-md">
              <Edit3 className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Éditeurs</p>
                <p className="text-2xl font-bold">
                  {stats.usersByRole.EDITOR || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4 transition-all hover:shadow-md">
              <Star className="h-8 w-8 text-chart-1" />
              <div>
                <p className="text-sm text-muted-foreground">Stars</p>
                <p className="text-2xl font-bold">
                  {stats.usersByRole.STAR || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4 transition-all hover:shadow-md">
              <User className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Utilisateurs</p>
                <p className="text-2xl font-bold">
                  {stats.usersByRole.USER || 0}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table des utilisateurs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-left">
            Gestion des utilisateurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTable users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
