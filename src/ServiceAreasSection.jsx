import { motion } from 'framer-motion'
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

const BOROUGHS = [
  {
    name: 'Manhattan',
    areas: 'Chelsea · Tribeca · SoHo · Upper West Side · Upper East Side · Financial District',
  },
  {
    name: 'Brooklyn',
    areas: 'Williamsburg · DUMBO · Brooklyn Heights · Park Slope · Carroll Gardens',
  },
  {
    name: 'Queens',
    areas: 'Long Island City · Astoria · Ridgewood · Forest Hills · Bayside',
  },
  {
    name: 'Bronx',
    areas: 'Riverdale · Mott Haven · Concourse · Highbridge',
  },
  {
    name: 'Staten Island',
    areas: 'Residential and commercial properties throughout Staten Island',
    fullWidth: true,
  },
]

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

function ServiceAreasCta() {
  const { openTallyPopup } = useTallyPopup()

  return (
    <button
      type="button"
      className={`service-areas__cta ${typeBtn} ${typeBtnSize} hero-tally-btn spaces-btn justify-center tracking-[0.04em] text-white`}
      onClick={(event) => openTallyPopup(event.currentTarget)}
    >
      Request a Shoot
    </button>
  )
}

function BoroughItem({ borough }) {
  return (
    <article
      className={`service-areas__borough${borough.fullWidth ? ' service-areas__borough--full' : ''}`}
    >
      <h3 className="service-areas__borough-name">{borough.name}</h3>
      <p className="service-areas__borough-areas">{borough.areas}</p>
    </article>
  )
}

export default function ServiceAreasSection() {
  return (
    <section
      className="service-areas-section bg-ink px-6 pt-14 pb-8 md:px-10 md:pt-16 md:pb-20 lg:pt-16 lg:pb-24"
      aria-labelledby="service-areas-heading"
    >
      <FadeIn className="service-areas-section__inner mx-auto max-w-[1200px]">
        <div className="service-areas__grid grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-x-16 lg:items-start">
          <div className="service-areas__intro flex flex-col">
            <div className="service-areas__cta-wrap order-first mb-8 md:order-last md:mb-0 md:mt-8">
              <ServiceAreasCta />
            </div>
            <p className="service-areas__eyebrow mb-3 md:mb-4 font-sans">
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
          </div>

          <div className="service-areas__boroughs" aria-label="New York City service areas by borough">
            {BOROUGHS.map((borough) => (
              <BoroughItem key={borough.name} borough={borough} />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
