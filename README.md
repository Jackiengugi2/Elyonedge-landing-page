# ElyonEdge — Client Landing Pages

Static, dependency-free landing pages built by **ElyonEdge Marketing & Sales** (Nairobi, Kenya).
Each page is aligned to its client's own style words, branding and contact details, and exists to
explain that client's offerings and guide a visitor to a single clear next step.

No build step, no framework, no npm install. Open a file in a browser and it works.

## Structure

```
clients/index.html                      Directory of all client landing pages
assets/
  css/base.css                          Shared layout + component system (tokenised)
  js/main.js                            Nav toggle, FAQ accordion, scroll reveal
clients/
  elyonedge-marketing-sales/
    index.html                          The landing page
    brand.css                           Client brand tokens only
netlify.toml                            Static hosting config + root rewrite
```

## Deployment

The site is served from **https://inquiry.elyonedge.org**. `netlify.toml` rewrites `/` to the
ElyonEdge landing page (status 200, so the address bar stays clean), because that subdomain is
ElyonEdge's own page. The directory of all client pages stays reachable at `/clients/`.

There is no build step — Netlify publishes the repository root as-is. Adding a client is a commit,
not a deploy config change.

`base.css` contains **no brand values** — every colour, font and radius is a CSS custom property.
A client's `brand.css` overrides those tokens. That is the whole theming contract.

## Adding another client page

1. `cp -r clients/elyonedge-marketing-sales clients/<new-client>`
2. Edit `clients/<new-client>/brand.css` — override the tokens under `:root` with that client's
   palette and fonts. Keep `--accent-ink` at a contrast ratio of at least 4.5:1 on white, since it
   is used for body-size text.
3. Rewrite `index.html` for that client: their voice, their offerings, their proof, their contact
   block and their JSON-LD.
4. Add a card for them in `clients/index.html`.

## ElyonEdge Marketing & Sales page

**Source material** — every claim, figure and line of copy on the page comes from the client's own
documents; nothing was invented:

| Section | Source |
| --- | --- |
| Loopholes, six-stage framework | Sales Conversion Strategy Handbook |
| Audit methodology, prioritised fixes | Sales Audit & Loophole Diagnostic |
| Service pain points, messaging angles | October 2026 Content Calendar (*Service Pain-Points Reference* tab) |
| FAQ answers | FAQs — Meta Automation Set-Up Guide |
| Contact details, packages, founder bio | Keyword Automations — Meta Automation Set-Up Guide |

**Brand palette** — sampled directly from the formatting of those documents:

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#17313E` | Deep navy — header, hero, dark sections |
| `--accent` | `#C9A34E` | Gold — on dark backgrounds |
| `--accent-deep` | `#B8860B` | Gold — hover and rules |
| `--accent-ink` | `#77590A` | Gold, darkened for text on light (5.1:1) |
| `--cream` | `#F4F1E8` | Alternating section background |
| `--mist` | `#E9F2F2` | Process section background |

**Voice** — direct and evidence-led, never hyped: *"Marketing must pay for itself."* ·
*"We build systems that convert, not campaigns that perform on paper."* · *"No vanity metrics,
no guesswork."* · *"We don't sell what we haven't proven on ourselves."*

### Before this page goes live

These are deliberately unresolved, because the source documents mark them `[confirm before going
live]` or disagree with each other:

- **Email address.** The page uses `hello@elyonedge.com` (the address in the "fill in once" table of
  both Meta guides, and in the *How do we get started?* answer). The keyword-automation rules
  elsewhere list `info@elyonedge.org` and `info@elyonedge.com`. Pick one and make it consistent.
- **Second phone line, Facebook page, Google Maps pin, office hours.** All marked
  `[confirm before going live]` in the source documents, so none appear on the page. Add them to the
  contact block and JSON-LD once confirmed.
- **Result figures.** The content calendar notes *"verify current figures before publishing."* The
  Elyss and Pinehouse numbers on the page are quoted exactly as supplied.
- **DNS.** `inquiry.elyonedge.org` needs a CNAME record pointing at the Netlify site before the
  custom domain resolves. Until then the page is live on its `*.netlify.app` address.
- **Social share image.** `og:image` is not set — add one at 1200×630 when artwork is available.

## Accessibility & performance notes

- Semantic landmarks, a skip link, visible focus rings, and an accessible mobile nav and FAQ
  accordion (`aria-expanded` / `aria-controls`).
- All JavaScript is progressive enhancement — the page reads and converts with JS disabled.
- `prefers-reduced-motion` disables reveal animations and smooth scrolling.
- Google Fonts are the only external request; everything else is local.
