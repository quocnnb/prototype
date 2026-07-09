# El Grande Concepts — Web Prototype

Coded design prototype for the El Grande Concepts website redesign: home, 8 restaurant/bar detail pages, and the surrounding content pages (Restaurants index, Reward Program, What's On, About, Franchise, Media, Careers, Contact).

- **Live:** https://quocnnb.github.io/prototype/
- **Design source (Figma):** https://www.figma.com/design/ACP0GAwvaFLI2MclN1ENV9/Website
- **Status:** Design prototype for review / dev handoff. Not production code.

This is a static, dependency-free prototype (plain HTML + CSS + JS). There is **no build step** — open the files or push to any static host.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

A local server is recommended over `file://` so the Google Maps embeds and relative paths behave exactly like production.

## Structure

Flat files at the repo root — every page is a sibling `.html`, so `assets/`, `css/`, and `js/` paths are identical on every page.

```
prototype/
├── index.html            # Home (served at /)
├── restaurants.html      # Restaurants & Bars index
├── *.html                # 8 outlet detail pages + Reward/What's On/About/Franchise/Media/Careers/Contact
├── css/styles.css        # All styles (design tokens as CSS variables at the top)
├── js/main.js            # All behavior (no framework, no dependencies)
├── assets/               # Images, photos, brand/outlet logos, icon SVGs
├── .nojekyll             # Serve files as-is on GitHub Pages (skip Jekyll)
├── HANDOFF.md            # Full developer handoff: structure, tokens, components, behavior, data, TODOs
└── README.md
```

See **`HANDOFF.md`** for the complete page map, outlet roster, design system, and open items.

## Notes for developers

- **No dependencies.** Fonts (Fraunces, DM Sans) load from Google Fonts; everything else is local.
- **No partials.** Shared chunks (nav, footer, icon sprite, subscribe modal, sticky nav) are copy-pasted into each page — a shared-chunk change must be applied to every page (script it across `*.html`).
- **Design tokens** are CSS custom properties at the top of `css/styles.css` (`:root`).
- **Icons** are an inline SVG `<symbol>` sprite, recoloured via `currentColor`.

## Editing

Each concern is its own file:
- copy / layout → the page's `.html`
- styling / tokens → `css/styles.css`
- interaction → `js/main.js`
- images / logos / icons → `assets/`
