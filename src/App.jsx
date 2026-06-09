import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SiteHeader from './SiteHeader'

const TALLY_BOOK_FORM_URL = 'https://tally.so/embed/MeV82g?transparentBackground=1'

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
const typeBtn = 'inline-flex items-center gap-2.5 font-sans text-sm font-semibold transition-all duration-300'
const typeBtnSize = 'px-7 py-3.5'
const typeBtnShadow = 'shadow-[0_4px_18px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.28)]'
const typeBtnShadowLight = 'shadow-[0_4px_18px_rgba(0,0,0,0.14)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.2)]'

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

function IconQuote({ className = 'w-8 h-8' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" opacity="0.15">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.3l1.28 1.532c-3.263 1.357-5.025 3.99-5.025 6.768 0 1.23.445 2.18 1.298 2.99zm9.007 0c-1.03-1.094-1.583-2.321-1.583-3.31 0-3.5 2.457-6.637 6.03-8.3l1.28 1.532c-3.263 1.357-5.025 3.99-5.025 6.768 0 1.23.445 2.18 1.298 2.99z" />
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
    useCase: 'Best for quick rental listings',
    popular: false,
  },
  {
    title: 'PHOTO + MATTERPORT',
    price: '$349',
    features: ['Everything in Photo Only', 'Matterport 3D Tour', 'Branded Marketing Page'],
    useCase: 'Most requested for active listings',
    popular: true,
  },
  {
    title: 'PHOTO + MATTERPORT + FLOOR PLAN',
    price: '$429',
    features: ['Everything in Photo + Matterport', '2D Floor Plan', 'Property Website'],
    useCase: 'Best for full listing launches',
    popular: false,
  },
]

const PORTFOLIO = [
  { title: 'Tribeca Penthouse', image: '/hero-loft.jpg' },
  { title: 'Chelsea Loft', image: '/portfolio/dumbo.jpg' },
  { title: 'Upper East Side Residence', image: '/portfolio/dumbo-alt.jpg' },
  { title: 'Williamsburg Condo', image: '/hero-loft.jpg' },
  { title: 'West Village Apartment', image: '/portfolio/dumbo.jpg' },
  { title: 'DUMBO Penthouse', image: '/portfolio/dumbo-alt.jpg' },
]

const STATS = [
  { value: '500+', label: 'PROPERTIES PHOTOGRAPHED' },
  { value: '24HR', label: 'AVERAGE TURNAROUND' },
  { value: '5★', label: 'RATED BY NYC AGENTS' },
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

function BookShootModal({ open, onClose, originRect }) {
  const shouldReduceMotion = useReducedMotion()
  const modalRef = useRef(null)
  const [transformOrigin, setTransformOrigin] = useState('center center')
  const [originReady, setOriginReady] = useState(false)

  useLayoutEffect(() => {
    if (!open) {
      setOriginReady(false)
      return
    }

    if (!modalRef.current || !originRect) return

    const modal = modalRef.current.getBoundingClientRect()
    const originX = originRect.left + originRect.width / 2 - modal.left
    const originY = originRect.top + originRect.height / 2 - modal.top
    setTransformOrigin(`${originX}px ${originY}px`)
    setOriginReady(true)
  }, [open, originRect])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Close booking form"
            className="absolute inset-0 cursor-default"
            style={{ backgroundColor: 'rgba(0,0,0,0.22)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4 md:block md:p-0">
            <div
              className="book-shoot-modal-anchor pointer-events-auto w-[calc(100%-32px)] md:fixed md:top-1/2 md:w-[460px] md:-translate-y-1/2"
            >
              <motion.div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label="Request a Shoot"
                className="relative flex max-h-[80vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_64px_rgba(0,0,0,0.18)]"
                style={{ transformOrigin }}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 12 }}
                animate={
                  originReady || shouldReduceMotion
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.92, y: 12 }
                }
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.15 }
                    : { type: 'spring', stiffness: 180, damping: 22, mass: 0.8 }
                }
              >
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-neutral-100 hover:text-ink"
                >
                  <IconX />
                </button>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                  <iframe
                    src={TALLY_BOOK_FORM_URL}
                    title="Request a Shoot"
                    className="block w-full min-h-[600px] border-0"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function HeroTallyButton({ className = '' }) {
  const shouldReduceMotion = useReducedMotion()
  const buttonRef = useRef(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [originRect, setOriginRect] = useState(null)
  const [ripples, setRipples] = useState([])
  const [isBouncing, setIsBouncing] = useState(false)
  const [hovered, setHovered] = useState(false)
  const classNames = `${typeBtn} ${typeBtnSize} relative overflow-visible select-none tracking-[0.15em] uppercase bg-white text-ink ${typeBtnShadowLight} ${className}`

  const defaultShadow = '0 4px 18px rgba(0,0,0,0.14)'
  const hoverShadow = '0 12px 32px rgba(0,0,0,0.2)'

  const openModal = () => {
    if (buttonRef.current) {
      setOriginRect(buttonRef.current.getBoundingClientRect())
    }
    setModalOpen(true)
  }

  const handlePress = () => {
    if (!shouldReduceMotion) {
      const id = `${Date.now()}-${Math.random()}`
      setRipples((prev) => [...prev, id])
      window.setTimeout(() => setRipples((prev) => prev.filter((r) => r !== id)), 650)

      setIsBouncing(true)
      window.setTimeout(() => setIsBouncing(false), 400)
    }

    openModal()
  }

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        className={classNames}
        onHoverStart={() => !shouldReduceMotion && setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={handlePress}
        animate={
          shouldReduceMotion
            ? undefined
            : isBouncing
              ? {
                  y: hovered ? -3 : 0,
                  scale: [hovered ? 1.04 : 1, 0.94, 1.06, hovered ? 1.04 : 1],
                  boxShadow: hovered ? hoverShadow : defaultShadow,
                }
              : hovered
                ? { y: -3, scale: 1.04, boxShadow: hoverShadow }
                : { y: 0, scale: 1, boxShadow: defaultShadow }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : isBouncing
              ? { duration: 0.4, times: [0, 0.15, 0.55, 1], ease: [0.34, 1.45, 0.64, 1] }
              : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
        }
      >
        {!shouldReduceMotion &&
          ripples.map((id) => (
            <motion.span
              key={id}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] border border-ink/30"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        REQUEST A SHOOT
        <motion.span
          className="inline-flex shrink-0"
          animate={shouldReduceMotion ? undefined : { x: hovered ? 4 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <IconArrowRight className="w-4 h-4" />
        </motion.span>
      </motion.button>

      <BookShootModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        originRect={originRect}
      />
    </>
  )
}

function BookButton({ variant = 'dark', className = '', tally = false }) {
  const styles =
    variant === 'dark'
      ? `bg-ink text-white ${typeBtnShadow}`
      : `bg-white text-ink ${typeBtnShadowLight}`

  const classNames = `${typeBtn} ${typeBtnSize} select-none tracking-[0.15em] uppercase ${styles} ${className}`

  if (tally) {
    return <HeroTallyButton className={className} />
  }

  return (
    <div role="presentation" className={classNames}>
      REQUEST A SHOOT
      <IconArrowRight className="w-4 h-4" />
    </div>
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
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <IconX className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-8"
          >
            <IconArrowRight className="h-5 w-5 rotate-180" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8"
          >
            <IconArrowRight className="h-5 w-5" />
          </button>

          <motion.figure
            key={item.image}
            className="relative z-10 w-full max-w-6xl"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[82vh] w-full rounded-xl object-contain"
            />
            <figcaption className={`mt-4 text-center text-white/90 ${typeCardTitle}`}>
              {item.title}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function PortfolioGallery({ items }) {
  const scrollRef = useRef(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const scrollByCard = (direction) => {
    const container = scrollRef.current
    if (!container) return

    const card = container.querySelector('[data-portfolio-card]')
    if (!card) return

    container.scrollBy({
      left: direction * (card.offsetWidth + 20),
      behavior: 'smooth',
    })
  }

  const closeLightbox = () => setLightboxIndex(null)

  const showPrev = () => {
    setLightboxIndex((index) => (index === null ? null : (index - 1 + items.length) % items.length))
  }

  const showNext = () => {
    setLightboxIndex((index) => (index === null ? null : (index + 1) % items.length))
  }

  return (
    <div className="relative mx-auto max-w-[1200px]">
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label="Scroll portfolio left"
        className="absolute -left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-ink shadow-[0_4px_18px_rgba(0,0,0,0.08)] transition-colors hover:bg-neutral-50 md:flex lg:-left-5"
      >
        <IconArrowRight className="h-4 w-4 rotate-180" />
      </button>

      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Scroll portfolio right"
        className="absolute -right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-ink shadow-[0_4px_18px_rgba(0,0,0,0.08)] transition-colors hover:bg-neutral-50 md:flex lg:-right-5"
      >
        <IconArrowRight className="h-4 w-4" />
      </button>

      <div
        ref={scrollRef}
        className="portfolio-scroll flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            data-portfolio-card
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[4/3] w-full shrink-0 snap-start overflow-hidden rounded-xl bg-neutral-100 md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/30" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/75 to-transparent p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className={`${typeCardTitle} text-white`}>{item.title}</p>
            </div>
          </button>
        ))}
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

function PackageCard({ pkg, index }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col rounded-2xl border border-[#e5e5e5] bg-white p-6 transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] lg:p-7"
    >
      {pkg.popular && (
        <span className={`absolute right-5 top-5 bg-ink px-3 py-1.5 text-white ${typeLabel}`}>
          MOST POPULAR
        </span>
      )}

      <div className="mb-5 min-w-0 pr-24">
        <p className={`${typeCardTitle} text-label`}>{pkg.title}</p>
        <p className="mt-2 font-sans text-4xl font-medium tracking-tight text-ink lg:text-5xl">{pkg.price}</p>
      </div>

      <div className="flex flex-1 flex-col border-t border-[#e5e5e5] pt-5">
        <p className={`mb-3 ${typeLabel} text-label`}>Includes</p>
        <ul className="space-y-2.5">
          {pkg.features.map((f) => (
            <li key={f} className="flex min-w-0 items-start gap-3">
              <IconCheck className="mt-0.5 size-4 shrink-0 text-ink" />
              <span className={`min-w-0 text-muted ${typeBodySm}`}>{f}</span>
            </li>
          ))}
        </ul>
        <p className={`mt-auto border-t border-[#e5e5e5] pt-4 text-muted ${typeBodySm}`}>{pkg.useCase}</p>
      </div>
    </motion.article>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-cream font-sans font-normal text-ink antialiased">
      <SiteHeader variant="home" />

      {/* ── Hero ── */}
      <section className="relative min-h-screen">
        <img
          src="/hero-loft.jpg"
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
          className="pointer-events-none flex items-center justify-between px-6 pb-5 pt-9 opacity-0 md:px-10 lg:px-16"
        >
          <div className="h-16 w-16 shrink-0" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[calc(100vh-180px)] flex-col justify-center px-6 pb-32 md:px-10 lg:px-16">
          <FadeIn className="mt-[40px] max-w-2xl">
            <h1 className={`mb-8 max-w-[38rem] text-white/92 ${typeHeroH1}`}>
              Real estate media that moves listings.
            </h1>
            <p className={`mb-8 max-w-lg text-white/90 ${typeBody}`}>
              Premium photography, Matterport tours, and fast turnaround for NYC real estate professionals.
            </p>
            <div className="flex flex-wrap items-start gap-4">
              <BookButton variant="light" tally />
              <a
                href="#portfolio"
                className={`${typeBtn} ${typeBtnSize} border-2 border-white/70 font-medium tracking-[0.15em] text-white uppercase hover:border-white hover:bg-white/15`}
              >
                <IconPlay className="w-3.5 h-3.5" />
                VIEW WORK
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Feature bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <FadeIn key={f.title} delay={i * 0.08} className="flex items-start gap-4 px-6 py-6 md:px-8">
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
      </section>

      {/* ── Services & Packages ── */}
      <section id="services" className="bg-cream px-6 pt-20 pb-16 md:px-10 lg:pt-24 lg:pb-20">
        <FadeIn>
          <div className="mx-auto mb-20 max-w-[1200px]">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="min-w-0">
                <SectionLabel>Services & Packages</SectionLabel>
                <SectionHeadline>
                  Simple packages.
                  <br />
                  Everything you need.
                </SectionHeadline>
              </div>
              <AnimatedCTAButton
                type="button"
                className={`${typeBtn} ${typeBtnSize} ${typeBtnShadow} shrink-0 self-start bg-ink text-white tracking-[0.06em] hover:bg-neutral-800 md:self-auto`}
              >
                Check Availability
                <IconArrowRight className="w-4 h-4" />
              </AnimatedCTAButton>
            </div>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.title} pkg={pkg} index={i} />
          ))}
        </div>
      </section>

      {/* ── Recent Work ── */}
      <section id="portfolio" className="bg-cream px-6 pb-20 md:px-10 lg:pb-28">
        <FadeIn className="mx-auto mb-20 max-w-[1200px]">
          <SectionLabel>Recent Work</SectionLabel>
          <SectionHeadline className="mb-6">Real spaces. Real results.</SectionHeadline>
          <p className={`mb-8 max-w-xl text-muted ${typeBody}`}>
            Space, light, and layout — the way top NYC brokers present every property.
          </p>
          <a
            href="#portfolio"
            className={`${typeBtn} ${typeBtnSize} border-2 border-ink font-medium tracking-[0.15em] text-ink uppercase hover:bg-ink hover:text-white`}
          >
            VIEW PORTFOLIO
            <IconArrowRight className="w-4 h-4" />
          </a>
        </FadeIn>

        <PortfolioGallery items={PORTFOLIO} />
      </section>

      {/* ── Social Proof / Stats ── */}
      <section className="bg-[#f3f0eb] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto mb-20 max-w-7xl">
          <SectionLabel>Why Spaces NYC</SectionLabel>
          <SectionHeadline>Built for NYC listings.</SectionHeadline>
        </FadeIn>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-3">
          <FadeIn>
            <div className="relative">
              <IconQuote className="absolute -left-1 -top-2 text-ink" />
              <blockquote className={`pl-6 text-ink ${typeBody}`}>
                "Amazing quality, lightning fast turnaround. Our listings get more views within days of going live."
              </blockquote>
              <SectionLabel className="mb-0 mt-6 pl-6">— Alice K., Compass</SectionLabel>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-3 gap-4 text-center">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className={`text-ink ${typeSectionH2}`}>{s.value}</p>
                  <p className={`mt-2 text-label ${typeLabel}`}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop"
                alt="Professional camera on tripod"
                className="h-56 w-full object-cover md:h-64"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="relative overflow-hidden px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1496442226666-8d0d0e62e056?w=1920&h=600&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        <FadeIn className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
          <Logo className="h-6 shrink-0 brightness-0 invert" />
          <div className="flex-1">
            <SectionHeadline light className="mb-4">
              Ready to elevate your listing?
            </SectionHeadline>
            <p className={`text-white/85 ${typeBody}`}>
              Book your shoot today and receive professional media your listings deserve.
            </p>
          </div>
          <BookButton variant="light" className="shrink-0" />
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-ink px-6 py-16 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo className="mb-4 h-6 brightness-0 invert" />
              <p className={`text-white/70 ${typeBodySm}`}>Real estate media made for NYC.</p>
            </div>

            <div>
              <SectionLabel light className="mb-4 text-white/55">
                Services
              </SectionLabel>
              <ul className="space-y-2.5">
                {['Photography', 'Matterport', 'Floor Plans', 'Packages'].map((item) => (
                  <li key={item}>
                    <a href="#services" className={`text-white/80 transition-colors hover:text-white ${typeBodySm}`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionLabel light className="mb-4 text-white/55">
                Company
              </SectionLabel>
              <ul className="space-y-2.5">
                {[
                  { label: 'About', href: '/about' },
                  { label: 'Portfolio', href: '#portfolio' },
                  { label: 'FAQ', href: '#faq' },
                  { label: 'Contact', href: '#contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`text-white/80 transition-colors hover:text-white ${typeBodySm}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionLabel light className="mb-4 text-white/55">
                Contact
              </SectionLabel>
              <ul className={`space-y-2.5 text-white/80 ${typeBodySm}`}>
                <li>
                  <a href="tel:+12125550100" className="transition-colors hover:text-white">
                    (212) 555-0100
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@spacesnyc.com" className="transition-colors hover:text-white">
                    hello@spacesnyc.com
                  </a>
                </li>
                <li>New York City</li>
              </ul>
              <div className="mt-6 flex gap-4">
                <a href="#" aria-label="Instagram" className="text-white/65 transition-colors hover:text-white">
                  <IconInstagram />
                </a>
                <a href="mailto:hello@spacesnyc.com" aria-label="Email" className="text-white/65 transition-colors hover:text-white">
                  <IconMail />
                </a>
              </div>
            </div>
          </div>

          <div className={`mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-white/55 sm:flex-row ${typeBodySm}`}>
            <p>© {new Date().getFullYear()} Spaces NYC. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
