# Carbon Light Pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `tomassi-hsi-mockup.html` from the "Editorial Minimal" system (blue/IBM Plex/hand-rolled CSS) to the "Carbon Light" system (orange `#FF6B00`/JetBrains Mono/Tailwind CDN), per `docs/superpowers/specs/2026-08-08-landing-redesign-design.md` §10, using `stitch_tomassi_hsi_systems_integration/code.html` as the structural/visual source of truth and `screen.png` as the render reference.

**Architecture:** Single HTML file, no local build step. Tailwind CSS loaded via CDN script with an inline `tailwind.config` (colors, font, spacing keys), JetBrains Mono + Material Symbols Outlined loaded via Google Fonts `<link>` tags, one small `<style>` block for the `.grid-bg` texture. No custom JavaScript. Each task rewrites one section of the page in place; later tasks depend on the Tailwind config keys and section `id`s earlier tasks establish.

**Tech Stack:** HTML5, Tailwind CSS (CDN, no plugins), Google Fonts (JetBrains Mono, Material Symbols Outlined). No npm, no bundler, no JS framework, no test runner — verification is manual (browser) plus `grep`-based structural checks run ad hoc via Bash.

## Global Constraints

- Spanish-language content only (site `lang="es"`), matching the terse, technical, HL7/FHIR/ASTM tone already established — per spec §1 and `CLAUDE.md`.
- One accent color: `#FF6B00` (`primary-container` in Tailwind config). No blue, no amber, no per-section hues — spec §10.1.
- One typeface: JetBrains Mono, for every element (headings, body, labels) — spec §10.1. Do not add per-element font-family utility classes (`font-headline-lg`, `font-mono-data`, etc. from `code.html`) since they all resolve to the same family and are inherited from `<body>`; this plan drops them everywhere as part of the port, beyond what the ponytail-review flagged.
- `0px` border-radius on every component. Never add a `rounded-none` utility class — nothing in this system has a default radius to override (ponytail-review finding), so it would be a no-op.
- Only two external dependencies: the Tailwind CDN script (no `?plugins=` query string — `code.html`'s `forms,container-queries` plugins are unused, no `form-*` or `@container` utility appears anywhere) and the two Google Fonts links. No other CDNs, no npm packages.
- No custom JavaScript anywhere in the file — all interaction (nav hover, card hover, methodology tooltips) is pure CSS `:hover`. Do not port `code.html`'s mobile-menu button as a functional toggle (it has none in the prototype either — it's decorative in both).
- Casos content is the 5 real, verified projects already in the current file (spec §9) — reuse their exact titles, descriptions, tags, countries, and periods (`País · año–año` format). Do not invent new project copy, and do not adopt `code.html`'s own placeholder project entries (different titles/dates — they're Stitch's example content, not Tomassi's).
- Casos image slots are literal, clearly-labeled CSS placeholders ("Imagen del proyecto — placeholder"), not external stock-photo URLs — Glenn replaces them by hand after this build (confirmed decision, spec §10.3).
- The `rev. <hash>` signature tag, the `key::value` chip component, the asymmetric `.margin-col`/`.section-grid` layout, and per-section accent/background theming are dropped entirely — spec §10.4. Don't reintroduce them.
- Section IDs/nav: `#hero` → `#casos` → `#servicios` → `#metodologia` → `#sobre-mi` (contains nested `#contacto` on the contact card). This renames the old `#enfoque` id/label to `#metodologia` to match `code.html`'s naming and the PRD's own section name.

---

## File Structure

Everything lives in the single existing file `tomassi-hsi-mockup.html` (full rewrite, in place) plus one doc update:

- `tomassi-hsi-mockup.html` — rewritten section by section (Tasks 1–7)
- `CLAUDE.md` — updated to describe the new Tailwind-CDN architecture (Task 8)

Because this is a sequential rewrite of one file, exact line numbers shift after each task. Locate each task's target by the `id` or comment named in that task rather than a pinned line range.

---

### Task 1: Document shell — `<head>`, Tailwind config, global CSS

**Files:**
- Modify: `tomassi-hsi-mockup.html` — everything from `<!DOCTYPE html>` through the opening `<body>` tag (currently lines 1–284, i.e. the entire old `:root` variable block and header/nav CSS)

**Interfaces:**
- Produces: Tailwind config keys every later task uses as utility classes — `bg-primary-container` / `text-primary-container` (orange `#FF6B00`), `bg-surface` / `bg-surface-low` / `bg-surface-highest` / `border-surface-highest`, `text-on-surface` / `text-on-surface-variant`, `font-sans` (→ JetBrains Mono), spacing keys `max-width` / `margin-desktop` / `margin-mobile` / `gutter`. Also the `.grid-bg` CSS class and the `material-symbols-outlined` icon-font class.

- [ ] **Step 1: Write the failing check**

Run: `grep -c 'primary-container' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `0` (the old file has no Tailwind config yet)

- [ ] **Step 2: Confirm it fails as expected**

Same command as Step 1 — confirm output is `0` before proceeding.

- [ ] **Step 3: Replace the file header**

Replace everything from `<!DOCTYPE html>` through `<body>` with:

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tomassi HSI — Interoperabilidad Clínica y Software de Salud</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          "primary-container": "#ff6b00",
          "surface-highest": "#e5e7eb",
          "surface-low": "#f9fafb",
          "surface": "#ffffff",
          "on-surface": "#111827",
          "on-surface-variant": "#4b5563"
        },
        fontFamily: {
          sans: ["JetBrains Mono", "monospace"]
        },
        spacing: {
          "max-width": "1440px",
          "margin-desktop": "32px",
          "margin-mobile": "16px",
          "gutter": "16px"
        }
      }
    }
  }
</script>
<style>
  .grid-bg{
    background-color:#ffffff;
    background-image:
      linear-gradient(to right, #f3f4f6 1px, transparent 1px),
      linear-gradient(to bottom, #f3f4f6 1px, transparent 1px);
    background-size:32px 32px;
  }
  .material-symbols-outlined{ font-variation-settings:'FILL' 0; }
</style>
</head>
<body class="text-on-surface font-sans antialiased overflow-x-hidden selection:bg-primary-container selection:text-white bg-surface">
```

Note what this intentionally drops from `code.html`, per the ponytail-review done on this project: the 8 duplicate `fontFamily` keys (collapsed to one `sans` key), `colors.on-primary-container` and `colors.surface-high` (unused), `spacing.unit` (unused), the `?plugins=forms,container-queries` query string (no plugin utility is used anywhere), the `.industrial-border` class and scrollbar CSS block (unused, no scrollable table exists), and `rounded-none` (never used going forward — see Global Constraints).

- [ ] **Step 4: Confirm the check passes**

Run: `grep -c 'primary-container' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: a number `>0` (the config block references it multiple times)

Also run: `grep -c 'rounded-none\|surface-high"\|on-primary-container\|industrial-border' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `0`

- [ ] **Step 5: Commit**

```bash
git add tomassi-hsi-mockup.html
git commit -m "Replace Editorial Minimal head with Carbon Light Tailwind shell"
```

---

### Task 2: Header / nav

**Files:**
- Modify: `tomassi-hsi-mockup.html` — the `<header>...</header>` block (currently lines 286–311)

**Interfaces:**
- Consumes: `primary-container`, `surface-highest`, `on-surface`, `on-surface-variant`, `max-width`, `margin-desktop` from Task 1's Tailwind config.
- Produces: nav anchors `#hero`, `#casos`, `#servicios`, `#metodologia`, `#sobre-mi`, `#contacto` that Tasks 3–7 must define matching `id`s for.

- [ ] **Step 1: Write the failing check**

Run: `grep -c 'href="#metodologia"' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `0`

- [ ] **Step 2: Confirm it fails**

Same command — confirm `0`.

- [ ] **Step 3: Replace the header**

```html
<header class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-surface-highest">
  <div class="flex justify-between items-center w-full px-margin-desktop max-w-max-width mx-auto h-16">
    <a href="#hero" class="flex items-center gap-2">
      <span class="material-symbols-outlined text-primary-container">terminal</span>
      <span class="text-[20px] font-bold tracking-tighter text-on-surface uppercase">Tomassi HSI</span>
    </a>
    <nav class="hidden md:flex gap-8">
      <a href="#hero" class="text-primary-container border-b-2 border-primary-container pb-1 text-[12px] uppercase tracking-widest font-semibold">Inicio</a>
      <a href="#casos" class="text-on-surface-variant hover:text-primary-container transition-colors text-[12px] uppercase tracking-widest font-semibold">Casos</a>
      <a href="#servicios" class="text-on-surface-variant hover:text-primary-container transition-colors text-[12px] uppercase tracking-widest font-semibold">Servicios</a>
      <a href="#metodologia" class="text-on-surface-variant hover:text-primary-container transition-colors text-[12px] uppercase tracking-widest font-semibold">Metodología</a>
      <a href="#sobre-mi" class="text-on-surface-variant hover:text-primary-container transition-colors text-[12px] uppercase tracking-widest font-semibold">Acerca</a>
    </nav>
    <div class="hidden md:flex items-center gap-4">
      <a href="#" aria-label="LinkedIn" class="text-on-surface-variant hover:text-primary-container transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="3"></rect>
          <line x1="7" y1="10" x2="7" y2="17"></line>
          <circle cx="7" cy="6.5" r="1.1" fill="currentColor" stroke="none"></circle>
          <path d="M11 17v-4.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5V17"></path>
        </svg>
      </a>
      <a href="#contacto" class="inline-flex items-center justify-center bg-primary-container text-white text-[12px] font-semibold px-6 py-2 uppercase tracking-wider hover:bg-[#e66000] transition-colors">Contacto</a>
    </div>
    <button class="md:hidden text-on-surface" aria-label="Abrir menú">
      <span class="material-symbols-outlined">menu</span>
    </button>
  </div>
</header>
```

(Keeps the hand-authored LinkedIn SVG already in the current file — real brand asset, no reason to swap it for a generic icon.)

- [ ] **Step 4: Confirm the check passes**

Run: `grep -c 'href="#metodologia"' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `>0`

- [ ] **Step 5: Commit**

```bash
git add tomassi-hsi-mockup.html
git commit -m "Port header/nav to Carbon Light"
```

---

### Task 3: Hero section

**Files:**
- Modify: `tomassi-hsi-mockup.html` — the `<section class="hero">...</section>` block (currently lines 315–336)

**Interfaces:**
- Consumes: Tailwind config from Task 1.
- Produces: `id="hero"` target for Task 2's nav link.

**Content decision:** `code.html`'s hero has 3 stat cards (10+ años / 3 países / ∞ datos procesados). Tomassi's site only ever verified two real metrics (10+ años, 3 países) — "∞ datos procesados" has no verified backing, so this port uses **2 stat cards, not 3**, keeping the exact numbers/labels already in the current file. This is a deliberate deviation from `code.html`, not an oversight.

- [ ] **Step 1: Write the failing check**

Run: `grep -c 'id="hero"' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `0` (old hero has no `id`)

- [ ] **Step 2: Confirm it fails**

Same command — confirm `0`.

- [ ] **Step 3: Replace the hero section**

```html
<main class="pt-16 w-full">
<section class="relative min-h-[80vh] flex items-center border-b border-surface-highest grid-bg" id="hero">
  <div class="w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-24 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-gutter">
    <div class="md:col-span-8 flex flex-col justify-center gap-8">
      <div class="inline-flex items-center gap-2 border border-surface-highest px-3 py-1 bg-surface-low w-max">
        <div class="w-2 h-2 bg-primary-container animate-pulse"></div>
        <span class="text-[13px] text-on-surface-variant uppercase tracking-wider font-semibold">Estado del sistema: en línea</span>
      </div>
      <h1 class="text-[40px] md:text-[56px] text-on-surface leading-tight font-bold tracking-tight">
        Interoperabilidad clínica<br>
        y <span class="text-primary-container">software de salud.</span>
      </h1>
      <p class="text-[16px] text-on-surface-variant max-w-2xl leading-relaxed">
        Diseño, despliegue y mantenimiento de interfaces en entornos de Salud. Asesoría en integraciones, hardware e infraestructura clínica.
      </p>
      <div class="flex flex-wrap gap-4 mt-4">
        <a href="#casos" class="inline-flex items-center justify-center bg-primary-container text-white text-[12px] font-semibold px-8 py-3 uppercase tracking-wider hover:bg-[#e66000] transition-colors gap-2">
          <span class="material-symbols-outlined text-[18px]">terminal</span>
          Ver casos técnicos
        </a>
        <a href="#contacto" class="inline-flex items-center justify-center border border-surface-highest bg-white text-on-surface text-[12px] font-semibold px-8 py-3 uppercase tracking-wider hover:bg-surface-low transition-colors gap-2">
          Conversemos tu caso
        </a>
      </div>
    </div>
    <div class="md:col-span-4 hidden md:flex flex-col gap-4 justify-center">
      <div class="border border-surface-highest bg-white p-6 flex flex-col gap-2 relative group hover:border-primary-container transition-colors shadow-sm">
        <div class="absolute top-0 left-0 w-full h-[2px] bg-primary-container scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
        <span class="text-[48px] font-bold text-on-surface leading-none group-hover:text-primary-container transition-colors">10+</span>
        <span class="text-[13px] text-on-surface-variant uppercase tracking-widest border-t border-surface-highest pt-2 font-medium">Años en interoperabilidad clínica</span>
      </div>
      <div class="border border-surface-highest bg-white p-6 flex flex-col gap-2 relative group hover:border-primary-container transition-colors shadow-sm">
        <div class="absolute top-0 left-0 w-full h-[2px] bg-primary-container scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
        <span class="text-[48px] font-bold text-on-surface leading-none group-hover:text-primary-container transition-colors">3</span>
        <span class="text-[13px] text-on-surface-variant uppercase tracking-widest border-t border-surface-highest pt-2 font-medium">Países con interfaces en producción</span>
      </div>
    </div>
  </div>
</section>
```

(Leaves `<main class="pt-16 w-full">` open — Task 4 continues inside it.)

- [ ] **Step 4: Confirm the check passes**

Run: `grep -c 'id="hero"' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `1`

- [ ] **Step 5: Commit**

```bash
git add tomassi-hsi-mockup.html
git commit -m "Port hero section to Carbon Light"
```

---

### Task 4: Casos — "Technical Log" card grid (5 real projects)

**Files:**
- Modify: `tomassi-hsi-mockup.html` — the `<section id="casos">...</section>` block (currently lines 338–431)

**Interfaces:**
- Consumes: Tailwind config from Task 1.
- Produces: `id="casos"` target for nav/footer links.

- [ ] **Step 1: Write the failing check**

Run: `grep -c 'PRJ-001' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `0`

- [ ] **Step 2: Confirm it fails**

Same command — confirm `0`.

- [ ] **Step 3: Replace the Casos section**

```html
<section class="py-24 border-b border-surface-highest bg-white" id="casos">
  <div class="w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
    <div class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface-highest pb-4">
      <div>
        <h2 class="text-[32px] font-semibold text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary-container">dataset</span>
          Proyectos recientes ejecutados
        </h2>
        <p class="text-[13px] text-on-surface-variant mt-2 uppercase tracking-widest">Casos técnicos verificados</p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

      <article class="col-span-1 md:col-span-12 bg-white border border-surface-highest relative overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div class="p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-surface-highest">
            <div>
              <div class="flex justify-between items-start mb-6">
                <span class="text-[13px] text-primary-container font-bold">PRJ-001</span>
                <span class="text-[12px] text-on-surface-variant border border-surface-highest px-2 py-1 bg-surface-low">Colombia · 2025–2026</span>
              </div>
              <h3 class="text-[24px] text-on-surface mb-4 font-semibold">Motor de correlación LIS/HIS para detección de sepsis</h3>
              <p class="text-[14px] text-on-surface-variant mb-6">Middleware que cruza resultados de laboratorio y datos hospitalarios en tiempo real para generar alertas clínicas tempranas.</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-4">
              <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-surface-low font-semibold">Mirth Connect</span>
              <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-surface-low font-semibold">MySQL</span>
              <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-surface-low font-semibold">JSON</span>
              <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-surface-low font-semibold">HTTP</span>
            </div>
          </div>
          <div class="h-64 md:h-auto bg-surface-low flex items-center justify-center p-8">
            <span class="text-[11px] text-on-surface-variant uppercase tracking-widest text-center">Imagen del proyecto — placeholder</span>
          </div>
        </div>
      </article>

      <article class="col-span-1 md:col-span-6 bg-white border border-surface-highest relative flex flex-col">
        <div class="h-40 relative border-b border-surface-highest bg-surface-low flex items-center justify-center">
          <span class="text-[11px] text-on-surface-variant uppercase tracking-widest">Imagen — placeholder</span>
          <span class="absolute top-4 left-4 bg-white border border-surface-highest px-2 py-1 text-[12px] text-primary-container font-bold">PRJ-002</span>
        </div>
        <div class="p-6 flex-grow flex flex-col">
          <span class="text-[12px] text-on-surface-variant border border-surface-highest px-2 py-1 bg-surface-low w-max mb-3">México · 2024–2026</span>
          <h3 class="text-[18px] font-semibold text-on-surface mb-3">Interfaz LIS → CDS con transformación de mensajes</h3>
          <p class="text-[14px] text-on-surface-variant mb-6 flex-grow">Canal de integración que transforma resultados de laboratorio a formato SOAP/JSON y notifica automáticamente al sistema clínico.</p>
          <div class="flex flex-wrap gap-2 border-t border-surface-highest pt-4">
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">Mirth Connect</span>
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">SOAP</span>
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">JSON</span>
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">JavaScript</span>
          </div>
        </div>
      </article>

      <article class="col-span-1 md:col-span-6 bg-white border border-surface-highest relative flex flex-col">
        <div class="h-40 relative border-b border-surface-highest bg-surface-low flex items-center justify-center">
          <span class="text-[11px] text-on-surface-variant uppercase tracking-widest">Imagen — placeholder</span>
          <span class="absolute top-4 left-4 bg-white border border-surface-highest px-2 py-1 text-[12px] text-primary-container font-bold">PRJ-003</span>
        </div>
        <div class="p-6 flex-grow flex flex-col">
          <span class="text-[12px] text-on-surface-variant border border-surface-highest px-2 py-1 bg-surface-low w-max mb-3">México · 2024–2026</span>
          <h3 class="text-[18px] font-semibold text-on-surface mb-3">Identificación automática de pacientes con síndrome metabólico</h3>
          <p class="text-[14px] text-on-surface-variant mb-6 flex-grow">Analiza resultados de laboratorio contra el historial del paciente para detectar prediabetes, diabetes y dislipidemia, y genera alertas clínicas.</p>
          <div class="flex flex-wrap gap-2 border-t border-surface-highest pt-4">
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">Mirth Connect</span>
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">HL7</span>
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">XML</span>
          </div>
        </div>
      </article>

      <article class="col-span-1 md:col-span-6 bg-white border border-surface-highest relative flex flex-col">
        <div class="h-40 relative border-b border-surface-highest bg-surface-low flex items-center justify-center">
          <span class="text-[11px] text-on-surface-variant uppercase tracking-widest">Imagen — placeholder</span>
          <span class="absolute top-4 left-4 bg-white border border-surface-highest px-2 py-1 text-[12px] text-primary-container font-bold">PRJ-004</span>
        </div>
        <div class="p-6 flex-grow flex flex-col">
          <span class="text-[12px] text-on-surface-variant border border-surface-highest px-2 py-1 bg-surface-low w-max mb-3">Colombia · 2024–2026</span>
          <h3 class="text-[18px] font-semibold text-on-surface mb-3">Canal HL7 a JSON con generación de estadísticas</h3>
          <p class="text-[14px] text-on-surface-variant mb-6 flex-grow">Procesa mensajes HL7 entrantes, los transforma a JSON para el sistema de soporte de decisiones y genera estadísticas por fase de despliegue.</p>
          <div class="flex flex-wrap gap-2 border-t border-surface-highest pt-4">
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">Mirth Connect</span>
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">HL7</span>
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">JSON</span>
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">JavaScript</span>
          </div>
        </div>
      </article>

      <article class="col-span-1 md:col-span-6 bg-white border border-surface-highest relative flex flex-col">
        <div class="h-40 relative border-b border-surface-highest bg-surface-low flex items-center justify-center">
          <span class="text-[11px] text-on-surface-variant uppercase tracking-widest">Imagen — placeholder</span>
          <span class="absolute top-4 left-4 bg-white border border-surface-highest px-2 py-1 text-[12px] text-primary-container font-bold">PRJ-005</span>
        </div>
        <div class="p-6 flex-grow flex flex-col">
          <span class="text-[12px] text-on-surface-variant border border-surface-highest px-2 py-1 bg-surface-low w-max mb-3">LATAM/Caribe · 2025–2026</span>
          <h3 class="text-[18px] font-semibold text-on-surface mb-3">Estandarización de resultados de laboratorio por episodio</h3>
          <p class="text-[14px] text-on-surface-variant mb-6 flex-grow">Transforma resultados de múltiples analizadores a una estructura JSON unificada por episodio clínico, lista para consumo por sistemas de decisión.</p>
          <div class="flex flex-wrap gap-2 border-t border-surface-highest pt-4">
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">Mirth Connect</span>
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">JavaScript</span>
            <span class="text-[12px] text-on-surface-variant uppercase font-semibold">JSON</span>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>
```

- [ ] **Step 4: Confirm the check passes**

Run: `grep -c 'PRJ-00[1-5]' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `5`

Also run: `grep -c 'placeholder' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html` — expected `>0` (image slots are literal, labeled placeholders, not external image URLs). Confirm with `grep -c 'googleusercontent\|<img ' tomassi-hsi-mockup.html` → expected `0`.

- [ ] **Step 5: Commit**

```bash
git add tomassi-hsi-mockup.html
git commit -m "Port Casos to Carbon Light Technical Log card grid"
```

---

### Task 5: Servicios — "Architecture Capabilities" two-box diagram

**Files:**
- Modify: `tomassi-hsi-mockup.html` — the `<section id="servicios">...</section>` block (currently lines 433–512)

**Interfaces:**
- Consumes: Tailwind config from Task 1.
- Produces: `id="servicios"` target for nav/footer links.

- [ ] **Step 1: Write the failing check**

Run: `grep -c 'Architecture Capabilities\|Technics</h3>' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `0`

- [ ] **Step 2: Confirm it fails**

Same command — confirm `0`.

- [ ] **Step 3: Replace the Servicios section**

```html
<section class="py-24 border-b border-surface-highest grid-bg" id="servicios">
  <div class="w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
    <div class="mb-16 max-w-3xl">
      <span class="inline-block border border-surface-highest bg-surface-low px-3 py-1 text-[11px] uppercase tracking-widest text-on-surface-variant font-semibold mb-4">Protocolos:: HL7 · FHIR · ASTM · CDS Hooks</span>
      <h2 class="text-[32px] font-semibold text-on-surface mb-4">Tres formas de resolver un mismo problema: sistemas que no se hablan.</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter relative">
      <div class="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 border-t-2 border-dashed border-primary-container z-0"></div>

      <div class="border border-surface-highest bg-white relative z-10">
        <div class="flex justify-between items-center bg-primary-container text-white px-6 py-3">
          <h3 class="text-[16px] font-semibold uppercase">Technics</h3>
          <span class="material-symbols-outlined">code_blocks</span>
        </div>
        <ul class="flex flex-col divide-y divide-surface-highest">
          <li class="p-6">
            <div class="flex items-baseline gap-3 mb-2">
              <span class="text-primary-container font-bold">01</span>
              <h4 class="text-[16px] font-semibold text-on-surface">Integración de sistemas clínicos</h4>
            </div>
            <p class="text-[14px] text-on-surface-variant mb-3">Interfaces HL7v2 y FHIR entre LIS, HIS, CDS y sistemas de terceros. Diseño, construcción y mantenimiento de canales — incluyendo lógica de ruteo, transformación de mensajes y validación.</p>
            <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-surface-low font-semibold">HL7 · FHIR R4 · Mirth Connect</span>
          </li>
          <li class="p-6">
            <div class="flex items-baseline gap-3 mb-2">
              <span class="text-primary-container font-bold">02</span>
              <h4 class="text-[16px] font-semibold text-on-surface">Conexión de analizadores y equipos</h4>
            </div>
            <p class="text-[14px] text-on-surface-variant mb-3">Interfaces bidireccionales entre analizadores de laboratorio y el sistema central. Autovalidación, reglas de reproceso y detección de resultados críticos configuradas sobre el flujo real del laboratorio.</p>
            <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-surface-low font-semibold">ASTM · Middleware · Autovalidación</span>
          </li>
          <li class="p-6">
            <div class="flex items-baseline gap-3 mb-2">
              <span class="text-primary-container font-bold">03</span>
              <h4 class="text-[16px] font-semibold text-on-surface">Soluciones digitales en salud</h4>
            </div>
            <p class="text-[14px] text-on-surface-variant mb-3">Productos a medida cuando la interfaz estándar no alcanza — entrega de resultados vía canales del paciente, dashboards operativos, automatizaciones sobre datos clínicos.</p>
            <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-surface-low font-semibold">API-first · WhatsApp · FHIR Gateway</span>
          </li>
        </ul>
      </div>

      <div class="border border-surface-highest bg-white relative z-10">
        <div class="flex justify-between items-center bg-primary-container text-white px-6 py-3">
          <h3 class="text-[16px] font-semibold uppercase">Consultancy</h3>
          <span class="material-symbols-outlined">strategy</span>
        </div>
        <ul class="flex flex-col divide-y divide-surface-highest">
          <li class="p-6">
            <div class="flex items-baseline gap-3 mb-2">
              <span class="text-primary-container font-bold">01</span>
              <h4 class="text-[16px] font-semibold text-on-surface">Diagnóstico y estrategia de interoperabilidad</h4>
            </div>
            <p class="text-[14px] text-on-surface-variant mb-3">Evaluación del estado actual de integración y hoja de ruta técnica.</p>
            <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-surface-low font-semibold">Assessment · Roadmap</span>
          </li>
          <li class="p-6">
            <div class="flex items-baseline gap-3 mb-2">
              <span class="text-primary-container font-bold">02</span>
              <h4 class="text-[16px] font-semibold text-on-surface">Evaluación de proveedores / RFP técnico</h4>
            </div>
            <p class="text-[14px] text-on-surface-variant mb-3">Acompañamiento en la selección de LIS, HIS o middleware desde una mirada de integración real.</p>
            <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-surface-low font-semibold">RFP · Vendor Review</span>
          </li>
          <li class="p-6">
            <div class="flex items-baseline gap-3 mb-2">
              <span class="text-primary-container font-bold">03</span>
              <h4 class="text-[16px] font-semibold text-on-surface">Acompañamiento a equipos internos</h4>
            </div>
            <p class="text-[14px] text-on-surface-variant mb-3">Mentoría técnica puntual para equipos de TI que ya tienen un proyecto de integración en curso.</p>
            <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-surface-low font-semibold">Mentoría técnica</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

Note: no `IntersectionObserver`/animated SVG connector — the dashed line is static CSS, per spec §10.3 ("no animated SVG draw-in").

- [ ] **Step 4: Confirm the check passes**

Run: `grep -c 'Technics</h3>\|Consultancy</h3>' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `2`

- [ ] **Step 5: Commit**

```bash
git add tomassi-hsi-mockup.html
git commit -m "Port Servicios to Carbon Light two-box diagram"
```

---

### Task 6: Metodología — linear stepper with hover tooltips

**Files:**
- Modify: `tomassi-hsi-mockup.html` — the `<section id="enfoque">...</section>` block (currently lines 514–592), renamed to `id="metodologia"`

**Interfaces:**
- Consumes: Tailwind config from Task 1.
- Produces: `id="metodologia"` target for nav/footer links.

**Content decision:** replaces the 6-node zigzag/diamond SVG flowchart (with hand-authored icons and a mobile-stacking fallback) with `code.html`'s simpler treatment — 6 numbered circles on one straight line, hover tooltip per step. This drops the custom SVG icon set and the zigzag's mobile fallback entirely (confirmed simplification, spec §10.3). Tooltip copy reuses `code.html`'s own Spanish descriptions verbatim — they already match the PRD's methodology section and are real content, not placeholders.

- [ ] **Step 1: Write the failing check**

Run: `grep -c 'id="metodologia"' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `0`

- [ ] **Step 2: Confirm it fails**

Same command — confirm `0`.

- [ ] **Step 3: Replace the Enfoque/Metodología section**

```html
<section class="py-24 border-b border-surface-highest bg-white" id="metodologia">
  <div class="w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
    <div class="mb-12 border-b border-surface-highest pb-4">
      <h2 class="text-[32px] font-semibold text-on-surface flex items-center gap-2">
        <span class="material-symbols-outlined text-primary-container">account_tree</span>
        Metodología
      </h2>
      <p class="text-[13px] text-on-surface-variant mt-2 uppercase tracking-widest">Cómo se ejecuta un proyecto de integración</p>
    </div>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 relative">
      <div class="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-surface-highest -translate-y-1/2 z-0"></div>

      <div class="flex flex-col items-center gap-3 relative z-10 w-full md:w-auto bg-white p-2 group">
        <div class="w-10 h-10 border-2 border-primary-container flex items-center justify-center bg-white font-bold text-primary-container">01</div>
        <div class="text-[13px] font-semibold uppercase text-on-surface text-center">Iniciación</div>
        <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-on-surface text-white text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border-l-2 border-primary-container z-50">Relevamiento de flujos de trabajo clínicos y auditoría de protocolos existentes (HL7/FHIR).</div>
      </div>

      <div class="flex flex-col items-center gap-3 relative z-10 w-full md:w-auto bg-white p-2 group">
        <div class="w-10 h-10 border-2 border-surface-highest flex items-center justify-center bg-white font-bold text-on-surface-variant">02</div>
        <div class="text-[13px] font-semibold uppercase text-on-surface text-center">Planificación</div>
        <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-on-surface text-white text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border-l-2 border-primary-container z-50">Definición del alcance técnico, mapeo de mensajes y cronograma de hitos de integración.</div>
      </div>

      <div class="flex flex-col items-center gap-3 relative z-10 w-full md:w-auto bg-white p-2 group">
        <div class="w-10 h-10 border-2 border-surface-highest flex items-center justify-center bg-white font-bold text-on-surface-variant">03</div>
        <div class="text-[13px] font-semibold uppercase text-on-surface text-center">Diseño</div>
        <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-on-surface text-white text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border-l-2 border-primary-container z-50">Especificación de la arquitectura de datos, lógica de ruteo y transformaciones de mensajes.</div>
      </div>

      <div class="flex flex-col items-center gap-3 relative z-10 w-full md:w-auto bg-white p-2 group">
        <div class="w-10 h-10 border-2 border-surface-highest flex items-center justify-center bg-white font-bold text-on-surface-variant">04</div>
        <div class="text-[13px] font-semibold uppercase text-on-surface text-center">Ejecución</div>
        <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-on-surface text-white text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border-l-2 border-primary-container z-50">Configuración de canales en el motor de integración y despliegue controlado en entornos de prueba.</div>
      </div>

      <div class="flex flex-col items-center gap-3 relative z-10 w-full md:w-auto bg-white p-2 group">
        <div class="w-10 h-10 border-2 border-surface-highest flex items-center justify-center bg-white font-bold text-on-surface-variant">05</div>
        <div class="text-[13px] font-semibold uppercase text-on-surface text-center">Pruebas</div>
        <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-on-surface text-white text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border-l-2 border-primary-container z-50">Validación exhaustiva de esquemas, pruebas unitarias de ruteo y simulación de escenarios críticos.</div>
      </div>

      <div class="flex flex-col items-center gap-3 relative z-10 w-full md:w-auto bg-white p-2 group">
        <div class="w-10 h-10 border-2 border-primary-container bg-primary-container flex items-center justify-center text-white font-bold">06</div>
        <div class="text-[13px] font-semibold uppercase text-on-surface text-center">Cierre</div>
        <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-on-surface text-white text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border-l-2 border-primary-container z-50">Monitoreo de ciclos de producción iniciales, entrega de documentación técnica y soporte L2/L3.</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Confirm the check passes**

Run: `grep -c 'id="metodologia"' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `1`

Also confirm the old zigzag is gone: `grep -c 'project-chart\|chart-step' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html` → expected `0`.

- [ ] **Step 5: Commit**

```bash
git add tomassi-hsi-mockup.html
git commit -m "Simplify Metodología to Carbon Light linear stepper"
```

---

### Task 7: Sobre mí + Contacto (merged) and footer

**Files:**
- Modify: `tomassi-hsi-mockup.html` — the `<section class="about">...</section>` through end of `<footer>` (currently lines 594–667), plus the trailing `<script>`/`<noscript>` block (lines 669–687)

**Interfaces:**
- Consumes: Tailwind config from Task 1.
- Produces: `id="sobre-mi"` and nested `id="contacto"` — the last section-level targets in the page.

**Content decision:** `code.html`'s About/Contact card has only a lead-generation form (Entidad/Nombre, Protocolo/Email, Payload/Mensaje) — no direct contact info. The current file's real, verified contact channels (WhatsApp, correo, LinkedIn, cobertura) are kept as a compact block above the form inside the same card, so real information isn't lost in the port — this is a deliberate content-preservation addition beyond a literal copy of `code.html`.

- [ ] **Step 1: Write the failing check**

Run: `grep -c 'id="sobre-mi"' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `0`

- [ ] **Step 2: Confirm it fails**

Same command — confirm `0`.

- [ ] **Step 3: Replace Sobre mí/Contacto and the footer, and remove the old JS block**

```html
<section class="py-24 bg-surface-low grid-bg" id="sobre-mi">
  <div class="w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
    <div>
      <h2 class="text-[32px] font-semibold text-on-surface mb-6">Diez años en interoperabilidad clínica.</h2>
      <p class="text-[16px] text-on-surface-variant mb-4 leading-relaxed"><strong class="text-on-surface">Glenn Tomassi</strong> — especialista en implementación de sistemas de laboratorio clínico e interoperabilidad, con experiencia en producción en Colombia, LATAM y Canadá.</p>
      <div class="flex flex-wrap gap-2 my-5">
        <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-white font-semibold">HL7v2</span>
        <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-white font-semibold">FHIR R4</span>
        <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-white font-semibold">ASTM</span>
        <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-white font-semibold">CDS Hooks</span>
        <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-white font-semibold">Mirth Connect</span>
        <span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-white font-semibold">CDSS</span>
      </div>
      <p class="text-[14.5px] text-on-surface-variant leading-relaxed max-w-xl">Incluye criterios de autoverificación de resultados y motores de reglas clínicas. Actualmente enfocado en llevar esa misma capacidad técnica a laboratorios y clínicas en Venezuela.</p>
    </div>
    <div class="border border-surface-highest bg-white p-8 shadow-sm" id="contacto">
      <h3 class="text-[20px] font-semibold text-on-surface uppercase mb-4 flex items-center gap-2">
        <span class="material-symbols-outlined text-primary-container">mail</span>
        Iniciar Contacto
      </h3>
      <div class="grid grid-cols-2 gap-3 text-[13px] mb-6 pb-6 border-b border-surface-highest">
        <div class="text-on-surface-variant"><strong class="text-on-surface block">WhatsApp</strong><a href="#" class="text-primary-container">+57 350 785 5765</a></div>
        <div class="text-on-surface-variant"><strong class="text-on-surface block">Correo</strong><a href="#" class="text-primary-container">contacto@tomassi-hsi.com</a></div>
        <div class="text-on-surface-variant"><strong class="text-on-surface block">LinkedIn</strong><a href="#" class="text-primary-container">linkedin.com/in/glennrtc</a></div>
        <div class="text-on-surface-variant"><strong class="text-on-surface block">Cobertura</strong>Venezuela · LATAM · Remoto</div>
      </div>
      <form class="flex flex-col gap-4">
        <div>
          <label class="block text-[12px] uppercase font-bold text-on-surface-variant mb-1">Entidad / Nombre</label>
          <input type="text" class="w-full bg-surface-low border border-surface-highest px-4 py-2 text-[14px] text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors">
        </div>
        <div>
          <label class="block text-[12px] uppercase font-bold text-on-surface-variant mb-1">Protocolo / Email</label>
          <input type="email" class="w-full bg-surface-low border border-surface-highest px-4 py-2 text-[14px] text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors">
        </div>
        <div>
          <label class="block text-[12px] uppercase font-bold text-on-surface-variant mb-1">Payload / Mensaje</label>
          <textarea rows="4" class="w-full bg-surface-low border border-surface-highest px-4 py-2 text-[14px] text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors resize-none"></textarea>
        </div>
        <button type="button" class="mt-2 bg-primary-container text-white text-[13px] font-bold px-6 py-3 uppercase tracking-wider hover:bg-[#e66000] transition-colors w-full text-center">Transmitir Datos</button>
      </form>
    </div>
  </div>
</section>

</main>

<footer class="bg-white border-t border-surface-highest">
  <div class="w-full py-12 px-margin-desktop max-w-max-width mx-auto flex flex-col gap-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div class="text-[20px] font-bold text-on-surface flex items-center gap-2 uppercase">
        <span class="material-symbols-outlined text-primary-container">terminal</span>
        Tomassi HSI
      </div>
      <nav class="flex flex-wrap gap-6 text-[12px] font-semibold">
        <a href="#casos" class="text-on-surface-variant hover:text-primary-container transition-colors uppercase">Casos</a>
        <a href="#servicios" class="text-on-surface-variant hover:text-primary-container transition-colors uppercase">Servicios</a>
        <a href="#metodologia" class="text-on-surface-variant hover:text-primary-container transition-colors uppercase">Metodología</a>
      </nav>
    </div>
    <div class="text-[12px] font-bold text-on-surface-variant border-t border-surface-highest pt-4 flex justify-between flex-wrap gap-2">
      <span>© 2026 TOMASSI HSI · INTEROPERABILIDAD CLÍNICA</span>
      <span>HL7 · FHIR · CLINICAL SYSTEMS</span>
    </div>
  </div>
</footer>

</body>
</html>
```

This removes the old `<script>`/`<noscript>` `IntersectionObserver` block entirely — no JS remains in the file (Global Constraints). It also drops the `rev. <hash>` tag per spec §10.4.

- [ ] **Step 4: Confirm the check passes**

Run: `grep -c 'id="sobre-mi"' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html`
Expected: `1`

Also confirm no JS remains: `grep -c '<script>\|IntersectionObserver' /home/glenn/Denv/tomassiHSI/tomassi-hsi-mockup.html` → expected `1` (only the Tailwind config `<script>` from Task 1 — the CDN `<script src=...>` tag doesn't match `<script>` exactly since it has an attribute). Adjust the check if the count differs from expectation and confirm by eye that the only `<script>` tags left are the CDN loader and the inline Tailwind config.

- [ ] **Step 5: Commit**

```bash
git add tomassi-hsi-mockup.html
git commit -m "Port Sobre mi/Contacto and footer to Carbon Light, drop JS"
```

---

### Task 8: Update `CLAUDE.md`

**Files:**
- Modify: `CLAUDE.md`

**Interfaces:**
- None — documentation only.

- [ ] **Step 1: Write the failing check**

Run: `grep -c 'Tailwind' /home/glenn/Denv/tomassiHSI/CLAUDE.md`
Expected: `0`

- [ ] **Step 2: Confirm it fails**

Same command — confirm `0`.

- [ ] **Step 3: Update the repository overview and working-with-this-file sections**

Replace the "Repository overview" paragraph:

```markdown
## Repository overview

Single-file static HTML mockup: [tomassi-hsi-mockup.html](tomassi-hsi-mockup.html). It's a Spanish-language marketing landing page for Tomassi HSI, a clinical systems integration consultancy (HL7v2/FHIR/ASTM lab interoperability work in LATAM). No local build system or package manager — styling comes from Tailwind CSS loaded via a CDN `<script>` tag, configured inline through a `tailwind.config` script block in `<head>`. Fonts (JetBrains Mono) and icons (Material Symbols Outlined) load from Google Fonts. There is no custom JavaScript — all interaction (nav hover states, card hover, methodology tooltips) is pure CSS `:hover`.
```

Replace the bullet list under "Working with this file":

```markdown
## Working with this file

- Open directly in a browser to preview (`xdg-open tomassi-hsi-mockup.html` or similar) — no server or build step needed (Tailwind compiles client-side via the CDN script).
- Keep content in Spanish (the site's language, per `lang="es"`), matching the existing tone: technical, terse, industry-specific (HL7, FHIR, ASTM, LIS/HIS terminology).
- Styling is "Carbon Light": one accent color (`primary-container` = `#FF6B00`), one typeface (JetBrains Mono, the `font-sans` key in `tailwind.config`), `0px` border-radius everywhere, 1px solid borders instead of shadows for hierarchy. Extend `tailwind.config`'s `theme.extend` rather than hardcoding new colors or adding a second font.
- Sections are anchor-linked from the nav (`#hero`, `#casos`, `#servicios`, `#metodologia`, `#sobre-mi`) with `#contacto` nested inside `#sobre-mi`'s contact card — keep `id` attributes in sync with the nav/footer `href`s if restructuring sections.
- Placeholder contact links (`href="#"`) for phone/email/LinkedIn, and the labeled image placeholders in Casos project cards, are intentional mockup stand-ins — Glenn replaces the images manually; not broken links/assets to "fix".
```

- [ ] **Step 4: Confirm the check passes**

Run: `grep -c 'Tailwind' /home/glenn/Denv/tomassiHSI/CLAUDE.md`
Expected: `>0`

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md
git commit -m "Update CLAUDE.md for Carbon Light Tailwind architecture"
```

---

### Task 9: Full-page verification

**Files:**
- None modified — verification only.

**Interfaces:**
- None.

- [ ] **Step 1: Structural sanity checks**

Run each and confirm the stated result:
- `grep -c 'rounded-none' tomassi-hsi-mockup.html` → `0`
- `grep -c 'font-body-lg\|font-mono-data\|font-headline' tomassi-hsi-mockup.html` → `0`
- `grep -c 'id="hero"\|id="casos"\|id="servicios"\|id="metodologia"\|id="sobre-mi"\|id="contacto"' tomassi-hsi-mockup.html` → `6`
- `grep -c '#0B5C8C\|#B45309\|IBM Plex' tomassi-hsi-mockup.html` → `0` (no old brand colors/fonts left anywhere)

- [ ] **Step 2: Open in a browser and compare against `screen.png`**

Run: `xdg-open tomassi-hsi-mockup.html` (or equivalent). Check against `stitch_tomassi_hsi_systems_integration/screen.png`:
- Nav bar fixed, orange active-link underline on "Inicio"
- Hero: status badge, headline with orange-highlighted second line, 2 CTAs, 2 stat cards (not 3 — confirmed deviation)
- Casos: 1 featured full-width card + 4 half-width cards, all 5 real projects, labeled image placeholders (not broken image icons)
- Servicios: two bordered boxes with orange header bars, dashed connector between them at desktop width
- Metodología: 6 numbered circles on one line; hovering each shows its tooltip
- Sobre mí/Contacto: bio left, contact card right with real contact info + form
- Resize to mobile width (<768px): nav collapses to hamburger button, hero stat cards hide, Servicios/Metodología stack to one column without horizontal scroll

- [ ] **Step 3: No commit** — this task only verifies; if any check fails, fix the offending task and re-run its own Step 4 check before returning here.
