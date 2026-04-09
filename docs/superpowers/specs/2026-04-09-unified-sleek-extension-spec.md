# Unified Sleek Extension Spec

## Overview
Following the successful application of the Unified Sleek aesthetic to the Homepage, we are extending this high-end, dark glassmorphism design system to the remaining public pages of the LLAbdul website. We have also pivoted to the `Oswald` font for headings to deliver a more modern, esports-authentic feel over the generic fantasy vibe of `Cinzel`.

## Scope
1. **Matchups List (`/matchups`)**: Needs a sleek atmospheric header, glassmorphism filters, and polished matchup cards with glowing hover states.
2. **Matchup Detail (`/matchups/[enemyChampion]`)**: Needs to feel like a premium dossier. Atmospheric background using the enemy champion's splash art (faded/blurred), floating glass panels for Runes, Builds, and Mechanics.
3. **Guides List (`/guides`)**: High-end grid layout for champion mechanics and combo guides.
4. **About Page (`/about`)**: A premium "Player Profile" page showing LLAbdul's stats, history, and achievements using glowing prestige UI elements.
5. **Navbar (`src/components/layout/navbar.tsx`)**: Ensure the navbar utilizes the frosted glass effect (`backdrop-blur-md bg-black/20 border-b border-white/5`) instead of solid colors.

## Aesthetic Rules
- Backgrounds: Use `#030509` or dark radial gradients for depth.
- Containers: `bg-white/5 backdrop-blur-xl border border-white/10`.
- Text: Primary headings in `Oswald` (`font-serif`), body in `Plus Jakarta Sans`.
- Interactive Elements: Hover states should lift up (`-translate-y-1`), borders should glow with the accent colors (`border-[#C9082A]/50` or `border-[#FFD700]/50`), and add subtle drop shadows.
