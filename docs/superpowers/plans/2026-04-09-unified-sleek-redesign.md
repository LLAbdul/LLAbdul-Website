# Unified Sleek Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the website's visual aesthetic to a premium, dark glassmorphism "Unified Sleek" design with a massive Yasuo/Yone hero section.

**Architecture:** We will update global CSS variables for the deep dark theme, apply the cinematic `Cinzel` font alongside `Plus Jakarta Sans`, and rewrite the main `page.tsx` layout to use a large atmospheric hero banner and frosted glass feature cards.

**Tech Stack:** Next.js 15, Tailwind CSS v4, Lucide React, CSS variables.

---

### Task 1: Update Global CSS Variables and Utilities

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace CSS variables for the unified sleek theme**

Update `src/app/globals.css` to change the background to `#030509` and define glassmorphism utilities.

```css
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cinzel:wght@400;600;700;800;900&display=swap");
@import "tailwindcss";

@theme {
  --color-background:       #030509;
  --color-surface:          rgba(255, 255, 255, 0.02);
  --color-surface-hover:    rgba(255, 255, 255, 0.05);
  --color-surface-elevated: rgba(255, 255, 255, 0.08);
  --color-border:           rgba(255, 255, 255, 0.1);
  --color-border-subtle:    rgba(255, 255, 255, 0.05);

  --color-foreground:       #E8E8ED;
  --color-foreground-muted: #7B7F9E;

  /* Primary Accent = Crimson */
  --color-accent-crimson:   #C9082A;
  /* Secondary Accent = Gold */
  --color-accent-gold:      #FFD700;
  
  --color-difficulty-easy:  #27AE60;
  --color-difficulty-skill: #C8AA6E;
  --color-difficulty-hard:  #E74C3C;

  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-serif: "Cinzel", serif;
  --font-mono: ui-monospace, "Cascadia Code", "Fira Code", monospace;

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

:root {
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-serif: "Cinzel", serif;

  --background:          #030509;
  --foreground:          #E8E8ED;
  --card:                rgba(255, 255, 255, 0.02);
  --card-foreground:     #E8E8ED;
  --popover:             rgba(255, 255, 255, 0.02);
  --popover-foreground:  #E8E8ED;

  --primary:             #C9082A;
  --primary-foreground:  #E8E8ED;

  --secondary:           rgba(255, 255, 255, 0.05);
  --secondary-foreground:#E8E8ED;
  --muted:               rgba(255, 255, 255, 0.05);
  --muted-foreground:    #7B7F9E;
  --accent:              rgba(255, 255, 255, 0.05);
  --accent-foreground:   #E8E8ED;

  --destructive:         #E74C3C;
  --border:              rgba(255, 255, 255, 0.1);
  --input:               rgba(255, 255, 255, 0.05);
  --ring:                #C9082A;
  --radius:              1rem;

  --sidebar:             #030509;
  --sidebar-foreground:  #E8E8ED;
  --sidebar-primary:     #C9082A;
  --sidebar-primary-foreground: #E8E8ED;
  --sidebar-accent:      rgba(255, 255, 255, 0.05);
  --sidebar-accent-foreground: #E8E8ED;
  --sidebar-border:      rgba(255, 255, 255, 0.1);
  --sidebar-ring:        #C9082A;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--muted-foreground); }
```

- [ ] **Step 2: Commit CSS Changes**

```bash
git add src/app/globals.css
git commit -m "style: update global css variables for unified sleek theme"
```

### Task 2: Configure Layout Fonts

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add Cinzel Font Configuration**

Update `src/app/layout.tsx` to include `Cinzel` font and inject it into the root HTML variables. Notice that we remove the global `<main>` wrapper paddings to allow full-bleed hero sections on specific pages.

```tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#030509",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "LLAbdul — Challenger Yasuo & Yone Guides",
    template: "%s | LLAbdul",
  },
  description:
    "Matchup guides, builds, runes, and mechanics tutorials from a Challenger Rank 16 Yasuo & Yone player.",
  keywords: ["Yasuo", "Yone", "League of Legends", "Challenger", "matchup guide", "builds", "runes", "mechanics", "LoL"],
  authors: [{ name: "LLAbdul" }],
  openGraph: {
    type: "website",
    title: "LLAbdul — Challenger Yasuo & Yone Guides",
    description: "Matchup guides, builds, and mechanics tutorials from Challenger Rank 16.",
    siteName: "LLAbdul",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLAbdul — Challenger Yasuo & Yone Guides",
    description: "Matchup guides, builds, and mechanics tutorials from Challenger Rank 16.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${cinzel.variable}`}>
      <body className="min-h-screen bg-background text-foreground selection:bg-accent-crimson/30 flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit Layout changes**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure Cinzel font and update RootLayout"
```

### Task 3: Redesign Homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite Home to include Hero section and glassmorphism**

Replace `src/app/page.tsx` completely. We replace it with a massive Hero banner and translucent glassmorphism cards.

```tsx
import Link from "next/link";
import Image from "next/image";
import { Swords, BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllMatchups } from "@/lib/data";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { DifficultyBadge } from "@/components/shared/difficulty-badge";

export default async function Home() {
  let matchups: Awaited<ReturnType<typeof getAllMatchups>> = [];
  
  try {
    const m = await getAllMatchups();
    matchups = m;
  } catch {}

  return (
    <main className="min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden border-b border-white/5 pb-16 pt-24">
        {/* Atmospheric Backgrounds */}
        <div className="absolute inset-0 z-0 bg-[#030509]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left_center,rgba(201,8,42,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right_center,rgba(0,212,255,0.1),transparent_50%)]"></div>
          
          {/* Yasuo Background Image (Left) */}
          <div className="absolute -left-[10%] top-0 h-[120%] w-1/2 opacity-20 mix-blend-screen mask-image-gradient-left pointer-events-none">
            <Image 
              src="/resources/images/NightBringerYasuo.png"
              alt=""
              fill
              className="object-cover object-right-top"
              priority
            />
          </div>

          {/* Yone Background Image (Right) */}
          <div className="absolute -right-[10%] top-0 h-[120%] w-1/2 opacity-20 mix-blend-screen mask-image-gradient-right pointer-events-none">
            <Image 
              src="/resources/images/YoneDefault.png"
              alt=""
              fill
              className="object-cover object-left-top"
              priority
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center text-center mt-12">
          <Badge className="bg-white/5 hover:bg-white/10 text-[#FFD700] border-[#FFD700]/30 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-[0.2em] mb-8 uppercase animate-pulse">
            Challenger #16
          </Badge>
          
          <h1 className="font-serif text-6xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 tracking-tight drop-shadow-2xl mb-6">
            LLABDUL
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-[#7B7F9E] font-light leading-relaxed mb-10">
            Master the wind. Dominate the rift. <br />
            Premium Yasuo & Yone guides crafted by NA's finest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/matchups" className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#C9082A] to-[#ff4500] opacity-50 blur transition duration-500 group-hover:opacity-100"></div>
              <button className="relative w-full sm:w-auto px-8 py-4 bg-[#030509] border border-white/10 rounded-lg flex items-center justify-center gap-3 text-white font-medium hover:bg-white/5 transition-all">
                <Swords className="w-5 h-5 text-[#C9082A]" />
                <span>Matchup Guides</span>
              </button>
            </Link>
            
            <Link href="/guides" className="group">
              <button className="relative w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center gap-3 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all">
                <BookOpen className="w-5 h-5 text-[#FFD700]" />
                <span>Advanced Mechanics</span>
              </button>
            </Link>
          </div>
        </div>
        
        {/* Bottom Fade out */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030509] to-transparent z-10"></div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-16 -mt-8 w-full">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Left: Nav Cards */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-white mb-6">Explore the Path</h2>
            
            <Link href="/matchups" className="group block">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-[#C9082A]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(201,8,42,0.15)]">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#C9082A]/20 to-transparent border border-[#C9082A]/30 text-[#C9082A]">
                      <Swords className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-xl text-white group-hover:text-[#C9082A] transition-colors">Matchup Guides</div>
                      <div className="text-sm text-[#7B7F9E] mt-1">{matchups.length > 0 ? `${matchups.length} guides · ` : ""}Dominate every lane phase</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#7B7F9E] group-hover:text-[#C9082A] group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides" className="group block">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-[#FFD700]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(255,215,0,0.1)]">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent border border-[#FFD700]/30 text-[#FFD700]">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-xl text-white group-hover:text-[#FFD700] transition-colors">Champion Masterclass</div>
                      <div className="text-sm text-[#7B7F9E] mt-1">Combos, animation cancels, macro</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#7B7F9E] group-hover:text-[#FFD700] group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Right: Featured Matchups */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-xl font-bold text-white">Recent Matchups</h3>
            </div>
            
            {matchups.length > 0 ? (
              <div className="space-y-3">
                {matchups.slice(0, 6).map((m) => (
                  <Link key={m.enemyChampion} href={`/matchups/${encodeURIComponent(m.enemyChampion)}`} className="group block">
                    <Card className="bg-white/5 backdrop-blur-md border-white/5 transition-all duration-200 hover:bg-white/10 hover:border-white/20">
                      <CardContent className="flex items-center gap-4 p-3">
                        {m.enemyIcon && <ChampionIcon src={m.enemyIcon} name={m.enemyChampion} size={40} />}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-white group-hover:text-[#C9082A] transition-colors">vs {m.enemyChampion}</div>
                          <div className="text-[11px] text-[#7B7F9E] uppercase tracking-wider mt-0.5">{m.champion}</div>
                        </div>
                        <DifficultyBadge difficulty={m.difficulty} />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                {matchups.length > 6 && (
                  <Link href="/matchups" className="block text-center text-sm text-[#7B7F9E] font-medium hover:text-white transition-colors py-3 mt-2 border border-white/5 rounded-lg bg-white/[0.02] hover:bg-white/5">
                    View all {matchups.length} matchups
                  </Link>
                )}
              </div>
            ) : (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="py-10 text-center">
                  <p className="text-sm text-[#7B7F9E]">No matchups yet</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Mask utilities for the images */}
      <style dangerouslySetInlineStyle={{__html: `
        .mask-image-gradient-left {
          mask-image: linear-gradient(to right, black, transparent);
          -webkit-mask-image: linear-gradient(to right, black, transparent);
        }
        .mask-image-gradient-right {
          mask-image: linear-gradient(to left, black, transparent);
          -webkit-mask-image: linear-gradient(to left, black, transparent);
        }
      `}} />
    </main>
  );
}
```

- [ ] **Step 2: Commit Page changes**

```bash
git add src/app/page.tsx
git commit -m "feat: implement unified sleek hero section and homepage redesign"
```
