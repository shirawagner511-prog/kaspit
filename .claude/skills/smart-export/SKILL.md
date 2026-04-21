---
name: smart-export
description: Review and improve multi-format file exports (Excel/XLSX, PDF, DOCX/Word) for catering/food apps. Covers sheet organization, RTL text, column layout, table design, consistent styling, and print-ready formatting.
argument-hint: [export route file or specific format to improve]
allowed-tools: Read Grep Glob Edit Write
---

# Smart Export Skill — Multi-Format File Generation

You are a document engineering specialist for **food & catering management systems**. When invoked with `$ARGUMENTS`, review and improve the export code for professional, print-ready, well-organized files.

---

## Excel / XLSX (ExcelJS)

### Sheet Organization
- Sheet order should follow the user workflow: Summary → Shopping List → Prep Schedule → Production Quantities → Dish Cards → (AI Debug last)
- Each sheet needs: frozen first row (header), auto-filter on data columns, consistent column widths
- Use named sheets in the active language (RTL app → Hebrew sheet names)

### RTL Handling
- Set `worksheet.views = [{ rightToLeft: true }]` for Hebrew sheets
- Numbers and dates remain LTR even in RTL sheets — they auto-handle in Excel
- Column order should read right-to-left for Hebrew content

### Styling Conventions
- Header row: background `#2D4A5A` (dark teal), white text, bold, height 28px
- Category rows: background `#1F3340`, text `#4ECDC4`, bold
- Alternating data rows: `#1A2B35` / `#1F3340`
- Total/summary rows: `#0D2233`, text `#4ECDC4`, bold, top border
- Borders: `{ style: "thin", color: { argb: "FF334455" } }` for all data cells

### Column Widths (food data)
- Ingredient name: 28–35 chars
- Quantity per portion: 14 chars
- Unit: 10 chars
- Total quantity: 16 chars
- Category: 14 chars

### Number Formatting
- Weights ≥1000g → display as kg with 1 decimal: `1.5 kg`
- Volumes ≥1000ml → display as liters: `2.3 l`
- Always round to 1 decimal max for display, keep full precision in cell value

---

## PDF (PDFKit)

### Page Layout
- Margin: 40px all sides
- Font: embed Hebrew-compatible font (Frank Ruhl Libre or use a system font fallback)
- RTL text: PDFKit doesn't natively support RTL — use `text(str, { align: "right" })` + reverse word order for Hebrew
- Page header: app name + event name + date on every page
- Page footer: page number centered, generation timestamp

### Section Organization
1. Event summary (guests, date, name)
2. Shopping list (grouped by category)
3. Prep schedule (timeline)
4. Production quantities (total weights)
5. Dish cards (one per dish, or compact table)

### Tables
- Column headers: filled background, white bold text
- Alternating rows: slight background variation for readability
- Borders: subtle gray, 0.5px weight
- Overflow: if content exceeds page, add page break before the overflowing row

### Typography
- Title: 18pt bold
- Section headers: 13pt bold, teal color
- Body: 10pt regular
- Small labels: 8pt, muted color
- Line height: 1.5 for readability

---

## DOCX / Word (docx library)

### Document Structure
- Use `HeadingLevel.HEADING_1` for section titles
- Use `HeadingLevel.HEADING_2` for sub-sections (per-dish headers)
- Table of contents section at the start for documents >3 pages
- Page breaks between major sections (`pageBreakBefore: true`)

### Font (Calibri for this app)
- Body: Calibri 11pt
- Headings: Calibri 14pt bold
- Table headers: Calibri 11pt bold, white on dark background
- RTL paragraphs: `bidirectional: true`, `alignment: AlignmentType.RIGHT`

### Table Design
- 5-column ingredient table: Name | Qty/Portion | Unit | × Guests | Total
- Header fill: `#2D4A5A` (dark teal), white text
- Alternating rows: `#F0F4F8` / white
- Total row: `#2D4A5A` fill, white bold text
- Column widths: name 40%, qty 15%, unit 12%, multiplier 13%, total 20%

### RTL in DOCX
- Set `<w:bidi/>` on paragraphs with Hebrew content
- Table direction: right-to-left for Hebrew tables
- Number columns (qty, total): always LTR even in RTL tables

---

## Review Checklist
When reviewing `$ARGUMENTS`, check:
- [ ] Sheet/section order matches user workflow
- [ ] RTL is correctly applied for Hebrew content
- [ ] Column widths are appropriate for the data
- [ ] Numbers auto-convert kg/l when ≥1000
- [ ] Header styling is consistent across all sheets/sections
- [ ] Page breaks prevent tables from splitting mid-row
- [ ] Every page/sheet has the event name and date
- [ ] Total rows are visually distinct from data rows
- [ ] Font is consistent (Calibri for DOCX, embedded for PDF)
- [ ] File is named with event name + date (no generic "export.xlsx")
