import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface ReturnButtonProps {
  href: string;
  label?: string;
}

export const ReturnButton = ({ href, label }: ReturnButtonProps) => {
  const isHome = href === "/";

  return (
    <Button
      size="lg"
      asChild
      className="font-semibold text-base"
    >
      <Link href={href} className="flex items-center gap-2">
        <ArrowLeftIcon className="w-6 h-6 shrink-0" strokeWidth={3} />
        {isHome ? <HomeIcon /> : label}
      </Link>
    </Button>
  );
};

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={22}
      height={22}
      style={{ minWidth: 22, minHeight: 22 }}
    >
      <path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1z" />
    </svg>
  );
}
