import { useEffect, useState } from 'react'
import AboutPage from './AboutPage'
import App from './App'
import { TallyPopupProvider } from './TallyPopup'
import { ContactModalProvider } from './ContactModal'
import { scrollToSection, sectionIdFromHref } from './scrollToSection'

function getPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export default function Router() {
  const [path, setPath] = useState(getPath)

  useEffect(() => {
    const onNavigate = () => setPath(getPath())
    window.addEventListener('popstate', onNavigate)
    return () => window.removeEventListener('popstate', onNavigate)
  }, [])

  useEffect(() => {
    if (path !== '/') {
      window.scrollTo(0, 0)
      return undefined
    }

    const scrollHomeHash = () => {
      const hash = window.location.hash
      const sectionId = hash ? sectionIdFromHref(hash) : null
      if (sectionId && scrollToSection(sectionId, { updateHash: false })) return
      window.scrollTo(0, 0)
    }

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollHomeHash)
    })

    const onHashChange = () => {
      const sectionId = sectionIdFromHref(window.location.hash)
      if (sectionId) scrollToSection(sectionId, { updateHash: false })
    }

    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [path])

  return (
    <TallyPopupProvider>
      <ContactModalProvider>
        {path === '/about' ? <AboutPage /> : <App />}
      </ContactModalProvider>
    </TallyPopupProvider>
  )
}
