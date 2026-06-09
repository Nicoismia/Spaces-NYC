import { useEffect, useState } from 'react'
import AboutPage from './AboutPage'
import App from './App'

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
    window.scrollTo(0, 0)
  }, [path])

  if (path === '/about') return <AboutPage />
  return <App />
}
