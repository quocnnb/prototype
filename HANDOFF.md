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
| Careers | `careers.html` | ✅ built |
| Contact | `contact.html` | ✅ built |
| Franchise | `franchise.html` | ✅ built |
| Media | `media.html` | ✅ built |

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

### Batch update (TASKS.md — card hover / About / What's On)
Implemented on branch `feature/tasks-update` (kept off `main` so GitHub Pages is untouched until merged).
- **Unified restaurant-card hover.** `.rcard-hover` now matches the sister-card hover: a white 95% overlay, centered, revealing the name (Fraunces 600/18px red `#E21C19`) + address (`--body`). The dark-gradient variant is gone and the image zoom on `.rcard:hover` was removed (sister cards have no zoom). Same treatment now reads identically on Home, Restaurants index, and the outlet sister grids. **Home cards** gained a `.rcard-hover` (name + short address) on all 7 cards in both region groups; the always-visible `.rcard-bar` stays as the card's persistent label.
- **About (`about.html`).** H1 → "About El Grande Concepts" (and `<title>`); the `.rx-sub` description removed; the `.ab-stats` band removed (markup only — `.ab-stat*` CSS left in place); the brand-promise quote promoted to the top (it is now the `.ab-lead .big` line) and the standalone `.ab-quote` section removed so the quote appears once, leading the page; the remaining JR Robertson lead paragraph + the two prose sections are unchanged. Bottom CTA wrapped in `<section class="h-sec">` and given the new `.lp-cta--sm` modifier (shorter padding, clear space above the footer) — the shared `.lp-cta` used by `loyalty.html` is untouched. `.ab-prose` measure (760px) left as an intentional readable column.
- **What's On (`whats-on.html`).** Added a compact **year filter** (`.rx-filter.wo-filter` chips: All / 2026 / 2025; cards tagged `data-year`) reusing the restaurants filter pattern; a **"View older events"** button reveals 3 hidden **prototype-placeholder** older events (`.wo-card.wo-hidden`, local `assets/event-*.jpg` posters) — real month-by-month pagination arrives with the CMS. The loose `.wo-archive` paragraph + `.wo-cta` button were replaced by a red closing CTA (`.lp-cta--sm`, "Never miss what's on" → subscribe modal) matching About/Reward.
- **JS:** two new guarded IIFEs in `main.js` — `.wo-filter` year filter and the `#woMore` reveal — both no-op when their markup is absent.

### Batch update (review round 2 — polish + About to Figma)
- **Reveal pacing slowed / gentled.** `.reveal` now `opacity .9s` / `transform 1.1s` with a smaller `translateY(16px)`; `.reveal-stagger` children `.85s/1s` and the per-child stagger step in `main.js` raised from 60ms to 90ms. Site-wide, applied through the existing `.reveal` system (still fully gated by `prefers-reduced-motion`).
- **Gradient header band.** `.rx-top` (restaurants / what's on / reward / about — every page with no hero image) now has `background:linear-gradient(180deg,#FCC9C7 0%,#FAF2F0 25%)` (the reverse of the home Shortcuts gradient; bottom stop ≈ page bg so it blends seamlessly). Matches Figma `245:982`.
- **Card hover now covers the whole card.** `.rcard-hover` was moved out of `.rcard-imgbox` to be a direct child of `.rcard` and is `position:absolute;inset:5px;z-index:6` — the white overlay sits on top of the image *and* the name/logo bar (5px frame), so the default-state info no longer shows underneath. Applied to home + restaurants cards (scripted).
- **Filter chip spacing** tightened: `.rx-filter` gap 24px → 12px (restaurants + what's on).
- **What's On filters expanded.** Description max-width removed (`.wo-sub`). New toolbar: a **search box** (`#woSearch`, matches title/venue/date text) + a single-select **restaurant dropdown** (`#woVenue`, default "All restaurants", current 7 outlets; an "All venues" event always matches). **Year chips now span 2013→2026.** All three controls combine in one `apply()` (guarded IIFE), with an empty state (`#woEmpty`). Cards carry `data-year` + `data-venue`. "View older events" button relabelled **"View older"**; the explanatory note line was removed. (Search/venue/year beyond the seeded 2025/2026 events are wired but data-light until the CMS lands.)
- **Subscribe modal.** Removed the `placeholder` text on the Email and Name fields (labels already describe them) across all 12 pages (scripted); the Birthday `date` field's format placeholder is dimmed to `--sub` via `::-webkit-datetime-edit` (returns to `--ink` on focus).
- **About rebuilt to Figma `245:958` (desktop) / `245:2134` (mobile).** New hero row: 1990 photo (with caption, `50px 5px 5px 10px` radius) | red logo tile (white logo via `brightness(0) invert(1)`, soft drop-shadow = the "effect") | pink `#FCDCDC` slogan card with the red brand-promise slogan and the home-hero plate/cutlery decor (static, faint). Below: full-width lead paragraph, then a two-column **Philosophy** / **History** block, then a red CTA (`.ab-cta`, radius 10, "Come and find your table"). Project red tokens used in place of Figma's near-identical `#d02422`/`#d61f1c`. Old `.ab-stats`/`.ab-quote`/`.ab-prose` styles replaced by the new `.ab-*` set.
  - **Content flag (needs your call):** the Figma **History** copy lists many long-closed venues (Inn Side Out, Hong Kong Brew House, GCX, Vern's, Hop House, Cochrane's, Slim's, Fatt's Place, Tequila Jack's, Domani, etc.) and "Mo Bro's". Per instruction I used the Figma text verbatim (en-dashes converted to commas/colon per the house rule). This re-introduces names elsewhere marked "removed / never built", so confirm whether the history paragraph should keep the full historical list or be trimmed to current venues.

### Batch update (review round 3 — new pages, favicon, dropdown polish)
- **Favicon** wired on every page: `<link rel="icon" href="assets/favicon.ico" sizes="any">` inserted after the stylesheet link (scripted, idempotent). Uses the existing `assets/favicon.ico` (the red El Grande cutlery mark).
- **What's On restaurant dropdown caret** fixed: was `stroke='currentColor'` inside a `background-image` data-URI (currentColor does not resolve there, so it rendered black and sat tight to the edge). Now a fixed grey (`%23717171`) caret, `background-position:right 16px`, `padding-right:42px` for clear spacing.
- **Four new pages built** from the shared chunks (nav/sprite/footer/modal sourced from `grappas-qre.html`, which carries the fuller icon sprite incl. `ic-mail`):
  - **`franchise.html`** — uses the About layout as inspiration: gradient header, About-style hero (photo | red logo tile | pink slogan card with decor), lead, two-column "Why El Grande" / "What we look for", `.lp-steps` benefits, red `.ab-cta`. Reuses existing `.ab-*` / `.lp-step` classes (no new CSS).
  - **`media.html`** — press/coverage page in the What's On family: reuses `.wo-grid` + `.wo-card` + the What's On filter JS (year chips All/2026..2022 + `#woMore` "View older" + `#woEmpty`); cards restyled via `.md-*` (source + date meta, Fraunces title, excerpt, "Read more"). Content is **prototype placeholder** press items.
  - **`careers.html`** — standard but restaurant-scale careers page: `.lp-steps` perks, then an item/post-based `.job-list` (`.job[data-dept]`) with a search box + department dropdown (new `careers` IIFE) and an empty state; "Apply" / "Send your CV" use `mailto:`. CMS-ready (each role is one `.job` item). Roles are **prototype placeholders**.
  - **`contact.html`** — `.ct-grid` (details + Google Maps embed by address, same pattern as outlet pages) with address/phone/`ic-mail` email + department mailtos + social, then a prototype contact form (`.ct-form`, new guarded IIFE: validates name/email/message, shows a thank-you, no backend).
- **New CSS** appended: `.md-*` (media), `.job*` (careers), `.ct-*` (contact). **New JS**: `careers` filter IIFE + `contact` form IIFE (both guarded). Media reuses the What's On filter IIFE.
- All four pages: nav active state set on the mobile-menu link via `aria-current="page"`; div/section balance verified; copy is placeholder pending the client's real franchise / press / jobs / contact content.

### Batch update (review round 4 — real content from live site + page reworks)
Content sourced from the live `elgrande.com.hk` pages (franchise / careers / contact / news). Header gradient changed site-wide to `linear-gradient(180deg,#FCC9C7 0%,#FAF2F0 75%)` (longer pink falloff).
- **Franchise** reworked to match the live `/info/franchise` content (lean): h1 "Franchise Opportunities", About-style hero with slogan "Take your favorite restaurant home", the real body paragraph (bars voted among HK's best; restaurants among HK's top 100; expert training and consultation), and a single CTA **"Contact us" → `contact.html`** (the live CTA is "please contact us"). Fabricated benefits/columns removed.
- **Media** is now **poster cards like What's On** (image-led), populated from live `/news` (5 real items, all Inn Side Out press, 2013–2014). Posters hotlink `/news/images/m_thumbnail/<id>_0.jpg` with local `assets/event-*.jpg` fallbacks; the press release links to its live PDF. Compact filters: a **type** chip group (All types / News / Press Release, `data-type`) + a **year** chip group (All / 2014 / 2013, `data-year`) combined in a new `media` IIFE (`.md-grid`, no `.wo-grid` so the What's On IIFE doesn't double-bind). Years limited to 2013/2014 per the live archive; more via CMS.
- **Careers** reworked: **Open roles moved to the top**. Each role is an expandable item (`.job` with `.job-head` + toggle + `.job-detail`) — **Head Chef** carries the real responsibilities/requirements from the live site; the other 5 are clearly-marked example roles. Apply is **hr@elgrande.com.hk + WhatsApp 5216 6993** (wa.me/85252166993) on every role and in the closing CTA ("Email HR" + ghost "WhatsApp" buttons). List shows 4, **"View all roles"** reveals the rest; search + department filter retained (careers IIFE extended for toggle + reveal). **Why join us** is now 3 **landscape image cards** (`.cr-card`: image bg, bottom-aligned text over a dark gradient, like the About photo) with copy grounded only in verified site text (no invented perks). **Images needed:** `assets/careers-1.jpg`, `assets/careers-2.jpg`, `assets/careers-3.jpg` (currently fall back to `career.jpg` / `grappas-qre-hero-2.jpg` / `about.jpg` — Quoc to add the three).
- **Contact** reworked per the live `/contact` page: **map moved to the top** (`.ct-map`, reduced height ~240px), then a two-column row — **Get in touch (left)** (address 401 4/F Iuki Tower, 5 O'Brien Road, Wan Chai; tel +852 2833 2189; info@elgrande.com.hk; social) and **Send a message (right)** (the prototype form). The fabricated department mailto block was removed.
- **CSS**: gradient `75%`; media `.md-*` simplified to grid only; careers `.job-*` reworked + `.cr-*` added; contact `.ct-*` reordered; `.ab-cta .btn-ghost` secondary button added. **JS**: `media` filter IIFE added; `careers` IIFE extended (details toggle + view-all). Balance: all pages div/section matched, CSS braces matched.

### Batch update (review round 5 — Figma franchise, logo effect, filter/typography polish)
- **About red logo tile** now carries the Figma texture effect: a separate `.ab-logo-fx` layer (red bg) with an SVG `feTurbulence`+`feDisplacementMap` filter (`#ab-logo-fx`, defined inline on `about.html`) for a roughened edge; the box-shadow was dropped. Logo sits above the filtered layer (unfiltered).
- **Franchise** rebuilt to Figma `259:763` (content only; shared nav/footer unchanged): full-width photo `assets/franchise-1.jpg` (ratio 12/5, `.fr-photo`; falls back to `grappas-qre-hero-2.jpg` until added), then a row `.fr-row` (344px pink slogan card "Take your favorite restaurant home!" with decor + body paragraph), then the red CTA whose button is **"Contact us" → contact.html**. Body copy is the live franchise text (the stale "past 23 years" figure dropped).
- **Page header padding-bottom 64 → 32** site-wide: `.rx-top` now `padding:120px 0 32px` and `.rx-top + section{padding-top:0}` so the gap below every page title is 32px.
- **Filter chips**: item gap 12 → 8 (`.rx-filter`, `.rx-fgroup`); year chip label "All" → **"All years"** (What's On + Media). **Media filters now sit on one row** (type group, divider, year group via `.rx-fgroup`/`.rx-fdiv`) with a 28px gap before the grid (fixes the flush-to-list issue).
- **Section + CTA titles** (all pages except Home): `.head-l .h2` and `.ab-cta-txt h2` reduced to **30px** (smaller than the 36px page title; Home keeps 36 via `body.home`); CTA title→desc gap 4 → 8, CTA desc 17 → 16.
- **Careers**: description max-width removed; role item corner 14 → 5; **"View all roles" → "More open roles"**; **Why join us** is now **4 cards** (`why-join-us-1..4.jpg`, fallbacks for now), 380px tall, 5px corners, centered text both axes, a solid `rgba(52,29,28,0.53)` overlay (no gradient), with a 4th grounded point ("Relaxed and casual").
- **Contact**: map moved **below** the two clusters (`.ct-map`, 300px, 5px corner, `margin-top`); Get in touch (left) now also lists **hr@elgrande.com.hk**; a note flags that reCAPTCHA arrives with the backend.
- **Assets to add (Quoc):** `assets/franchise-1.jpg`, `assets/why-join-us-1.jpg … why-join-us-4.jpg`.

### Batch update (review round 6 — contact polish + stray sticky-nav fix)
- **Removed the stray outlet sticky-nav** that the page generator had copied from `grappas-qre.html` into `franchise/media/careers/contact` (it was hidden but wrong: Grappa's QRE reservation markup in the DOM). The shared TOP now = icon sprite + top nav only.
- **Contact**: map moved back to the **top** (above both clusters), height reduced to **250px**; the reCAPTCHA note under the button removed; left "Get in touch" and right "Send a message" now share a **14px** vertical rhythm (info rows, form fields, heading-to-content), and the form's vertical spacing was trimmed slightly to shorten the card.
- **Image fallbacks dropped** for the to-be-added local assets (`franchise-1.jpg`, `why-join-us-1..4.jpg`) per request — code points straight at the final names (they will resolve once Quoc adds the files; broken thumbnails until then are expected). Media posters keep their external hotlink + local fallback.

### Batch update (review round 7 — home hero pill button + careers card copy)
- **Home hero pill** (Figma `187:456`): now address + a vertical divider + a **"View restaurant"** link (`.hhero-addr` muted `#bfa8a8`, `.hhero-vline`, `.hhero-link` semibold `#f1f0f0`). Each slide carries `data-href`; the slideshow JS updates the address text *and* the link target together so "View restaurant" always points at the venue on screen.
- **Careers "Why join us"** copy rewritten to be punchier (less literal): "Pull up a chair", "Room to grow", "Never a dull service", "Looked after". Prototype recruitment copy, confirm before launch.

### Batch update (review round 8 — careers location filter)
- **Careers Open roles** now shows the **venue per role** and a **location filter** (`#jobVenue`) alongside department + search. Roles carry `data-venue`; group-level roles (e.g. Head Chef) use **El Grande Concepts**, others are assigned to a specific outlet (example data). Dropdown lists El Grande Concepts + the 7 outlets. The careers IIFE now AND-combines search + location + department.

### Batch update (review round 9 — page loader / splash)
- **Branded loading screen** (Figma `14:838`) added to the **home page** only, shown **once per session** (`sessionStorage 'egLoaded'`): full-screen `--bg` overlay with the El Grande mark + three lines ("Great food & drinks / Exceptional service / Casual vibe", Fraunces, `#3e3636`) animating in once, and a looping 3-square spinner near the bottom (`#f0e7e7` → red sequence, matches the Figma `Squares-Spinner-6`). On `window load` (+ ~1.7s minimum) it fades out, unlocks scroll, sets the session flag and removes itself; the page's existing reveal-on-scroll then carries the content in.
- Markup lives in `index.html` (right after `<body>`, so it paints with no FOUC) with a tiny inline script that adds `eg-loader--skip` when the session flag is already set; the controller IIFE is in `main.js` (guarded — no-ops on pages without `#egLoader`).
- **Recommendation (implemented):** do **not** show a loader on every page navigation — the static pages load instantly and a per-click splash would feel slow/annoying. Show it only on the first entry of a session. Easy to extend to "first entry on any page" later by dropping the same block into the other pages (or injecting it early); kept to the home page for now per the brief ("mới vào web / trang chủ").

### Batch update (review round 10 — loader aligned to Figma 14:834)
- Loader text/style corrected to the Figma component `14:834` (state 4): three lines **"Great food, great drinks" / "and exceptional service" / "in a relaxed and casual environment."** in **Fraunces Light (300)**, colour **#940E0C**, 16px, tracking -0.32, line-height 1.5. (Added `300` to the Fraunces font import on `index.html`.) Logo (~132px) animates in **after** the text, matching the state sequence (lines build first, then the mark).
- Timing: **minimum on-screen time raised to 2.8s** so the intro animation always plays in full and rests briefly for context before fading out (regardless of how fast the page actually loads).

### Batch update (review round 11 — loader motion polish)
- Softened the loader motion for a gentler, more elegant feel: lines rise+fade over .9s with an easeOutQuint curve (staggered .3/.65/1.0s); the **logo now fades in with a soft blur (8px to 0) + slight scale** over 1.25s (delay 1.45s) so it resolves smoothly instead of popping; spinner is a gentle pulse (scale + colour, 1.5s); the whole overlay fades out over .9s with a subtle scale(1.03). Minimum on-screen time raised to 3.6s to let it all breathe.

### Batch update (review round 12 — reservation logic, socials, delivery, careers accordion)
- **Reservation button (intro + both sticky bars) is now data-driven per outlet:** a booking URL shows **"Book Online"** (existing ArrowSquareOut icon); no URL but a booking phone shows **"Call to Book"** (the `ic-phone` icon in **white** on the red button); neither → **no button**. Current data: Grappa's QRE = Book Online (`book.bistrochat.com/grappas-qre`); Mo Bros = Call to Book (`tel:+85225255770`); Cadillac / Mo Bros Pizza / Happy Valley / Mickey B / Gissons = no reservation button.
- **Inline phone next to the reservation button removed** (intro `.act-phone-grp`, desktop sticky `.sd-right`, mobile sticky `.sp-phone`) on all outlets. **UX rationale:** it duplicated the "Call to Book" action and the number is still shown in the Restaurant Information **Tel:** row, so no context is lost and the action row stays clean/balanced.
- **"Table booking service available, please give us a call!"** pill removed from all outlets (could conflict with the new reservation logic).
- **Delivery buttons (foodpanda / Keeta) unlinked** everywhere (intro dropdown, both sticky, delivery section) — URLs still being collected, so they are inert placeholders (`aria-disabled`).
- **Social links:** outlet intro socials now use real per-outlet FB + IG (Grappa's QRE, Cadillac, Mo Bros, HVBG); outlets without links (Mo Bros Pizza, Mickey B, Gissons) show **no** social icons. The **El Grande group** social (footer on every page + Contact) is now **Instagram only** (`instagram.com/elgrande_hk`, FB removed).
- **Careers Open roles → accordion:** clicking anywhere on a role's header row toggles its details; the right-hand "View details" button was demoted to a **borderless "Details" + caret** that rotates when open.

### Batch update (review round 13 — restore phone on no-reservation outlets, intros, localise images)
- **Outlets without a reservation button now show the phone again in the action row** (intro `.act-phone-grp`, desktop sticky `.sd-right`, mobile sticky `.sp-phone`) — same UI/tel behaviour as before (the Tel row in Restaurant Information stays too). Applies to Cadillac, Mo Bros Pizza, Happy Valley, Mickey B, Gissons. Outlets with a reservation CTA (Grappa's QRE = Book Online, Mo Bros = Call to Book) keep the phone removed (covered by the CTA + info row).
- **Grappa's @ Gissons phone corrected to +44 (0) 1392 833077** (`tel:+441392833077`) in the action row and the info Tel row (was 757940).
- **Intro copy extended** for **Mo Bros Pizza** and **Grappa's @ Gissons** so the short-info layout no longer looks bare (grounded, non-fabricated brand copy; fixed a stray apostrophe on Gissons).
- **External images localised to `assets/`:** About hero -> `assets/about.jpg` (onerror dropped). What's On posters and Media clippings repointed off `elgrande.com.hk` to local names (their existing local `onerror` fallbacks stay, so nothing looks broken until the files are added). **Add these to `assets/` (download from the live URLs):** `event-508.jpg` `event-504.jpg` `event-505.jpg` `event-506.jpg` `event-500.jpg` `event-503.jpg` (What's On, from `/events/images/medium/<id>_0.jpg`); `news-4.jpg` `news-6.jpg` `news-7.jpg` `news-8.jpg` `news-9.jpg` (Media, from `/news/images/m_thumbnail/<id>_0.jpg`).

### Batch update (review round 14 — phone on all outlets, event/news images finalised)
- **Action-row phone now shows on ALL 7 outlets** that have a number (added it back to Grappa's QRE and Mo Bros too, alongside their reservation CTA) — same grey `ic-phone2` UI in intro + both sticky bars.
- **Events use `assets/event-1.jpg … event-9.jpg`** (no `onerror` fallback, so a missing file is visible): What's On maps its 9 cards (6 visible + 3 revealed by "View older") to event-1..9 in order; the **Home events strip uses the first five** (event-1..5).
- **Media uses `assets/news-1.jpg … news-4.jpg` + `assets/press-1.jpg`** (no fallback): the four news clippings and the press release respectively.
- No `<img>` on any page references an external URL anymore.
