"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserRole } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

/**
 * Vérifie si l'utilisateur actuel est admin
 */
async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Non authentifié");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Accès non autorisé - Admin requis");
  }

  return session;
}

/**
 * Met à jour le rôle d'un utilisateur
 */
export async function updateUserRole(userId: string, newRole: UserRole) {
  try {
    await requireAdmin();

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erreur lors de la mise à jour",
    };
  }
}

/**
 * Récupère les statistiques du dashboard
 */
export async function getDashboardStats() {
  try {
    await requireAdmin();

    const [totalUsers, totalPosts, usersByRole] = await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
      prisma.user.groupBy({
        by: ["role"],
        _count: true,
      }),
    ]);

    // Utilisateurs créés ce mois
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const usersThisMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Posts créés ce mois
    const postsThisMonth = await prisma.post.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    return {
      success: true,
      data: {
        totalUsers,
        totalPosts,
        usersThisMonth,
        postsThisMonth,
        usersByRole: usersByRole.reduce(
          (acc, item) => {
            acc[item.role] = item._count;
            return acc;
          },
          {} as Record<UserRole, number>
        ),
      },
    };
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la récupération des statistiques",
    };
  }
}

/**
 * Récupère tous les utilisateurs avec pagination
 */
export async function getUsers(page: number = 1, limit: number = 50) {
  try {
    await requireAdmin();

    const skip = (page - 1) * limit;

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.user.count(),
    ]);

    return {
      success: true,
      data: {
        users,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Error getting users:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la récupération des utilisateurs",
    };
  }
}
