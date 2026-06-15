import { useEffect, useRef } from 'react'

const MOBILE_QUERY = '(max-width: 768px)'
const AXIS_LOCK_THRESHOLD = 8
const SWIPE_DISTANCE_THRESHOLD = 25
const SWIPE_VELOCITY_THRESHOLD = 0.2

function getClosestSlideIndex(container, slides) {
  if (!slides.length) return 0

  const center = container.scrollLeft + container.clientWidth / 2
  let closest = 0
  let minDistance = Infinity

  slides.forEach((slide, index) => {
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
    const distance = Math.abs(center - slideCenter)
    if (distance < minDistance) {
      minDistance = distance
      closest = index
    }
  })

  return closest
}

function scrollToSlide(slide, behavior = 'auto') {
  slide?.scrollIntoView({ behavior, inline: 'center', block: 'nearest' })
}

/**
 * Responsive horizontal swipe for native scroll carousels.
 * Manual drag on touchmove + snap on touchend; vertical swipes pass through.
 */
export function useScrollCarouselSwipe(scrollRef, slideSelector) {
  const gestureRef = useRef(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return undefined

    const mobileQuery = window.matchMedia(MOBILE_QUERY)

    const resetGesture = () => {
      gestureRef.current = null
    }

    const onTouchStart = (event) => {
      if (!mobileQuery.matches) return

      const touch = event.touches[0]
      if (!touch) return

      gestureRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: performance.now(),
        startScrollLeft: container.scrollLeft,
        axis: null,
      }
    }

    const onTouchMove = (event) => {
      if (!mobileQuery.matches) return

      const gesture = gestureRef.current
      const touch = event.touches[0]
      if (!gesture || !touch) return

      const deltaX = touch.clientX - gesture.startX
      const deltaY = touch.clientY - gesture.startY

      if (gesture.axis === null) {
        if (Math.abs(deltaX) < AXIS_LOCK_THRESHOLD && Math.abs(deltaY) < AXIS_LOCK_THRESHOLD) {
          return
        }

        gesture.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y'
      }

      if (gesture.axis === 'y') {
        return
      }

      event.preventDefault()
      container.scrollLeft = gesture.startScrollLeft - deltaX
    }

    const onTouchEnd = (event) => {
      if (!mobileQuery.matches) return

      const gesture = gestureRef.current
      if (!gesture || gesture.axis !== 'x') {
        resetGesture()
        return
      }

      const touch = event.changedTouches[0]
      if (!touch) {
        resetGesture()
        return
      }

      const deltaX = touch.clientX - gesture.startX
      const elapsed = Math.max(performance.now() - gesture.startTime, 1)
      const velocity = deltaX / elapsed
      const slides = [...container.querySelectorAll(slideSelector)]

      if (!slides.length) {
        resetGesture()
        return
      }

      const closest = getClosestSlideIndex(container, slides)
      let target = closest

      const distanceTrigger = Math.abs(deltaX) > SWIPE_DISTANCE_THRESHOLD
      const velocityTrigger = Math.abs(velocity) > SWIPE_VELOCITY_THRESHOLD

      if (distanceTrigger || velocityTrigger) {
        const intent = velocityTrigger ? velocity : deltaX
        const direction = intent < 0 ? 1 : -1
        target = Math.max(0, Math.min(slides.length - 1, closest + direction))
      }

      scrollToSlide(slides[target])
      resetGesture()
    }

    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: false })
    container.addEventListener('touchend', onTouchEnd, { passive: true })
    container.addEventListener('touchcancel', resetGesture, { passive: true })

    return () => {
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onTouchEnd)
      container.removeEventListener('touchcancel', resetGesture)
    }
  }, [scrollRef, slideSelector])
}

/**
 * Horizontal swipe for index-based carousels (e.g. hero feature rotator).
 */
export function useIndexCarouselSwipe(elementRef, { onStep }) {
  const gestureRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined

    const mobileQuery = window.matchMedia(MOBILE_QUERY)

    const resetGesture = () => {
      gestureRef.current = null
    }

    const onTouchStart = (event) => {
      if (!mobileQuery.matches) return

      const touch = event.touches[0]
      if (!touch) return

      gestureRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: performance.now(),
        axis: null,
      }
    }

    const onTouchMove = (event) => {
      if (!mobileQuery.matches) return

      const gesture = gestureRef.current
      const touch = event.touches[0]
      if (!gesture || !touch) return

      const deltaX = touch.clientX - gesture.startX
      const deltaY = touch.clientY - gesture.startY

      if (gesture.axis === null) {
        if (Math.abs(deltaX) < AXIS_LOCK_THRESHOLD && Math.abs(deltaY) < AXIS_LOCK_THRESHOLD) {
          return
        }

        gesture.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y'
      }

      if (gesture.axis === 'y') {
        return
      }

      event.preventDefault()
    }

    const onTouchEnd = (event) => {
      if (!mobileQuery.matches) return

      const gesture = gestureRef.current
      if (!gesture || gesture.axis !== 'x') {
        resetGesture()
        return
      }

      const touch = event.changedTouches[0]
      if (!touch) {
        resetGesture()
        return
      }

      const deltaX = touch.clientX - gesture.startX
      const elapsed = Math.max(performance.now() - gesture.startTime, 1)
      const velocity = deltaX / elapsed

      const distanceTrigger = Math.abs(deltaX) > SWIPE_DISTANCE_THRESHOLD
      const velocityTrigger = Math.abs(velocity) > SWIPE_VELOCITY_THRESHOLD

      if (distanceTrigger || velocityTrigger) {
        const intent = velocityTrigger ? velocity : deltaX
        onStep(intent < 0 ? 1 : -1)
      }

      resetGesture()
    }

    element.addEventListener('touchstart', onTouchStart, { passive: true })
    element.addEventListener('touchmove', onTouchMove, { passive: false })
    element.addEventListener('touchend', onTouchEnd, { passive: true })
    element.addEventListener('touchcancel', resetGesture, { passive: true })

    return () => {
      element.removeEventListener('touchstart', onTouchStart)
      element.removeEventListener('touchmove', onTouchMove)
      element.removeEventListener('touchend', onTouchEnd)
      element.removeEventListener('touchcancel', resetGesture)
    }
  }, [elementRef, onStep])
}
