/** Site routes and homepage sections — single source of truth for nav, footer, and sitemap. */
export const SITE_URL = 'https://spaces-nyc.com'

export const SITE_MAP = [
  { id: 'services', navLabel: 'SERVICES', footerLabel: 'Services', href: '/#services' },
  { id: 'portfolio', navLabel: 'PORTFOLIO', footerLabel: 'Portfolio', href: '/#portfolio' },
  { id: 'about', navLabel: 'ABOUT', footerLabel: 'About', href: '/about' },
  { id: 'contact', navLabel: 'CONTACT', footerLabel: "Let's Talk", href: '/#contact' },
]

export const NAV_LINKS = SITE_MAP.map((entry) => entry.navLabel)

export const CONTACT_SECTION_ID = 'contact'
export const CONTACT_HREF = '/#contact'
export const CONTACT_HASH = '#contact'

export const FOOTER_COMPANY_LINKS = SITE_MAP.map((entry) => ({
  label: entry.footerLabel,
  href: entry.href,
  homeHref: entry.href.startsWith('/#') ? entry.href.replace('/#', '#') : entry.href,
}))

export function navHref(navLabel) {
  return SITE_MAP.find((entry) => entry.navLabel === navLabel)?.href ?? '/'
}
