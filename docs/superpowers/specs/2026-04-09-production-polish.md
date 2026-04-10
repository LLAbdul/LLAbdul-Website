# Production Polish Spec (Final Phase)

## Overview
To "fully cook" the website and make it 100% production-ready, we need to apply the Unified Sleek design to all remaining edge cases and internal pages, then perform rigorous production validation.

## Scope
1. **Admin Panel Overhaul (`/admin/*`)**: 
   - Apply the deep dark `#030509` background and glassmorphism cards to the Admin Layout, Login page, Dashboard, and Matchup Editor forms.
   - Use Crimson `#C9082A` for destructive actions (Delete, Logout) and Gold `#FFD700` for primary actions (Save, Add Matchup).
   - Ensure the form inputs use sleek `bg-white/5 border border-white/10 text-white focus:border-[#C9082A]`.
2. **Edge Cases & Feedback States (`error.tsx`, `not-found.tsx`, `loading.tsx`)**:
   - Update 404 and Error pages to feature massive `Oswald` headings, frosted glass cards, and a return-to-home CTA.
   - Create elegant, glowing skeleton loaders for all loading states.
3. **Production Validation**:
   - Run `next build` to guarantee zero TypeScript or Next.js build errors.
   - Run `next lint` to ensure zero linter warnings.
   - Ensure all image domains (like CommunityDragon) are properly configured in `next.config.ts`.
