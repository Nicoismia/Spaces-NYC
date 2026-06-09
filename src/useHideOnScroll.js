import { useEffect, useRef, useState } from 'react'

const SCROLL_THRESHOLD = 40

export function useHideOnScroll() {
  const [visible, setVisible] = useState(true)
  const [atTop, setAtTop] = useState(true)
  const prevY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY

      setAtTop(y <= SCROLL_THRESHOLD)

      if (y <= SCROLL_THRESHOLD) {
        setVisible(true)
      } else if (y > prevY.current) {
        setVisible(false)
      } else if (y < prevY.current) {
        setVisible(true)
      }

      prevY.current = y
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { visible, atTop }
}
