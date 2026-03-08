"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { UserAvatar } from "@/components/avatar/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_AVATAR } from "@/lib/avatars";
import { DEFAULT_AVATAR_BACKGROUND } from "@/lib/avatar-backgrounds";

const MENU_ITEMS = [
  { label: "Mon profil",    href: "/profile"   },
  { label: "Mon Shinydex",  href: "/shinydex/perso" },
  { label: "Mes amis",      href: "/friends"   },
  { label: "Paramètres",    href: "/settings"  },
  { label: "Aide & Contact",href: "/help"      },
] as const;

export function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  const displayName    = session.user.hunterName || session.user.name;
  const avatar         = session.user.avatar         || DEFAULT_AVATAR;
  const avatarBg       = session.user.avatarBackground || DEFAULT_AVATAR_BACKGROUND;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
          <UserAvatar
            avatar={avatar}
            background={avatarBg}
            size="lg"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-base font-semibold truncate">{displayName}</p>
        </div>
        <DropdownMenuSeparator />

        {MENU_ITEMS.map((item) => (
          <DropdownMenuItem
            key={item.href}
            onClick={() => router.push(item.href)}
            className="cursor-pointer text-sm"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
