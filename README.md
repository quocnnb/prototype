# El Grande Concepts — Web Prototype

Coded design prototype for the El Grande Concepts website redesign. This repo currently holds the **Grappa's QRE** outlet detail page, built as the reference template for the other outlets.

- **Live:** https://quocnnb.github.io/prototype/
- **Design source (Figma):** https://www.figma.com/design/ACP0GAwvaFLI2MclN1ENV9/Website
- **Status:** Design prototype for review / dev handoff. Not production code.

This is a static, dependency-free prototype (plain HTML + CSS + JS). There is **no build step** — open the file or push to any static host.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
# Python
python3 -m http.server 8000
# then visit http://localhost:8000
```

A local server is recommended over `file://` so the Google Maps embed and relative paths behave exactly like production.

## Structure

Flat files at the repo root — every page is a sibling `.html`, so `assets/`, `css/`, and `js/` paths are identical on every page (copy a page as a template without rewriting paths).

```
prototype/
├── index.html          # Home  (served at /)
├── grappas-qre.html    # Outlet detail — the reference template for the other outlets
├── css/
│   └── styles.css      # All styles (design tokens at the top as CSS variables)
├── js/
│   └── main.js         # All behavior (no framework, no dependencies)
├── assets/             # Images, photos, brand/outlet logos, icon SVGs
├── HANDOFF.md          # Design → dev handoff: tokens, breakpoints, components, behaviors, page map
├── .nojekyll           # Serve files as-is on GitHub Pages
└── README.md
```

Internal links already point at their final flat filenames (see the page map in `HANDOFF.md`). Pages not built yet will 404 until their file is added — adding the file is all that's needed, no link edits.

## Notes for developers

- **No dependencies.** Fonts (Fraunces, DM Sans) load from Google Fonts via CDN. Everything else is local.
- **Design tokens** live as CSS custom properties at the top of `css/styles.css` (`:root`). See `HANDOFF.md` for the full table and the Figma mapping.
- **Icons** are an inline SVG `<symbol>` sprite (top of `<body>`), recolored via `currentColor`. No icon font, no external icon requests.
- `grappas-qre.html` is the **outlet template**; the remaining outlets reuse the same structure with different content/assets. `index.html` is the home composition.
- Open items (per-outlet delivery URLs, final reservation links, event posters, EN/繁中 localization) are listed in `HANDOFF.md`.

## Editing

Each concern is its own file, so most changes touch only one:
- copy / layout → the page's `.html`
- styling / tokens → `css/styles.css`
- interaction → `js/main.js`
- images / logos / icons → `assets/`
