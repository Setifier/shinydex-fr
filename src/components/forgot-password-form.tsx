"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { forgotPasswordAction } from "@/actions/forgot-password.action";

export const ForgotPasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setIsPending(true);

    const formData = new FormData(evt.target as HTMLFormElement);

    const { error } = await forgotPasswordAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      setIsSent(true);
      setIsPending(false);
    }
  }

  if (isSent) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-lg">
          Si un compte existe avec cette adresse, un email de réinitialisation a
          été envoyé.
        </p>
        <p className="text-sm text-muted-foreground">
          Pense à vérifier tes spams si tu ne le trouves pas.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <div className="w-full space-y-3">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">
              Adresse mail :
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
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
          Envoyer le lien
        </Button>
      </form>
    </div>
  );
};
