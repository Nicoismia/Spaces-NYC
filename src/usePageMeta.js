import { useEffect } from 'react'
import { SITE_URL } from './siteMap'

const DEFAULT_TITLE = 'Spaces NYC — Real Estate Media'
const DEFAULT_DESCRIPTION =
  'Premium real estate photography, Matterport 3D tours, and floor plans for NYC brokers and property owners. Fast turnaround across Manhattan, Brooklyn, and Queens.'

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })

  return element
}

function setMetaName(name, content) {
  upsertMeta(`meta[name="${name}"]`, { name, content })
}

function setMetaProperty(property, content) {
  upsertMeta(`meta[property="${property}"]`, { property, content })
}

function upsertJsonLd(id, data) {
  let script = document.getElementById(id)

  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify(data)
}

export function usePageMeta({ title, description, path, ogImage = '/hero-loft.png', schema }) {
  useEffect(() => {
    const pageTitle = title || DEFAULT_TITLE
    const pageDescription = description || DEFAULT_DESCRIPTION
    const canonicalPath = path || '/'
    const canonicalUrl = `${SITE_URL}${canonicalPath}`
    const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`

    document.title = pageTitle
    setMetaName('description', pageDescription)
    setMetaProperty('og:title', pageTitle)
    setMetaProperty('og:description', pageDescription)
    setMetaProperty('og:type', 'website')
    setMetaProperty('og:url', canonicalUrl)
    setMetaProperty('og:image', imageUrl)
    setMetaName('twitter:card', 'summary_large_image')
    setMetaName('twitter:title', pageTitle)
    setMetaName('twitter:description', pageDescription)
    setMetaName('twitter:image', imageUrl)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    if (schema) {
      upsertJsonLd('page-schema', schema)
    }

    return () => {
      document.title = DEFAULT_TITLE
      setMetaName('description', DEFAULT_DESCRIPTION)
      setMetaProperty('og:title', DEFAULT_TITLE)
      setMetaProperty('og:description', DEFAULT_DESCRIPTION)
      setMetaProperty('og:url', SITE_URL)
      setMetaProperty('og:image', `${SITE_URL}/hero-loft.png`)

      const canonicalLink = document.querySelector('link[rel="canonical"]')
      if (canonicalLink) canonicalLink.remove()

      const schemaScript = document.getElementById('page-schema')
      if (schemaScript) schemaScript.remove()
    }
  }, [title, description, path, ogImage, schema])
}
