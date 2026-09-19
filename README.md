# ElyonEdge — Client Landing Pages

Static, dependency-free landing pages built by **ElyonEdge Marketing & Sales** (Nairobi, Kenya).
Each page is aligned to its client's style words, branding and contact details, and is structured
as a sales funnel: one promise, one next step, and the questions a buyer actually asks in between.

No build step, no framework, no npm install. Open a file in a browser and it works.

## Structure

```
clients/index.html                      Directory of all client landing pages
assets/
  css/base.css                          Shared layout + components (tokenised)
  js/main.js                            Nav, FAQ accordion, reveals, counters
clients/
  elyonedge-marketing-sales/
    index.html                          The landing page
    brand.css                           Client brand tokens only
netlify.toml                            Static hosting config + root rewrite
```

`base.css` contains **no brand values** — every colour, font and radius is a CSS custom property.
A client's `brand.css` overrides those tokens. That is the whole theming contract.

## Deployment

The site is served from **https://inquiry.elyonedge.org**. `netlify.toml` rewrites `/` to the
ElyonEdge landing page (status 200, so the address bar stays clean), because that subdomain is
ElyonEdge's own page. The directory of all client pages stays reachable at `/clients/`.

There is no build step — Netlify publishes the repository root as-is. Adding a client is a commit,
not a deploy config change.

## Adding another client page

1. `cp -r clients/elyonedge-marketing-sales clients/<new-client>`
2. Edit `clients/<new-client>/brand.css` — override the tokens under `:root`. Read the contrast
   note below before picking accent colours.
3. Rewrite `index.html` for that client: their voice, offers, proof, contact block and JSON-LD.
4. Add a card for them in `clients/index.html`.

## The ElyonEdge page

### Funnel structure

The page runs one path, top to bottom, and every section ends pointing at the same action:

| Stage | Section | Job |
| --- | --- | --- |
| Attention | Hero | One promise + the free call, with proof in the first screen |
| Consideration | The problem | Three concrete ways a school loses parents |
| Consideration | What we do | Three offers, not seven services |
| Consideration | Proof | Four numbers from real schools |
| Consideration | How it works | Three steps, removes "what happens next?" |
| Conversion | Questions | The six objections that block a booking |
| Conversion | Why we exist → Book | The close, with phone, WhatsApp and email |

The seven individual services are grouped into three outcome-shaped offers (get found, convert,
diagnose), because a buyer choosing between seven things usually chooses none.

### Source material

Every claim, figure and line of copy comes from the client's own documents; nothing was invented.

| Content | Source |
| --- | --- |
| The three loopholes, the funnel logic | Sales Conversion Strategy Handbook |
| Audit method ("we follow real enquiries") | Sales Audit & Loophole Diagnostic |
| Offer grouping and pain points | October 2026 Content Calendar (*Service Pain-Points Reference*) |
| FAQ answers | FAQs — Meta Automation Set-Up Guide |
| Contact details, founder, tagline | Keyword Automations — Meta Automation Set-Up Guide |
| Palette, typography, layout language | `about_1.html` (the client's About page) |

### Design system

Palette and type follow the client's About page: Sora for headings, DM Sans for body, Fraunces
italic for accents; deep blue `#0C2D6B` with orange, pink, teal and yellow blocks on cream.

**Contrast — read this before reusing the palette.** The display hues are bright, and several
combinations on the source page are unreadable. This build corrects them:

| Source page | Measured | Fix here |
| --- | --- | --- |
| White text on pink | 2.96:1 | Ink text on pink instead (4.55:1) |
| White text on teal | 2.49:1 | Ink text on teal instead (5.26:1) |
| Accent hues as small label text | 1.9–3.6:1 | Separate `--*-text` tokens, each ≥4.5:1 |
| Ink text at `opacity: .6–.88` on colour cards | 2.6–4.3:1 | Full opacity; hierarchy by size and weight |

So each hue exists twice: the bright version for **card backgrounds** (always with ink text on
top), and a darkened `--orange-text` / `--pink-text` / `--teal-text` for **text on light**. The
text tokens are tuned against the worst case — a tinted `.s-label` pill over white.

All 40 text/background pairs on the page meet WCAG AA.

### Other improvements over the source page

- Counter numbers are in the markup and animated *from* zero, so the real figures show with
  JavaScript disabled and under `prefers-reduced-motion` (the source hardcodes `0%`).
- The hero marker highlight uses a per-line gradient with `box-decoration-break: clone`, so it
  hugs the text when the phrase wraps instead of overrunning it.
- Every tap target is at least 44px.
- Semantic landmarks, skip link, visible focus rings, `aria-expanded`/`aria-controls` on the nav
  and FAQ, and reveals disabled under `prefers-reduced-motion`.
- Analytics snippets are present but **commented out**, because the IDs are placeholders.

## Before this page goes live

Deliberately unresolved — the source documents mark these `[confirm before going live]` or
disagree with each other:

- **Email address.** The page uses `hello@elyonedge.com` (the address in the "fill in once" table
  of both Meta guides). The keyword-automation rules elsewhere list `info@elyonedge.org` and
  `info@elyonedge.com`. Pick one.
- **Analytics.** Replace `G-XXXXXXXXXX` and `YOUR_PIXEL_ID` in `index.html`, then uncomment the
  two blocks. For a conversion page this is worth doing before you spend on ads.
- **Facebook page, LinkedIn, Google Maps pin, office hours, second phone line.** All still marked
  "confirm before going live", so none appear.
- **Result figures.** The content calendar notes *"verify current figures before publishing."*
  Elyss and Pinehouse numbers are quoted exactly as supplied.
- **DNS.** `inquiry.elyonedge.org` needs a CNAME pointing at the Netlify site. Until then the page
  is live on its `*.netlify.app` address.
- **`og:image`.** Not set — add 1200×630 artwork when available.
