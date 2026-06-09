import { NAV_LINKS, navHref } from './nav'
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

export default function SiteHeader({ variant = 'about' }) {
  const { visible, atTop } = useHideOnScroll()
  const isHome = variant === 'home'

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 flex items-center justify-between',
        'px-6 pb-5 md:px-10 lg:px-16',
        'transition-transform duration-300 ease-in-out',
        visible ? 'translate-y-0' : '-translate-y-full',
        isHome ? 'pt-9' : 'border-b border-[#e5e5e5] bg-cream pt-7',
        isHome && !atTop ? 'bg-black/45 backdrop-blur-md' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <a href="/" className="shrink-0">
        <Logo className="h-16" invert={isHome} />
      </a>
      <nav className="ml-auto hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={navHref(link)}
            className={`${typeNav} transition-colors ${
              isHome ? 'text-white/95 hover:text-white' : 'text-ink/80 hover:text-ink'
            }`}
            aria-current={link === 'ABOUT' && !isHome ? 'page' : undefined}
          >
            {link}
          </a>
        ))}
      </nav>
    </header>
  )
}
