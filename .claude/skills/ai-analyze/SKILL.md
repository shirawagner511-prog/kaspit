---
name: ai-analyze
description: Review and improve AI prompts for food/menu analysis — dish detail extraction, sub-recipe detection, ingredient parsing, quantity calculation, and prep scheduling. Covers prompt quality, output schema reliability, and edge case handling.
argument-hint: [route file, prompt section, or describe what to improve]
allowed-tools: Read Grep Glob Edit Write
---

# AI Prompt Engineering Skill — Menu & Dish Analysis

You are a prompt engineer specializing in **structured data extraction from culinary content** using Claude AI. When invoked with `$ARGUMENTS`, review and improve the AI prompts, schema design, and error handling in the target code.

---

## Principles for Food AI Prompts

### Output Reliability
- Always request JSON in a **typed schema** with explicit field descriptions
- Include a concrete example in the prompt — models follow examples more reliably than descriptions
- For enum fields (category, unit): list ALL valid values explicitly in the prompt
- Add a fallback instruction: `"If unsure, use 'other' / 'g'"` — prevents schema validation errors
- Never trust AI-returned enums without sanitizing on the server

### Dish Detail Extraction
- Specify quantity range: `"quantityPerPortion: grams or ml per single serving (typical range: 20–400g)"`
- Separate raw vs cooked weight: ask for `quantityPerPortion` always as **raw pre-cooked weight**
- Category mapping must be explicit in prompt — AI often invents categories like "salad", "soup"
- Valid categories: `appetizer | starter | main | side | dessert | bread | beverage | other`
- Valid units: `g | kg | ml | l | units | bunches`

### Sub-Recipe Detection
- Prompt must distinguish: **sub-recipe** (cooked from scratch, has its own steps) vs **ingredient** (store-bought or atomic)
- Example guidance: "Pizza dough in pizza = sub-recipe. Olive oil = ingredient."
- Limit sub-recipes to 2 max per dish — more creates cognitive overload for the user
- Sub-recipe ingredients must NOT repeat in main ingredient list
- If no sub-recipe, return `subDishes: []` — never omit the field

### Ingredient Parsing
- Normalize units immediately: `"250ml cream"` → `{ quantity: 250, unit: "ml" }`
- Ambiguous quantities (e.g., "2 cloves garlic"): convert to grams with note in nameEn
- Missing quantities: ask AI to estimate from standard recipe conventions, mark with `estimated: true`

### Quantity Calculation
- Always pass `guestCount` explicitly — never let the AI guess or use a default
- Waste factor: typically 10–15% for veg prep, 0% for packaged goods
- Total = `quantityPerPortion × guestCount × (1 + wasteFactor)`
- Return both `totalQuantity` and `totalWithWaste` separately

### Prompt Structure Template
```
ROLE: You are a professional chef and nutritionist.
TASK: [specific extraction task]
INPUT: [what the user provides]

RULES:
1. [constraint 1]
2. [constraint 2]
...

OUTPUT: Return ONLY valid JSON matching this schema:
[schema with example]

EXAMPLE:
Input: "..."
Output: { ... }
```

---

## Review Checklist
When reviewing `$ARGUMENTS`, check:
- [ ] All enum fields have exhaustive valid values listed in prompt
- [ ] Fallback values specified for every enum/optional field
- [ ] Schema has a concrete example, not just field descriptions
- [ ] Sub-recipe detection rules are explicit
- [ ] Unit normalization is requested
- [ ] `guestCount` is always passed to quantity calculations
- [ ] Server-side sanitization exists for all AI-returned enum fields
- [ ] Error from AI (malformed JSON, missing fields) is handled gracefully
- [ ] `aiGenerated: true` flag is set on AI-created dishes

---

## Common Fixes
- **"category" 400 error**: Server validation rejects AI-invented categories → add `sanitizeDishCategory` on client before PUT
- **Missing ingredients**: AI returns names without quantities → add `"Estimate quantities based on standard recipes"` to prompt
- **Sub-dish ingredients duplicated in main**: Add explicit rule `"Do not repeat sub-dish ingredients in main ingredients array"`
- **Wrong portion sizes**: Add `"Quantities are per single portion, not for the whole dish"` to prompt
