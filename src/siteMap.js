/** Site routes and homepage sections — single source of truth for nav, footer, and sitemap. */
export const SITE_URL = 'https://spaces-nyc.com'

export const INSTAGRAM_URL = 'https://www.instagram.com/spacesphotographynyc?utm_source=qr'

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

export const FOOTER_QUICK_LINKS = [
  { label: 'Services', href: '/#services', homeHref: '#services' },
  { label: 'Portfolio', href: '/#portfolio', homeHref: '#portfolio' },
  { label: 'About', href: '/about', homeHref: '/about' },
  { label: 'Contact', href: '/#contact', homeHref: '#contact' },
]

export const FOOTER_SERVICE_AREAS = [
  {
    borough: 'Manhattan',
    areas: 'Chelsea · Tribeca · SoHo · Upper West Side · Upper East Side · Financial District',
  },
  {
    borough: 'Brooklyn',
    areas: 'Williamsburg · DUMBO · Brooklyn Heights · Park Slope · Carroll Gardens',
  },
  {
    borough: 'Queens',
    areas: 'Long Island City · Astoria · Ridgewood · Forest Hills · Bayside',
  },
  {
    borough: 'Bronx',
    areas: 'Riverdale · Mott Haven · Concourse · Highbridge',
  },
  {
    borough: 'Staten Island',
    areas: 'Residential and commercial coverage throughout Staten Island',
  },
]

export const FOOTER_SEO_LINE =
  'Serving Manhattan, Brooklyn, Queens, Bronx, and Staten Island with real estate photography, Matterport tours, floor plans, and listing media.'

export const FOOTER_COMPANY_LINKS = SITE_MAP.map((entry) => ({
  label: entry.footerLabel,
  href: entry.href,
  homeHref: entry.href.startsWith('/#') ? entry.href.replace('/#', '#') : entry.href,
}))

export function navHref(navLabel) {
  return SITE_MAP.find((entry) => entry.navLabel === navLabel)?.href ?? '/'
}
