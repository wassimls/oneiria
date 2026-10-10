/**
 * ---------------------------------------------------------------------------
 * ONEIRIA — site configuration
 * ---------------------------------------------------------------------------
 * Every contact detail, social profile and outbound link the site renders is
 * read from this file. Nothing here is invented: unfilled values stay EMPTY
 * and the UI simply does not render them.
 *
 * Editing this file is the only step needed to wire the site up for real.
 * See README.md → "Configuration" and → "Security".
 */

/** Absolute or site-relative URL of the contact form endpoint.
 *  Leave '' to disable network sending entirely (the form then shows an
 *  honest "not configured" notice instead of pretending to send).
 *
 *  Examples:
 *    'https://formspree.io/f/xxxxxxx'
 *    'https://basin.example.com/submit'
 *    '/api/contact'                      (your own same-origin handler)
 *
 *  If you use an EXTERNAL origin, also allow it in `connect-src` in
 *  index.html and in public/_headers.
 */
export const CONTACT_ENDPOINT = ''

/** HTTP method used for the contact request. */
export const CONTACT_METHOD = 'POST'

/** Social / outbound profiles. Add an object only for accounts you really own.
 *  Rendered in the footer in array order; empty array = nothing rendered.
 *  Never add a placeholder '#' link.
 */
export const SOCIAL_LINKS = []

/** Links that appear in the footer legal column. */
export const LEGAL_LINKS = []

/** Project types offered in the contact form's select. */
export const PROJECT_TYPES = [
  'brand-strategy',
  'identity-design',
  'campaign',
  'film-production',
  'social-content',
  'other',
]

/** Honeypot field name — catches naive bots without bothering people. */
export const HONEYTRAP_FIELD = 'company_website'

/** Maximum accepted message length (characters). */
export const MESSAGE_MAX_LENGTH = 4000

/**
 * Resolve a public asset path against Vite's configured base so the build can
 * be hosted from a sub-directory as well as from the domain root.
 */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`
