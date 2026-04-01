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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
}: {
  href: string;
  label: string;
  icon: typeof Home;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      title={label}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
        isActive
          ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
          : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
      )}
    >
      <Icon className="w-5 h-5" />
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
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        isActive
          ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
          : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col items-center w-16 h-screen sticky top-0 border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] py-4 gap-2">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-sm mb-4"
      >
        LL
      </Link>

      {/* Nav items */}
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

      {/* Admin at bottom */}
      <nav className="flex flex-col items-center gap-1">
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
    <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-[var(--sidebar-border)] bg-[var(--sidebar)] sticky top-0 z-50">
      <Link href="/" className="font-bold text-lg">
        LLAbdul
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={<Button variant="ghost" size="icon" />}
        >
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-[var(--sidebar)] border-[var(--sidebar-border)]">
          <div className="flex flex-col gap-1 mt-8">
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
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
