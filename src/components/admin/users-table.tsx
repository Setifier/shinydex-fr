"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RoleBadge } from "./role-badge";
import { UserRole } from "@/generated/prisma";
import { toast } from "sonner";
import { updateUserRole } from "@/actions/admin.action";

// TODO: Ce composant pourrait être découpé en plusieurs sous-composants :
// - UserRow : Une ligne du tableau avec ses actions
// - RoleSelector : Un select ou menu déroulant pour changer le rôle
// - UserAvatar : Avatar avec fallback personnalisé

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
  createdAt: Date;
}

interface UsersTableProps {
  users: User[];
}

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "USER", label: "Utilisateur" },
  { value: "STAR", label: "Star" },
  { value: "EDITOR", label: "Éditeur" },
  { value: "MODERATOR", label: "Modérateur" },
  { value: "ADMIN", label: "Admin" },
];

export function UsersTable({ users }: UsersTableProps) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setIsUpdating(userId);
    try {
      const result = await updateUserRole(userId, newRole);

      if (result.success) {
        toast.success("Rôle mis à jour avec succès");
      } else {
        toast.error(result.error || "Erreur lors de la mise à jour");
      }
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Utilisateur</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rôle actuel</TableHead>
          <TableHead>Inscription</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const initials = user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          return (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.image || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <RoleBadge role={user.role} />
              </TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <select
                    className="rounded-md border bg-background px-3 py-1.5 text-sm outline-none ring-ring focus:ring-2 disabled:opacity-50"
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value as UserRole)
                    }
                    disabled={isUpdating === user.id}
                  >
                    {ROLE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
