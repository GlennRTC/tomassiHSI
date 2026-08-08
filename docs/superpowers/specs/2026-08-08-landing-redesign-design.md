# tomassiHSI landing page redesign — design spec

Date: 2026-08-08
Scope: visual/structural redesign of `tomassi-hsi-mockup.html`. No code in this doc — this defines what gets built, not the build itself.

## 1. Problem

The current mockup (narrow single-column wrap, serif/mono mix, numbered service list, HL7-segment eyebrow, AHA-style case list) is professional but reads as generic "clean minimal SaaS template." It needs personality specific to Glenn as an integration developer — visible in structure and detail, not loud graphics — without:

1. The oversized-headline / centered-hero SaaS look
2. Gradient cards with rounded corners
3. Anything playful/cute that undermines trust with non-technical buyers (lab directors, clinic owners)

Existing brand system stays fixed: primary blue `#0B5C8C`, amber signal `#B45309`, ink `#132537`; serif headings (Iowan Old Style/Palatino), sans body, IBM Plex Mono for technical/data labels; the HL7 segment-syntax "protocol header" motif for section labels.

## 2. Reference calibration

Four references were used to calibrate taste, not to copy:

- **iconplc.com** — editorial minimalism, generous whitespace, orange accent, stat call-outs, section-label hierarchy. This is the **dominant register**.
- **ehr.meditech.com** — not a visual reference; the useful lesson is **information density & structure**: distribute credibility signals (stats, dates, status) next to the section they support, rather than siloing them in one hero strip.
- **monolayer.dev** — terminal command blocks, numbered sequential steps, technical artifacts treated as real tooling rather than illustration. Used only for its *structural device* (a log/rail treatment), not its dark/playful tone.
- **idealista.com** — dense, consistent tag/metadata chips attached to every listing. Used as a component pattern (key::value chips), applied sparingly.
- The "pixel-like font" reference (idealista/monolayer) is already satisfied by the existing IBM Plex Mono system — no new typeface needed.

## 3. Cross-cutting principle (applies everywhere)

Regardless of section, distribute credibility signals (stats, dates, status) near the content they support instead of collecting them into one hero stat strip. Give every section a consistent, scannable label grammar. This is an information-architecture fix inherited from the Meditech reference, not a stylistic choice — it applies to all sections below.

## 4. Chosen direction: Editorial Minimal (primary) + Functional Ledger accent + Interface Log in Casos

### 4.1 Primary structure — Editorial Minimal

**Thesis:** a trade-publication layout — disciplined type hierarchy, generous whitespace, amber used as the single sparing "signal" color, technical detail confined to small structural tags.

- **Grid:** replace the single centered 760px `.wrap` with a real asymmetric two-column grid at desktop (~35/65 split). Section labels live in a left margin column (like a magazine running header); content flows in the right column. This is what makes the layout "engineered, not centered" — the asymmetry is load-bearing, not cosmetic.
- **Protocol-header evolution:** the current hero-only eyebrow (`MSH|^~&|...`) becomes a repeating margin marker present at *every* section, not just the hero — same segment-syntax device, consistently applied. Typography stays quiet (small, `--ink-mute`, mono) so it never outweighs the serif heading beside it.
- **Signature detail (second-look):** a small static tag near the footer (and optionally near major sections), styled like a git short-hash — e.g. `rev. a3f9c1`. Reads as an ordinary build/version tag to anyone; means slightly more to a visitor who recognizes the convention. No JS needed — a static string is enough, since the page has no build step to hash against.
- **Mobile:** the 35/65 grid collapses to single column; margin labels move above their section content (current mobile behavior for existing labels, unchanged in spirit).

### 4.2 Accent — Functional Ledger chip component

Introduce one reusable `key::value` chip component (mono, small, quiet border) mimicking HL7 field syntax as functional content. Used **sparingly** — only on the 3 case items and the stat strip — never on every line, so it stays a texture, not a spec sheet. Example: `STATUS:: EN PRODUCCIÓN` `DESDE:: 2025`.

### 4.3 Casos section — Interface Log treatment

The Casos section gets the log/rail treatment (from the "Interface Log" direction), because its content already carries real dates and reads naturally as production history rather than marketing copy.

- A narrow mono rail (sequential line numbers, small and muted) runs beside the case list, echoing a log viewer.
- Each case row is a single grid container spanning both the rail number and the case content, so `:hover` on the row highlights both — pure CSS, no JS required.
- The existing `case-tag` / `case-meta` mono styling stays; the `key::value` chip from 4.2 can appear here too (e.g. status), reusing the same component rather than inventing a second one.

### 4.4 Anti-pattern check

- No oversized centered hero — the asymmetric grid breaks that read from the top of the page.
- No gradients or rounded cards — the chip and rail components are flat, bordered, monospace.
- Alienation risk is kept low by scoping jargon-as-structure to the margin labels, the Casos rail, and sparse chips — all quiet, small, and secondary to the plain-Spanish headings and prose, which remain the primary reading path.

## 5. New content — Services restructured into two tracks

`#servicios` splits into two top-level tracks, each with its own margin sub-label (mono, uppercase) within the section:

**Technics** — the existing 3 services, unchanged in content, keep their numbered (`01`/`02`/`03`) treatment:
1. Integración de sistemas clínicos
2. Conexión de analizadores y equipos
3. Soluciones digitales en salud

**Consultancy** — new track, proposed items (content to be confirmed/edited by Glenn before build):
1. Diagnóstico y estrategia de interoperabilidad — evaluación del estado actual de integración y hoja de ruta técnica.
2. Evaluación de proveedores / RFP técnico — acompañamiento en la selección de LIS, HIS o middleware desde una mirada de integración real.
3. Acompañamiento a equipos internos — mentoría técnica puntual para equipos de TI que ya tienen un proyecto de integración en curso.

Both tracks use the same service-item component (number + heading + description + tag), just grouped under their track sub-label rather than a single flat list of 3.

## 6. Non-goals

- No new color palette — amber/blue/ink stays as-is.
- No new typeface — IBM Plex Mono / serif / sans stack stays as-is.
- No framework, build step, or heavy JS — CSS handles both signature details (static hash tag, row-hover sync). JS, if used anywhere, stays to the minimum needed and follows KISS (per Glenn's direction).
- Not redesigning Servicios/Enfoque/Casos/Sobre mí/Contacto content beyond what's specified above — Enfoque, Sobre mí, and Contacto keep their current content, restyled to the new grid but not restructured.

## 7. Open items for Glenn to confirm before implementation

- Exact wording of the 3 proposed Consultancy items (drafted above as placeholders reflecting the "diagnóstico → evaluación → acompañamiento" arc already implied by the Enfoque section).
- Whether the static build/version tag (`rev. a3f9c1`) should be a fixed placeholder or reflect something real (e.g. last content update date) — either is pure-CSS/static, just a content decision.
