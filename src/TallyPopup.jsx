import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { spacesBtnIcon } from './buttons'
import { TALLY_EMBED_URL } from './tally'

const PREMIUM_EASE = [0.22, 1, 0.36, 1]

const TallyPopupContext = createContext(null)

function IconX({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function TallyPopupModal({ open, onClose, originRect }) {
  const shouldReduceMotion = useReducedMotion()
  const modalRef = useRef(null)
  const [transformOrigin, setTransformOrigin] = useState('center center')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    if (!open || isMobile || !originRect || !modalRef.current) {
      setTransformOrigin('center center')
      return
    }

    const modal = modalRef.current.getBoundingClientRect()
    const originX = originRect.left + originRect.width / 2 - modal.left
    const originY = originRect.top + originRect.height / 2 - modal.top
    setTransformOrigin(`${originX}px ${originY}px`)
  }, [open, originRect, isMobile])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  const openDuration = shouldReduceMotion ? 0.15 : isMobile ? 0.28 : 0.32
  const closeDuration = shouldReduceMotion ? 0.12 : isMobile ? 0.2 : 0.22

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Close booking form"
            className="absolute inset-0 cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: closeDuration, ease: PREMIUM_EASE }}
            style={{ backgroundColor: 'rgba(0,0,0,0.22)' }}
            onClick={onClose}
          />

          <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4 md:block md:p-0">
            <div className="tally-popup-anchor pointer-events-auto w-[calc(100%-32px)] md:fixed md:top-1/2 md:w-[460px] md:-translate-y-1/2">
              <motion.div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label="Request a Shoot"
                className="relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_64px_rgba(0,0,0,0.18)]"
                style={{ transformOrigin }}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.94, y: 12 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        scale: 0.96,
                        y: 8,
                        transition: { duration: closeDuration, ease: PREMIUM_EASE },
                      }
                }
                transition={{ duration: openDuration, ease: PREMIUM_EASE }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className={`${spacesBtnIcon} absolute right-4 top-4 z-10 h-8 w-8 text-muted hover:bg-neutral-100 hover:text-ink`}
                >
                  <IconX />
                </button>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                  <iframe
                    src={TALLY_EMBED_URL}
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

export function TallyPopupProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [originRect, setOriginRect] = useState(null)

  const openTallyPopup = useCallback((trigger) => {
    if (trigger?.getBoundingClientRect) {
      setOriginRect(trigger.getBoundingClientRect())
    } else {
      setOriginRect(null)
    }
    setOpen(true)
  }, [])

  const closeTallyPopup = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <TallyPopupContext.Provider value={{ openTallyPopup }}>
      {children}
      <TallyPopupModal open={open} onClose={closeTallyPopup} originRect={originRect} />
    </TallyPopupContext.Provider>
  )
}

export function useTallyPopup() {
  const context = useContext(TallyPopupContext)
  if (!context) {
    throw new Error('useTallyPopup must be used within TallyPopupProvider')
  }
  return context
}
