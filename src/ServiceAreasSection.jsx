import { motion } from 'framer-motion'
import NycBoroughMap from './NycBoroughMap'
import { spacesBtn, typeBtnSize } from './buttons'
import { useTallyPopup } from './TallyPopup'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const typeSectionH2 =
  'font-sans text-[1.2rem] font-medium leading-[0.99] tracking-tight md:text-[1.6rem] lg:text-[2rem]'
const typeBody = 'font-sans text-[17px] font-normal leading-relaxed md:text-[19px]'
const typeLabel = 'font-sans text-xs font-medium tracking-[0.2em] uppercase'
const typeBtn = spacesBtn

function FadeIn({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ServiceAreasCta({ className = '' }) {
  const { openTallyPopup } = useTallyPopup()
  const btnClass = `${typeBtn} ${typeBtnSize} hero-tally-btn spaces-btn tracking-[0.06em] text-white`

  return (
    <button
      type="button"
      className={`${btnClass} ${className}`}
      onClick={(event) => openTallyPopup(event.currentTarget)}
    >
      Request a Shoot
    </button>
  )
}

export default function ServiceAreasSection() {
  return (
    <section
      className="service-areas-section bg-ink px-6 pt-10 pb-12 md:px-10 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24"
      aria-labelledby="service-areas-heading"
    >
      <FadeIn className="service-areas-section__inner mx-auto max-w-[1200px]">
        <div className="service-areas__grid grid grid-cols-1 gap-5 md:gap-8 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
          <div className="service-areas__intro">
            <p className={`service-areas__eyebrow mb-3 md:mb-4 ${typeLabel}`}>
              LOCAL EXPERTS. CITYWIDE SERVICE.
            </p>
            <h2 id="service-areas-heading" className={`mb-4 text-white/92 md:mb-5 ${typeSectionH2}`}>
              Serving All Five Boroughs
            </h2>
            <p className={`service-areas__body service-areas__body--mobile max-w-xl lg:hidden ${typeBody}`}>
              Real estate photography, Matterport tours, floor plans, and listing media across NYC.
            </p>
            <p className={`service-areas__body service-areas__body--desktop max-w-xl hidden lg:block ${typeBody}`}>
              From Manhattan penthouses to Brooklyn brownstones, we provide real estate photography, Matterport tours,
              floor plans, and listing media throughout New York City.
            </p>
            <div className="service-areas__cta mt-6 md:mt-8">
              <ServiceAreasCta />
            </div>
          </div>

          <div className="service-areas__map">
            <NycBoroughMap />
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
