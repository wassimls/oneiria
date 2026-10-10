# Oneiria — marketing agency & content creation studio

A single-page marketing site for **Oneiria** ("Ideas into Worlds"), built as a static,
deployable bundle. English and Arabic, with full right-to-left layout.

- **Stack:** React 19 · Vite 8 · Tailwind CSS v4
- **Output:** a fully static `dist/` — no server, no database, no third-party scripts
- **Fonts and images:** self-hosted, so the site makes **zero third-party requests**

---

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production bundle in ./dist
npm run preview  # serve the built bundle locally
```

Node 20.19+ (or any current LTS) is required.

---

## Project layout

```
index.html               Document shell: CSP, metadata, JSON-LD, font stylesheet
public/
  favicon.svg            The aperture mark, also used as the app icon
  apple-touch-icon.png   180×180 PNG icon
  site.webmanifest       Web app manifest
  robots.txt             Crawler rules (no sitemap yet — see Deployment)
  _headers               Security headers for Netlify-style hosts
  fonts/                 Self-hosted Poppins, Inter and Cairo (+ fonts.css)
  images/                Photography and concept artwork used by the site
src/
  main.jsx               React entry point
  App.jsx                Section order for the whole page
  styles/index.css       Design system: tokens, base, components, animations
  config/site.js         ALL editable site configuration lives here
  i18n/                  English and Arabic copy + the locale provider
  components/            One file per section, plus shared primitives
tools/                   Regenerable asset pipelines and the static file server
```

### Sections

Header/nav · Hero · Capability ticker · Who we are · Services · Selected work
(filters + project dialog) · Process · Why Oneiria · Originals · Technology &
responsible AI · Oneiria Lab · Who we work with · FAQ · Contact · Footer

---

## Configuration

Everything the site can be "pointed at" lives in **`src/config/site.js`**. No code
changes are needed to go live — fill in the values and rebuild.

| Value | Default | What it does |
| --- | --- | --- |
| `CONTACT_ENDPOINT` | `''` | Where the contact form posts. Empty = sending disabled. |
| `CONTACT_METHOD` | `'POST'` | HTTP method for that request. |
| `SOCIAL_LINKS` | `[]` | Footer links, in the shape `{ label, href }`. |
| `LEGAL_LINKS` | `[]` | Footer legal links, same shape. |
| `PROJECT_TYPES` | 6 keys | Options in the contact form's project-type select. |
| `HONEYTRAP_FIELD` | `'company_website'` | Hidden field used to trap naive bots. |
| `MESSAGE_MAX_LENGTH` | `4000` | Upper bound on the message field. |

Empty arrays render nothing — there are no placeholder `#` links and no invented
email addresses anywhere on the site.

### Connecting the contact form

Until `CONTACT_ENDPOINT` is set, submitting the form validates the fields and then
shows this notice instead of pretending to send:

> *This form is not connected to a mailbox yet, so nothing will be sent.*

To enable it, point `CONTACT_ENDPOINT` at any service that accepts a JSON `POST`:

```js
// src/config/site.js
export const CONTACT_ENDPOINT = 'https://formspree.io/f/xxxxxxxx'
```

The payload sent is:

```json
{
  "name": "…",
  "email": "…",
  "company": "…",
  "projectType": "brand-strategy",
  "message": "…"
}
```

**Important:** an external form provider is a different origin. Add it to
`connect-src` in **both** places, or the browser will block the request:

1. the `Content-Security-Policy` `<meta>` tag in `index.html`
2. the `Content-Security-Policy` header in `public/_headers`

```
connect-src 'self' https://formspree.io
```

---

## Security

The site is deliberately conservative: a static bundle with no third-party
JavaScript, no trackers, no web fonts from a CDN and no inline event handlers.

### Content Security Policy

Delivered twice, on purpose:

- a `<meta http-equiv="Content-Security-Policy">` in `index.html`, so the policy
  applies on **any** host, including plain static file servers
- a `Content-Security-Policy` **header** in `public/_headers`, which additionally
  carries `frame-ancestors`

`frame-ancestors` is only meaningful as a header — browsers ignore it inside a
`<meta>` tag and log a console error, which is why it is absent from the meta tag.

The baseline policy is:

```
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none';          /* header only */
img-src 'self' data:;
font-src 'self';
style-src 'self' 'unsafe-inline';
script-src 'self';
connect-src 'self';
form-action 'self';
manifest-src 'self';
```

`style-src 'unsafe-inline'` is required by React, which writes inline `style`
attributes (reveal delays, icon sizes). It does not allow inline `<style>` blocks
or remote stylesheets.

### Other headers (`public/_headers`)

| Header | Value | Why |
| --- | --- | --- |
| `X-Content-Type-Options` | `nosniff` | Stops MIME sniffing of scripts and styles. |
| `X-Frame-Options` | `DENY` | Clickjacking defence (legacy pair of `frame-ancestors`). |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | No leaking of full URLs off-site. |
| `Permissions-Policy` | camera, mic, geo, payment, usb… all `()` | The site needs none of them. |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates the browsing context. |
| `Cross-Origin-Resource-Policy` | `same-origin` | Assets are not for embedding elsewhere. |
| `Cross-Origin-Embedder-Policy` | `require-corp` | Enables cross-origin isolation. |
| `Strict-Transport-Security` | 1 year, includeSubDomains, preload | HTTPS only. |
| `*.woff2` | immutable, 1 year cache | Fonts are content-hashed by the pipeline. |

`_headers` is honoured by Netlify, Cloudflare Pages, Render and several others.
For nginx, S3/CloudFront or IIS, translate the same list into that platform's
config — see the comments in the file.

### Form hardening

- **Honeypot field** (`company_website`) is rendered off-screen and `tabindex="-1"`;
  if a bot fills it, the submission is dropped before any network request.
- **No inline handlers, no `eval`, no third-party scripts.** The CSP would block them.
- **Validation happens client-side for feedback only.** Whatever endpoint you connect
  must validate again server-side and add its own rate limiting and spam filtering.
- The form never renders a success state it cannot back up: network failures show a
  clear error and keep the message in the field.

### Dependency and supply chain

- `npm run build` produces a static bundle; the deployed site does not execute npm
  code at runtime.
- Fonts were downloaded once and are served from `public/fonts/`. No font CDN, no
  `font-display` jank from the network, no third-party cookie surface.
- Re-run `node tools/fetch-fonts.mjs` only if you deliberately want to refresh them,
  then audit the diff.

---

## Content policy

The brief for this site was explicit, and the copy follows it:

- **No invented facts.** There are no fabricated clients, partners, testimonials,
  awards, statistics, offices, team members or prices anywhere in the site.
- **Work is labelled.** Every project card carries a *Concept Study*,
  *Creative Exploration* or *Speculative Campaign* badge, and the project dialog
  states plainly that it is self-initiated and implies no client. The footer repeats
  this disclosure.
- **Oneiria Lab is a future initiative**, not a live service. It is marked with a
  "Future initiative" status pill and worded in the future tense throughout.
- **AI is a supporting tool, never the author.** The Technology section says so
  explicitly, and commits to disclosing when AI-assisted tooling materially shaped
  a deliverable.
- **The contact form publishes no email address.** Contact happens through the form.

When real case studies, real links or real contact channels exist, add them to
`src/config/site.js` and to the copy in `src/i18n/`.

---

## Internationalisation

- Two locales ship: `en` (LTR) and `ar` (RTL), with identical key structures in
  `src/i18n/en.js` and `src/i18n/ar.js`.
- The choice is remembered in `localStorage` and reflected in
  `<html lang>` and `<html dir>`, so browsers and assistive technology pick the
  right reading direction immediately.
- First visit defaults to Arabic if the browser asks for it, otherwise English.
- Arabic swaps the whole font stack to **Cairo** and uses looser leading and no
  letter-spacing, so headings keep their rhythm in both scripts.
- Logical CSS properties (`inline-start/end`, `padding-inline`, `margin-block`)
  are used throughout, so mirroring is automatic rather than patched per element.

To add a language, copy `src/i18n/en.js`, translate it, and register it in
`src/i18n/LocaleContext.jsx`.

---

## Accessibility

Verified with Lighthouse: **Accessibility 97 · Best Practices 100 · SEO 100**.

- Skip link, landmark elements, one `h1`, labelled form controls, `aria-live`
  status region on the contact form.
- The mobile menu and the project dialog both trap focus, close on `Escape`, and
  return focus to the control that opened them.
- The closed drawer is `inert`, `aria-hidden` and `visibility: hidden` — it cannot
  be reached by keyboard or screen reader.
- Visible focus ring on every interactive element, including on dark surfaces.
- Text colours were audited against their backgrounds: all body and label text
  clears WCAG AA (4.5:1) on white and on Astral White.
- `prefers-reduced-motion: reduce` disables the marquee, the aperture spin, the
  scroll reveals and smooth scrolling. Without the media query, reveals also
  degrade to "show immediately" if `IntersectionObserver` is unavailable.
- No custom cursor, no scroll hijacking, no preloader, no autoplaying media.

---

## Design system

Tokens live in `src/styles/index.css` under `@theme`.

| Token | Value | Role |
| --- | --- | --- |
| `--color-space` | `#101A36` | Deep Space Navy — primary dark surface |
| `--color-dream` | `#8751E9` | Luminous Dream Purple — primary accent |
| `--color-nebula` | `#6158F5` | Vibrant Nebula Blue — secondary accent |
| `--color-astral` | `#F6F5F2` | Astral White — primary light surface |
| `--color-meteor` | `#6A6D75` | Meteor Gray — muted text (darkened from the brand `#85878e` to clear WCAG AA) |
| `--color-white` | `#FFFFFF` | Cards and panels |

Type is set in **Poppins** (display), **Inter** (body) and **Cairo** (Arabic),
all self-hosted. Sizes use a fluid `clamp()` scale from `--step--2` to `--step-6`,
so nothing needs a breakpoint to stay readable.

The aperture mark is a single `evenodd` SVG path
(`src/components/Mark.jsx`), reused as the favicon, the app icon, the wordmark's
letter "O" and the decorative motif in the dark sections.

### CSS layering

Styles are organised into Tailwind's cascade layers:

- `@theme` — design tokens
- `@layer base` — element resets (`html`, `body`, headings, `a`, `img`, `button`)
- `@layer components` — the design system classes
- utilities — Tailwind, which therefore always wins over the two layers above

Only four rules are intentionally left unlayered, because they must never lose:
`html[dir='rtl']` font tokens, `::selection`, `:focus-visible` and
`.on-dark :focus-visible`.

---

## Assets

The photography and concept artwork in `public/images/` is generated from the
supplied brand boards by `tools/make-images.ps1`, so it can be rebuilt or swapped.

| File | Use |
| --- | --- |
| `hero-filmset.jpg` | Hero background |
| `studio-team.jpg` | "Who we are" |
| `work-*.jpg` | The six project cards and the Originals section |

All images carry explicit `width`/`height`, below-the-fold ones are
`loading="lazy"`, and none of them are upscaled beyond their source resolution.

Fonts are in `public/fonts/` with a plain `@font-face` sheet at
`public/fonts/fonts.css`. Only the weights actually used are shipped.

### Local preview server

`node tools/serve.mjs <directory> <port>` is a dependency-free static file server
used during development and for manual testing.

---

## Deployment

`npm run build` writes a static bundle to `dist/`. It can be hosted anywhere that
serves files.

1. Build.
2. Upload `dist/` as the web root.
3. Apply the headers from `public/_headers` in your host's configuration.
4. Point `CONTACT_ENDPOINT` at your form backend and allow it in `connect-src`.

Two small notes:

- `vite.config.js` sets `base: './'`, so the site also works from a
  sub-directory (for example `https://example.com/oneiria/`).
- **`robots.txt` has no sitemap directive yet**, because the final domain is not
  decided. Add `Sitemap: https://your-domain/sitemap.xml` once it is, and publish
  a matching `sitemap.xml`.
- `og:image` is a relative path for the same reason. Replace it with an absolute
  URL in `index.html` once the domain is known.

---

## Known limitations

- The contact form is inert until `CONTACT_ENDPOINT` is configured.
- Social and legal footer links stay hidden until real URLs are supplied.
- Lighthouse reports a `color-contrast` warning on the hero headline. That text is
  filled with a brand gradient via `background-clip: text` (transparent text
  colour), which the auditor cannot evaluate; the actual gradient stops clear the
  3:1 requirement for display-size text.
