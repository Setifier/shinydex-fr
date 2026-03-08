"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
  sm:   { wrapper: "size-9",  outline: "outline-2  outline-offset-[2px]" },
  md:   { wrapper: "size-14", outline: "outline-[3px] outline-offset-[2px]" },
  lg:   { wrapper: "size-20", outline: "outline-[3px] outline-offset-[3px]" },
  xl:   { wrapper: "size-24", outline: "outline-4  outline-offset-[3px]" },
  "2xl":{ wrapper: "size-32", outline: "outline-4  outline-offset-4"     },
} as const;

type AvatarSize = keyof typeof SIZES;

interface UserAvatarProps {
  avatar: string;
  background: string;
  size?: AvatarSize;
  className?: string;
}

export function UserAvatar({
  avatar,
  background,
  size = "lg",
  className,
}: UserAvatarProps) {
  const { wrapper, outline } = SIZES[size];

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden shrink-0",
        "outline outline-slate-300/60",
        outline,
        wrapper,
        className
      )}
      style={{ backgroundColor: background }}
    >
      <Image
        src={avatar}
        alt="Avatar"
        fill
        className="object-cover"
        sizes="128px"
      />
    </div>
  );
}
