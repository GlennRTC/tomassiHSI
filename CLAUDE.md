# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

Single-file static HTML mockup: [tomassi-hsi-mockup.html](tomassi-hsi-mockup.html). It's a Spanish-language marketing landing page for Tomassi HSI, a clinical systems integration consultancy (HL7v2/FHIR/ASTM lab interoperability work in LATAM). No local build system or package manager — styling comes from Tailwind CSS loaded via a CDN `<script>` tag, configured inline through a `tailwind.config` script block in `<head>`. Fonts (JetBrains Mono) and icons (Material Symbols Outlined) load from Google Fonts. There is no custom JavaScript — all interaction (nav hover states, card hover, methodology tooltips) is pure CSS `:hover`.

This file originated as a Google Stitch prototype (`stitch_tomassi_hsi_systems_integration/DESIGN.md`, `screen.png` — the prototype's own `code.html` was moved here and became this file) implementing the "Carbon Light" direction from `docs/superpowers/specs/2026-08-08-landing-redesign-design.md` §10, superseding the earlier hand-rolled "Editorial Minimal" system.

## Working with this file

- Open directly in a browser to preview (`xdg-open tomassi-hsi-mockup.html` or similar) — no server or build step needed (Tailwind compiles client-side via the CDN script).
- Keep content in Spanish (the site's language, per `lang="es"`), matching the existing tone: technical, terse, industry-specific (HL7, FHIR, ASTM, LIS/HIS terminology).
- Styling is "Carbon Light": one accent color (`primary-container` = `#FF6B00`), one typeface (JetBrains Mono, the `font-sans` key in `tailwind.config`), `0px` border-radius everywhere (never add a `rounded-none` utility — nothing here has a default radius to override), 1px solid borders instead of shadows for hierarchy. Extend `tailwind.config`'s `theme.extend` rather than hardcoding new colors or adding a second font.
- Sections are anchor-linked from the nav: `#hero`, `#projects` (Casos), `#interoperability` (Servicios), `#process` (Metodología), `#about` (Acerca), with `#contact` nested inside `#about`'s contact card — keep `id` attributes in sync with the nav/footer `href`s if restructuring sections.
- Placeholder contact links (`href="#"`) for phone/email/LinkedIn, and the placeholder project images in the Casos cards (`googleusercontent.com` stock URLs), are intentional mockup stand-ins — not broken links/assets to "fix". Casos project copy (titles, descriptions, tags, countries, periods) must stay real and verified (sourced from Glenn's actual project repos) — never replace it with invented technical claims.
