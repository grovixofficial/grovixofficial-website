# Sadu Media

## Overview

**Product:** Sadu Media
**URL:** https://www.sadumedia.com/
**Surface type:** blog
**Audience:** General readers
**Brand character:** Content-first editorial layout with a rich, diverse color palette and 3 typefaces.

> **Note:** Surface detection confidence is low. Verify the inferred audience and brand context before relying on this file.

### Design Principles

- Readability above all — optimise for sustained reading, not scanning.
- Content is the interface — typography and whitespace do the heavy lifting.
- Minimal chrome — navigation and UI should fade behind the content.


## Typography

**Font stack:** Manuka, Inter, ui-sans-serif

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 11px | Captions, metadata |
| text-sm | 15px | Labels, secondary text |
| text-base | 17px | Body text (default) |
| text-lg | 21px | Subheadings, emphasis |
| text-xl | 34px | Section headings |
| text-2xl | 154px | Section headings |
| text-3xl | 171px | Section headings |

**Weight scale:** 400 · 700 · 900
**Line heights:** 16px · 22.1867px · 148.48px

## Spacing

**Base unit:** 4px

`space-1: 5px` · `space-2: 11px` · `space-3: 21px` · `space-4: 32px` · `space-5: 53px` · `space-6: 116px` · `space-7: 160px`

## Shapes

**Border radius:** `radius-sm: 2.13333px` · `radius-md: 10.6667px`

## Elevation

- **shadow-sm:** `rgb(255, 255, 255) 0px 0px 2px 0px, rgb(85, 85, 85) 0px 1px 2px 0px`

## Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-base:** `color 0.2s linear, background-color 0.2s linear, border-color 0.2s linear, outline-color 0.2s linear, text-decoration-color 0.2s linear, fill 0.2s linear, stroke 0.2s linear, --tw-gradient-from 0.2s linear, --tw-gradient-via 0.2s linear, --tw-gradient-to 0.2s linear`
- **duration-base:** `border 0.3s, background 0.3s, opacity 0.2s, box-shadow 0.4s`
- **duration-slow:** `opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1)`

## Components

- **Buttons:** 21 detected
- **Links:** 36 detected
- **Lists:** 11 detected
- **Images:** 64 detected

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
- Do not mix border-radius values. Pin to the detected set (2.13333px, 10.6667px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Informative, engaging, conversational. First person plural when appropriate.

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
- Include known page component density: - **Buttons:** 21 detected
- **Links:** 36 detected
- **Lists:** 11 detected
- **Images:** 64 detected

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
