"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B7F9E] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 rounded-md text-sm text-[#E8E8ED] placeholder:text-[#7B7F9E] bg-[#111833] border border-[#1E2A4A] focus:outline-none focus:ring-1 focus:ring-[#B87FD8]/50 focus:border-[#B87FD8]/50 transition-colors"
      />
    </div>
  );
}
