import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface ReturnButtonProps {
  href: string;
  label?: string;
}

export const ReturnButton = ({ href, label = "Accueil" }: ReturnButtonProps) => {
  return (
    <Button
      size="lg"
      asChild
      className="font-semibold text-base"
    >
      <Link href={href} className="flex items-center gap-2">
        <ArrowLeftIcon className="w-5 h-5" /> {label}
      </Link>
    </Button>
  );
};
