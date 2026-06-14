import { useEffect, useState } from 'react'
import { spacesBtnIcon } from './buttons'
import { NAV_LINKS, navHref } from './nav'
import { handleHomeSectionNav, isHomepageSectionHref, sectionIdFromHref } from './scrollToSection'
import { useHideOnScroll } from './useHideOnScroll'

const typeNav = 'font-sans text-sm font-medium tracking-[0.15em] uppercase'

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
  const isHome = variant === 'home'

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const navLinkClass = isHome ? 'text-white/95 hover:text-white' : 'text-ink/80 hover:text-ink'

  const closeMenu = () => setMenuOpen(false)

  const handleNavClick = (event, link) => {
    const href = navHref(link)

    if (isHome && isHomepageSectionHref(href)) {
      handleHomeSectionNav(event, sectionIdFromHref(href), { onAfterNavigate: closeMenu })
      return
    }

    closeMenu()
  }

  return (
    <header
      className={[
        'site-header',
        isHome ? 'site-header--home' : 'site-header--about',
        'fixed inset-x-0 top-0 z-50 flex items-center justify-between',
        'px-6 pb-5 md:px-10 lg:px-16',
        'transition-transform duration-300 ease-in-out',
        visible ? 'translate-y-0' : '-translate-y-full',
        isHome ? 'pt-9' : 'border-b border-[#e5e5e5] bg-cream pt-7',
        isHome && !atTop ? 'bg-black/45 backdrop-blur-md' : '',
        isHome && menuOpen ? 'bg-black/80 backdrop-blur-md' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <a href="/" className="site-header__logo shrink-0">
        <Logo className="h-16" invert={isHome} />
      </a>

      <nav className="ml-auto hidden items-center gap-8 md:flex">
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

      {isHome && (
        <button
          type="button"
          className={`site-header__menu-toggle spaces-btn spaces-btn-icon -mr-1 ml-auto h-11 w-11 text-white md:hidden`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      )}

      {isHome && menuOpen && (
        <div className="site-header__mobile-menu absolute inset-x-0 top-full border-t border-white/10 bg-black/90 backdrop-blur-md md:hidden">
          <nav className="flex flex-col px-6 py-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={navHref(link)}
                className={`${typeNav} border-b border-white/10 py-4 text-white/95 transition-colors last:border-b-0 hover:text-white`}
                onClick={(event) => handleNavClick(event, link)}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
