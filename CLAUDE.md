# כספית — Project Rules

## Language

- Always respond in English, regardless of the language the user writes in.

## Project Context

- Hebrew RTL personal finance app (כספית / Kaspit)
- React 18 + Firebase (Firestore, Auth)
- WhatsApp bot "קיקי" on Railway (Express + Twilio + Claude API)
- Deployed to GitHub Pages (`npm run build` → `npx gh-pages -d dist --dotfiles`)

## Code Rules

- No comments unless the WHY is non-obvious
- No new abstractions beyond what the task requires
- No error handling for scenarios that can't happen
- Prefer editing existing files over creating new ones
- Default categories live in `src/utils/constants.js` — do not duplicate them elsewhere

## After Every Change

1. `npm run build` — must pass with no errors
2. Deploy: `echo > dist/.nojekyll && npx gh-pages -d dist --dotfiles`
3. Commit + push to `origin main`
4. If bot files changed — Railway auto-deploys from GitHub push

## RTL / Hebrew UI

- All UI is RTL Hebrew — use `font-family: Heebo, sans-serif`
- Use logical CSS properties (`margin-inline-start`, `padding-inline-end`)
- Numbers and amounts are always LTR-isolated
- Minimum touch target: 40×40px

## Firebase

- Project ID: `kaspit-d01e9`
- Entries stored at: `households/{householdId}/entries`
- Custom categories stored on the household document
- Per-user Anthropic API key stored in `users/{uid}.anthropicApiKey`

## Bot (kaspit-bot/)

- Normalize all category values to lowercase before saving to Firestore
- Always use the user's personal `anthropicApiKey` — never the shared key for user requests
- Model: `claude-haiku-4-5-20251001`

# DESIGN SYSTEM — Expense & Income Manager

## Product Identity

This is a personal finance app for daily expense and income tracking.
The target user is a practical adult who wants clarity, not complexity.
The app must feel: trustworthy, clean, and slightly warm — like a well-designed
physical notebook, not a cold banking interface.

---

## Design Direction: "Warm Ledger"

Inspired by physical bookkeeping, quality stationery, and Swiss editorial design.
NOT: neon fintech, dark crypto dashboards, or corporate blue enterprise apps.

### Tone

- Calm confidence. Numbers should feel stable and readable.
- Approachable warmth — off-whites, warm grays, a single accent color.
- Purposeful density — show data clearly without overwhelming.

---

## Typography

Font import (add to global CSS):
https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Mono:wght@400;500&family=Lora:wght@600&display=swap

- DM Sans — body, labels, UI text
- DM Mono — ALL currency amounts and numbers
- Lora — large summary/display numbers only (monthly total, balance hero)

DO NOT use: Inter, Roboto, Arial, or any system font.
DO NOT use font weights above 600.

---

## Color Palette

--color-bg: #F7F5F0 (warm off-white, main background)
--color-surface: #FFFFFF (cards and panels)
--color-border: #E8E4DC (subtle warm border)
--color-text-main: #1C1917 (near-black, warm)
--color-text-muted: #78716C (secondary text, labels)
--color-accent: #2D6A4F (forest green — income, positive, primary actions)
--color-expense: #C0392B (deep red — expenses, destructive)
--color-tag-bg: #F4EBD0 (warm tag background)
--color-tag-text: #92400E (tag text)

Color usage rules:

- Income / positive amounts → --color-accent
- Expenses / negative amounts → --color-expense
- NO purple gradients, no blue-on-white generic schemes
- NO background gradients anywhere

---

## Icons

Use ONLY Lucide icons (lucide-react). Install: npm install lucide-react

Preferred icons for this app:

- TrendingUp / TrendingDown — income/expense indicators
- Wallet — balance
- ReceiptText — transactions list
- Tag — categories
- CalendarDays — date filtering
- PiggyBank — savings
- BarChart2 / LineChart — analytics

Icon sizing: 16px inline, 20px for action buttons, 24px for page headers.

DO NOT use emoji as icons. DO NOT use Font Awesome. DO NOT mix icon libraries.

---

## Component Rules

### Numbers & Amounts

- Font: DM Mono for all currency values
- Positive amounts: color --color-accent, prefixed with +
- Negative amounts: color --color-expense, prefixed with -
- Large totals (balance hero): 36–40px, Lora, weight 600

### Cards

- Background: --color-surface (white)
- Border: 0.5px solid --color-border
- Border radius: 12px
- Padding: 16px 20px
- NO box-shadows — border only
- NO gradients

### Transaction Rows

- Category icon on left (20px)
- Title + date in center
- Amount on right (DM Mono, colored by type)
- Separator: border-bottom 0.5px solid --color-border
- Hover: background #F7F5F0, no animation

### Buttons

- Primary: background --color-accent, white text, border-radius 8px
- Destructive: background --color-expense, white text
- Secondary: transparent, border 1px solid --color-border, text --color-text-main
- NO pill-shaped buttons (max border-radius 8px)
- NO gradient buttons

### Category Tags

- Background: --color-tag-bg
- Text: --color-tag-text
- Font: DM Sans, 12px, weight 500
- Padding: 2px 8px
- Border radius: 4px

### Charts

- Use Recharts (React) or Chart.js
- Income bars: --color-accent
- Expense bars: --color-expense
- NO 3D charts, NO gradient fills on charts
- Axis labels: DM Sans 11px, --color-text-muted
- Grid lines: --color-border, 0.5px

---

## Layout Principles

- Sidebar (desktop): 240px, --color-bg background, no shadow
- Main content: white surface, full height
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48px
- Max content width: 840px centered
- Mobile: single column, bottom nav bar (not hamburger menu)

---

## Anti-patterns — NEVER do these

- Purple gradient hero sections
- Animated number counters
- Glassmorphism backgrounds
- Floating cards with heavy box-shadows
- Emoji anywhere in the UI
- Generic sans-serif fonts for large display numbers
- Colors outside the defined palette
- Generic blue "Add Transaction" button
- Loading spinners for every small action
- ALL CAPS labels

---

## Mandatory pre-coding checkpoint

Before writing ANY UI component, state:

Intent: [what is the user doing here exactly]
Component: [component name]
Palette tokens used: [only from the palette above]
Icon: [Lucide icon name or "none"]
Typography: [DM Sans / DM Mono / Lora + size]

This checkpoint is mandatory. If you cannot explain WHY for each choice, stop and think before writing code.
