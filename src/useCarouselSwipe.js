import { useEffect, useRef } from 'react'

const MOBILE_QUERY = '(max-width: 768px)'
const AXIS_LOCK_THRESHOLD = 8
const SWIPE_DISTANCE_THRESHOLD = 25
const SWIPE_VELOCITY_THRESHOLD = 0.2
const CAROUSEL_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const CAROUSEL_DURATION_MS = 380

function getSlides(track, slideSelector) {
  return [...track.querySelectorAll(slideSelector)]
}

function getOffsetForIndex(track, viewport, slides, index) {
  const slide = slides[index]
  if (!slide || !viewport) return 0

  const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
  return viewport.clientWidth / 2 - slideCenter
}

function getBounds(track, viewport, slides) {
  if (!slides.length) return { min: 0, max: 0 }

  const offsets = slides.map((_, index) => getOffsetForIndex(track, viewport, slides, index))
  return {
    min: Math.min(...offsets),
    max: Math.max(...offsets),
  }
}

function getClosestIndex(track, viewport, slides, translateX) {
  let closest = 0
  let minDistance = Infinity

  slides.forEach((_, index) => {
    const offset = getOffsetForIndex(track, viewport, slides, index)
    const distance = Math.abs(offset - translateX)
    if (distance < minDistance) {
      minDistance = distance
      closest = index
    }
  })

  return closest
}

function readTranslateX(track) {
  const transform = window.getComputedStyle(track).transform
  if (!transform || transform === 'none') return 0

  const matrix = transform.match(/matrix\(([^)]+)\)/)
  if (!matrix) return 0

  const values = matrix[1].split(',').map((value) => Number.parseFloat(value.trim()))
  return values.length === 6 ? values[4] : 0
}

/**
 * Transform-based mobile carousel: finger-follow drag + smooth glide on release.
 */
export function useTransformCarousel(trackRef, { slideSelector, index, onIndexChange } = {}) {
  const stateRef = useRef({
    translateX: 0,
    index: 0,
    dragging: false,
  })
  const gestureRef = useRef(null)
  const onIndexChangeRef = useRef(onIndexChange)

  onIndexChangeRef.current = onIndexChange

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const mobileQuery = window.matchMedia(MOBILE_QUERY)
    const viewport = track.parentElement

    const applyTransform = (translateX, dragging) => {
      stateRef.current.translateX = translateX
      stateRef.current.dragging = dragging
      track.style.transform = `translate3d(${translateX}px, 0, 0)`
      track.classList.toggle('is-dragging', dragging)
    }

    const goToIndex = (targetIndex, { animate = true, notify = true } = {}) => {
      const slides = getSlides(track, slideSelector)
      if (!slides.length || !viewport) return

      const clampedIndex = Math.max(0, Math.min(slides.length - 1, targetIndex))
      const bounds = getBounds(track, viewport, slides)
      const nextX = clamp(
        getOffsetForIndex(track, viewport, slides, clampedIndex),
        bounds.min,
        bounds.max,
      )

      track.style.transition = animate
        ? `transform ${CAROUSEL_DURATION_MS}ms ${CAROUSEL_EASE}`
        : 'none'

      applyTransform(nextX, false)
      stateRef.current.index = clampedIndex

      if (notify && onIndexChangeRef.current) {
        onIndexChangeRef.current(clampedIndex)
      }
    }

    const syncLayout = ({ animate = false } = {}) => {
      if (!mobileQuery.matches) {
        track.style.transition = ''
        track.style.transform = ''
        track.classList.remove('is-dragging')
        return
      }

      goToIndex(stateRef.current.index, { animate, notify: false })
    }

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
        startTranslate: readTranslateX(track),
        axis: null,
      }

      track.style.transition = 'none'
      applyTransform(gestureRef.current.startTranslate, true)
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

      const slides = getSlides(track, slideSelector)
      const bounds = getBounds(track, viewport, slides)
      const nextX = clamp(gesture.startTranslate + deltaX, bounds.min, bounds.max)

      applyTransform(nextX, true)
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

      const slides = getSlides(track, slideSelector)
      if (!slides.length) {
        resetGesture()
        return
      }

      const deltaX = touch.clientX - gesture.startX
      const elapsed = Math.max(performance.now() - gesture.startTime, 1)
      const velocity = deltaX / elapsed
      const currentX = readTranslateX(track)
      const closest = getClosestIndex(track, viewport, slides, currentX)

      let target = closest
      const distanceTrigger = Math.abs(deltaX) > SWIPE_DISTANCE_THRESHOLD
      const velocityTrigger = Math.abs(velocity) > SWIPE_VELOCITY_THRESHOLD

      if (distanceTrigger || velocityTrigger) {
        const intent = velocityTrigger ? velocity : deltaX
        const direction = intent < 0 ? 1 : -1
        target = Math.max(0, Math.min(slides.length - 1, closest + direction))
      }

      goToIndex(target, { animate: true, notify: true })
      resetGesture()
    }

    const onMediaChange = () => syncLayout({ animate: false })

    syncLayout({ animate: false })

    const resizeObserver = new ResizeObserver(() => syncLayout({ animate: false }))
    if (viewport) resizeObserver.observe(viewport)
    resizeObserver.observe(track)

    track.addEventListener('touchstart', onTouchStart, { passive: true })
    track.addEventListener('touchmove', onTouchMove, { passive: false })
    track.addEventListener('touchend', onTouchEnd, { passive: true })
    track.addEventListener('touchcancel', onTouchEnd, { passive: true })
    mobileQuery.addEventListener('change', onMediaChange)

    return () => {
      resizeObserver.disconnect()
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchmove', onTouchMove)
      track.removeEventListener('touchend', onTouchEnd)
      track.removeEventListener('touchcancel', onTouchEnd)
      mobileQuery.removeEventListener('change', onMediaChange)
      track.style.transition = ''
      track.style.transform = ''
      track.classList.remove('is-dragging')
    }
  }, [trackRef, slideSelector])

  useEffect(() => {
    if (typeof index !== 'number') return undefined

    const track = trackRef.current
    if (!track || !window.matchMedia(MOBILE_QUERY).matches) return undefined

    if (stateRef.current.dragging || index === stateRef.current.index) return undefined

    const viewport = track.parentElement
    const slides = getSlides(track, slideSelector)
    if (!slides.length || !viewport) return undefined

    const bounds = getBounds(track, viewport, slides)
    const nextX = clamp(
      getOffsetForIndex(track, viewport, slides, index),
      bounds.min,
      bounds.max,
    )

    track.style.transition = `transform ${CAROUSEL_DURATION_MS}ms ${CAROUSEL_EASE}`
    track.style.transform = `translate3d(${nextX}px, 0, 0)`
    track.classList.remove('is-dragging')
    stateRef.current.index = index
    stateRef.current.translateX = nextX

    return undefined
  }, [index, trackRef, slideSelector])
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

// Backward-compatible export name used by carousels.
export const useScrollCarouselSwipe = useTransformCarousel

export function useIndexCarouselSwipe(elementRef, { onStep }) {
  const onStepRef = useRef(onStep)
  onStepRef.current = onStep

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined

    const mobileQuery = window.matchMedia(MOBILE_QUERY)
    const gestureRef = { current: null }

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

      if (gesture.axis === 'y') return

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
        onStepRef.current(intent < 0 ? 1 : -1)
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
  }, [elementRef])
}
