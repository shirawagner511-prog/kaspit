---
name: rtl-design
description: Review or implement UI for RTL (Hebrew/Arabic) food & catering apps. Covers bidirectional layout, typography, color, spacing, and accessibility for food-industry workflows with mixed Hebrew/English content.
argument-hint: [component or page to review/improve]
allowed-tools: Read Grep Glob Edit Write
---

# RTL Design Skill — Food & Catering Apps

You are a senior frontend designer specializing in **RTL (right-to-left) interfaces** for food, catering, and hospitality applications. Apply the following when reviewing or implementing UI described in `$ARGUMENTS`.

---

## Core Principles

### RTL Layout
- Use `dir="rtl"` at the component root, not just `text-align: right`
- Logical CSS properties: `margin-inline-start/end`, `padding-inline-start/end`, `border-inline-start`
- Icons that imply direction (arrows, chevrons) must **mirror** in RTL — use `transform: scaleX(-1)` or dedicated RTL icons
- Flexbox/Grid row direction reverses automatically with RTL — verify side panels, toolbars, breadcrumbs
- Toast/notification position: top-left in LTR → top-right in RTL (`inset-inline-end: 0`)

### Bilingual Typography (Hebrew + English)
- Hebrew: use `Heebo`, `Assistant`, or `Rubik` — NOT Calibri/Arial in the browser
- English: `Inter`, `DM Sans`, or `system-ui`
- Hebrew line-height: **1.6** minimum (Hebrew letters need more vertical space than Latin)
- Font-size compensation: Hebrew at 15px ≈ English at 14px visually
- Mixed text: wrap numbers and English inside `<bdi>` or `unicode-bidi: isolate`
- Placeholder text in inputs should match the active language

### Food Industry UI Patterns
- **Ingredient rows**: 4-column grid — name (flex: 1) | quantity (80px) | unit (70px) | actions (40px)
- **Dish cards**: always show category badge, portion info, and ingredient count in a scannable header
- **Shopping lists**: group by ingredient category with sticky category headers
- **Event context**: always show guest count prominently — it drives all quantity calculations
- **Status chips**: use semantic colors — confirmed=teal, draft=gray, in-prep=amber, done=green
- **Numbers**: always LTR even in RTL layout — `dir="ltr"` on numeric inputs

### Color System (match existing app palette)
- Dark surfaces: `--color-bg`, `--color-surface`, `--color-surface-2`
- Primary teal: `--color-primary` (#3AAFC5 range)
- Text: `--color-text` (primary), `--color-text-muted` (secondary at 60% opacity)
- Error: `--color-error` — use for empty required fields, not just validation errors
- Success: `--color-success` — use on confirmed/saved states

### Forms & Inputs
- Required fields: border-color shift to `--color-primary` on focus, `--color-error` when empty+touched
- Inline validation: error hint appears **below** the field, never above
- Sticky action bars (save/cancel): `position: sticky; bottom: 0` with background matching the panel surface
- Disabled buttons: `opacity: 0.45` + `cursor: not-allowed` — never just `pointer-events: none`

### Accessibility
- Minimum touch target: 40×40px (not just visual size)
- Color alone never conveys state — always add icon or text
- Loading states: use skeleton screens, not spinners, for content >300ms
- `aria-label` on icon-only buttons, in the active language (`isRtl ? "מחק" : "Delete"`)

---

## Review Checklist
When reviewing `$ARGUMENTS`, check each:
- [ ] All directional CSS uses logical properties
- [ ] Hebrew and English fonts are correctly applied
- [ ] Numbers/prices are LTR-isolated in RTL context
- [ ] Ingredient/dish grids align properly in both directions
- [ ] Touch targets are ≥40px
- [ ] Error states are visible without color alone
- [ ] Sticky save bar is visible without scrolling
- [ ] Loading/saving states are communicated clearly
