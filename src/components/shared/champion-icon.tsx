import Image from "next/image";
import { cn } from "@/lib/utils";

interface ChampionIconProps {
  src: string;
  name: string;
  size?: number;
  className?: string;
}

export function ChampionIcon({
  src,
  name,
  size = 48,
  className,
}: ChampionIconProps) {
  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className={cn("rounded-lg", className)}
    />
  );
}
