# Auth — Checklist Production

> Document de suivi pour la mise en production de l'authentification Shinydex-fr.
> Derniere mise a jour : 2026-02-13

---

## P0 — Bloquant (avant mise en prod)

- [x] **Rate limiting sur les endpoints auth**
  - Implemente avec `@upstash/ratelimit` + `@upstash/redis`
  - Routes protegees : sign-in (5/15min/IP), sign-up (3/h/IP), forget-password (3/h/email)
  - Fichiers : `src/lib/rate-limit.ts`, `src/app/api/auth/[...all]/route.ts`
  - **Action restante** : creer un projet Upstash Redis et renseigner `UPSTASH_REDIS_REST_URL` + `UPSTASH_REST_TOKEN` dans `.env`

- [x] **Middleware admin — verification du role**
  - Le middleware fetch `/api/auth/get-session` pour verifier `role === "ADMIN"` sur les routes `/admin/*`
  - Les non-admins sont rediriges vers `/`
  - Fichier : `src/middleware.ts`

- [ ] **Variables d'environnement production**
  - `BETTER_AUTH_URL` → mettre le domaine de prod (actuellement `http://localhost:3000`)
  - `NEXT_PUBLIC_API_URL` → idem
  - `BETTER_AUTH_SECRET` → regenerer un secret unique pour la prod (`openssl rand -base64 32`)
  - Configurer les OAuth redirect URIs (Google, Discord) pour le domaine de prod
  - Renseigner `UPSTASH_REDIS_REST_URL` + `UPSTASH_REST_TOKEN`

- [x] **Secrets hors du repo Git**
  - `.env*` est dans `.gitignore` (jamais commite)
  - `.env.example` cree avec toutes les cles documentees

---

## P1 — Important (a faire rapidement apres le lancement)

- [ ] **Security headers dans `next.config.ts`**
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

- [x] **Renforcer les regles de mot de passe**
  - Minimum 8 caracteres + 1 chiffre + 1 caractere special
  - Validation serveur (`password-validation.ts`) + UI temps reel (`PasswordRequirements`)
  - Applique sur inscription et reset password

---

## P2 — Peut attendre (post-launch)

- [ ] Account lockout apres X tentatives echouees
- [ ] Monitoring d'erreurs (Sentry ou equivalent)
- [ ] Elargir la whitelist de domaines email (actuellement : gmail, yahoo, outlook, icloud, hotmail)
- [ ] 2FA / MFA
- [ ] Page de gestion des sessions actives (voir / revoquer)
- [ ] Logging des requetes auth pour detecter les attaques
- [ ] CORS explicite sur les routes API
- [ ] Notifications email en cas d'activite suspecte

---

## Deja en place

- [x] Hashing Argon2 (parametres solides)
- [x] Email verification obligatoire a l'inscription
- [x] Flow complet : inscription → verification email → login
- [x] Flow complet : mot de passe oublie → email reset → nouveau mot de passe
- [x] Lien "Mot de passe oublie" sur le formulaire login
- [x] Page "Verifie ta boite mail" apres inscription
- [x] Connexion sociale Google + Discord
- [x] Systeme de roles (USER, EDITOR, MODERATOR, STAR, ADMIN)
- [x] Admin plugin Better-Auth avec access control
- [x] Systeme de ban dans le schema Prisma (banned, banReason, banExpires)
- [x] Tracking IP + user agent dans les sessions
- [x] Session 30 jours avec cookie HTTP-only
- [x] Sign-out avec feedback toast
- [x] Middleware routes protegees (profile, admin) avec verification role admin
- [x] Redirection auth → profile si deja connecte
- [x] Hook validation domaine email a l'inscription
- [x] Auto-attribution role ADMIN via ADMIN_EMAILS
- [x] Rate limiting sur sign-in, sign-up, forget-password (Upstash)
- [x] `.env.example` avec documentation des variables
