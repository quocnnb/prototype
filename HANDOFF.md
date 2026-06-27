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
| Cadillac Bar & Grill | `cadillac.html` | ✅ built |
| Happy Valley Bar & Grill | `happy-valley-bar-grill.html` | ✅ built |
| Inn Side Out | `inn-side-out.html` | ✅ built |
| Mostaccioli Brothers (Mo Bros) | `mostaccioli-brothers.html` | ✅ built |
| Mo Bros Pizza | `mo-bros-pizza.html` | ✅ built |
| The Mickey B Pizza Co. | `mickey-b-pizza.html` | ✅ built |
| New LA Café | `new-la-cafe.html` | ✅ built |
| Grappa's @ Gissons | `grappas-gissons.html` | ✅ built |
| Restaurants index | `restaurants.html` | ✅ built |
| What's On (events) | `whats-on.html` | ✅ built |
| Reward Program | `loyalty.html` | ✅ built (trimmed) |
| About | `about.html` | ✅ built |
| Careers | `careers.html` | ⬜ to build |
| Contact | `contact.html` | ⬜ to build |
| Franchise | `franchise.html` | ⬜ to build |
| Media | `media.html` | ⬜ to build |

Still `#` on purpose (not pages): **Subscribe** (newsletter) and the **social icons** — wire these to real URLs when available.

To add an outlet page: copy `grappas-qre.html`, then swap hero photos, intro copy + script logo, address/hours/phone/fax, map query, menu/booking/delivery URLs, and the social links. Nav, footer, sister grid, and reward stay as-is.

### Per-outlet open items (content sourced from the current live site)

Outlet pages reuse the `grappas-qre.html` template; per-outlet content was pulled from the existing elgrande.com.hk site. Hero currently uses each outlet's single existing photo (static); galleries are omitted for now (add later per outlet like Cadillac: `<prefix>-hero-1..N.jpg` + `<prefix>-1..M.jpg`). Cadillac is the fully-built reference (5 hero + 22 gallery — assets supplied separately).

| Outlet | Needs attention |
|---|---|
| Inn Side Out | Intro is a **placeholder** — the live page still shows the old 2014 closure notice, which was not reused. Supply current copy. |
| Mo Bros Pizza | Intro is a **placeholder** (live page had none). Supply 1-2 sentences. |
| New LA Café | Live page is **empty** — placeholder intro; no address / hours / tel / menu. Info, reservation, menu, and phone sections omitted. Supply full details (currently foodpanda-led). |
| Grappa's @ Gissons | Live page says "Coming soon" — placeholder intro. Has address + UK tel; no hours/menu; delivery omitted (UK). |
| Mickey B Pizza | No opening hours on the live site — hours row omitted. Supply hours. |

Cross-outlet placeholders: **delivery** buttons use generic `foodpanda.hk` / `keeta.com` (swap for per-outlet URLs); **Menu / Drink List** buttons hotlink the live site's menu files (localize before the old site is retired); **Make Reservation** calls the outlet (`tel:`) except Mostaccioli Brothers, which uses its online booking (`bit.ly/MoBrosHK`). "Open since" hero fact shown only for Grappa's QRE (no per-outlet founding years).

### Restaurants index (`restaurants.html`)
Built to Figma frame `215:507`. Header = breadcrumb (El Grande / Restaurants & Bars) + title "Our Restaurants & Bars" + description. **Two filter groups** separated by a divider: **Location** (All locations / Hong Kong / England) and **Cuisine** (All cuisines / Italian / Bar & Grill / Pizza / Mexican-American / Café). Pill chips, active = red `#e31d1a` white bold; cards carry `data-region` + `data-cuisine` and filter with AND logic (guarded IIFE in `main.js`, keyed on `.rx-filter`). All 9 outlet cards link to their detail pages; active nav item uses `aria-current="page"`. Detail-page breadcrumbs now include a linked "Restaurants & Bars" crumb; outlet gallery overline reads "Come on in".

### Reward / Eat & Earn (`loyalty.html`)
Full programme page built on the design system (no dedicated Figma frame was provided). Sections: header (breadcrumb + title + intro), **How it works** (3 steps), **Your rewards** (4 cards: welcome Prosecco · HK$480 @ 3,000 pts · HK$1,000 @ 5,900 pts · birthday bottle · note "HK$1 = 1 point, vouchers across all venues"), **How to join** (two paths — Online with a "Register online" button → `member.dtcirclerewards.com/register?ref=ELG`, and At the venue with a scannable QR), **FAQ**, and a red CTA band. All facts come from the research brief.

The shared **reward strip** (home, restaurants index, all 9 outlet pages) now has two buttons: **Join Now** → registration link, and **More details & instructions** → `loyalty.html`.

Open items: the **EnE app** store links are still TBD (page uses the web registration URL + QR for now); `assets/eatearn-qr.png` is a generated QR encoding the registration URL — swap for the client's branded QR (`Main_ELG QR Code`) when available.

### Batch update (latest)
- **Outlets reduced to 7** (removed Inn Side Out + New LA Café). Order — HK: Grappa's QRE, Cadillac, Mo Bros (was Mostaccioli), Mo Bros Pizza, Happy Valley B&G, The Mickey B Pizza Co.; England: Grappa's @ Gissons. Applied to home grid, restaurants grid, sister grids (6 each), footer.
- **Restaurants page**: location filter removed; Hong Kong / England group headings restored; cards now have hover overlay (name + address) like sister/event cards; cuisine filter only (Café chip removed). Filter JS rewritten — hides a region group when empty.
- **Asset naming synchronized** to `<prefix>-hero-N.jpg` / `<prefix>-N.jpg` / `<prefix>-logo.png` (all photos jpg). See `ASSET-RENAME.md` for the manual rename checklist.
- **Email row** `info@elgrande.com.hk` added below Tel/Fax on all 7 detail pages, with new `#ic-mail` sprite (from Mailbox.svg).
- **TikTok + X (Twitter) removed** site-wide (footer + intro). FB + IG kept; links still `#` pending the client's URLs.
- **Reward Program page**: retitled "El Grande Reward Program"; FAQ + "How to join" removed (join merged into "How it works"); unconfirmed point thresholds dropped — copy now sticks to the reward-section facts (1 pt per HK$1, welcome Prosecco, vouchers up to HK$1,000 across venues, birthday Prosecco); Eat & Earn treated as the membership/app, not the programme; Eat & Earn logo added.
- **Subscribe → modal** "Subscribe to our mailing list" on every page (data-subscribe triggers). Fields: Your Email* , Your Name* , Birthday (optional). States handled: validation (empty / invalid email), success, and already-subscribed (in-memory simulation for the prototype).
- **rx-top padding → 120px** (desktop + mobile) so the page header clears the hanging logo card.

### What's On (`whats-on.html`) + About (`about.html`)
No Figma frame for these; built from the live site content (`elgrande.com.hk`) on the existing design system.
- **What's On**: header + grid of event cards (`.wo-card`: poster + date + title + venue). Events pulled from the live `/events/` page (St. Patrick's, Valentine's, Super Bowl, Oktoberfest, Grappa's 35th Anniversary). The 2 Inn Side Out events were dropped (venue removed from the new site). Posters hotlink the live `/events/images/medium/…jpg` with a local gallery fallback via `onerror`. Closing CTA opens the subscribe modal. The home Events strip was re-synced to the same real posters.
- **About**: header + story hero (the 1990 "first customers with GM Guido" archive photo, hotlinked, local fallback) + lead, a stats band (1990 / 35+ / 7 venues / 2 countries), "Our philosophy" + "How it began" prose (the client's own About copy, lightly cleaned and de-duplicated), the brand-promise pull-quote, and a red CTA band to the restaurants page.
- Open items: real event feed / event detail pages + month archive are future work (the live site keeps a 2013→now monthly archive); swap hotlinked event/About images for local optimised copies before launch.
