# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

Single-file static HTML mockup: [tomassi-hsi-mockup.html](tomassi-hsi-mockup.html). It's a Spanish-language marketing landing page for Tomassi HSI, a clinical systems integration consultancy (HL7v2/FHIR/ASTM lab interoperability work in LATAM). No build system, package manager, framework, or test suite — all CSS is inlined in a `<style>` block and there is no JavaScript.

## Working with this file

- Open directly in a browser to preview (`xdg-open tomassi-hsi-mockup.html` or similar) — no server or build step needed.
- Keep content in Spanish (the site's language, per `lang="es"`), matching the existing tone: technical, terse, industry-specific (HL7, FHIR, ASTM, LIS/HIS terminology).
- Styling uses CSS custom properties defined in `:root` (colors, fonts) — reuse these variables (`--primary`, `--ink`, `--bg-panel`, etc.) rather than hardcoding new values.
- Sections are anchor-linked from the nav (`#servicios`, `#casos`, `#enfoque`, `#contacto`) — keep `id` attributes in sync with `.navlinks` hrefs if restructuring sections.
- Placeholder contact links (`href="#"`) for phone/email/LinkedIn are intentional mockup stand-ins, not broken links to fix.
