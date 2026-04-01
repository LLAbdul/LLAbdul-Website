"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Swords, BookOpen, User, Shield, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/matchups", label: "Matchups", icon: Swords },
  { href: "/guides", label: "Guides", icon: BookOpen },
  { href: "/about", label: "About", icon: User },
];

const adminItems = [{ href: "/admin", label: "Admin", icon: Shield }];

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex flex-col items-center w-16 h-screen sticky top-0 border-r py-4 gap-1"
      style={{ background: "var(--sidebar)", borderColor: "var(--border)" }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center justify-center w-9 h-9 rounded-md font-bold text-sm mb-6 transition-opacity hover:opacity-80"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        LL
      </Link>

      {/* Nav links */}
      <nav className="flex flex-col items-center gap-1 flex-1">
        {navItems.map((item) => {
          const active = isActive(item.href, pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-md transition-colors",
                active
                  ? "text-[#C8AA6E] bg-[#C8AA6E]/10"
                  : "text-[#7B7F9E] hover:text-[#E8E8ED] hover:bg-[#1A2340]"
              )}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>

      {/* Admin link */}
      <nav className="flex flex-col items-center gap-1 pb-2">
        <div className="w-6 h-px mb-2" style={{ background: "var(--border)" }} />
        {adminItems.map((item) => {
          const active = isActive(item.href, pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-md transition-colors",
                active
                  ? "text-[#C8AA6E] bg-[#C8AA6E]/10"
                  : "text-[#7B7F9E] hover:text-[#E8E8ED] hover:bg-[#1A2340]"
              )}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function MobileHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="md:hidden flex items-center justify-between px-4 h-14 border-b sticky top-0 z-50"
        style={{ background: "var(--sidebar)", borderColor: "var(--border)" }}
      >
        <Link
          href="/"
          className="font-bold text-base tracking-tight"
          style={{ color: "var(--primary)" }}
        >
          LLAbdul
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-9 h-9 rounded-md transition-colors"
          style={{ color: "var(--muted-foreground)" }}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 pt-14">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <nav
            className="relative border-b p-3 flex flex-col gap-1"
            style={{ background: "var(--sidebar)", borderColor: "var(--border)" }}
          >
            {[...navItems, ...adminItems].map((item) => {
              const active = isActive(item.href, pathname);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                    active
                      ? "bg-[#C8AA6E]/10 text-[#C8AA6E]"
                      : "text-[#7B7F9E] hover:text-[#E8E8ED] hover:bg-[#1A2340]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
