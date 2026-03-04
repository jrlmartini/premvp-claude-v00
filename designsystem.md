# Conatus Environmental Technologies — Design System

## 1. Brand Identity

### Mission
Conatus Environmental Technologies pioneers the future of water treatment through innovative IoT-enabled solutions, reducing the environmental impact of industry and agribusiness.

### Brand Values
- **Innovation** — Technology-driven solutions
- **Sustainability** — Environmental responsibility
- **Precision** — Data-driven decision making
- **Trust** — Transparency and reliability

---

## 2. Color Palette

### Primary Colors
| Token               | Hex       | Usage                                      |
|---------------------|-----------|---------------------------------------------|
| `--primary`         | `#0B6E4F` | Primary actions, key metrics, headers        |
| `--primary-light`   | `#14A676` | Hover states, positive indicators            |
| `--primary-dark`    | `#084C37` | Active states, dark accents                  |

### Secondary Colors
| Token               | Hex       | Usage                                      |
|---------------------|-----------|---------------------------------------------|
| `--secondary`       | `#1B4965` | Secondary actions, navigation, charts        |
| `--secondary-light` | `#2D6A8F` | Chart fills, secondary highlights            |
| `--secondary-dark`  | `#0F2D3D` | Deep backgrounds, footer                     |

### Accent Colors
| Token               | Hex       | Usage                                      |
|---------------------|-----------|---------------------------------------------|
| `--accent`          | `#62B6CB` | Informational elements, links                |
| `--accent-warm`     | `#F4A261` | Warnings, attention elements                 |
| `--accent-danger`   | `#E63946` | Errors, negative indicators, alerts          |

### Neutral Colors
| Token               | Hex       | Usage                                      |
|---------------------|-----------|---------------------------------------------|
| `--neutral-50`      | `#F8FAFB` | Page background                              |
| `--neutral-100`     | `#EEF2F5` | Card backgrounds, table stripes              |
| `--neutral-200`     | `#D8DFE5` | Borders, dividers                            |
| `--neutral-300`     | `#B0BEC5` | Disabled states, placeholders                |
| `--neutral-500`     | `#607D8B` | Secondary text, labels                       |
| `--neutral-700`     | `#37474F` | Body text                                    |
| `--neutral-900`     | `#1A2127` | Headings, primary text                       |

### Semantic Colors
| Token               | Hex       | Usage                                      |
|---------------------|-----------|---------------------------------------------|
| `--success`         | `#14A676` | Positive values, growth indicators           |
| `--warning`         | `#F4A261` | Caution, moderate alerts                     |
| `--danger`          | `#E63946` | Negative values, critical alerts             |
| `--info`            | `#62B6CB` | Informational badges, tooltips               |

---

## 3. Typography

### Font Family
- **Primary:** `Inter` — Used for all UI text
- **Monospace:** `JetBrains Mono` — Used for numerical data, KPIs, financial figures

### Type Scale
| Level       | Size    | Weight   | Line Height | Usage                        |
|-------------|---------|----------|-------------|-------------------------------|
| `display`   | 32px    | 700      | 1.2         | Page titles                   |
| `h1`        | 24px    | 700      | 1.3         | Section headers               |
| `h2`        | 20px    | 600      | 1.3         | Card titles                   |
| `h3`        | 16px    | 600      | 1.4         | Sub-section headers           |
| `body`      | 14px    | 400      | 1.5         | General text                  |
| `body-sm`   | 13px    | 400      | 1.5         | Secondary text, descriptions  |
| `caption`   | 12px    | 500      | 1.4         | Labels, badges, metadata      |
| `kpi`       | 28px    | 700      | 1.1         | Key performance indicators    |
| `kpi-sm`    | 20px    | 600      | 1.2         | Secondary KPI values          |

### Numerical Display
- All financial figures use `JetBrains Mono`
- Thousands separator: `.` (Brazilian standard)
- Decimal separator: `,` (Brazilian standard)
- Currency: `R$` prefix with no space (e.g., `R$1.234.567,89`)

---

## 4. Spacing & Layout

### Grid System
- **Container:** Max width `1440px`, centered
- **Grid:** 12-column layout with `24px` gutters
- **Dashboard grid:** CSS Grid with `gap: 20px`

### Spacing Scale (based on 4px)
| Token  | Value | Usage                     |
|--------|-------|----------------------------|
| `xs`   | 4px   | Tight inline spacing       |
| `sm`   | 8px   | Icon gaps, compact padding |
| `md`   | 12px  | Inner card padding         |
| `lg`   | 16px  | Standard card padding      |
| `xl`   | 20px  | Card gaps, section spacing |
| `2xl`  | 24px  | Section separation         |
| `3xl`  | 32px  | Major section spacing      |

### Card Specifications
- **Border radius:** `12px`
- **Background:** `#FFFFFF`
- **Border:** `1px solid var(--neutral-200)`
- **Shadow:** `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`
- **Shadow (hover):** `0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)`
- **Padding:** `20px`
- **Header padding-bottom:** `16px`
- **Transition:** `all 0.2s ease`

---

## 5. Components

### KPI Cards
```
┌─────────────────────────────────┐
│ [Icon]  Card Title              │
│         Subtitle / Period       │
│                                 │
│  R$1.234.567,89                │
│  ▲ 12,5% vs meta              │
│                                 │
│  [Sparkline / Mini Chart]       │
└─────────────────────────────────┘
```
- Icon: 20×20px, color matches card theme
- Title: `h3` typography
- KPI value: `kpi` typography, `--neutral-900`
- Comparison: `caption` typography, colored by sentiment (`--success` / `--danger`)
- Mini chart height: `48px`

### Data Tables
- Header: `caption` typography, uppercase, `--neutral-500`
- Rows: `body` typography, `--neutral-700`
- Row height: `44px`
- Alternating rows: `--neutral-50` / `#FFFFFF`
- Hover: `--neutral-100`
- Border: Bottom only, `1px solid var(--neutral-200)`

### Charts
- Font: `Inter` for labels, `JetBrains Mono` for values
- Grid lines: `--neutral-200`, dashed, `1px`
- Color sequence (for series):
  1. `#0B6E4F` (primary)
  2. `#1B4965` (secondary)
  3. `#62B6CB` (accent)
  4. `#14A676` (primary-light)
  5. `#F4A261` (accent-warm)
  6. `#2D6A8F` (secondary-light)
- Tooltip: White bg, `12px` border-radius, shadow matching card shadow
- Animation: Ease-in-out, 600ms entry

### Heatmap (RFM Matrix)
- Cell size: Flexible, minimum `48px`
- Color gradient (low → high):
  - `#EEF2F5` → `#62B6CB` → `#1B4965` → `#0B6E4F` → `#084C37`
- Cell border-radius: `6px`
- Gap between cells: `3px`
- Labels: `caption` typography
- Values inside cells: `body-sm` typography, white text on dark cells

### Badges / Tags
- Border-radius: `6px`
- Padding: `2px 8px`
- Font: `caption` typography
- Variants:
  - **Success:** bg `#E8F5E9`, text `--success`
  - **Warning:** bg `#FFF3E0`, text `--warning`
  - **Danger:** bg `#FFEBEE`, text `--danger`
  - **Info:** bg `#E0F4F8`, text `--info`
  - **Neutral:** bg `--neutral-100`, text `--neutral-500`

---

## 6. Navigation

### Sidebar
- Width: `260px` (expanded), `72px` (collapsed)
- Background: `--secondary-dark` (`#0F2D3D`)
- Active item: `--primary` background with `4px` left border
- Text: White, `body` typography
- Icons: `20px`, white, `0.7` opacity (inactive), `1.0` (active)
- Transition: `width 0.3s ease`

### Header Bar
- Height: `64px`
- Background: `#FFFFFF`
- Border-bottom: `1px solid var(--neutral-200)`
- Logo area: Left-aligned
- User menu: Right-aligned
- Shadow: `0 1px 2px rgba(0,0,0,0.04)`

---

## 7. Animations & Interactions

### Entry Animations
- Cards: Fade-in + slide-up, `400ms`, staggered by `80ms`
- Numbers: Count-up animation, `800ms`, ease-out
- Charts: Progressive draw, `600ms`, ease-in-out

### Hover States
- Cards: Elevate shadow, `200ms` transition
- Buttons: Slight scale (`1.02`), `150ms`
- Table rows: Background color transition, `150ms`

### Micro-interactions
- KPI arrows: Gentle pulse on positive values
- Progress bars: Smooth fill animation on load
- Tooltips: Fade-in `150ms`, slight scale from `0.95`

---

## 8. Responsive Breakpoints

| Breakpoint | Width     | Layout                        |
|------------|-----------|-------------------------------|
| `xl`       | ≥1440px   | Full 12-column grid           |
| `lg`       | ≥1024px   | 12-column, sidebar collapsed  |
| `md`       | ≥768px    | 2-column card grid            |
| `sm`       | <768px    | Single column, stacked cards  |

---

## 9. Iconography

- **Icon set:** Lucide React (consistent with shadcn/ui)
- **Size:** `20px` default, `16px` inline, `24px` headers
- **Stroke width:** `1.5px`
- **Color:** Inherits from parent text color unless specified

---

## 10. Accessibility

- Minimum contrast ratio: `4.5:1` for body text
- Focus indicators: `2px solid var(--primary)` with `2px` offset
- All interactive elements: Minimum `44px` touch target
- ARIA labels on all icon-only buttons
- Reduced motion: Respect `prefers-reduced-motion` media query

---

## 11. Language & Localization

- **Primary language:** Português (PT-BR)
- **Date format:** `DD/MM/YYYY`
- **Number format:** `1.234.567,89`
- **Currency:** `R$ 1.234.567,89`
- **Percentage:** `12,5%`
- **Month abbreviations:** Jan, Fev, Mar, Abr, Mai, Jun, Jul, Ago, Set, Out, Nov, Dez
