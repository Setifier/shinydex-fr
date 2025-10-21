import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/generated/prisma";

interface RoleBadgeProps {
  role: UserRole;
}

const roleConfig: Record<
  UserRole,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }
> = {
  ADMIN: { label: "Admin", variant: "destructive" },
  MODERATOR: { label: "Modérateur", variant: "warning" },
  EDITOR: { label: "Éditeur", variant: "secondary" },
  STAR: { label: "Star", variant: "success" },
  USER: { label: "Utilisateur", variant: "outline" },
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const config = roleConfig[role];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
