# Shinydex-fr — État du projet
> Document interne pour Claude. À supprimer avant la mise en production.
> Dernière mise à jour : 2026-03-09

---

## Vue d'ensemble

Application web communautaire Next.js 15 pour les collectionneurs de Pokémon chromatiques (shiny).
- **URL dev** : http://localhost:3000
- **Stack** : Next.js 15 (App Router) · TypeScript · Prisma · PostgreSQL (Neon) · Better-Auth · Tailwind CSS 4 · shadcn/ui
- **Déploiement cible** : Vercel + Neon (DB) + Upstash Redis (rate limiting)

---

## Structure des routes

```
/                     → Landing page (redirect vers /profile si connecté)
/auth/login           → Connexion email / Google / Discord
/auth/register        → Inscription email
/auth/verify-email    → Page d'attente vérification email
/onboarding           → Onboarding 4 étapes (protégé, redirige si onboardingCompleted=true)
/profile              → Profil utilisateur (protégé)
/settings             → Paramètres avatar + design Shinydex (protégé)
/shinydex             → Shinydex public (ouvert)
/shinydex/perso       → Shinydex personnel (protégé)
/admin                → Dashboard admin (protégé, role=ADMIN)
```

---

## Fonctionnalités — État

### ✅ Auth complète
- Email/mot de passe avec vérification obligatoire
- OAuth Google + Discord
- Mot de passe oublié / reset
- Rate limiting Upstash Redis (5/15min sign-in, 3/h sign-up, 3/h forgot-pwd)
  - ⚠️ Les clés Upstash ne sont PAS dans le .env local (warnings dans le terminal, non bloquant en dev)
- Sessions 30 jours, cookie HTTP-only
- Middleware : protège /profile, /settings, /admin, /onboarding
- Rôles : USER, EDITOR, MODERATOR, STAR, ADMIN
- Admin auto via `ADMIN_EMAILS` dans .env
- Validation domaine email (gmail, yahoo, outlook, icloud, hotmail)
- Argon2id pour le hashing des mots de passe

### ✅ Onboarding — 4 étapes
- **Step 1** : Nom de collectionneur (unique, validé) + date de naissance
- **Step 2** : Pokémon favori (autocomplete) + région favorite
- **Step 3** : Choix avatar (4 avatars PNG transparents) + couleur de fond (palette 40 couleurs HSL)
- **Step 4** : Design Shinydex (picker visuel avec aperçu screenshot) + import collection existante

### ✅ Shinydex public (/shinydex)
- Grille interactive de 1000+ Pokémon shiny
- Navigation par région (Kanto → Paldea) ou par forme (Méga, Gigamax, régionales…)
- Recherche par nom ou numéro
- Grille ajustable (3 à 15 colonnes)
- Modal de détail (types, talents, taille, poids, description)
- Détection automatique de la région visible au scroll

### ✅ Système d'avatars
- 4 avatars PNG transparents : serena, aldo, ludvina, pierre (`/public/avatars/`)
- Fond coloré personnalisable (palette 40 couleurs)
- Composant `UserAvatar` réutilisable (cercle + fond + contour gris)
- Modifiable dans l'onboarding (step 3) ET dans /settings
- Affiché dans la navigation (user menu)

### ✅ Admin dashboard
- Stats : nb utilisateurs, nouveaux du mois, taux de croissance, répartition par rôle
- Table de gestion des utilisateurs (changement de rôle)
- Protégé à 3 niveaux (middleware + page + server action)

### ✅ Shinydex personnel (/shinydex/perso)
- Page plein-écran avec scroll verrouillé (body overflow:hidden)
- **6 designs visuels** : Classic, Terminal, Néon, Cristal Rose, Acier Cobalt, Manga
  - Chaque design a son propre cadre CSS (surface + device + bars + screen-area)
  - Boutons retour + paramètres dans le header de chaque design (36px, relief physique au hover/active)
- Affichage des 11 régions + 4 formes régionales (Alola/Galar/Hisui/Paldea)
  - Vue régions ↔ vue formes : toggle via chips cliquables
  - Chips de stats (X/Y %) par région et par forme
- Grille ajustable : 5 tailles (6/9/12/15/18 colonnes), défaut 12 desktop / 9 mobile
- Recherche par nom ou numéro
- Sections collapsibles par région
- Capture Pokémon : bouton "⭐ Capturé !" avec optimistic update
- Annulation de capture : bouton RotateCcw en bas à droite de la modale
- **Modale design-cohérente** : chaque design a ses propres CSS vars (card bg, info sections, form select, nav buttons, couleurs, glows)

### ✅ Paramètres (/settings)
- Design Shinydex : picker visuel 6 designs avec **auto-save** au clic (sans bouton "Enregistrer")
- Modification avatar + fond de couleur

### 🚧 Profil (/profile)
- Page minimaliste (nom + bouton déconnexion + lien admin si admin)
- À compléter : carte dresseur, stats, collection

---

## Fichiers clés

### Auth & Config
- `src/lib/auth.ts` — Configuration Better-Auth
- `src/lib/auth-client.ts` — Client Better-Auth côté navigateur
- `src/middleware.ts` — Protection des routes + redirection onboarding
- `prisma/schema.prisma` — Schéma DB

### Composants Avatar
- `src/components/avatar/user-avatar.tsx` — Composant réutilisable
- `src/components/avatar/avatar-background-picker.tsx` — Palette 40 couleurs
- `src/lib/avatars.ts` — Liste des avatars disponibles
- `src/lib/avatar-backgrounds.ts` — Palette de couleurs (triée HSL)

### Shinydex personnel
- `src/app/shinydex/perso/page.tsx` — Page serveur (charge caughtIds + shinydexDesign)
- `src/components/shinydex/personal-shinydex.tsx` — Composant principal (state, grille, chips)
- `src/components/shinydex/shinydex-design-wrapper.tsx` — Encapsule le contenu dans le design choisi
- `src/components/shinydex/personal-pokemon-card.tsx` — Carte individuelle
- `src/components/shinydex/personal-pokemon-modal.tsx` — Modale détail (design-aware)
- `src/components/shinydex/shinydex-columns-slider.tsx` — Slider colonnes
- `src/lib/shinydex-designs.ts` — Liste des 6 designs (valeur, label, description)

### Paramètres
- `src/app/settings/page.tsx` — Page paramètres
- `src/components/settings/shinydex-design-customizer.tsx` — Picker avec auto-save
- `src/components/shinydex/shinydex-design-picker.tsx` — Grille de sélection visuelle
- `src/actions/update-shinydex-design.action.ts` — Server Action sauvegarde design
- `src/actions/catch-pokemon.action.ts` — Marquer un Pokémon capturé
- `src/actions/uncatch-pokemon.action.ts` — Annuler la capture d'un Pokémon

### Styles
- `src/app/globals.css` — Toutes les classes CSS custom (designs, modales, cards)
  - Section "DESIGN: Classic/Terminal/Neon/Rose/Cobalt/Manga" par design
  - Section "MODALES — Styles par design" avec CSS vars + overrides

### Données Pokémon
- `src/lib/pokemon-data.ts` — Fonctions pour accéder aux données JSON
- `src/types/pokemon.ts` — Types TypeScript
- `/public/pokemon/shiny/` — Images shiny par région
- `/public/avatars/` — Avatars utilisateurs
- `/public/assets/screenshot.png` — Capture d'écran du Shinydex (aperçus picker)

---

## Schéma DB — Champs notables (model User)

```prisma
hunterName          String?         // Nom de collectionneur (unique, lettres seules)
birthDay            Int?            // Jour de naissance
birthMonth          Int?            // Mois de naissance
favoritePokemonId   String?         // ID du Pokémon favori
favoriteRegion      String?         // Région favorite
avatar              String?  @default("/avatars/serena.png")
avatarBackground    String?  @default("#1e293b")
shinydexDesign      String?  @default("classic")
onboardingCompleted Boolean  @default(false)
role                UserRole @default(USER)
```

Model CaughtPokemon : `userId + pokemonId` (unique constraint, les données shiny restent en JSON statique)

---

## Variables d'environnement (.env)

```env
DATABASE_URL=           # Neon PostgreSQL
BETTER_AUTH_URL=        # http://localhost:3000 en dev
BETTER_AUTH_SECRET=     # Secret aléatoire
NEXT_PUBLIC_API_URL=    # http://localhost:3000 en dev
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
NODEMAILER_USER=        # Gmail pour les emails transactionnels
NODEMAILER_PASS=        # App password Gmail
ADMIN_EMAILS=           # Emails admin séparés par ";"
UPSTASH_REDIS_REST_URL= # Non configuré en dev (warnings OK)
UPSTASH_REST_TOKEN=     # Non configuré en dev (warnings OK)
```

---

## Prochaines étapes (dans l'ordre)

1. **Page Profil** — Carte dresseur avec stats de collection
2. **Ornements d'avatar** — Badges de progression selon nb de shiny capturés
3. **Security headers** — `next.config.ts` avant prod
4. **Variables d'env de prod** — Avant le déploiement Vercel

---

## Points d'attention

- Les warnings Upstash Redis en dev sont normaux et non bloquants
- Utiliser `npx prisma db push` (pas migrate) + redémarrer le serveur après un changement de schéma
- `default.png` pour les avatars n'existe plus — le défaut est `serena.png`
- Les données Pokémon sont en JSON statique, jamais en DB
- `pokedex-screen` a `overflow: hidden` — ne jamais mettre `overflow-y-auto` dessus, uniquement sur un enfant de `pokedex-content`
- Toutes les screen-areas ont `z-index: 3` (> footer z-index: 2) pour que la box-shadow bleed au-dessus du footer
