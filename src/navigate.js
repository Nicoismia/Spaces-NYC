/** Client-side navigation for SPA routes (keeps Router in sync via popstate). */
export function navigate(href) {
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
    window.location.href = href
    return
  }

  const target = new URL(href, window.location.origin)
  const next = `${target.pathname}${target.search}${target.hash}`
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (next === current) return

  window.history.pushState({}, '', next)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
