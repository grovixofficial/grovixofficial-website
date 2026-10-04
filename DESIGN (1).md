# Door Dennis

## Overview

**Product:** Door Dennis
**URL:** https://www.doordennis.nl/
**Surface type:** marketing
**Audience:** Business decision-makers and potential customers
**Brand character:** Conversion-focused marketing presence with a rich, diverse color palette and 5 typefaces.

> **Note:** Surface detection confidence is low. Verify the inferred audience and brand context before relying on this file.

### Design Principles

- Consistency over novelty — reuse existing patterns before inventing new ones.
- Token-driven — every visual decision references a token, not a magic number.
- Accessible by default — compliance is a baseline, not a feature.

## Colors

| Token | Value | Role |
|-------|-------|------|
| color-1 | `#191919` | Text Primary |
| color-2 | `#0000EE` | Text Primary |
| color-3 | `#FF5F37` | Accent |
| color-4 | `#F0F0F0` | Text Light |

## Typography

**Font stack:** Inter, Roboto Mono, icomoon, Instrument Serif, Times New Roman

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 9px | Captions, metadata |
| text-sm | 11px | Labels, secondary text |
| text-base | 12px | Body text (default) |
| text-lg | 14px | Subheadings, emphasis |
| text-xl | 15px | Section headings |
| text-2xl | 18px | Section headings |
| text-3xl | 53px | Section headings |

**Weight scale:** 400
**Line heights:** 12.1712px · 17.0397px · 19.1657px · 13.6898px · 24.3678px · 28.1503px · 25.8725px · 14.9138px · 10.6527px · 20px · 17.0443px · 15.2198px · 63.9162px · 15.9791px · 18.2568px · 22.3707px · 9.12842px

## Spacing

**Base unit:** 4px

`space-1: 1px` · `space-2: 4px` · `space-3: 8px` · `space-4: 9px` · `space-5: 11px` · `space-6: 12px` · `space-7: 15px` · `space-8: 17px` · `space-9: 18px` · `space-10: 30px` · `space-11: 46px` · `space-12: 76px` · `space-13: 77px` · `space-14: 88px` · `space-15: 107px` · `space-16: 135px` · `space-17: 137px` · `space-18: 164px` · `space-19: 190px` · `space-20: 361px` · `space-21: 402px` · `space-22: 440px` · `space-23: 2735px`

## Shapes

**Border radius:** `radius-sm: 1.51853px` · `radius-md: 6.08562px` · `radius-lg: 7.60414px` · `radius-full: 50%`

## Elevation

- **shadow-sm:** `rgba(25, 25, 25, 0.3) 0px 7.60414px 30.4396px 0px`

## Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-fast:** `0.15s ease-out`
- **duration-base:** `0.3s ease-out`
- **duration-base:** `background 0.3s ease-out`
- **duration-base:** `transform 0.3s ease-out`
- **duration-base:** `opacity 0.3s ease-out`
- **duration-base:** `color 0.3s, transform 0.3s, border-color 0.3s, opacity 0.3s`
- **duration-slow:** `transform 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)`
- **duration-slow:** `transform 0.6s cubic-bezier(0.85, 0, 0.15, 1)`
- **duration-slow:** `0.75s`
- **duration-slow:** `1s infinite blurblink`

## Components

- **Buttons:** 10 detected
- **Links:** 47 detected
- **Inputs:** 4 detected
- **Lists:** 5 detected
- **Images:** 40 detected

## Do's and Don'ts

### Do

- Reference tokens by name, not raw values — agents and developers should use `color.text.primary`, not `#171717`.
- Define all interactive states: default, hover, focus-visible, active, disabled.
- Use the spacing scale for all padding, margin, and gap values.
- Write content in sentence case. Reserve ALL CAPS for acronyms only.
- Test every component at the smallest and largest breakpoint before shipping.

### Don't

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (1.51853px, 6.08562px, 7.60414px, 50%).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Concise, confident, implementation-focused. Avoid filler preambles.

## Authoring Workflow

When creating or updating a component guideline for this system, follow this sequence:

1. **State the intent** — one sentence on what the component does and why it exists.
2. **Map tokens** — list every color, spacing, typography, and radius token the component uses. No raw values.
3. **Define anatomy** — break the component into named parts (container, label, icon, etc.) with their token assignments.
4. **Specify states** — document every state: default, hover, focus-visible, active, disabled, loading, error, empty.
5. **Describe interactions** — keyboard, pointer, and touch behavior, including edge cases (long content, overflow, truncation).
6. **Add accessibility criteria** — write testable pass/fail checks (e.g. "focus ring must be visible at 3:1 contrast").
7. **List anti-patterns** — concrete examples of misuse with a brief explanation of why each is wrong.
8. **Close with a QA checklist** — a mechanical list of verifiable items (see Definition of Done below).

## Required Output Structure

Every component guideline produced from this system must contain these sections, in order:

1. Overview — purpose, when to use, when not to use.
2. Tokens and foundations — all referenced tokens from the tables above.
3. Anatomy and variants — named parts, variant matrix, responsive behavior.
4. States and interactions — full state table, keyboard/pointer/touch behavior.
5. Accessibility — ARIA attributes, contrast requirements, focus management, screen reader behavior.
6. Content guidelines — copy length, tone, capitalisation, placeholder text rules.
7. Anti-patterns — explicit examples of what not to build, with reasoning.

## Component Requirements

Every component built against this system must:

- Reference only tokens defined in the tables above — no hardcoded hex, px, or font values.
- Define all interactive states: default, hover, focus-visible, active, disabled, loading, error.
- Specify responsive behavior at the smallest and largest supported breakpoint.
- Handle edge cases: empty state, overflow / truncation, maximum content length.
- Include keyboard navigation (Tab, Enter, Escape, Arrow keys where applicable).
- Document ARIA roles, labels, and live-region behavior where relevant.
- Include known page component density: - **Buttons:** 10 detected
- **Links:** 47 detected
- **Inputs:** 4 detected
- **Lists:** 5 detected
- **Images:** 40 detected

## Definition of Done

A component is not complete until every item below is checked:

- Renders correctly in its default state (smoke test).
- All states documented and visually verified (hover, focus, disabled, loading, error, empty).
- All visual values use design tokens — zero hardcoded values.
- Keyboard navigation works without a pointer.
- No critical accessibility violations (contrast, ARIA, focus order).
- Tested at smallest and largest breakpoint.
- Anti-patterns section lists at least one concrete misuse example.
- Documentation covers purpose, usage, props/API, and limitations.
