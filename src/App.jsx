import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SiteHeader from './SiteHeader'
import { spacesBtn, spacesBtnIcon, typeBtnShadow, typeBtnShadowLight, typeBtnSize } from './buttons'
import {
  COMPANY_EMAIL,
  COMPANY_EMAIL_DISPLAY,
  COMPANY_PHONE_DISPLAY,
  companyMailto,
  companyTel,
} from './contact'
import { useTallyPopup } from './TallyPopup'
import { CONTACT_SECTION_ID, FOOTER_QUICK_LINKS, FOOTER_SERVICE_AREAS, FOOTER_SEO_LINE, INSTAGRAM_URL } from './siteMap'
import { navigate } from './navigate'
import { useContactModal } from './ContactModal'
import { useTransformCarousel } from './useCarouselSwipe'
import { guardCarouselTap } from './carouselDragGuard'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const typeHeroH1 =
  'font-sans text-[1.95rem] font-medium leading-[0.99] tracking-tight md:text-[2.65rem] lg:text-[3.3rem]'
const typeSectionH2 =
  'font-sans text-[1.2rem] font-medium leading-[0.99] tracking-tight md:text-[1.6rem] lg:text-[2rem]'
const typeCardTitle =
  'font-sans text-[0.8rem] font-medium leading-[1.1] tracking-[0.15em] uppercase md:text-[1.05rem] lg:text-[1.3rem]'
const typeBody = 'font-sans text-[17px] font-normal leading-relaxed md:text-[19px]'
const typeBodySm = 'font-sans text-sm font-normal leading-relaxed'
const typeLabel = 'font-sans text-xs font-medium tracking-[0.2em] uppercase'
const typeBtn = spacesBtn

function SectionLabel({ children, className = '', light = false }) {
  return (
    <p className={`mb-6 ${typeLabel} ${light ? 'text-white/80' : 'text-label'} ${className}`}>
      {children}
    </p>
  )
}

function SectionHeadline({ children, className = '', as: Tag = 'h2', light = false }) {
  return (
    <Tag className={`${typeSectionH2} ${light ? 'text-white/92' : 'text-ink'} ${className}`}>
      {children}
    </Tag>
  )
}

function FadeIn({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function IconClock({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function IconCamera({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}

function IconCube({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  )
}

function IconBuilding({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 6h.01M9 10h.01M9 14h.01M9 18h.01M15 6h.01M15 10h.01M15 14h.01M15 18h.01" />
    </svg>
  )
}

function IconCheck({ className = 'size-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function IconArrowRight({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function IconPlay({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function IconInstagram({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconMail({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconPhone({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconX({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

const FEATURES = [
  { icon: IconClock, title: '24 HOUR DELIVERY', desc: "Fast turnaround for NYC's fast pace." },
  { icon: IconCamera, title: 'HIGH QUALITY MEDIA', desc: 'Crisp, true-to-life images that stand out.' },
  { icon: IconCube, title: 'MATTERPORT 3D TOURS', desc: 'Engaging tours that help listings get noticed.' },
  { icon: IconBuilding, title: 'NYC SPECIALISTS', desc: 'We know NYC spaces inside and out.' },
]

const PACKAGES = [
  {
    title: 'PHOTO ONLY',
    price: '$199',
    features: ['10–15 HDR Photos', 'Professional Editing', '24 Hour Delivery'],
    useCase: 'Everything you need to get a listing online quickly with polished, MLS-ready images.',
    popular: false,
  },
  {
    title: 'PHOTO + MATTERPORT',
    price: '$349',
    features: ['Everything in Photo Only', 'Matterport 3D Tour', 'Branded Marketing Page'],
    useCase: 'Our most requested package. Great for listings where an immersive walkthrough can help generate more interest.',
    popular: true,
  },
  {
    title: 'PHOTO + MATTERPORT + FLOOR PLAN',
    price: '$449',
    features: ['Everything in Photo + Matterport', '2D Floor Plan', 'Property Website'],
    useCase: 'Everything needed to showcase a property online, including photos, a 3D tour, and a clear floor plan.',
    popular: false,
  },
]

const PORTFOLIO = [
  '/portfolio/tribeca-penthouse.png',
  '/portfolio/chelsea-loft.png',
  '/portfolio/dumbo-loft.png',
  '/portfolio/ues-residence.png',
  '/portfolio/williamsburg-studio.png',
  '/portfolio/west-village-studio.png',
  '/portfolio/hudson-yards-residence.png',
  '/portfolio/townhouse-hallway.png',
]

function Logo({ className = 'h-6', invert = false }) {
  return (
    <img
      src="/spaces-logo.png"
      alt="spaces nyc"
      className={`${className} w-auto object-contain ${invert ? 'brightness-0 invert' : ''}`}
    />
  )
}

function AnimatedCTAButton({ className = '', children, ...props }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: [0, -3, 0],
              scale: [1, 1.025, 1],
              boxShadow: [
                '0 0 0 rgba(0,0,0,0)',
                '0 10px 28px rgba(0,0,0,0.12)',
                '0 0 0 rgba(0,0,0,0)',
              ],
            }
      }
      transition={
        shouldReduceMotion
          ? undefined
          : {
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
              repeat: Infinity,
              repeatDelay: 2.6,
            }
      }
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  )
}

function HeroTallyButton({ className = '' }) {
  const { openTallyPopup } = useTallyPopup()
  const shouldReduceMotion = useReducedMotion()
  const buttonRef = useRef(null)
  const [ripples, setRipples] = useState([])
  const [isBouncing, setIsBouncing] = useState(false)
  const classNames = `${typeBtn} ${typeBtnSize} hero-tally-btn spaces-btn relative overflow-visible select-none tracking-[0.04em] text-white ${className}`

  const handlePress = () => {
    if (!shouldReduceMotion) {
      const id = `${Date.now()}-${Math.random()}`
      setRipples((prev) => [...prev, id])
      window.setTimeout(() => setRipples((prev) => prev.filter((r) => r !== id)), 650)

      setIsBouncing(true)
      window.setTimeout(() => setIsBouncing(false), 400)
    }

    openTallyPopup(buttonRef.current)
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      className={classNames}
      onClick={handlePress}
      animate={
        shouldReduceMotion || !isBouncing
          ? undefined
          : { scale: [1, 0.96, 1.02, 1] }
      }
      transition={
        shouldReduceMotion
          ? undefined
          : { duration: 0.35, times: [0, 0.2, 0.6, 1], ease: [0.34, 1.45, 0.64, 1] }
      }
    >
      {!shouldReduceMotion &&
        ripples.map((id) => (
          <motion.span
            key={id}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/35"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      Schedule a Shoot
      <IconArrowRight className="shrink-0 text-white" />
    </motion.button>
  )
}

function HeroContactButton({ className = '' }) {
  const { openContactModal } = useContactModal()

  return (
    <button
      type="button"
      onClick={openContactModal}
      className={`${typeBtn} ${typeBtnSize} spaces-btn inline-flex items-center select-none border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-[transform,box-shadow,background-color,border-color] duration-[250ms] hover:border-white/40 hover:bg-white/15 ${className}`}
    >
      Let&apos;s Talk
      <IconPhone />
    </button>
  )
}

function PortfolioLightbox({ items, activeIndex, onClose, onPrev, onNext }) {
  const shouldReduceMotion = useReducedMotion()
  const item = items[activeIndex]

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, onNext, onPrev])

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute inset-0 cursor-default bg-black/80"
            onClick={onClose}
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`${spacesBtnIcon} absolute right-5 top-5 z-20 h-10 w-10 bg-white/10 text-white hover:bg-white/20`}
          >
            <IconX className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className={`${spacesBtnIcon} spaces-btn-icon--centered absolute left-4 top-1/2 z-20 h-11 w-11 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 md:left-8`}
          >
            <IconArrowRight className="h-5 w-5 rotate-180" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className={`${spacesBtnIcon} spaces-btn-icon--centered absolute right-4 top-1/2 z-20 h-11 w-11 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 md:right-8`}
          >
            <IconArrowRight className="h-5 w-5" />
          </button>

          <motion.figure
            key={item}
            className="relative z-10 w-full max-w-6xl"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={item}
              alt="Portfolio photograph"
              className="max-h-[82vh] w-full rounded-xl object-contain"
            />
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function CarouselSwipeHints() {
  return (
    <div className="carousel-swipe-hints" aria-hidden="true">
      <span className="carousel-swipe-hint carousel-swipe-hint--left">‹</span>
      <span className="carousel-swipe-hint carousel-swipe-hint--right">›</span>
    </div>
  )
}

function PortfolioGallery({ items }) {
  const trackRef = useRef(null)
  useTransformCarousel(trackRef, { slideSelector: '[data-portfolio-card]' })
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const closeLightbox = () => setLightboxIndex(null)

  const showPrev = () => {
    setLightboxIndex((index) => (index === null ? null : (index - 1 + items.length) % items.length))
  }

  const showNext = () => {
    setLightboxIndex((index) => (index === null ? null : (index + 1) % items.length))
  }

  return (
    <div className="portfolio-gallery relative mx-auto w-full max-w-[1360px]">
      <div className="portfolio-gallery__track carousel-viewport relative w-full">
        <CarouselSwipeHints />
        <div ref={trackRef} className="carousel-track portfolio-scroll w-full">
          {items.map((image, index) => (
            <button
              key={image}
              type="button"
              data-portfolio-card
              onClick={(event) => {
                if (guardCarouselTap(event)) return
                setLightboxIndex(index)
              }}
              className="group relative shrink-0 snap-center overflow-hidden rounded-[14px] bg-neutral-100"
            >
              <img
                src={image}
                alt="Portfolio photograph"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <PortfolioLightbox
          items={items}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </div>
  )
}

function HeroFeatureRotator({ features }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)

  useTransformCarousel(trackRef, {
    slideSelector: '.hero-info-card',
    index: activeIndex,
    onIndexChange: setActiveIndex,
  })

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % features.length)
    }, 5000)

    return () => window.clearInterval(id)
  }, [features.length])

  return (
    <div className="feature-bar feature-bar--mobile absolute bottom-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-sm">
      <div className="hero-info-rotator mx-auto w-[86vw] max-w-[86vw] pt-5">
        <div className="hero-info-rotator__viewport carousel-viewport">
          <div ref={trackRef} className="carousel-track hero-feature-track">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isActive = index === activeIndex

              return (
                <div
                  key={feature.title}
                  className="hero-info-card hero-info-card--rotating flex items-start gap-4"
                  aria-hidden={!isActive}
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                  <div className="min-w-0">
                    <p className={`${typeLabel} text-white`}>{feature.title}</p>
                    <p className={`mt-1 text-white/75 ${typeBodySm}`}>{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="hero-info-dots" aria-hidden="true">
        {features.map((f, i) => (
          <span key={f.title} className={i === activeIndex ? 'is-active' : undefined} />
        ))}
      </div>
    </div>
  )
}

function HeroFeatureBar({ features }) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  )

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)')
    const onChange = () => setIsMobile(mobileQuery.matches)

    onChange()
    mobileQuery.addEventListener('change', onChange)
    return () => mobileQuery.removeEventListener('change', onChange)
  }, [])

  if (isMobile) {
    return <HeroFeatureRotator features={features} />
  }

  return (
    <div className="feature-bar absolute bottom-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-sm">
      <div className="feature-bar__grid hero-info-grid mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <FadeIn key={f.title} delay={i * 0.08} className="hero-info-card flex items-start gap-4 px-6 py-6 md:px-8">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
              <div>
                <p className={`${typeLabel} text-white`}>{f.title}</p>
                <p className={`mt-1 text-white/75 ${typeBodySm}`}>{f.desc}</p>
              </div>
            </FadeIn>
          )
        })}
      </div>
    </div>
  )
}

function PackageCard({ pkg, index, className = '' }) {
  return (
    <FadeIn delay={index * 0.1} className="h-full w-full">
      <article
        className={`package-card group relative flex w-full flex-col ${className}`}
      >
        <div className="package-card__title min-w-0">
          <p className={`${typeCardTitle} text-label`}>{pkg.title}</p>
        </div>

        <p className="package-card__price font-sans text-4xl font-medium tracking-tight text-ink lg:text-5xl">{pkg.price}</p>

        <div className="package-card__divider border-t border-[rgba(0,0,0,0.08)]" />

        <div className="package-card__bottom flex min-h-0 flex-1 flex-col">
          <div className="package-card__content">
            <p className={`package-card__includes ${typeLabel} text-label`}>Includes</p>
            <ul className="package-card__list">
              {pkg.features.map((f) => (
                <li key={f} className="flex min-w-0 items-start gap-3">
                  <IconCheck className="mt-0.5 size-4 shrink-0 text-ink" />
                  <span className={`min-w-0 text-muted ${typeBodySm}`}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="package-card__footer shrink-0 border-t border-[rgba(0,0,0,0.08)]">
            <p className={`text-muted ${typeBodySm}`}>{pkg.useCase}</p>
            {/* Service detail pages will be added later */}
          </div>
        </div>
      </article>
    </FadeIn>
  )
}

function ServicesTallyButton({ className, children }) {
  const { openTallyPopup } = useTallyPopup()

  return (
    <AnimatedCTAButton
      type="button"
      className={className}
      onClick={(event) => openTallyPopup(event.currentTarget)}
    >
      {children}
    </AnimatedCTAButton>
  )
}

const servicesTallyBtnClass = `${typeBtn} ${typeBtnSize} ${typeBtnShadow} bg-ink text-white tracking-[0.06em] hover:bg-neutral-800`

function PackagesSection({ packages }) {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useTransformCarousel(trackRef, {
    slideSelector: '.package-carousel-slide',
    onIndexChange: setActiveIndex,
  })

  return (
    <section id="services" className="services-section bg-cream px-6 pt-14 pb-6 md:px-10 md:pt-16 md:pb-10 lg:pt-20 lg:pb-12">
      <div className="services-section__inner mx-auto w-full max-w-[1200px]">
        <FadeIn>
          <div className="services-header mb-12 md:mb-14 lg:mb-16">
            <div className="services-header__row flex flex-col md:grid md:grid-cols-3 md:items-center md:gap-8">
              <div className="services-header__headline min-w-0 md:col-span-2">
                <SectionHeadline className="services-section__headline">
                  Simple Packages.{' '}
                  <br className="services-section__headline-break" />
                  Everything you need.
                </SectionHeadline>
              </div>
              <ServicesTallyButton
                className={`services-header__cta ${servicesTallyBtnClass} hidden shrink-0 md:inline-flex md:col-start-3 md:justify-self-end`}
              >
                Check Availability
                <IconArrowRight className="h-4 w-4" />
              </ServicesTallyButton>
            </div>
          </div>
        </FadeIn>

        <div className="services-packages">
          <div className="package-carousel-viewport carousel-viewport">
            <CarouselSwipeHints />
            <div
              ref={trackRef}
              className="carousel-track package-carousel package-grid grid grid-cols-1 gap-8 md:grid-cols-3"
            >
          {packages.map((pkg, i) => (
            <div key={pkg.title} className={`package-carousel-slide${i === activeIndex ? ' is-active' : ''}`}>
              <div className="package-badge-slot">
                <span
                  className={`package-carousel-badge ${typeLabel} ${
                    pkg.popular ? 'package-carousel-badge--visible bg-ink text-white' : 'package-carousel-badge--placeholder'
                  }`}
                  aria-hidden={!pkg.popular}
                >
                  MOST POPULAR
                </span>
              </div>
              <PackageCard pkg={pkg} index={i} className="package-carousel-card" />
            </div>
          ))}
            </div>
          </div>

          <div className="package-carousel-dots" aria-hidden="true">
            {packages.map((pkg, i) => (
              <span key={pkg.title} className={i === activeIndex ? 'is-active' : undefined} />
            ))}
          </div>
        </div>

        <ServicesTallyButton
          className={`services-mobile-cta ${servicesTallyBtnClass} w-full justify-center md:hidden`}
        >
          Check Availability
          <IconArrowRight className="h-4 w-4" />
        </ServicesTallyButton>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="homepage min-h-screen bg-cream font-sans font-normal text-ink antialiased">
      <SiteHeader variant="home" />

      {/* ── Hero ── */}
      <section className="relative min-h-screen">
        <img
          src="/hero-loft.png"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.62))' }}
        />

        {/* In-flow spacer — keeps hero content positioned as before fixed header */}
        <div
          aria-hidden="true"
          className="hero-header-spacer pointer-events-none flex items-center justify-between px-6 pb-5 pt-9 opacity-0 md:px-10 lg:px-16"
        >
          <div className="hero-header-spacer__logo h-16 w-16 shrink-0" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[calc(100vh-180px)] flex-col justify-center px-6 pb-32 md:px-10 lg:px-16">
          <FadeIn className="mt-[40px] max-w-2xl">
            <h1 className={`hero-headline mb-8 max-w-[38rem] text-white/92 ${typeHeroH1}`}>
              Real estate media that moves listings.
            </h1>
            <p className={`mb-8 max-w-lg text-white/90 ${typeBody}`}>
              Premium photography, Matterport tours, and fast turnaround for NYC real estate professionals.
            </p>
            <div className="hero-cta-row flex flex-wrap items-center gap-4">
              <HeroTallyButton />
              <HeroContactButton />
            </div>
          </FadeIn>
        </div>

        <HeroFeatureBar features={FEATURES} />
      </section>

      <PackagesSection packages={PACKAGES} />

      {/* ── Recent Work ── */}
      <section id="portfolio" className="portfolio-section bg-cream px-6 pt-8 pb-8 md:px-10 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20">
        <FadeIn className="portfolio-section__header mx-auto mb-10 max-w-[1360px] md:mb-12 lg:mb-14">
          <SectionHeadline className="portfolio-section__headline mb-5">
            Real spaces. Real results.
          </SectionHeadline>
          <p className={`portfolio-section__subheadline max-w-xl text-muted ${typeBody}`}>
            Space, light, and layout — presented the way top NYC brokers expect.
          </p>
        </FadeIn>

        <PortfolioGallery items={PORTFOLIO} />
      </section>

      {/* ── Contact + Footer — continuous dark closing section ── */}
      <div className="site-closing">
        <section id={CONTACT_SECTION_ID} className="contact-section px-6 pt-16 pb-10 md:px-10 lg:pt-20 lg:pb-12" aria-label="Let's Talk">
          <FadeIn>
            <div className="contact-inner mx-auto max-w-[1200px]">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
                <div className="min-w-0">
                  <SectionHeadline className="contact-section__title">Let&apos;s Talk</SectionHeadline>
                  <p className={`contact-section__copy mt-5 max-w-md ${typeBody}`}>
                    Need photography, Matterport, floor plans, or video for a listing? Reach out and we&apos;ll help you
                    find the right service.
                  </p>
                </div>

                <div className="min-w-0">
                  <div className="space-y-5">
                    <div>
                      <p className="contact-section__label mb-1.5">Email</p>
                      <a href={companyMailto} className={`contact-section__value transition-colors ${typeBody}`}>
                        {COMPANY_EMAIL}
                      </a>
                    </div>
                    <div>
                      <p className="contact-section__label mb-1.5">Phone</p>
                      <a href={companyTel} className={`contact-section__value transition-colors ${typeBody}`}>
                        {COMPANY_PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href={companyMailto}
                      className={`${typeBtn} ${typeBtnSize} hero-tally-btn contact-section__btn w-full justify-center`}
                    >
                      Email Us
                    </a>
                    <a
                      href={companyTel}
                      className={`${typeBtn} ${typeBtnSize} contact-section__btn contact-section__btn--call w-full justify-center`}
                    >
                      Call Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <footer className="site-footer px-6 pb-16 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="site-footer__grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <div className="site-footer__brand">
              <Logo className="mb-4 h-6 brightness-0 invert" />
              <p className="site-footer__tagline">Real estate media made for NYC.</p>
              <div className="site-footer__social mt-5 flex gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/65 transition-colors hover:text-white"
                >
                  <IconInstagram />
                </a>
                <a href={companyMailto} aria-label="Email" className="text-white/65 transition-colors hover:text-white">
                  <IconMail />
                </a>
              </div>
            </div>

            <div className="site-footer__links">
              <p className="site-footer__heading">Quick Links</p>
              <ul className="site-footer__link-list">
                {FOOTER_QUICK_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.homeHref}
                      className="site-footer__link"
                      onClick={(event) => {
                        if (!item.href.startsWith('/')) return
                        event.preventDefault()
                        navigate(item.href)
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="site-footer__areas">
              <p className="site-footer__heading">Service Areas</p>
              <ul className="site-footer__area-list">
                {FOOTER_SERVICE_AREAS.map((area) => (
                  <li key={area.borough} className="site-footer__area-item">
                    <p className="site-footer__borough">{area.borough}</p>
                    <p className="site-footer__neighborhoods">{area.areas}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="site-footer__seo">{FOOTER_SEO_LINE}</p>

          <div className="site-footer__bottom flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-white/55 sm:flex-row">
            <p className="site-footer__copyright">© {new Date().getFullYear()} Spaces NYC. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="site-footer__legal transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="site-footer__legal transition-colors hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
