/**
 * Règles de validation du nom de collectionneur :
 * - Lettres uniquement (pas d'espaces, chiffres ou caractères spéciaux)
 * - Entre 2 et 20 caractères
 * - Formaté automatiquement : première lettre majuscule, reste minuscule
 */

const NAME_REGEX = /^[a-zA-ZÀ-ÿ]+$/;

export function formatHunterName(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export function validateHunterName(name: string): string | null {
  if (name.length < 2) return "Le nom doit contenir au moins 2 caractères.";
  if (name.length > 20) return "Le nom ne doit pas dépasser 20 caractères.";
  if (!NAME_REGEX.test(name)) return "Lettres uniquement, sans espaces ni chiffres.";
  return null;
}
