import { motion } from 'framer-motion'
import { spacesBtn, typeBtnShadow, typeBtnSize } from './buttons'
import { COMPANY_EMAIL_DISPLAY, COMPANY_PHONE_DISPLAY, companyMailto, companyTel } from './contact'
import { FOOTER_COMPANY_LINKS, INSTAGRAM_URL } from './siteMap'
import { navigate } from './navigate'
import SiteHeader from './SiteHeader'
import { useTallyPopup } from './TallyPopup'

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

const WHAT_WE_DO = [
  {
    title: 'Photography',
    copy: 'Bright, natural imagery that highlights the character, flow, and functionality of a property.',
  },
  {
    title: 'Matterport 3D Tours',
    copy: 'Interactive virtual experiences that allow prospective buyers and renters to explore a space from anywhere.',
  },
  {
    title: 'Floor Plans',
    copy: 'Clear, professional floor plans that help viewers understand layout and scale at a glance.',
  },
]

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

function AboutEditorialImage({ src, alt, aspect = 'portrait' }) {
  const aspectClass = aspect === 'landscape' ? 'aspect-[16/10]' : 'aspect-[4/5]'

  return (
    <div className="overflow-hidden rounded-xl bg-neutral-100">
      <img
        src={src}
        alt={alt}
        className={`${aspectClass} w-full object-cover object-center`}
        loading="lazy"
      />
    </div>
  )
}

const aboutIntroBodyGrid = 'mt-4 grid grid-cols-1 items-center gap-8 lg:mt-5 lg:grid-cols-12 lg:gap-10'

export default function AboutPage() {
  const { openTallyPopup } = useTallyPopup()

  return (
    <div className="min-h-screen bg-cream font-sans font-normal text-ink antialiased">
      <SiteHeader variant="about" />

      <section className="px-6 pt-44 pb-12 md:px-10 lg:px-16 lg:pt-48 lg:pb-14">
        <FadeIn className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-12">
            <div className="lg:col-span-5 lg:pr-2 xl:pr-4">
              <p className={`mb-6 ${typeLabel} text-label`}>About</p>
              <h1 className={`mb-6 text-ink ${typeHeroH1}`}>About Spaces NYC</h1>
              <p className={`text-ink ${typeSectionH2}`}>Real estate media built for New York listings.</p>
            </div>
          </div>

          <div className={aboutIntroBodyGrid}>
            <div className="lg:col-span-5 lg:pr-2 xl:pr-4">
              <div className={`max-w-md space-y-6 text-muted lg:max-w-none ${typeBody}`}>
                <p>
                  Spaces NYC helps brokers, developers, and property owners present their listings through
                  professional photography, Matterport tours, and floor plans designed to showcase a property&apos;s
                  space, light, and layout.
                </p>
                <p>
                  Our approach is simple: create media that helps buyers and renters understand a property quickly,
                  accurately, and confidently.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:-mt-4">
              <AboutEditorialImage
                src="/hero-loft.jpg"
                alt="NYC loft interior with city views"
                aspect="landscape"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-[#e5e5e5] px-6 py-14 md:px-10 lg:px-16 lg:py-16">
        <FadeIn className="mx-auto max-w-3xl">
          <h2 className={`mb-6 text-ink ${typeSectionH2}`}>The Story</h2>
          <div className={`space-y-6 text-muted ${typeBody}`}>
            <p>
              Spaces NYC was founded by Nico Henriquez, a real estate photographer whose career began in Miami,
              Florida in 2016.
            </p>
            <p>
              Working in South Florida provided early experience photographing everything from compact urban condos
              to luxury waterfront residences. Those years helped shape an understanding of how strong imagery can
              influence the way people experience a property before ever stepping inside.
            </p>
            <p>
              In 2019, Nico relocated to New York City, where he continued working with brokers, property owners,
              and real estate professionals throughout Manhattan, Brooklyn, and Queens.
            </p>
            <p>
              Since then, the focus has remained consistent: creating clean, natural, and accurate visual
              presentations that help properties stand out while staying true to the space itself.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-[#e5e5e5] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto max-w-3xl">
          <h2 className={`mb-6 text-ink ${typeSectionH2}`}>What We Believe</h2>
          <div className={`space-y-6 text-muted ${typeBody}`}>
            <p>
              The best real estate photography isn&apos;t about dramatic editing or visual tricks.
            </p>
            <p>It&apos;s about helping people understand a space.</p>
            <p>
              Natural light, thoughtful composition, and attention to architectural detail allow buyers and renters
              to connect with a property before scheduling a showing. Every image, tour, and floor plan should serve
              that purpose.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-[#e5e5e5] bg-white px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto max-w-3xl">
          <h2 className={`mb-6 text-ink ${typeSectionH2}`}>NYC Focused</h2>
          <p className={`text-muted ${typeBody}`}>
            From modern DUMBO penthouses and Tribeca lofts to Brooklyn brownstones and Upper East Side residences,
            Spaces NYC is built around the unique architecture and pace of the New York market.
          </p>
          <p className={`mt-6 text-muted ${typeBody}`}>
            Every project is delivered with fast turnaround, consistent communication, and attention to detail.
          </p>
        </FadeIn>
      </section>

      <section className="border-t border-[#e5e5e5] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto mb-14 max-w-7xl">
          <p className={`mb-4 ${typeLabel} text-label`}>Services</p>
        </FadeIn>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {WHAT_WE_DO.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.08}>
              <h3 className={`mb-4 text-ink ${typeSectionH2}`}>{item.title}</h3>
              <p className={`text-muted ${typeBodySm}`}>{item.copy}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-t border-[#e5e5e5] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <FadeIn className="mx-auto flex max-w-3xl flex-col items-start gap-8">
          <h2 className={`text-ink ${typeSectionH2}`}>Ready to present your listing better?</h2>
          <button
            type="button"
            className={`${typeBtn} ${typeBtnSize} ${typeBtnShadow} bg-ink text-white tracking-[0.15em] uppercase hover:bg-neutral-800`}
            onClick={(event) => openTallyPopup(event.currentTarget)}
          >
            Request a Shoot
            <IconArrowRight className="w-4 h-4" />
          </button>
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
