import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { spacesBtn, typeBtnShadow, typeBtnSize } from '../buttons'
import { COMPANY_EMAIL_DISPLAY, COMPANY_PHONE_DISPLAY, companyMailto, companyTel } from '../contact'
import { navigate } from '../navigate'
import { FOOTER_COMPANY_LINKS } from '../siteMap'
import SiteHeader from '../SiteHeader'
import { useTallyPopup } from '../TallyPopup'
import { usePageMeta } from '../usePageMeta'
import { buildServicePageSchema, getRelatedServices } from './servicePagesData'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const typeHeroH1 =
  'font-sans text-[1.95rem] font-medium leading-[0.99] tracking-tight md:text-[2.65rem] lg:text-[3.3rem]'
const typeSectionH2 =
  'font-sans text-[1.2rem] font-medium leading-[0.99] tracking-tight md:text-[1.6rem] lg:text-[2rem]'
const typeBody = 'font-sans text-[17px] font-normal leading-relaxed md:text-[19px]'
const typeBodySm = 'font-sans text-sm font-normal leading-relaxed'
const typeLabel = 'font-sans text-xs font-medium tracking-[0.2em] uppercase'
const typeBtn = spacesBtn

const tallyBtnClass = `${typeBtn} ${typeBtnSize} ${typeBtnShadow} bg-ink text-white tracking-[0.06em] hover:bg-neutral-800`
const outlineBtnClass = `${typeBtn} ${typeBtnSize} border border-[rgba(10,10,10,0.14)] bg-white text-ink tracking-[0.06em] hover:bg-neutral-50`

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

function Logo({ className = 'h-6' }) {
  return <img src="/spaces-logo.png" alt="spaces nyc" className={`${className} w-auto object-contain`} />
}

function IconArrowRight({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
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

function ServiceEditorialImage({ src, alt, aspect = 'landscape' }) {
  const aspectClass = aspect === 'portrait' ? 'aspect-[4/5]' : 'aspect-[16/10]'

  return (
    <div className="overflow-hidden rounded-xl bg-neutral-100">
      <img src={src} alt={alt} className={`${aspectClass} w-full object-cover object-center`} loading="lazy" />
    </div>
  )
}

function ServiceCtaRow({ className = '', inverted = false }) {
  const { openTallyPopup } = useTallyPopup()
  const primaryClass = inverted
    ? `${typeBtn} ${typeBtnSize} ${typeBtnShadow} bg-white text-ink tracking-[0.06em] hover:bg-neutral-100`
    : tallyBtnClass
  const secondaryClass = inverted
    ? `${typeBtn} ${typeBtnSize} border border-white/25 bg-transparent text-white tracking-[0.06em] hover:bg-white/10`
    : outlineBtnClass

  return (
    <div className={`service-page__cta-row flex flex-wrap items-center gap-4 ${className}`}>
      <button
        type="button"
        className={primaryClass}
        onClick={(event) => openTallyPopup(event.currentTarget)}
      >
        Request a Shoot
        <IconArrowRight className="w-4 h-4" />
      </button>
      <a href={companyTel} className={secondaryClass}>
        Call {COMPANY_PHONE_DISPLAY}
      </a>
    </div>
  )
}

export default function ServiceLandingPage({ page }) {
  const relatedServices = getRelatedServices(page.slug)
  const schema = useMemo(() => buildServicePageSchema(page), [page])

  usePageMeta({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.slug,
    ogImage: page.heroImage,
    schema,
  })

  return (
    <div className="service-page min-h-screen bg-cream font-sans font-normal text-ink antialiased">
      <SiteHeader variant="about" />

      <section className="service-page__hero px-6 pt-44 pb-14 md:px-10 lg:px-16 lg:pt-48 lg:pb-16">
        <FadeIn className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className={`mb-6 ${typeLabel} text-label`}>{page.heroLabel}</p>
              <h1 className={`mb-6 text-ink ${typeHeroH1}`}>{page.headline}</h1>
              <p className={`mb-8 max-w-xl text-muted ${typeBody}`}>{page.heroDescription}</p>
              <ServiceCtaRow />
            </div>

            <div className="lg:col-span-7">
              <ServiceEditorialImage src={page.heroImage} alt={page.heroImageAlt} />
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-[#e5e5e5] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className={`mb-6 text-ink ${typeSectionH2}`}>{page.overviewTitle}</h2>
          </div>
          <div className="lg:col-span-7">
            <p className={`mb-8 text-muted ${typeBody}`}>{page.overview}</p>
            <ul className="service-page__points space-y-4">
              {page.overviewPoints.map((point) => (
                <li key={point} className={`flex items-start gap-3 text-muted ${typeBodySm}`}>
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink/70" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-[#e5e5e5] bg-white px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto max-w-3xl">
          <h2 className={`mb-6 text-ink ${typeSectionH2}`}>{page.whyTitle}</h2>
          <div className={`space-y-6 text-muted ${typeBody}`}>
            {page.whyCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-[#e5e5e5] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto max-w-7xl">
          <h2 className={`mb-12 text-ink ${typeSectionH2}`}>{page.processTitle}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {page.processSteps.map((step, index) => (
              <div key={step.title} className="service-page__process-step border-t border-[rgba(0,0,0,0.08)] pt-5">
                <p className={`mb-3 ${typeLabel} text-label`}>Step {index + 1}</p>
                <h3 className="mb-3 font-sans text-[1rem] font-medium leading-snug text-ink md:text-[1.125rem]">
                  {step.title}
                </h3>
                <p className={`text-muted ${typeBodySm}`}>{step.copy}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-[#e5e5e5] bg-white px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <h2 className={`mb-4 text-ink ${typeSectionH2}`}>{page.portfolioTitle}</h2>
            <p className={`text-muted ${typeBody}`}>{page.portfolioIntro}</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {page.portfolioImages.map((image) => (
              <div key={image.src} className="overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-[4/5] w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-[#e5e5e5] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto max-w-3xl">
          <h2 className={`mb-10 text-ink ${typeSectionH2}`}>{page.faqTitle}</h2>
          <div className="divide-y divide-[rgba(0,0,0,0.08)] border-y border-[rgba(0,0,0,0.08)]">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="mb-3 font-sans text-[1rem] font-medium leading-snug text-ink md:text-[1.125rem]">
                  {faq.question}
                </h3>
                <p className={`text-muted ${typeBodySm}`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-[#e5e5e5] bg-white px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className={`mb-6 text-ink ${typeSectionH2}`}>{page.serviceAreaTitle}</h2>
              <p className={`text-muted ${typeBody}`}>{page.serviceAreaIntro}</p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {page.areas.map((area) => (
                  <li key={area} className={`text-muted ${typeBodySm}`}>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </section>

      {relatedServices.length > 0 && (
        <section className="border-t border-[#e5e5e5] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
          <FadeIn className="mx-auto max-w-7xl">
            <p className={`mb-4 ${typeLabel} text-label`}>Related Services</p>
            <h2 className={`mb-10 text-ink ${typeSectionH2}`}>Explore more listing media</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedServices.map((service) => (
                <a
                  key={service.slug}
                  href={service.slug}
                  onClick={(event) => {
                    event.preventDefault()
                    navigate(service.slug)
                  }}
                  className="service-page__related-card group rounded-[14px] border border-[rgba(0,0,0,0.08)] bg-white p-6 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
                >
                  <p className={`mb-3 ${typeLabel} text-label`}>{service.heroLabel}</p>
                  <h3 className={`mb-3 text-ink ${typeSectionH2}`}>{service.headline}</h3>
                  <p className={`mb-5 text-muted ${typeBodySm}`}>{service.heroDescription}</p>
                  <span className={`inline-flex items-center gap-2 ${typeLabel} text-ink transition-transform group-hover:translate-x-0.5`}>
                    Learn More
                    <IconArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      <section className="border-t border-[#e5e5e5] bg-ink px-6 py-20 text-white md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto flex max-w-3xl flex-col items-start gap-8">
          <h2 className={`text-white/92 ${typeSectionH2}`}>Ready to present your listing better?</h2>
          <p className={`max-w-2xl text-white/75 ${typeBody}`}>
            Request a shoot or speak with our team about photography, Matterport, and floor plans for your next NYC listing.
          </p>
          <ServiceCtaRow inverted />
        </FadeIn>
      </section>

      <footer className="bg-ink px-6 py-16 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo className="mb-4 h-6 brightness-0 invert" />
              <p className={`text-white/70 ${typeBodySm}`}>Real estate media made for NYC.</p>
            </div>

            <div>
              <p className={`mb-4 ${typeLabel} text-white/55`}>Services</p>
              <ul className="space-y-2.5">
                {['Photography', 'Matterport', 'Floor Plans', 'Packages'].map((item) => (
                  <li key={item}>
                    <a href="/#services" className={`text-white/80 transition-colors hover:text-white ${typeBodySm}`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={`mb-4 ${typeLabel} text-white/55`}>Company</p>
              <ul className="space-y-2.5">
                {FOOTER_COMPANY_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`text-white/80 transition-colors hover:text-white ${typeBodySm}`}
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

            <div>
              <p className={`mb-4 ${typeLabel} text-white/55`}>Contact</p>
              <ul className={`space-y-2.5 text-white/80 ${typeBodySm}`}>
                <li>
                  <a href={companyTel} className="transition-colors hover:text-white">
                    {COMPANY_PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a href={companyMailto} className="transition-colors hover:text-white">
                    {COMPANY_EMAIL_DISPLAY}
                  </a>
                </li>
                <li>New York City</li>
              </ul>
              <div className="mt-6 flex gap-4">
                <a href="#" aria-label="Instagram" className="text-white/65 transition-colors hover:text-white">
                  <IconInstagram />
                </a>
                <a href={companyMailto} aria-label="Email" className="text-white/65 transition-colors hover:text-white">
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
