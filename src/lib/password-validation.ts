export const PASSWORD_RULES = {
  minLength: 8,
  requireDigit: true,
  requireSpecialChar: true,
} as const;

export const PASSWORD_RULES_TEXT = [
  "Au moins 8 caractères",
  "Au moins un chiffre",
  "Au moins un caractère spécial (!@#$%...)",
];

export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_RULES.minLength) {
    return `Le mot de passe doit contenir au moins ${PASSWORD_RULES.minLength} caractères`;
  }
  if (!/\d/.test(password)) {
    return "Le mot de passe doit contenir au moins un chiffre";
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return "Le mot de passe doit contenir au moins un caractère spécial";
  }
  return null;
}
