# Thilakar Raj Suyambu — Portfolio

Official portfolio of **Thilakar Raj Suyambu** (Thilakar Raj), Technical Manager, Solution Architect and Java Technical Lead in Chennai, India.
Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion and Lucide.

## Stack

| Concern        | Choice                                                 |
| -------------- | ------------------------------------------------------ |
| Framework      | Next.js 16 (App Router, static prerender)              |
| Language       | TypeScript                                             |
| Styling        | Tailwind CSS v4 + CSS design tokens (`src/app/globals.css`) |
| Motion         | `motion` (Framer Motion for React)                     |
| Icons          | `lucide-react` (+ one inline LinkedIn brand mark)      |
| Fonts          | Manrope (display/body) + Geist Mono (labels), self-hosted via `next/font` |
| Images         | `next/image` with a monogram fallback                  |

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run lint         # ESLint (next/core-web-vitals + typescript)
npx tsc --noEmit     # type-check
npm run build        # production build (.next)
npm run start        # serve the production build
```

## Project structure

```
src/
  app/
    layout.tsx           # fonts, metadata, Open Graph, JSON-LD, theme script
    sitemap.ts           # sitemap.xml for crawlers
    robots.ts            # robots.txt
    page.tsx             # section order
    globals.css          # design tokens (dark default + light), utilities, keyframes
  data/                  # all copy/content lives here — edit these, not the components
    site.ts              # name, contact, nav links, ticker items
    projects.ts          # selected work (5 projects)
    experience.ts        # career history
    skills.ts            # grouped skills
    architecture.ts      # architecture layers + principles
  components/
    layout/              # Shell (global state), Navbar, ThemeToggle, Footer
    sections/            # Hero, Ticker, About, Work, ProjectCard/Dialog, Architecture, Experience, Skills, Contact
    interactions/        # CustomCursor, Spotlight, CommandPalette
    ui/                  # Button, Dialog (native <dialog>), Reveal/Stagger, Magnetic, Tag, SectionHeading
  hooks/                 # use-active-section, use-theme, use-pointer-fine
public/
  images/profile.jpg     # profile photo
  images/projects/<slug>/# reserved for future screenshots (currently empty)
  Thilakar_Raj_Technical_Lead.pdf   # résumé served by the "Resume" buttons
  icon.svg               # monogram favicon
```

## Where to add assets

### Profile picture

Place the image at:

```
public/images/profile.jpg
```

Portrait orientation (roughly 4:5) works best. If the file is missing or fails to load,
`ProfileImage` renders a stable **TR** monogram placeholder — no broken image, no layout shift.

### Résumé

Replace `public/Thilakar_Raj_Technical_Lead.pdf`. If you rename it, update `resumePath` in `src/data/site.ts`.

### Project screenshots

Folders are pre-created for each project:

```
public/images/projects/ai-orchestrator/
public/images/projects/snaphealthcare/
public/images/projects/snap/
public/images/projects/allergy-vitae/
public/images/projects/shipcrm/
```

Today the cards and dialogs use original SVG system diagrams (labelled *conceptual*).
To show real screenshots later, add a `screenshots: string[]` field to a project in
`src/data/projects.ts` and render it in `ProjectDialog` with `next/image`.

### Site URL

Set `url` in `src/data/site.ts` to the deployed domain. It drives `metadataBase`, the canonical URL,
Open Graph URLs and the JSON-LD `Person` schema.

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub.
2. Import it at vercel.com → "New Project". Framework preset: **Next.js**. No extra settings.
3. Every push to `main` deploys. Image optimization and fonts work out of the box.

### GitHub Pages (static export)

The config supports a fully static build when `STATIC_EXPORT=true`.
It enables `output: "export"`, `trailingSlash`, unoptimized images, and an optional `BASE_PATH`.

Local test:

```bash
# PowerShell
$env:STATIC_EXPORT="true"; $env:BASE_PATH="/myportfolio"; npm run build
# bash
STATIC_EXPORT=true BASE_PATH=/myportfolio npm run build
```

Output lands in `./out`. A ready-to-use workflow is included at
`.github/workflows/deploy-pages.yml`:

1. In the repo: **Settings → Pages → Source: GitHub Actions**.
2. Push to `main`. The workflow builds with `BASE_PATH=/<repo-name>` and publishes `out/`.
3. If you deploy to a user/organization root (`<user>.github.io`), remove the `BASE_PATH` env line in the workflow.

## Theming

Dark is the default. The toggle persists to `localStorage("tr-theme")`, and an inline script in
`layout.tsx` applies the stored value before first paint (no flash). All colors are semantic CSS
variables (`--bg`, `--surface`, `--text`, `--accent`, …) mapped into Tailwind through `@theme inline`.

## Accessibility & motion

- Native `<dialog>` for the project modal, mobile menu and command palette: focus trap, `Escape`, backdrop click, focus restoration, body scroll lock.
- `prefers-reduced-motion`: scroll reveals render their final state, the ticker/orbits/flow lines stop, the custom cursor and magnetic effects are disabled.
- Custom cursor and spotlight are mounted only on `(pointer: fine) and (hover: hover)` devices.
- Keyboard: skip link, visible focus rings, `aria-current` on the active nav item, `aria-pressed` on toggles, `⌘/Ctrl + K` opens the palette (arrow keys + Enter).
- Ticker has an explicit pause control and pauses on hover/focus.

## QA checklist (verified)

- [x] `npx tsc --noEmit` passes
- [x] `npm run lint` passes (0 errors/warnings in `src/`)
- [x] `npm run build` passes (static prerender, `/` and `/_not-found`)
- [x] `STATIC_EXPORT=true npm run build` produces `out/index.html`
- [x] Production load has **no console errors and no hydration warnings**
- [x] Reviewed at 390 px, 768 px and 1920 px — **no horizontal overflow**
- [x] Hero height on 390 px ≈ 1030 px (text first, compact visual)
- [x] Sticky nav never covers section headings (`scroll-padding-top`)
- [x] Active nav indicator tracks scroll; mobile menu opens/closes and restores focus
- [x] Project dialog: opens on click/Enter, `Escape` closes, backdrop closes, focus returns to card
- [x] Command palette: `Ctrl/⌘ + K` toggles, filters, `Escape` closes
- [x] Theme toggle persists and survives reload without a flash
- [x] Reduced-motion: CSS animations report `none`; content is visible without scrolling
- [x] Text contrast: body ≥ 7:1, muted ≥ 7:1, subtle ≥ 5:1 on dark; ≥ 4.5:1 across the light theme
- [x] Heading order: one `h1` (hero) → `h2` per section → `h3` for cards/roles
- [x] All icon-only controls have `aria-label`; decorative icons are `aria-hidden`
- [x] Links: résumé PDF, LinkedIn, `mailto:`, `tel:` all resolve
- [x] No text is hover-only; tags/summaries are always visible
- [x] No unsupported claims (no revenue, percentages, team sizes or awards)

## 21st.dev-inspired components

Components were adapted to the token system rather than copied with their default colors.

| Component | Where | Why |
| --- | --- | --- |
| **Spotlight / glow card** | `ProjectCard` | Pointer-following radial glow (`--mx/--my` CSS vars) gives bento cards depth without heavy 3D. Tilt is capped at 3°. |
| **Magnetic button** | `Magnetic` around hero + contact CTAs | Subtle pull toward the pointer on fine-pointer devices; springs from Motion, strength 0.12–0.18. Disabled on touch and reduced-motion. |
| **Animated tabs / active pill** | `Navbar` | Motion `layoutId` indicator slides between nav items as sections change. |
| **Marquee / logo ticker** | `Ticker` | Seamless CSS loop with duplicated list (`aria-hidden` copy), edge fade mask, pause on hover/focus and explicit pause button. |
| **Command menu (cmdk-style)** | `CommandPalette` | Native `<dialog>` + `role="combobox"/listbox` for navigation, project deep-links and actions. |
| **Text reveal (line mask)** | `Hero` headline | Lines slide up from an `overflow-hidden` mask; only two lines are animated per UX guidance (no long-paragraph splitting). |
| **Bento grid** | `Work` | 6-column CSS grid with wide/tall spans plus a CTA tile so the grid closes without filler. |

## How UI UX Pro Max shaped the design

The skill's `--design-system` run for “software architect portfolio, dark editorial minimal” returned a
Brutalism/monochrome suggestion; that was too raw for a leadership positioning, so the direction was
refined with targeted domain searches (`style: dark mode`, `color: developer tool / API portal`,
`typography: technical sans + mono`, `ux: focus states, auto-rotating content, horizontal scroll`,
`gsap: scroll reveal / stagger`). Concretely:

- **Style** — “Dark Mode (OLED)” guidance: deep charcoal (`#0b0c0f`, not pure black), minimal glow used only on the active architecture node and primary CTA hover, `color-scheme: dark`, contrast ≥ 7:1 for body text.
- **Colors** — Developer-tool palette pattern (“code dark + run green”): a single restrained lime accent for action/active state, muted violet as the secondary accent for AI/async concepts, low-opacity white borders. Light theme uses a darkened green so accent text still passes 4.5:1.
- **Typography** — “Sans + Mono precision system”: one display/body family (Manrope, tight tracking at display sizes) and a mono family strictly for labels, indices and tags; uppercase mono labels use +0.12–0.16em tracking as recommended. Two families total.
- **Layout** — Spacious density dial (section rhythm 5/7/8.5 rem), 76 rem container, 12-column grid in hero/about/architecture, `text-wrap: balance` on headings, readable measure (≤ 62ch) for body copy.
- **UX** — Auto-rotating content rule: the ticker and architecture walkthrough both stop on hover/focus, expose a pause control and stop under reduced motion. Horizontal-scroll rule: ticker is clipped and masked; `overflow-x: clip` on `body`. Target-size rule: all controls ≥ 36–44 px.
- **Accessibility** — Focus-visible rings on every control including dialog internals; `scroll-padding-top` so sticky nav never obscures focus (WCAG 2.2 “Focus Not Obscured”); decorative icons `aria-hidden`; meaningful icons labelled.
- **Motion** — Scroll reveal kept to a fade with ≤ 18 px offset (“reads as a fade, not a slide”), stagger 50–80 ms, expo-out easing, `once: true` to avoid re-triggering; hero text uses a short line mask rather than per-character splitting; everything respects `prefers-reduced-motion`.

## Search engines (SEO)

This does **not** guarantee a first-page or first-position ranking. It makes the site technically eligible to be crawled, indexed, and associated with the right person.

Implemented:

- Title and meta description that include **Thilakar Raj Suyambu**, **Technical Manager**, **Solution Architect**, and **Java**
- Canonical URL `https://thilakarraj.github.io/myportfolio/`
- Open Graph + Twitter card metadata and `public/og.png` (1200×630 share image)
- `robots.txt` and `sitemap.xml`
- JSON-LD `ProfilePage` + `Person` (name, alternate names, job titles, employer, `sameAs` LinkedIn/GitHub)
- On-page name and role copy in the hero and about sections

### Google Search Console (required for discovery)

Google will not reliably find a GitHub Pages project site until you claim it.

Verification files are already on the site:

- HTML tag: `google-site-verification` on the home page
- HTML file: `https://thilakarraj.github.io/myportfolio/google2f4b4d53c5093a92.html`

After a deploy:

1. Open [Google Search Console](https://search.google.com/search-console) and click **Verify** on the URL-prefix property `https://thilakarraj.github.io/myportfolio/`
2. On **Sitemaps**, enter `sitemap.xml` (the prefix is already filled). That submits `https://thilakarraj.github.io/myportfolio/sitemap.xml`
3. If status is **Couldn't fetch**, wait a few minutes after a deploy, remove the sitemap (⋮ menu), and submit `sitemap.xml` again. This is common on `github.io` and does not mean the file is broken.
4. Use **URL Inspection** on `https://thilakarraj.github.io/myportfolio/` and click **Request indexing** — that works even while the sitemap is stuck.

Also keep LinkedIn (`https://www.linkedin.com/in/thilakar-raj-suyambu/`) and GitHub (`https://github.com/thilakarraj`) public and pointing at this URL — those are the profiles already ranking for your name.

## License

Personal portfolio. Content © Thilakar Raj S. Code may be reused with attribution.
