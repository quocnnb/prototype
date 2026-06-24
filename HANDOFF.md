# Handoff — Grappa's QRE outlet page

Design → development reference for this prototype. Pairs with the Figma file and the live build.

- **Figma file key:** `ACP0GAwvaFLI2MclN1ENV9`
- **Figma:** https://www.figma.com/design/ACP0GAwvaFLI2MclN1ENV9/Website
- **Live:** https://quocnnb.github.io/prototype/

The prototype is the source of truth for layout and behavior; Figma is the source of truth for exact values (spacing, color, type). Where the two differ, Figma wins — except for the explicit client overrides noted below.

---

## 1. Design tokens

All tokens are CSS custom properties in `:root` at the top of `css/styles.css`.

### Color

| Token | Value | Usage |
|---|---|---|
| `--red` | `#E31D1A` | Brand primary — CTAs, accents, links |
| `--red-dk` | `#B0140F` | Hover/active on primary; overline text |
| `--pill-red-bg` | `#FBE1E1` | Booking-pill background, outline-button hover |
| `--pill-red-tx` | `#B01310` | Booking-pill text |
| `--ink` | `#1A1410` | Headings (warm near-black) |
| `--body` | `#34312F` | Body text |
| `--nav` | `#32302F` | Top-nav link text |
| `--nav-phone` | `#5B5B5B` | Nav phone number text |
| `--grey` | `#717171` | Grey phone icon (intro / sticky) |
| `--info-icn` | `#F9ACAA` | Info-row icons (coral) |
| `--bg` | `#FAF1EE` | Page background (rose) |
| `--line` | `#E2D6CC` | Dividers / subtle borders |
| `--sticky-line` | `#F2F2F2` | Sticky-nav bottom border |
| `--sub` | `#848484` | Sticky subtitle / muted captions |
| `--hero-pill` | `rgba(43,5,5,0.5)` | Hero breadcrumb pill background |
| `--crumb` | `#E9DDD4` | Hero breadcrumb text |
| `--foot-bg` | `#1A1010` | Footer background |
| `--foot-tx` | `#C8BAAD` | Footer body text |
| `--foot-line` | `#36291F` | Footer divider |
| `--foot-copy` | `#8C7B6B` | Footer copyright |
| `--fp` | `#FF2B85` | foodpanda brand |
| `--keeta` | `#FFE41F` | Keeta brand |

Sister-restaurant hover name uses `#E21C19` (per Figma node `141:2510`).

### Typography

- **Display / headings:** Fraunces (`--fr`). H1 700/36px (-0.36), H2 700/30px (-0.3), sticky name 700/16px.
- **Body / UI:** DM Sans (`--dm`). Body 16px (-0.16), nav links 500/14px, overline 600/12px uppercase (+1.8), buttons 700/14px.
- Loaded from Google Fonts (see `<head>`).

### Spacing — section vertical padding (per Figma, not uniform)

| Section | Desktop | Mobile (≤900px) |
|---|---|---|
| Info | 40 / 40 | 40 / 40 |
| Delivery | 64 / 64 | 48 / 48 |
| Instagram | 64 / 64 | 48 / 48 |
| Sister restaurants | 72 / 72 | 56 / 56 |
| Reward | 120 / 120 | 64 / 64 |

Intro card overlaps the hero by `-72px` (`-48/-40` on smaller screens).

### Layout containers

- Standard content: `--container: min(1200px, 100% - 48px)` (1200 max, 24px gutters). Used by nav, sticky, sections, footer.
- Intro card breakout: `min(1280px, 100% - 48px)`.
- Hero & Instagram marquee: full-bleed, capped at 2000px.

### Radius

Buttons 5px · cards 5px · sister cards 10px · booking pill **10px** · intro card `15 5 30 5`.

---

## 2. Responsive breakpoints

Components switch to their mobile variant when the desktop layout would crowd.

| Max-width | What changes |
|---|---|
| **1024px** | Sticky outlet nav switches desktop (horizontal bar) → mobile (name + dots, tap to open panel) |
| **960px** | Top nav switches desktop (links + phone) → mobile (hamburger menu). Nav goes full-width (client edit). |
| **900px** | Content stacks: intro (logo above text, buttons full-width), info (map above details), delivery (stacked), reward (image below), footer (single column); sister grid → 3 cols; hero pill shows breadcrumb only |
| **560px** | Sister grid → 2 cols; type scales down; hero height fixed |

---

## 3. Components → Figma nodes

| Component | Figma node(s) |
|---|---|
| Top nav — desktop | `76:591` |
| Top nav — mobile (hamburger) | `138:2160` |
| Sticky outlet nav — desktop (horizontal) | `170:3355` |
| Sticky outlet nav — mobile (dots) | `170:3357` |
| Sticky outlet nav — mobile opened (panel) | `178:486` |
| Hero breadcrumb pill | `84:2297` |
| Intro / detail card | `84:2246` |
| Info + map card | `79:1655` |
| Delivery section | `123:193` |
| Sister card hover | `141:2510` |
| Reward section | `89:2883` |
| Footer | `134:1434` |

---

## 4. Behavior (`js/main.js`)

- **Hero:** crossfades up to 5 photos every 5s (static if only one). Respects `prefers-reduced-motion`.
- **Sticky outlet nav:** appears once the user scrolls past the intro card (`#trigger`). Desktop shows the full button row; mobile shows name + dots that toggles a panel (dots ↔ XCircle).
- **Delivery dropdown:** the Delivery button opens a foodpanda / Keeta menu (does not jump to a section). Present in intro, desktop sticky, and mobile sticky panel.
- **Menu / Drink List / Festival Menu / Make Reservation / Join Now:** open in a new tab.
- **Top-nav mobile menu:** hamburger opens a dropdown (What's On, About, Reward Program, Franchise, Media, Careers, Contact, Subscribe, phone).
- **Instagram marquee:** 15 images duplicated (30 total) for a seamless `translateX(-50%)` loop, 80s, pauses on hover.
- **Reveal on scroll:** content blocks fade/translate in via IntersectionObserver (`.reveal` → `.in`). Guarded — if JS is off or reduced-motion is set, everything is shown immediately.
- **Lazy loading:** native `loading="lazy"` on images (hero LCP image stays eager).

---

## 5. Icons

Inline SVG `<symbol>` sprite at the top of `<body>`; referenced with `<svg class="i20 c-…"><use href="#ic-…"></use></svg>`. Color comes from `currentColor` via the `c-coral / c-red / c-grey / c-white / c-nav` classes, so one SVG serves every tint. Source SVGs live in `assets/` (`Phone.svg`, `Phone2.svg`, `MapPinLine.svg`, `menu-list.svg`, `DotsThreeCircle.svg`, `XCircle.svg`, `ArrowSquareOut.svg`, social icons, etc.).

To add/replace an icon: drop the SVG in `assets/`, add a matching `<symbol id="ic-name">` to the sprite (normalize fills/strokes to `currentColor`), and reference it with `<use>`.

---

## 6. Content / client overrides

- **Top-nav phone:** `+852 2833 2189` (client override; Figma shows `+852 3582 6338`).
- **Outlet phone (intro / info / sticky):** `+852 2868 0086`.
- **Footer group phone:** `+852 2833 2189`.
- Map embeds Google Maps by address (`output=embed`, no API key).

---

## 7. Open items / TODO for build

- **Delivery URLs** are placeholders (`foodpanda.hk`, `keeta.com`) — swap in per-outlet links.
- **Reservation** points at a generic Bistrochat URL — confirm the real per-outlet booking link.
- **Menu / Drink List / Festival** point at the current site's PDFs — replace with HTML menus where available.
- **Localization:** EN only here; design must also support 繁體中文 (lang toggle).
- **Real nav targets:** most links are `#` placeholders.
- **Accessibility to verify in build:** focus-visible states, color contrast on the rose background, keyboard operation of the dropdowns/menus, `alt` text on all photography.

---

## 8. Applying to other outlets

This page is the template. For each additional outlet, reuse `index.html` and swap: hero photos, intro copy + script logo, address/hours/phone/fax, map query, menu/booking/delivery URLs, and the social links. The sister-restaurant grid, footer, reward, and nav stay the same across outlets.

---

## 9. Pages & routing

Flat files at the repo root (no build step, no nested folders). Every page is a sibling `.html`; asset/CSS/JS paths are identical on all pages. All internal links already point at these final filenames — a page that isn't built yet 404s until its file is added (no link edits needed afterward).

| Page | File | Status |
|---|---|---|
| Home | `index.html` | ✅ built |
| Grappa's QRE (outlet template) | `grappas-qre.html` | ✅ built |
| Cadillac Bar & Grill | `cadillac.html` | ⬜ to build |
| Happy Valley Bar & Grill | `happy-valley-bar-grill.html` | ⬜ to build |
| Inn Side Out | `inn-side-out.html` | ⬜ to build |
| Mostaccioli Brothers (Mo Bros) | `mostaccioli-brothers.html` | ⬜ to build |
| Mo Bros Pizza | `mo-bros-pizza.html` | ⬜ to build |
| The Mickey B Pizza Co. | `mickey-b-pizza.html` | ⬜ to build |
| New LA Café | `new-la-cafe.html` | ⬜ to build |
| Grappa's @ Gissons | `grappas-gissons.html` | ⬜ to build |
| Restaurants index | `restaurants.html` | ⬜ to build |
| What's On (events) | `whats-on.html` | ⬜ to build |
| Eat & Earn loyalty | `loyalty.html` | ⬜ to build |
| About | `about.html` | ⬜ to build |
| Careers | `careers.html` | ⬜ to build |
| Contact | `contact.html` | ⬜ to build |
| Franchise | `franchise.html` | ⬜ to build |
| Media | `media.html` | ⬜ to build |

Still `#` on purpose (not pages): **Subscribe** (newsletter) and the **social icons** — wire these to real URLs when available.

To add an outlet page: copy `grappas-qre.html`, then swap hero photos, intro copy + script logo, address/hours/phone/fax, map query, menu/booking/delivery URLs, and the social links. Nav, footer, sister grid, and reward stay as-is.
