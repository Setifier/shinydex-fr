"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetPasswordAction } from "@/actions/reset-password.action";
import { PasswordRequirements } from "@/components/password-requirements";

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const [isPending, setIsPending] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const newPassword = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (!newPassword) {
      toast.error("Veuillez renseigner un nouveau mot de passe");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setIsPending(true);

    const { error } = await resetPasswordAction(newPassword, token);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Mot de passe réinitialisé avec succès !");
      router.push("/auth/login");
    }
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <div className="w-full space-y-3">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-medium">
              Nouveau mot de passe :
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              className="w-full py-3 px-4 text-base bg-form border-2 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordRequirements password={password} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-base font-medium">
              Confirmer le mot de passe :
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="w-full py-3 px-4 text-base bg-form border-2 rounded-lg"
            />
          </div>
        </div>

        <Button
          variant="default"
          size="lg"
          className="w-full py-3 font-semibold bg-primary hover:bg-primary-dark text-white rounded-lg"
          type="submit"
          disabled={isPending}
        >
          Réinitialiser
        </Button>
      </form>
    </div>
  );
};
