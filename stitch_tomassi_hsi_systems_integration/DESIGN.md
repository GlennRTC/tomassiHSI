---
name: Carbon Engineering
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e2bfb0'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#a98a7d'
  outline-variant: '#5a4136'
  surface-tint: '#ffb693'
  primary: '#ffb693'
  on-primary: '#561f00'
  primary-container: '#ff6b00'
  on-primary-container: '#572000'
  inverse-primary: '#a04100'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c8c6c6'
  on-tertiary: '#303030'
  tertiary-container: '#9a9999'
  on-tertiary-container: '#313131'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  max-width: 1440px
---

## Brand & Style

This design system is engineered for high-performance healthcare consultancy, where precision and technical expertise are paramount. The aesthetic is **Industrial Minimalism**, drawing inspiration from high-end laboratory equipment and developer environments. It prioritizes data density and clarity over decorative flair.

The UI should evoke an emotional response of absolute reliability and clinical focus. By utilizing a "Dark Lab" environment—characterized by deep carbon grays and high-contrast technical accents—the interface positions the user as an expert operator navigating complex medical and engineering data.

**Key Principles:**
- **Technical Precision:** Every element must feel intentional and mathematically aligned.
- **High Density:** Information is surfaced efficiently, minimizing white space in favor of functional data visualization.
- **Clinical Performance:** Interactions are instantaneous, with a focus on structural integrity rather than fluid motion.

## Colors

The palette is anchored in a monochromatic range of carbon-fiber grays to reduce eye strain during long-form technical analysis. 

- **Primary (Signal Orange):** Reserved strictly for critical technical data, primary actions, and active states. It acts as a beacon within the dark interface.
- **Surface Tiers:** Use `#121212` for the base canvas and `#1a1a1a` for elevated containers or sidebars. 
- **Borders:** Instead of shadows, use `#333333` for structural definition between UI components.
- **Data Visualization:** Use the primary accent for highlights, while utilizing desaturated teals or greys for secondary data streams to maintain the clinical hierarchy.

## Typography

The typography strategy employs a dual-font system to balance technicality with readability.

- **JetBrains Mono:** Used for all headings, labels, and raw data outputs. Its monospaced nature reinforces the engineering narrative and ensures tabular data aligns perfectly.
- **Inter:** Used for all long-form body text and descriptions. Its high x-height and neutral character ensure maximum legibility in complex healthcare contexts.
- **Formatting:** Use all-caps for labels (`label-md`) to create a clear visual distinction between descriptive headers and interactive content.

## Layout & Spacing

This design system utilizes a **Strict Grid** model based on 4px increments. Layouts should feel modular and compartmentalized, resembling a laboratory dashboard.

- **Grid:** A 12-column fluid grid for desktop with 16px gutters. Elements should snap to the grid without exception.
- **Density:** Padding within components (cards, inputs) should be kept tight (12px or 16px) to maintain high information density.
- **Breakpoints:**
  - **Mobile (< 768px):** 4-column layout, reduced margins (16px).
  - **Tablet (768px - 1024px):** 8-column layout.
  - **Desktop (> 1024px):** 12-column layout, max-width of 1440px for centered content.

## Elevation & Depth

This design system rejects soft shadows and ambient depth. Instead, hierarchy is communicated through **Tonal Layering** and **Structural Outlines**.

- **Flat Depth:** All elements exist on a single optical plane. Use background color shifts (`#121212` to `#1a1a1a`) to indicate container nesting.
- **Borders:** Every functional module (Card, Table, Sidebar) must have a 1px solid border. 
- **Active State:** Use the Signal Orange accent for a "glowing" 1px border or a solid 2px left-border to indicate focus/selection.
- **Backdrop:** If overlays are required (modals), use a high-opacity dark tint (#000000 at 80%) without blur to maintain the sharp industrial feel.

## Shapes

The shape language is strictly **Geometric and Sharp**. 

- **Corner Radius:** All components—including buttons, cards, inputs, and tags—must have a 0px border radius.
- **Visual Rhythm:** Use 90-degree angles to reinforce the sense of engineering precision.
- **Icons:** Use thin-stroke, square-ended icons that align with the 4px grid. Avoid rounded or "bubbly" iconography.

## Components

### Buttons
- **Primary:** Solid `#ff6b00` background with `#121212` text. Sharp corners.
- **Secondary:** Transparent background, 1px solid `#333333` border, white text.
- **Hover:** Primary buttons shift to a slightly brighter orange; secondary buttons gain a subtle `#1a1a1a` fill.

### Input Fields
- **Default:** 1px solid `#333333` border, `#1a1a1a` background.
- **Focus:** 1px solid `#ff6b00` border. Text cursor is Signal Orange.
- **Label:** `label-md` (JetBrains Mono) placed above the input field.

### Cards & Modules
- No shadows. Use a 1px solid `#333333` border.
- Section headers within cards should have a subtle bottom border to separate data points.

### Data Tables
- High density. Alternate row colors using `#121212` and `#161616`.
- Headers use `label-md` with Signal Orange accent for sort indicators.

### Status Indicators
- **Critical:** 1px solid border with `#ff3b30` text.
- **Operational:** 1px solid border with `#34c759` text.
- Use square "pips" (4px x 4px) instead of circles for status dots.

### Technical Elements
- **Scanlines:** A very subtle horizontal repeating pattern can be used on primary display headers to reinforce the "terminal" aesthetic.
- **Coordinates:** Use `mono-data` for decorative but functional metadata in corners of large modules.