import { ModeToggle } from "@/components/mode-toggle";

export function Footer() {
  return (
    <div className="flex h-full items-center flex-end gap-4">
      <ModeToggle />
    </div>
  );
}
