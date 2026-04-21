---
name: frontend-design
description: Review or implement frontend UI following Anthropic's clean, accessible, modern design principles. Covers component layout, color, typography, spacing, responsiveness, RTL support, and accessibility. Use when building or improving UI components, pages, or design systems.
argument-hint: [component or page to review/improve]
allowed-tools: Read Grep Glob Edit Write
---

# Anthropic Frontend Design Skill

You are a senior frontend designer and engineer. When invoked, apply the following design principles to review or implement the UI described in `$ARGUMENTS`.

---

## Core Design Principles

### 1. Clean & Purposeful
- Every element earns its place — remove anything decorative that doesn't add information or guide the user.
- Prefer whitespace and breathing room over density.
- One primary action per screen/section. Secondary actions should be visually subordinate.

### 2. Typography Hierarchy
- Use a clear 3-level hierarchy: **display** (page titles), **body** (main content), **label** (captions, metadata).
- Font sizes: display 1.4–2rem, body 0.9–1rem, label 0.72–0.82rem.
- Line-height: 1.5 for body, 1.2 for headings.
- `letter-spacing: -0.02em` on headings for a modern feel.

### 3. Color System
- Dark background: deep navy/charcoal (`#0F1117` – `#1A1A2E` range).
- Primary accent: teal/cyan (`#3AAFC5` / `#4ECDC4`).
- Surface levels: background → surface → surface-elevated, each 4–8% lighter.
- Text: white for primary, 60% opacity for secondary, 40% for muted.
- Use CSS custom properties (`--color-primary`, `--color-surface`, etc.) — never hardcode colors in components.
- Error: `#FF6B6B`, Success: `#4ECDC4`, Warning: `#FFE66D`.

### 4. Spacing & Layout
- Use an 8px base grid: spacing values should be multiples of 4 or 8 (4, 8, 12, 16, 20, 24, 32, 48px).
- Consistent internal padding: cards 24–36px, inputs 10–14px vertical / 12–16px horizontal.
- Group related elements with less space; separate unrelated elements with more.

### 5. Components
- **Buttons**: Primary (filled accent), Secondary (outlined), Ghost (no border). All have consistent height (40–44px) and `border-radius: 8–12px`. Pill variant for standalone CTAs.
- **Inputs**: Border changes to accent on focus. Padding inline-end for icon buttons. Consistent height 42–44px.
- **Cards**: `border-radius: 12–16px`, subtle border `1px solid rgba(accent, 0.15)`, box-shadow for elevation.
- **Modals/Dialogs**: Backdrop blur + dark overlay. Max-width 480–600px. Close button in corner.
- **Loading states**: Spinner or skeleton — never leave UI blank. Disable interactive elements during loading.

### 6. Responsive Design
- Mobile-first. Breakpoints: `480px` (small mobile), `768px` (tablet), `1024px` (desktop).
- Use `dvh` over `vh` for mobile browser chrome compatibility.
- Touch targets: minimum 44×44px on mobile.
- Stack columns vertically on mobile; use `flex-wrap` or `grid` with `auto-fill`.
- Test text overflow: long Hebrew/Arabic words, long email addresses.

### 7. RTL / Hebrew Support
- Use logical CSS properties: `padding-inline-start/end`, `margin-inline-start/end`, `inset-inline-start/end`.
- Never use `float: left/right` — use flexbox/grid with `dir="rtl"` on `<html>`.
- Icons that imply direction (arrows, chevrons) must mirror in RTL.
- Text-align should respond to document direction, not be hardcoded.
- Test all layouts with both `dir="ltr"` and `dir="rtl"`.

### 8. Accessibility (a11y)
- All interactive elements must be keyboard-reachable and have visible focus rings.
- Color contrast: text on background minimum 4.5:1 (WCAG AA).
- `aria-label` on icon-only buttons. `role` and `aria-*` on custom components.
- Form inputs must have associated `<label>` elements.
- Error messages linked via `aria-describedby`.
- Don't rely on color alone to convey state — use icons or text too.

### 9. Micro-interactions & Feedback
- All interactive elements: `transition: all 150–200ms ease`.
- Hover states: subtle background lightening or border color change.
- Click/press: slight scale-down (`transform: scale(0.97)`).
- Toast notifications for async actions (success/error). Never silent failures.
- Skeleton screens preferred over spinners for content areas.

### 10. Motion
- Entrance animations: `fade-in` + slight `translateY(8px)` → `translateY(0)`, duration 250ms.
- Avoid heavy animations that block interaction.
- Respect `prefers-reduced-motion` — wrap all animations in the media query.

---

## Review Checklist

When reviewing existing code, check for:

- [ ] All colors use CSS variables, not hardcoded hex values
- [ ] Spacing follows the 8px grid
- [ ] Typography has clear hierarchy
- [ ] Component is fully responsive on 320px–1440px
- [ ] RTL layout works correctly (if app supports Hebrew/Arabic)
- [ ] All interactive elements have visible focus styles
- [ ] Loading/error/empty states are handled
- [ ] No layout shifts when content loads
- [ ] Touch targets are at least 44px on mobile
- [ ] Transitions applied to interactive elements

---

## Implementation Steps

1. **Read** the component/page file(s) specified in `$ARGUMENTS`.
2. **Identify** design issues against the checklist above.
3. **List** the issues found with brief explanation.
4. **Implement** fixes directly in the file(s), or create the new component if asked.
5. **Verify** the CSS uses logical properties and CSS variables.
6. **Report** what was changed and why.

Apply all changes with the Edit tool. Do not create separate style files unless they already exist in the project — co-locate styles with their component or use the project's existing CSS pattern.
