"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export function Navigation() {
  return (
    <div className="flex h-full">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/" className="nav-link text-[1.15rem]">
                Accueil
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="nav-link text-lg">
              Communauté
            </NavigationMenuTrigger>
            <NavigationMenuContent className="right-0 left-auto">
              <ul className="grid w-[400px] gap-3 p-2 grid-cols-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="nav-link text-[1.15rem] text-center"
                    >
                      Le Journal
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="nav-link text-[1.15rem] text-center"
                    >
                      Classement
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/shinydex" className="nav-link text-[1.15rem]">
                Shinydex
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="nav-link text-lg">
              Connexion
            </NavigationMenuTrigger>
            <NavigationMenuContent className="right-0 left-auto">
              <ul className="grid w-[200px] gap-3 p-2 grid-cols-1">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/auth/login"
                      className="nav-link text-[1.15rem] text-center"
                    >
                      Se connecter
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/auth/register"
                      className="nav-link text-[1.15rem] text-center"
                    >
                      S&apos;inscrire
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
