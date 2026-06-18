import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { spacesBtnIcon } from './buttons'
import { NAV_LINKS, navHref } from './nav'
import { navigate } from './navigate'
import { isHomepageSectionHref, scrollToSection, sectionIdFromHref } from './scrollToSection'
import { useHideOnScroll } from './useHideOnScroll'

const typeNav = 'font-sans text-sm font-medium tracking-[0.15em] uppercase'
const MENU_EASE = [0.22, 1, 0.36, 1]
const MENU_DURATION = 0.55

const MENU_LINK_STAGGER = {
  SERVICES: 0.08,
  PORTFOLIO: 0.14,
  ABOUT: 0.2,
  CONTACT: 0.26,
}

const MENU_LINK_EXIT_STAGGER = {
  SERVICES: 0.18,
  PORTFOLIO: 0.12,
  ABOUT: 0.06,
  CONTACT: 0,
}

const menuMotion = {
  duration: MENU_DURATION,
  ease: MENU_EASE,
}

const menuBackdropVariants = {
  initial: { opacity: 0, y: -24 },
  open: { opacity: 1, y: 0 },
  closed: {
    opacity: 0,
    y: -24,
    transition: { ...menuMotion, when: 'afterChildren' },
  },
}

const menuLinkVariants = {
  initial: { opacity: 0, x: 30 },
  open: ({ open }) => ({
    opacity: 1,
    x: 0,
    transition: { ...menuMotion, delay: open },
  }),
  closed: ({ closed }) => ({
    opacity: 0,
    x: 30,
    transition: { ...menuMotion, delay: closed },
  }),
}

function Logo({ className = 'h-6', invert = false }) {
  return (
    <img
      src="/spaces-logo.png"
      alt="spaces nyc"
      className={`${className} w-auto object-contain ${invert ? 'brightness-0 invert' : 'brightness-0'}`}
    />
  )
}

function IconMenu({ className = 'h-8 w-8' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function IconClose({ className = 'h-8 w-8' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export default function SiteHeader({ variant = 'about' }) {
  const { visible, atTop } = useHideOnScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMenuAnimating, setIsMenuAnimating] = useState(false)
  const pendingActionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isHome = variant === 'home'

  const menuTransition = shouldReduceMotion ? { duration: 0 } : menuMotion

  const runAfterClose = (action) => {
    if (!action) return

    if (!menuOpen) {
      action()
      return
    }

    pendingActionRef.current = action
    setIsMenuAnimating(true)
    setMenuOpen(false)
  }

  const openMenu = () => {
    if (menuOpen || isMenuAnimating) return
    pendingActionRef.current = null
    setMenuOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeMenu = (afterClose) => {
    if (!menuOpen || isMenuAnimating) return
    pendingActionRef.current = afterClose ?? null
    setIsMenuAnimating(true)
    setMenuOpen(false)
  }

  const handleMenuExitComplete = () => {
    setIsMenuAnimating(false)

    if (!menuOpen) {
      document.body.style.overflow = ''
      const pending = pendingActionRef.current
      pendingActionRef.current = null
      pending?.()
    }
  }

  const handleMenuButtonClick = (event) => {
    event.stopPropagation()

    if (menuOpen) {
      closeMenu()
      return
    }

    openMenu()
  }

  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(
    () => () => {
      document.body.style.overflow = ''
    },
    [],
  )

  const navLinkClass = isHome ? 'text-white/95 hover:text-white' : 'text-ink/80 hover:text-ink'

  const handleNavClick = (event, link) => {
    event.preventDefault()
    const href = navHref(link)

    runAfterClose(() => {
      if (isHomepageSectionHref(href)) {
        if (isHome) {
          scrollToSection(sectionIdFromHref(href))
          return
        }

        navigate(href)
        return
      }

      navigate(href)
    })
  }

  return (
    <header
      className={[
        'site-header',
        isHome ? 'site-header--home' : 'site-header--about',
        isHome && menuOpen ? 'site-header--menu-open' : '',
        'fixed inset-x-0 top-0 z-50 flex items-center justify-between',
        'px-6 pb-5 md:px-10 lg:px-16',
        'transition-transform duration-300 ease-in-out',
        visible ? 'translate-y-0' : '-translate-y-full',
        isHome ? 'pt-9' : 'border-b border-[#e5e5e5] bg-cream pt-7',
        isHome && !atTop && !menuOpen ? 'bg-black/45 backdrop-blur-md' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <a href="/" className="site-header__logo shrink-0">
        <Logo className="h-16" invert={isHome} />
      </a>

      <nav className="relative ml-auto hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={navHref(link)}
            className={`${typeNav} transition-colors ${navLinkClass}`}
            aria-current={link === 'ABOUT' && !isHome ? 'page' : undefined}
            onClick={(event) => handleNavClick(event, link)}
          >
            {link}
          </a>
        ))}
      </nav>

      {isHome &&
        createPortal(
          <AnimatePresence onExitComplete={handleMenuExitComplete}>
            {menuOpen && (
              <motion.div
                key="mobile-menu-panel"
                className="site-header__mobile-menu pointer-events-none fixed inset-x-0 top-0 bg-black/55 backdrop-blur-md md:hidden"
                variants={menuBackdropVariants}
                initial="initial"
                animate="open"
                exit="closed"
                transition={menuTransition}
              >
                <nav className="site-header__mobile-nav pointer-events-auto flex flex-col px-6 pb-5">
                  {NAV_LINKS.map((link) => (
                    <motion.a
                      key={link}
                      href={navHref(link)}
                      custom={{
                        open: MENU_LINK_STAGGER[link] ?? 0,
                        closed: MENU_LINK_EXIT_STAGGER[link] ?? 0,
                      }}
                      variants={menuLinkVariants}
                      initial="initial"
                      animate="open"
                      exit="closed"
                      className={`${typeNav} border-b border-white/10 py-4 text-white/95 transition-colors last:border-b-0 hover:text-white`}
                      onClick={(event) => handleNavClick(event, link)}
                    >
                      {link}
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      {isHome && (
        <button
          type="button"
          className={`site-header__menu-toggle ${spacesBtnIcon} spaces-btn-icon -mr-1 ml-auto flex h-12 min-h-12 w-12 min-w-12 cursor-pointer items-center justify-center text-white md:hidden`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={handleMenuButtonClick}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      )}
    </header>
  )
}
