import { useEffect, useRef } from 'react'

const AXIS_LOCK_THRESHOLD = 8
const MOBILE_QUERY = '(max-width: 768px)'

/**
 * Lets vertical swipes pass through to the page while horizontal swipes
 * stay on the carousel track. Only calls preventDefault once the gesture
 * is clearly horizontal.
 */
export function useCarouselTouchAxis(scrollRef) {
  const gestureRef = useRef({ startX: 0, startY: 0, axis: null })

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return undefined

    const mobileQuery = window.matchMedia(MOBILE_QUERY)

    const resetGesture = () => {
      gestureRef.current.axis = null
    }

    const onTouchStart = (event) => {
      if (!mobileQuery.matches) return

      const touch = event.touches[0]
      if (!touch) return

      gestureRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        axis: null,
      }
    }

    const onTouchMove = (event) => {
      if (!mobileQuery.matches) return

      const touch = event.touches[0]
      if (!touch) return

      const { startX, startY, axis } = gestureRef.current
      const deltaX = touch.clientX - startX
      const deltaY = touch.clientY - startY

      if (axis === null) {
        if (Math.abs(deltaX) < AXIS_LOCK_THRESHOLD && Math.abs(deltaY) < AXIS_LOCK_THRESHOLD) {
          return
        }

        gestureRef.current.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y'
      }

      if (gestureRef.current.axis === 'y') {
        return
      }

      event.preventDefault()
    }

    element.addEventListener('touchstart', onTouchStart, { passive: true })
    element.addEventListener('touchmove', onTouchMove, { passive: false })
    element.addEventListener('touchend', resetGesture, { passive: true })
    element.addEventListener('touchcancel', resetGesture, { passive: true })

    return () => {
      element.removeEventListener('touchstart', onTouchStart)
      element.removeEventListener('touchmove', onTouchMove)
      element.removeEventListener('touchend', resetGesture)
      element.removeEventListener('touchcancel', resetGesture)
    }
  }, [scrollRef])
}
