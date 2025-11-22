"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { signInEmailAction } from "@/actions/sign-in-email.action";

export const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setIsPending(true);

    const formData = new FormData(evt.target as HTMLFormElement);

    const { error } = await signInEmailAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Connexion réussie !");
      router.refresh();
      router.push("/profile");

      setTimeout(() => window.location.reload(), 100);
    }
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <div className="w-full space-y-3">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">
              Surnom ou Adresse Mail :
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              className="w-full py-3 px-4 text-base bg-form border-2 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-medium">
              Mot de passe :
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
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
          Se connecter
        </Button>
      </form>
    </div>
  );
};
