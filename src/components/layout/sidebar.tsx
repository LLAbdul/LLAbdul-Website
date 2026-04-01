"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Swords,
  BookOpen,
  User,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/matchups", label: "Matchups", icon: Swords },
  { href: "/guides", label: "Guides", icon: BookOpen },
  { href: "/about", label: "About", icon: User },
];

const adminItems = [
  { href: "/admin", label: "Admin", icon: Shield },
];

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={label}
      className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 group",
        isActive
          ? "text-accent-purple"
          : "text-foreground-muted hover:text-foreground hover:bg-surface"
      )}
    >
      {isActive && (
        <div className="absolute inset-0 rounded-lg bg-accent-purple/10 border border-accent-purple/25" />
      )}
      <Icon className="w-5 h-5 relative z-10" />
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  icon: Icon,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        isActive
          ? "bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
          : "text-foreground-muted hover:text-foreground hover:bg-surface"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col items-center w-[68px] h-screen sticky top-0 border-r border-border-subtle bg-[oklch(0.11_0.025_260)] py-5 gap-1">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-purple text-white font-display font-bold text-base mb-6 glow-purple"
      >
        LL
      </Link>

      {/* Nav */}
      <nav className="flex flex-col items-center gap-1 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            isActive={
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            }
          />
        ))}
      </nav>

      {/* Admin */}
      <nav className="flex flex-col items-center gap-1 pb-2">
        <div className="w-6 h-px bg-border-subtle mb-2" />
        {adminItems.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            isActive={pathname.startsWith(item.href)}
          />
        ))}
      </nav>
    </aside>
  );
}

export function MobileHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border-subtle bg-[oklch(0.11_0.025_260)] sticky top-0 z-50">
        <Link href="/" className="font-display font-bold text-xl tracking-wide">
          <span className="gradient-text">LLAbdul</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-10 h-10 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile overlay nav */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 pt-14">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <nav className="relative bg-[oklch(0.13_0.025_260)] border-b border-border-subtle p-4 flex flex-col gap-1">
            {[...navItems, ...adminItems].map((item) => (
              <MobileNavLink
                key={item.href}
                {...item}
                isActive={
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)
                }
                onClick={() => setOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
