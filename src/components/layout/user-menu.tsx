"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, BookOpen, Users, Settings, HelpCircle, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const MENU_ITEMS = [
  { label: "Mon profil", href: "/profile", icon: User },
  { label: "Mon Shinydex", href: "/shinydex", icon: BookOpen },
  { label: "Mes amis", href: "/friends", icon: Users },
  { label: "Paramètres", href: "/settings", icon: Settings },
  { label: "Aide & Contact", href: "/help", icon: HelpCircle },
] as const;

export function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  const userName = session.user.name;
  // Utilise uniquement les avatars locaux de l'application
  const avatarPath = "/avatars/default.png";

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Déconnecté avec succès !");
          router.push("/auth/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="size-9 cursor-pointer border-2 border-primary/30 hover:border-primary transition-colors">
            <Image
              src={avatarPath}
              alt={userName}
              width={36}
              height={36}
              className="aspect-square size-full object-cover"
            />
            <AvatarFallback className="text-xs font-medium">
              {userName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium truncate">{userName}</p>
        </div>
        <DropdownMenuSeparator />

        {MENU_ITEMS.map((item) => (
          <DropdownMenuItem
            key={item.href}
            onClick={() => router.push(item.href)}
            className="cursor-pointer gap-2"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
