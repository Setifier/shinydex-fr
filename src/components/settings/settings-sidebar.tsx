"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Sparkles, UserCog, Monitor, Globe } from "lucide-react";

const groups = [
  {
    label: "Compte",
    tabs: [
      { href: "/settings/compte", label: "Mon compte", icon: UserCog },
      { href: "/settings/profil", label: "Profil public", icon: Globe },
    ],
  },
  {
    label: "Personnalisation",
    tabs: [
      { href: "/settings/avatar", label: "Avatar", icon: User },
      { href: "/settings/shinydex", label: "Shinydex", icon: Sparkles },
      { href: "/settings/affichage", label: "Affichage", icon: Monitor },
    ],
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-4">
      {groups.map((group) => (
        <div key={group.label} className="space-y-0.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-1.5">
            {group.label}
          </p>
          {group.tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="size-4" />
                {tab.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
