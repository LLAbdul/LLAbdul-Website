# Unified Sleek Website Redesign (Option B)

## Overview
A "next-level" UI/UX overhaul for the LLAbdul League of Legends player website, targeting Yasuo and Yone players. The redesign adopts the "Unified Sleek" (Option B) aesthetic: a high-end, premium dark theme with deep blacks, frosted glass elements, and subtle atmospheric backgrounds.

## Scope
This spec focuses on overhauling the global aesthetics, layout wrappers, and the primary homepage to establish the new design system.

## Aesthetic & Theming
- **Colors**: Deep navy/black background (`#030509`). Single strong accent color (Crimson or Gold) for buttons and active states.
- **Components**: Frosted glassmorphism (translucent dark backgrounds, `backdrop-blur`, thin borders).
- **Typography**: Cinematic serif font (`Cinzel`) for massive headings, maintaining `Plus Jakarta Sans` for body.
- **Imagery**: `NightBringerYasuo.png` and `YoneDefault.png` from `/public/resources/images` used as massive, faded background elements blending into the dark background.

## Architecture

### 1. Global Styles & Layout
- `src/app/globals.css`: Update CSS variables to support the deep dark background, glassmorphism card styles, and cinematic font.
- `src/app/layout.tsx`: Import the new `Cinzel` font and update the root layout classes to apply the dark unified background globally.

### 2. Homepage Structure (`src/app/page.tsx`)
- **New Hero Section**:
  - **Background**: Deep dark gradient with Yasuo (left) and Yone (right) PNGs faded gracefully into the background edges.
  - **Content**: Center-aligned cinematic typography ("LLABDUL") with a glowing "CHALLENGER #16" badge. Subtext introducing the guides.
  - **CTAs**: Two glowing primary buttons ("Matchup Guides", "Champion Guides") leading to main content areas.
- **Below Hero Layout**:
  - The existing Profile Card is removed (its purpose is absorbed by the new Hero).
  - The Quick Navigation Cards (Matchup Guides, Champion Guides) are updated to the glassmorphism aesthetic with glowing hover states.
  - The "Featured Matchups" section is refined to pop against the deep dark background with glassmorphism cards and delicate borders.

## Future Work (Out of Scope for this Spec)
- Re-theming the Matchup Detail pages (`/matchups/[enemyChampion]/page.tsx`).
- Re-theming Admin views and forms.
