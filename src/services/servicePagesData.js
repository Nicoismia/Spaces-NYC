import { COMPANY_EMAIL, companyTel } from '../contact'
import { SITE_URL } from '../siteMap'

export const SERVICE_PAGE_PATHS = [
  '/real-estate-photography-nyc',
  '/matterport-tours-nyc',
  '/floor-plans-real-estate-media-nyc',
]

const SHARED_AREAS = [
  'Manhattan',
  'Brooklyn',
  'Queens',
  'Bronx',
  'Staten Island',
  'Hoboken',
  'Jersey City',
]

export const SERVICE_PAGES = [
  {
    slug: '/real-estate-photography-nyc',
    packageTitle: 'PHOTO ONLY',
    metaTitle: 'Real Estate Photography NYC | Spaces NYC',
    metaDescription:
      'Professional real estate photography in NYC. HDR listing photos, careful editing, and 24-hour delivery for Manhattan, Brooklyn, and Queens listings.',
    heroLabel: 'Photography',
    headline: 'Real estate photography built for NYC listings.',
    heroDescription:
      'Bright, natural HDR photography that helps buyers and renters understand space, light, and layout — delivered with the speed New York listings demand.',
    heroImage: '/hero-loft.png',
    heroImageAlt: 'Sunlit NYC loft interior photographed for a real estate listing',
    overviewTitle: 'Overview',
    overview:
      'Spaces NYC provides listing photography designed for brokers, developers, and property owners who need polished, MLS-ready media without slowing down a launch. Every shoot is approached with an editorial eye and a practical understanding of how NYC properties are marketed online.',
    overviewPoints: [
      '10–15 professionally edited HDR photographs',
      'Consistent color, exposure, and vertical correction',
      '24-hour delivery for active listings',
      'Shot to highlight flow, natural light, and room scale',
    ],
    whyTitle: 'Why It Matters',
    whyCopy: [
      'In New York, listings move quickly — and first impressions happen online. Strong photography helps a property feel understandable before a showing is ever scheduled.',
      'Accurate, well-composed images reduce friction for buyers, renters, and agents reviewing dozens of listings a day. The goal is not to oversell a space, but to present it clearly, confidently, and at a premium standard.',
    ],
    processTitle: 'Our Process',
    processSteps: [
      {
        title: 'Book & Confirm',
        copy: 'Share property details, access instructions, and timing. We confirm scope and schedule around your listing timeline.',
      },
      {
        title: 'On-Site Capture',
        copy: 'We photograph each room with attention to composition, natural light, and the way the space actually feels in person.',
      },
      {
        title: 'Professional Editing',
        copy: 'Images are edited for clarity, color accuracy, and consistency — ready for MLS, social, and brokerage marketing.',
      },
      {
        title: 'Delivery',
        copy: 'Final files are delivered within 24 hours so your listing can go live without delay.',
      },
    ],
    portfolioTitle: 'Sample Work',
    portfolioIntro: 'A selection of recent NYC interiors photographed for residential listings.',
    portfolioImages: [
      { src: '/portfolio/tribeca-penthouse.png', alt: 'Tribeca penthouse living room with city views' },
      { src: '/portfolio/chelsea-loft.png', alt: 'Chelsea loft with open kitchen and natural light' },
      { src: '/portfolio/ues-residence.png', alt: 'Upper East Side residence with refined interior styling' },
      { src: '/portfolio/west-village-studio.png', alt: 'West Village studio with warm natural light' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'How quickly can I receive photos?',
        answer:
          'Most photography packages are delivered within 24 hours of the shoot, so you can publish your listing on schedule.',
      },
      {
        question: 'Are the images MLS-ready?',
        answer:
          'Yes. Files are edited and exported for MLS, brokerage websites, email campaigns, and social media.',
      },
      {
        question: 'What types of properties do you photograph?',
        answer:
          'We work across condos, co-ops, townhouses, rentals, and new development units throughout New York City.',
      },
      {
        question: 'Can photography be combined with Matterport or floor plans?',
        answer:
          'Absolutely. Photography pairs naturally with our Matterport and floor plan services for a complete listing package.',
      },
    ],
    serviceAreaTitle: 'Service Area',
    serviceAreaIntro: 'We photograph listings across New York City and select nearby markets, including:',
    relatedSlugs: ['/matterport-tours-nyc', '/floor-plans-real-estate-media-nyc'],
  },
  {
    slug: '/matterport-tours-nyc',
    packageTitle: 'PHOTO + MATTERPORT',
    metaTitle: 'Matterport 3D Tours NYC | Spaces NYC',
    metaDescription:
      'Immersive Matterport 3D tours for NYC real estate listings. Help buyers explore properties remotely with premium photography and fast delivery.',
    heroLabel: 'Matterport',
    headline: 'Matterport 3D tours for immersive NYC listings.',
    heroDescription:
      'Give buyers and renters a true sense of layout and flow before they step inside — paired with photography that presents your listing at its best.',
    heroImage: '/portfolio/dumbo-loft.png',
    heroImageAlt: 'DUMBO loft interior prepared for Matterport and listing media',
    overviewTitle: 'Overview',
    overview:
      'Our Matterport package combines professional photography with an interactive 3D walkthrough — one of the most effective ways to increase engagement on active NYC listings. It is especially valuable for out-of-town buyers, rentals, and properties where spatial understanding matters.',
    overviewPoints: [
      'Full Matterport 3D capture and processing',
      'Professional listing photography included',
      'Branded marketing page for sharing',
      'Ideal for buyers exploring remotely',
    ],
    whyTitle: 'Why It Matters',
    whyCopy: [
      'A Matterport tour lets viewers move through a property at their own pace, building confidence before an in-person visit. For competitive NYC listings, that extra clarity can mean more qualified interest.',
      'When paired with strong photography, a 3D tour creates a cohesive first impression — polished, informative, and easy to share across email, text, and social channels.',
    ],
    processTitle: 'Our Process',
    processSteps: [
      {
        title: 'Scope the Shoot',
        copy: 'We confirm square footage, access, and listing goals to plan an efficient capture session.',
      },
      {
        title: '3D & Photo Capture',
        copy: 'Matterport scanning and listing photography are completed in a single appointment when possible.',
      },
      {
        title: 'Tour Processing',
        copy: 'The walkthrough is processed, reviewed, and prepared for sharing with your preferred branding.',
      },
      {
        title: 'Launch-Ready Delivery',
        copy: 'You receive photography, tour links, and marketing assets ready for MLS and campaign use.',
      },
    ],
    portfolioTitle: 'Sample Work',
    portfolioIntro: 'Recent NYC spaces captured with photography and immersive 3D presentation.',
    portfolioImages: [
      { src: '/portfolio/dumbo-loft.png', alt: 'DUMBO loft living space with open layout' },
      { src: '/portfolio/hudson-yards-residence.png', alt: 'Hudson Yards residence with modern interior' },
      { src: '/portfolio/williamsburg-studio.png', alt: 'Williamsburg studio with clean architectural lines' },
      { src: '/portfolio/townhouse-hallway.png', alt: 'Townhouse hallway showing depth and flow' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'How long does a Matterport scan take?',
        answer:
          'Most residential units can be captured in a single visit. Timing depends on size, layout, and whether photography is included in the same appointment.',
      },
      {
        question: 'Can I embed the tour on my website or MLS?',
        answer:
          'Yes. You will receive shareable links and assets designed for MLS, email, and branded marketing pages.',
      },
      {
        question: 'Is photography included?',
        answer:
          'Yes. Our Matterport package includes professional listing photography alongside the 3D tour.',
      },
      {
        question: 'Who is Matterport best for?',
        answer:
          'It is especially effective for higher-interest listings, remote buyers, rentals, and properties where layout is a key selling point.',
      },
    ],
    serviceAreaTitle: 'Service Area',
    serviceAreaIntro: 'Matterport tours are available throughout New York City and nearby markets, including:',
    relatedSlugs: ['/real-estate-photography-nyc', '/floor-plans-real-estate-media-nyc'],
  },
  {
    slug: '/floor-plans-real-estate-media-nyc',
    packageTitle: 'PHOTO + MATTERPORT + FLOOR PLAN',
    metaTitle: 'Real Estate Floor Plans NYC | Spaces NYC',
    metaDescription:
      'Professional real estate floor plans in NYC with photography, Matterport 3D tours, and property websites. Complete media for premium listings.',
    heroLabel: 'Floor Plans',
    headline: 'Floor plans and complete listing media for NYC properties.',
    heroDescription:
      'Help buyers understand layout at a glance with a clear floor plan — alongside photography, 3D tours, and a polished property website.',
    heroImage: '/portfolio/chelsea-loft.png',
    heroImageAlt: 'Chelsea loft interior used in a complete real estate media package',
    overviewTitle: 'Overview',
    overview:
      'Our most complete package brings together photography, Matterport, and a professionally drawn floor plan — everything needed to present a property online with clarity and confidence. It is built for listings where buyers expect a full digital experience before scheduling a showing.',
    overviewPoints: [
      'Accurate 2D floor plan with room labels',
      'Matterport 3D tour and listing photography',
      'Dedicated property website for sharing',
      'Cohesive media for premium launches',
    ],
    whyTitle: 'Why It Matters',
    whyCopy: [
      'Floor plans answer one of the most important questions buyers have: how does this space actually work? In dense NYC buildings, that context can be the difference between a scroll and a serious inquiry.',
      'When photography, 3D, and layout are presented together, the listing feels intentional — easier to understand, easier to share, and more aligned with how top brokers market high-quality properties.',
    ],
    processTitle: 'Our Process',
    processSteps: [
      {
        title: 'Plan the Package',
        copy: 'We confirm deliverables, access, and timeline for photography, Matterport, and floor plan production.',
      },
      {
        title: 'Capture On Site',
        copy: 'Media is captured in a coordinated session to keep the listing launch efficient and consistent.',
      },
      {
        title: 'Draw & Refine',
        copy: 'The floor plan is drafted, labeled, and reviewed for clarity alongside tour and photo assets.',
      },
      {
        title: 'Complete Delivery',
        copy: 'You receive photography, 3D tour links, floor plan files, and a property website ready to share.',
      },
    ],
    portfolioTitle: 'Sample Work',
    portfolioIntro: 'Properties presented with photography, spatial media, and layout-focused marketing assets.',
    portfolioImages: [
      { src: '/portfolio/chelsea-loft.png', alt: 'Chelsea loft with open living and kitchen area' },
      { src: '/portfolio/tribeca-penthouse.png', alt: 'Tribeca penthouse with expansive city views' },
      { src: '/portfolio/hudson-yards-residence.png', alt: 'Hudson Yards residence living room' },
      { src: '/portfolio/ues-residence.png', alt: 'Upper East Side residence interior' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'What is included in the floor plan package?',
        answer:
          'The package includes a 2D floor plan, Matterport 3D tour, listing photography, and a property website.',
      },
      {
        question: 'Are floor plans accurate for marketing use?',
        answer:
          'Yes. Plans are prepared for listing marketing and buyer orientation, with clear room labels and readable layout presentation.',
      },
      {
        question: 'Can I order this for a new development unit?',
        answer:
          'Yes. This package is well suited to new development launches, luxury rentals, and sales listings that need a complete digital presentation.',
      },
      {
        question: 'How does this compare to photography alone?',
        answer:
          'It is ideal when buyers need more context than photos alone can provide — especially for layout-driven decisions in NYC apartments and townhouses.',
      },
    ],
    serviceAreaTitle: 'Service Area',
    serviceAreaIntro: 'Complete listing media is available across New York City and select nearby areas, including:',
    relatedSlugs: ['/real-estate-photography-nyc', '/matterport-tours-nyc'],
  },
]

SERVICE_PAGES.forEach((page) => {
  page.areas = SHARED_AREAS
})

export function getServicePageByPath(path) {
  return SERVICE_PAGES.find((page) => page.slug === path)
}

export function getServicePageBySlug(slug) {
  return getServicePageByPath(slug)
}

export function buildServicePageSchema(page) {
  const serviceName = page.headline.replace(/\.$/, '')

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: 'Spaces NYC',
        image: `${SITE_URL}/spaces-logo.png`,
        url: SITE_URL,
        telephone: companyTel.replace('tel:', ''),
        email: COMPANY_EMAIL,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'New York',
          addressRegion: 'NY',
          addressCountry: 'US',
        },
        areaServed: SHARED_AREAS.map((name) => ({
          '@type': 'City',
          name,
        })),
      },
      {
        '@type': 'Service',
        name: serviceName,
        description: page.metaDescription,
        provider: {
          '@id': `${SITE_URL}/#localbusiness`,
        },
        areaServed: {
          '@type': 'City',
          name: 'New York City',
        },
        url: `${SITE_URL}${page.slug}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }
}

export function getRelatedServices(currentSlug) {
  const current = getServicePageByPath(currentSlug)
  if (!current) return []

  return current.relatedSlugs
    .map((slug) => SERVICE_PAGES.find((page) => page.slug === slug))
    .filter(Boolean)
}

export const PACKAGE_LEARN_MORE = {
  'PHOTO ONLY': '/real-estate-photography-nyc',
  'PHOTO + MATTERPORT': '/matterport-tours-nyc',
  'PHOTO + MATTERPORT + FLOOR PLAN': '/floor-plans-real-estate-media-nyc',
}
