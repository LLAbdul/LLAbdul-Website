"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/matchups", label: "Matchups" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

function isActive(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E2A4A] bg-[#0D1429]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span
              className="flex items-center justify-center w-8 h-8 rounded-md text-sm font-bold"
              style={{ background: "#C8AA6E", color: "#0A0E21" }}
            >
              LL
            </span>
            <span className="font-bold text-[#E8E8ED] hidden sm:block">LLAbdul</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href, pathname)
                    ? "text-[#C8AA6E] bg-[#C8AA6E]/10"
                    : "text-[#7B7F9E] hover:text-[#E8E8ED] hover:bg-[#1A2340]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-[#7B7F9E] hover:text-[#E8E8ED] hover:bg-[#1A2340] transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="md:hidden border-t border-[#1E2A4A] bg-[#0D1429] px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive(item.href, pathname)
                  ? "text-[#C8AA6E] bg-[#C8AA6E]/10"
                  : "text-[#7B7F9E] hover:text-[#E8E8ED] hover:bg-[#1A2340]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
