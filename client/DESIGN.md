---
name: Cyber-Minimalist Portfolio
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#303032'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#fff9ef'
  on-secondary: '#3a3000'
  secondary-container: '#ffdb3c'
  on-secondary-container: '#725f00'
  tertiary: '#fff5de'
  on-tertiary: '#3b2f00'
  tertiary-container: '#fed639'
  on-tertiary-container: '#715d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffe16d'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#ffe179'
  tertiary-fixed-dim: '#eac324'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#554500'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
  syntax-keyword: '#dbfcff'
  syntax-string: '#e9c400'
  syntax-function: '#00dbe9'
  syntax-comment: '#849495'
typography:
  display-xl:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  container-max: 1280px
---

## Brand & Style

The brand personality is high-tech, precise, and intellectually sophisticated, specifically tailored for a software engineering identity. It strikes a balance between a professional corporate persona and a "hacker-aesthetic" developer environment.

The design style is **Cyber-Glassmorphism**. It utilizes a dark, monochromatic base with vibrant, high-fidelity cyan accents. Key characteristics include:
- **Depth through Transparency:** Translucent surfaces with heavy backdrop blurs create a "heads-up display" (HUD) feel.
- **Controlled Glow:** Emissive properties are used sparingly for active states and critical path UI elements, mimicking hardware indicator lights.
- **Technical Precision:** Monospaced typography for code and metadata suggests a functional, logic-driven approach.
- **Subtle Motion:** Organic, slow-moving shader backgrounds provide life without distracting from the content.

## Colors

The color system is optimized for a high-contrast dark mode. 

- **Primary Cyan:** Used for interactive elements, status indicators, and branding. It is the primary "emissive" color.
- **Secondary Gold:** Used as a tertiary accent to break the monochromatic cool tones, specifically for emphasizing "mobile" or secondary technical skills.
- **The Surface Palette:** Utilizes a spectrum of deep grays and blacks (`#0e0e10` to `#353437`) to create hierarchical depth without relying on pure black.
- **Syntax Highlighting:** A specialized subset of colors is reserved for code blocks to maintain high legibility and a distinct "IDE" feel.

## Typography

The typography system uses a three-font strategy to differentiate content types:

1.  **Montserrat (Headlines):** High-impact, geometric sans-serif for hero sections and titles. Used with tight tracking and heavy weights (700-800).
2.  **Hanken Grotesk (Body):** A modern, sharp sans-serif for long-form reading. It provides a contemporary feel that is more sophisticated than standard system fonts.
3.  **JetBrains Mono (Technical/Labels):** Used for navigation, UI labels, and code. This reinforces the engineering focus of the brand.

**Hierarchy Note:** Use uppercase styling for all `label-caps` roles to maximize the "HUD" aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop and a **Fluid** model for mobile.

- **Desktop:** Centralized container with a 1280px max-width. Content often splits into a 2-column asymmetrical grid (e.g., 60/40 or 50/50) to balance dense information with visual assets.
- **Mobile:** A single-column vertical stack with 24px side gutters.
- **Rhythm:** A 4px base unit is used for all internal component spacing, while section spacing typically scales in multiples of 24px (md) or 80px (xl).
- **Navigation:** Top-fixed persistent header on desktop; bottom-fixed tab bar on mobile for ergonomic "thumb-zone" access.

## Elevation & Depth

Elevation is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional shadows:

- **Surface Layers:** The background uses the `surface-dim` color. Panels (like the code editor) use `surface-container` with a semi-transparent `rgba(28, 27, 29, 0.7)` background and a `12px` backdrop blur.
- **Outlines:** Instead of shadows, use 1px borders with low opacity (`white/10` or `white/05`) to define edges.
- **Emissive Elevation:** The "Glow" effect (`0 0 15px rgba(0, 219, 233, 0.1)`) is used to denote the highest level of interactive priority or the "active" focus state.
- **Z-Index:** Navigation and Modals occupy the highest layers, utilizing a darker overlay (`black/60`) to dim the background shader.

## Shapes

The shape language is primarily **Soft-Industrial**. 

- **Containers:** Default components use a very slight radius (0.125rem) to maintain a crisp, precise feel.
- **Large Panels:** Cards and terminal windows use `rounded-lg` (0.25rem) or `rounded-xl` (0.5rem) to soften the large blocks of content.
- **Interactive Elements:** Buttons and active nav links use the `rounded-sm` to `rounded-lg` range. 
- **Avatars/Icons:** Use `full` (0.75rem or circular) to provide a distinct visual contrast against the otherwise rectangular, grid-locked layout.

## Components

### Buttons
- **Primary:** Solid `primary-container` background, dark text, `rounded-sm`. Includes a `glow-cyan` shadow.
- **Outline:** 1px border of `primary-fixed-dim`, no background, cyan text.
- **Interaction:** All buttons should scale slightly (95-98%) on active press and increase brightness on hover.

### Cards & Panels
- **Glass Panel:** Semi-transparent background with backdrop blur. Must have a 1px border.
- **Terminal:** Specialized card with a `surface-container-highest` header bar and three-dot window controls (red/yellow/green).

### Navigation
- **Desktop Header:** Fixed height (64px), blurred background, thin bottom border.
- **Mobile Drawer:** Slides from the left, utilizes `surface-container-low` with a subtle right-side border. Active links should be highlighted with a vertical primary-color bar.
- **Bottom Bar:** High transparency, blurred, icon-centric for mobile.

### Inputs & Selection
- **Selection:** Use `primary-container` with `on-primary-container` text for text highlights.
- **Chips/Badges:** Small, `label-caps` typography, usually outline-only or with a 10-20% opacity background of the primary color.