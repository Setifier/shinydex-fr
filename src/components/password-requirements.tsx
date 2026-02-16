"use client";

import { Check, X } from "lucide-react";

interface PasswordRequirementsProps {
  password: string;
}

const rules = [
  { label: "Au moins 8 caractères", test: (p: string) => p.length >= 8 },
  { label: "Au moins un chiffre", test: (p: string) => /\d/.test(p) },
  {
    label: "Au moins un caractère spécial (!@#$%...)",
    test: (p: string) => /[^a-zA-Z0-9]/.test(p),
  },
];

export const PasswordRequirements = ({
  password,
}: PasswordRequirementsProps) => {
  if (!password) return null;

  return (
    <ul className="space-y-1 text-sm">
      {rules.map((rule) => {
        const passed = rule.test(password);
        return (
          <li key={rule.label} className="flex items-center gap-2">
            {passed ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-destructive" />
            )}
            <span className={passed ? "text-green-500" : "text-destructive"}>
              {rule.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
