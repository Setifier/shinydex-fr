import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { admin } from "better-auth/plugins";

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { getValidDomains, normalizeName } from "@/lib/utils";
import { UserRole } from "@/generated/prisma";
import { ac, roles } from "@/lib/permissions";
import transporter from "@/lib/nodemailer";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      prompt: "select_account",
    },
    discord: {
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
      prompt: "consent",
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "discord"],
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await transporter.sendMail({
        from: `"Shinydex" <${process.env.NODEMAILER_USER}>`,
        to: user.email,
        subject: "Réinitialiser votre mot de passe — Shinydex",
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
            <h2>Réinitialisation de mot de passe</h2>
            <p>Bonjour ${user.name},</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous :</p>
            <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: #fff; text-decoration: none; border-radius: 8px;">
              Réinitialiser mon mot de passe
            </a>
            <p style="margin-top: 24px; font-size: 14px; color: #666;">
              Si vous n'avez pas fait cette demande, ignorez cet email.
            </p>
          </div>
        `,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await transporter.sendMail({
        from: `"Shinydex" <${process.env.NODEMAILER_USER}>`,
        to: user.email,
        subject: "Vérifiez votre adresse email — Shinydex",
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
            <h2>Bienvenue sur Shinydex, ${user.name} !</h2>
            <p>Cliquez sur le bouton ci-dessous pour vérifier votre adresse email :</p>
            <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: #fff; text-decoration: none; border-radius: 8px;">
              Vérifier mon email
            </a>
            <p style="margin-top: 24px; font-size: 14px; color: #666;">
              Si vous n'avez pas créé de compte, ignorez cet email.
            </p>
          </div>
        `,
      });
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body.email);
        const domain = email.split("@")[1];

        const VALID_DOMAINS = getValidDomains();
        if (!VALID_DOMAINS.includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid email domain. Please use a valid email address.",
          });
        }

        const name = normalizeName(ctx.body.name);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS =
            process.env.ADMIN_EMAILS?.split(";").map((email) =>
              email.trim().toLowerCase()
            ) ?? [];

          if (ADMIN_EMAILS.includes(user.email.toLowerCase())) {
            return { data: { ...user, role: "ADMIN" as UserRole } };
          }
          return { data: user };
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false,
      },
      onboardingCompleted: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN],
      moderatorRoles: [UserRole.MODERATOR],
      editorRoles: [UserRole.EDITOR],
      starRoles: [UserRole.STAR],
      ac,
      roles,
    }),
  ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN_ERROR";
