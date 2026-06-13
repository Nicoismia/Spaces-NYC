import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { spacesBtn, spacesBtnIcon } from './buttons'
import { companyMailto, companySms, companyTel } from './contact'

const PREMIUM_EASE = [0.22, 1, 0.36, 1]

const ContactModalContext = createContext(null)

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

function IconMail({ className = 'h-5 w-5' }) {
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconPhone({ className = 'h-5 w-5' }) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconMessage({ className = 'h-5 w-5' }) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

const CONTACT_OPTIONS = [
  { label: 'Email Us', href: companyMailto, icon: IconMail },
  { label: 'Call Us', href: companyTel, icon: IconPhone },
  { label: 'Text Us', href: companySms, icon: IconMessage },
]

function ContactModalPanel({ open, onClose }) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  const duration = shouldReduceMotion ? 0.15 : 0.28

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Close contact options"
            className="absolute inset-0 cursor-default bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: PREMIUM_EASE }}
            onClick={onClose}
          />

          <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              className="contact-modal pointer-events-auto w-[90vw] max-w-md rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.18)]"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration, ease: PREMIUM_EASE }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className={`${spacesBtnIcon} absolute right-4 top-4 z-10 h-8 w-8 text-muted hover:bg-neutral-100 hover:text-ink`}
              >
                <IconX />
              </button>

              <div className="pr-8">
                <h2
                  id="contact-modal-title"
                  className="font-sans text-[1.2rem] font-medium leading-[0.99] tracking-tight text-ink md:text-[1.6rem]"
                >
                  Let&apos;s Talk
                </h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted md:text-[17px]">
                  Choose the easiest way to reach us.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                {CONTACT_OPTIONS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={onClose}
                    className={`${spacesBtn} contact-modal__option flex w-full items-center gap-3 rounded-[14px] border border-[#e5e5e5] bg-white px-4 py-3.5 font-sans text-sm font-semibold text-ink transition-[transform,box-shadow,background-color,border-color] duration-[250ms] hover:border-[#d0d1d2] hover:bg-neutral-50`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#f4f5f6] text-ink">
                      <Icon className="h-[1.125rem] w-[1.125rem]" />
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false)

  const openContactModal = useCallback(() => {
    setOpen(true)
  }, [])

  const closeContactModal = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      <ContactModalPanel open={open} onClose={closeContactModal} />
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const context = useContext(ContactModalContext)
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider')
  }
  return context
}
