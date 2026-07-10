# El Grande Concepts — Web Prototype Handoff

Developer handoff for the El Grande Concepts website redesign prototype.

- **Live (GitHub Pages):** https://quocnnb.github.io/prototype/
- **Design source (Figma):** https://www.figma.com/design/ACP0GAwvaFLI2MclN1ENV9/Website
- **Status:** High-fidelity, clickable front-end prototype for review and development. Not production code.

---

## 1. Overview

- **Static, dependency-free.** Plain HTML + one CSS file + one JS file. **No build step, no framework, no bundler.** The only third-party dependency is Google Fonts (loaded via `<link>`).
- **No server.** Everything runs by opening the files or serving the folder as static. Interactive features that would normally need a backend (subscribe, contact form) are front-end prototypes only.
- **English only** so far. The brief also calls for **Traditional Chinese (繁體中文)** as an equal language (not yet built).

### Run locally
Open `index.html` in a browser, or serve the folder:
```bash
python -m http.server 8099   # then visit http://localhost:8099
```

---

## 2. Repo structure

```
/ (root)
  index.html                       Home
  restaurants.html                 Restaurants & Bars index (+ cuisine filter)
  grappas-qre.html                 ┐
  cadillac.html                    │
  mostaccioli-brothers.html        │  7 outlet detail pages
  mo-bros-pizza.html               │  (see roster in §7)
  happy-valley-bar-grill.html      │
  mickey-b-pizza.html              │
  grappas-gissons.html             ┘
  loyalty.html                     Reward Program (Eat & Earn)
  whats-on.html                    Events
  about.html                       About
  franchise.html                   Franchise
  media.html                       Media & Press
  careers.html                     Careers
  contact.html                     Contact
  css/styles.css                   ALL styles (single file)
  js/main.js                       ALL scripts (single file)
  assets/                          images, logos, icons, QR
  .nojekyll                        tells GitHub Pages to skip Jekyll (deploy as-is)
  .gitignore  README.md  HANDOFF.md
```

**No partials/includes.** The header/nav, footer, inline SVG icon sprite, subscribe modal, and (on outlet pages) the sticky nav + reward strip are **copy-pasted inline into every page**. Changing a shared chunk means editing every page that contains it. Internal links are flat siblings (e.g. `href="cadillac.html"`); all pages reference `css/styles.css`, `js/main.js`, and `assets/…` with identical relative paths.

---

## 3. Pages

| Page | File | Notes |
|---|---|---|
| Home | `index.html` | Hero slideshow, restaurant grid, events strip, shortcuts. First-visit loader (see §6). |
| Restaurants & Bars | `restaurants.html` | Cuisine filter; HK and England region groups. All 7 outlets. |
| Outlet detail ×7 | see §7 | Same template: hero, intro/actions, info+map, delivery, sister grid, reward. |
| Reward Program | `loyalty.html` | Eat & Earn: steps, rewards, how to join, FAQ, CTA. |
| What's On | `whats-on.html` | Event cards + type/venue/year filters + "View older". |
| About | `about.html` | Story, philosophy/history, CTA. |
| Franchise | `franchise.html` | Pitch + CTA to Contact. |
| Media & Press | `media.html` | Press cards + type/year filters. |
| Careers | `careers.html` | Open roles (accordion), why-join cards, apply CTA. |
| Contact | `contact.html` | Map, details, prototype message form. |

All nav and footer links resolve to existing pages. Legal pages (privacy/terms) are not built and not linked.

---

## 4. Design system (`css/styles.css` `:root`)

### Color tokens
| Token | Value | Usage |
|---|---|---|
| `--red` | `#E31D1A` | Brand primary — CTAs, accents, links |
| `--red-dk` | `#B0140F` | Hover/active on primary; overline text |
| `--pill-red-bg` | `#FBE1E1` | Pill background, outline-button hover |
| `--pill-red-tx` | `#B01310` | Pill text |
| `--ink` | `#1A1410` | Headings |
| `--body` | `#34312F` | Body text |
| `--nav` | `#32302F` | Top-nav link text |
| `--grey` | `#717171` | Muted icons/text |
| `--info-icn` | `#F9ACAA` | Info-row icons (coral) |
| `--bg` | `#FAF1EE` | Page background (cream) |
| `--line` | `#E2D6CC` | Dividers / borders |
| `--foot-bg` | `#1A1010` | Footer background |
| `--foot-tx` | `#C8BAAD` | Footer text |
| `--fp` | `#FF2B85` | foodpanda brand |
| `--keeta` | `#FFE41F` | Keeta brand |

Other named colors in use: sister/event/loader accents `#E21C19` / `#940E0C`; page-header gradient `#FCC9C7 → #FAF2F0`.

### Typography
- **Display / headings:** Fraunces (`--fr`) — H1 700/36px, section H2 700/30px.
- **Body / UI:** DM Sans (`--dm`) — body 16px, buttons 700/14px, overline 600/12px uppercase.
- Google Fonts import in every page `<head>` (Fraunces weights 300/400/600/700; DM Sans 200–700).

### Layout & radius
- Container: `--container: min(1200px, 100% - 48px)`. Intro card breakout: `min(1280px, …)`. Hero/marquee full-bleed.
- Radius: buttons/cards 5px, sister cards 10px, intro card `15 5 30 5`.

### Responsive breakpoints
| Max-width | What changes |
|---|---|
| 1024px | Sticky outlet nav: desktop bar → mobile dots panel |
| 960px | Top nav: links+phone → hamburger menu |
| 900px | Content stacks; grids reduce columns |
| 560px | Grids to 1–2 columns; type scales down |

---

## 5. Components / patterns (class → meaning)

- **Header/nav:** top bar + hanging logo card (`logoholder`). Active link uses `aria-current="page"`.
- **Sticky outlet nav** (detail pages only): desktop bar (`.sticky-d`) + mobile dots panel (`.sticky-m`); appears after scrolling past the intro card (`#trigger`).
- **Page-header band:** `.rx-top` (breadcrumb + `.rx-h1` + optional `.rx-sub`) with a pink→cream gradient.
- **Restaurant card:** `.rcard` (image + `.rcard-bar` name/logo + `.rcard-hover` white overlay revealing name + address). Used in home + restaurants grids.
- **Region grouping:** `.rx-group` (`.rest-sub` heading + `.rest-grid`); hidden when a filter empties it.
- **Filter chips:** `.rx-filter` / `.rx-chip` (used by restaurants cuisine, What's On, Media).
- **Sister restaurants:** `.sis-card` (logo tile) + `.sis-hover` (white overlay: red name + address).
- **Event card (home):** `.ev-card`; **event card (What's On):** `.wo-card` (poster + date/title/venue).
- **Media card:** `.wo-card.md-card` (source/date/title/excerpt).
- **Delivery buttons:** `.deliv-btn.fp` / `.deliv-btn.kt` in the delivery section, `.dd-opt.fp` / `.dd-opt.kt` in the dropdowns. Add `has-sub` plus a `<span class="opt-sub">` child to stack a caption under the partner logo (used for Cadillac's Mickey B button).
- **Info card (detail):** `.info-row` rows (Address / Hours / Tel / Email …) + map iframe.
- **Reward strip:** shared block on home, restaurants, and all 7 outlet pages (not on loyalty/about/etc).
- **Loyalty page:** `.lp-*` (steps, rewards, join, FAQ) + red CTA band `.lp-cta`.
- **About / Franchise:** `.ab-*` (photo + slogan card + prose + `.ab-cta`).
- **Careers:** `.job` accordion + `.cr-card` (image cards).
- **Contact:** `.ct-*` (map + details + form).
- **Subscribe modal:** `#subModal` on every page, opened by any `[data-subscribe]` element.
- **Icons:** hidden inline `<svg>` sprite of `<symbol id="ic-…">` near the top of `<body>`; used via `<svg class="i20 c-red"><use href="#ic-…"></use></svg>`. Recolour with `c-coral / c-red / c-grey / c-white / c-nav`.
- **Reveal on scroll:** add `reveal` (single) or `reveal-stagger` (children) — `main.js` fades them in on scroll; disabled under `prefers-reduced-motion`.

---

## 6. JavaScript (`js/main.js`)

One file of small guarded IIFEs — each no-ops if its markup is absent:

- **Page loader / splash** — full-screen branded overlay on the **home page, once per session** (`sessionStorage`), fades out on `window load` (min ~2.8s) and unlocks scroll.
- **Sticky outlet nav** — shows after scrolling past `#trigger`.
- **Nav / delivery dropdowns** — top-nav hamburger, intro & sticky delivery menus, mobile sticky panel.
- **Reveal on scroll** — IntersectionObserver adds `.in` to `.reveal` / `.reveal-stagger`.
- **Home hero slideshow** — crossfades background photos and syncs the address pill + "View restaurant" link per slide.
- **Restaurants filter** — cuisine chips toggle `.rcard[data-cuisine]`; hides empty region groups.
- **What's On filter** — combined year chips + venue dropdown + search; "View older" reveals extra cards.
- **Media filter** — type + year chips.
- **Careers** — search + department filter; click a role header to expand details; "More open roles" reveals the rest.
- **Subscribe modal** — validation + success + already-subscribed (in-memory only).
- **Contact form** — validation + thank-you (no backend).

---

## 7. Outlet roster (7)

Order in all listings: Hong Kong 1→6, then England (Gissons).

| # | Display name | File | Cuisine (`data-cuisine`) | Area | Tel |
|---|---|---|---|---|---|
| 1 | Grappa's QRE | `grappas-qre.html` | italian | Wan Chai | +852 2868 0086 |
| 2 | Cadillac Bar & Grill | `cadillac.html` | mexican | Causeway Bay | +852 2521 2322 |
| 3 | Mostaccioli Brothers (Aka Mo Bros) | `mostaccioli-brothers.html` | italian | Central | +852 2525 5770 |
| 4 | Mo Bros Pizza | `mo-bros-pizza.html` | pizza | Central | +852 3421 1144 |
| 5 | Happy Valley Bar & Grill | `happy-valley-bar-grill.html` | bargrill | Happy Valley | +852 2250 5722 |
| 6 | The Mickey B Pizza Co. (Happy Valley) | `mickey-b-pizza.html` | pizza | Happy Valley | +852 2116 4882 |
| 7 | Grappa's @ Gissons | `grappas-gissons.html` | italian | Devon, England | +44 (0) 1392 833077 |

**The Mickey B Pizza Co. (Causeway Bay)** is a **virtual shop**, not a venue: it has no page of its own. All of its takeaway orders are picked up at Cadillac Bar & Grill, so it is represented only as an extra foodpanda button on the Cadillac page (see §8).

**Reservation button** (data-driven per outlet, in intro + both sticky bars):
- **Grappa's QRE** → "Book Online" → `https://book.bistrochat.com/grappas-qre`.
- **Mostaccioli Brothers** → "Call to Book" → the outlet phone.
- All other outlets → no reservation button. Every outlet still shows its phone in the action row and in the info section.

**Assets** per outlet: `<prefix>-hero-N.jpg` (hero slides, card uses `-hero-1`), `<prefix>-logo.png`, plus gallery images where present. Prefixes: `grappas-qre`, `cadillac`, `mostaccioli`, `mo-bros-pizza`, `happy-valley`, `mickey-b`, `gissons`.

---

## 8. Integrations & data

- **Reservation:** as per §7 (Bistrochat URL / `tel:`).
- **Delivery (foodpanda + Keeta):** wired per outlet for the 6 Hong Kong outlets (intro dropdown, both sticky bars, and the delivery section). Gissons (UK) has no delivery partners, so it has no delivery section.
- **Cadillac has a third delivery button:** a second foodpanda link labelled "The Mickey B Pizza Co." (the virtual shop that shares Cadillac's kitchen and pickup counter). It appears in the delivery section and in all three delivery dropdowns. Markup: add `has-sub` to `.deliv-btn` / `.dd-opt` and a `<span class="opt-sub">` label inside. Cadillac's single Keeta link covers both menus.
- **Menus / Drink List / Festival:** buttons currently hotlink the live site's attachment files (`elgrande.com.hk/restaurants/attachments/…`). Replace with real/hosted menus before launch.
- **Social:** El Grande group social (footer on every page + Contact) is **Instagram only** (`instagram.com/elgrande_hk`). Per-outlet intro socials: Grappa's QRE, Cadillac, Mostaccioli, Happy Valley have Facebook + Instagram; Mo Bros Pizza, Mickey B (Happy Valley) and Gissons have none.
- **Loyalty / Eat & Earn:** registration URL `https://member.dtcirclerewards.com/register?ref=ELG`; QR asset `assets/eatearn-qr.png`.
- **Careers apply:** `hr@elgrande.com.hk` + WhatsApp `5216 6993` (`https://wa.me/85252166993`).
- **Contacts:** general `info@elgrande.com.hk`; group phone `+852 2833 2189`; HQ `401, 4/F Iuki Tower, 5 O'Brien Road, Wan Chai`.
- **Maps:** Google Maps embedded by address (`output=embed`, no API key).
- **Events / Media images:** local placeholders — `assets/event-1.jpg … event-9.jpg` (What's On uses all 9; home uses the first 5) and `assets/news-1.jpg … news-4.jpg` + `assets/press-1.jpg` (Media). Swap for final artwork.

---

## 9. Deployment

- **GitHub Pages**, "Deploy from a branch" (`main`). Auto-deploys on push.
- **`.nojekyll` is present at the repo root** so Pages serves the files statically and does **not** run Jekyll. Keep it — removing it re-enables Jekyll, which previously caused intermittent build failures for this static site.
- No custom Actions workflow; deployment is the built-in `pages-build-deployment`.

---

## 10. Open items / TODO for production

- **Backends:** wire the Subscribe modal and Contact form to real services (currently front-end only); add reCAPTCHA to the contact form.
- **Menus:** replace hotlinked attachment URLs with hosted menus.
- **CMS content:** What's On and Media use seeded example content and client-side filters; real archives/pagination and event/press detail pages come with the CMS. Replace placeholder event/news images with final artwork.
- **Localization:** add Traditional Chinese (繁體中文) and a language toggle.
- **Social links:** fill in remaining per-outlet Facebook/Instagram URLs as they are confirmed.
- **Reservation:** extend online/phone booking to more outlets as channels are confirmed.
- **Legal pages:** privacy / terms are not built.
- **Unused assets:** `assets/mickey-b-causeway-*` (5 hero images + logo) are left over from a since-removed outlet page and are no longer referenced. Safe to delete.
- **Accessibility:** production pass on focus-visible states, colour contrast on the cream background, keyboard operation of menus/dropdowns/accordion, and image `alt` text.

---

## 11. Conventions

- Every page is hand-maintained with balanced `<div>`/`</div>` and CSS `{`/`}`. Re-check balance after edits.
- Cross-page edits (shared nav/footer/sprite/modal) must be applied to **every** page — script the change across `*.html` rather than editing by hand.
- **No en/em dashes** (– —) in copy; use "to", a comma, or "and".
- Images: real `alt` (or `alt=""` + `aria-hidden` if decorative); `loading="lazy" decoding="async"`. All image `src` are local (`assets/…`).
- Escape `&` as `&amp;` and apostrophes as `&#39;` inside attributes.
