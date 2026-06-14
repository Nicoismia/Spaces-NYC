const SCROLL_DURATION_MS = 600
const HEADER_EXTRA_OFFSET_PX = 20

let activeAnimation = null

/** Ease-out cubic — quick start, clean settle, no overshoot. */
function easeOutCubic(progress) {
  return 1 - (1 - progress) ** 3
}

export function getScrollOffset() {
  const header = document.querySelector('.site-header')
  const headerHeight = header ? header.getBoundingClientRect().height : 0
  return headerHeight + HEADER_EXTRA_OFFSET_PX
}

export function scrollToSection(sectionId, { duration = SCROLL_DURATION_MS, updateHash = true } = {}) {
  const id = String(sectionId).replace(/^#/, '')
  const target = document.getElementById(id)
  if (!target) return false

  if (activeAnimation !== null) {
    cancelAnimationFrame(activeAnimation)
    activeAnimation = null
  }

  const startY = window.scrollY
  const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - getScrollOffset())
  const distance = targetY - startY

  if (Math.abs(distance) < 1) {
    if (updateHash) {
      history.replaceState(null, '', `#${id}`)
    }
    return true
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, targetY)
    if (updateHash) {
      history.replaceState(null, '', `#${id}`)
    }
    return true
  }

  const startTime = performance.now()

  const tick = (now) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeOutCubic(progress)

    window.scrollTo(0, startY + distance * eased)

    if (progress < 1) {
      activeAnimation = requestAnimationFrame(tick)
      return
    }

    activeAnimation = null
    if (updateHash) {
      const hash = `#${id}`
      if (window.location.hash !== hash) {
        history.replaceState(null, '', hash)
      }
    }
  }

  activeAnimation = requestAnimationFrame(tick)
  return true
}

export function handleHomeSectionNav(event, sectionId, { onAfterNavigate } = {}) {
  event.preventDefault()
  scrollToSection(sectionId)
  onAfterNavigate?.()
}

export function isHomepageSectionHref(href) {
  return href.startsWith('/#') || (href.startsWith('#') && href.length > 1)
}

export function sectionIdFromHref(href) {
  if (href.startsWith('/#')) return href.slice(2)
  if (href.startsWith('#')) return href.slice(1)
  return null
}
