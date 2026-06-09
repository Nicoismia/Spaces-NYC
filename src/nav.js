export const NAV_LINKS = ['SERVICES', 'PORTFOLIO', 'ABOUT', 'FAQ']

export function navHref(link) {
  if (link === 'ABOUT') return '/about'
  return `/#${link.toLowerCase()}`
}
