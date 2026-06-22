export const TAP_MOVE_THRESHOLD = 6
export const HORIZONTAL_DRAG_THRESHOLD = 8
export const RECENTLY_DRAGGED_MS = 400
export const EDGE_GESTURE_INSET = 24

let isDragging = false
let recentlyDragged = false
let recentTimeout = null

export function isEdgeGesture(startX) {
  return startX < EDGE_GESTURE_INSET || startX > window.innerWidth - EDGE_GESTURE_INSET
}

export function markCarouselDragStart() {
  isDragging = false
}

export function markCarouselDrag() {
  isDragging = true
}

export function markCarouselDragEnd(didDrag) {
  if (didDrag || isDragging) {
    recentlyDragged = true
    clearTimeout(recentTimeout)
    recentTimeout = setTimeout(() => {
      recentlyDragged = false
    }, RECENTLY_DRAGGED_MS)
  }

  isDragging = false
}

export function shouldBlockCarouselTap() {
  return isDragging || recentlyDragged
}

export function guardCarouselTap(event) {
  if (shouldBlockCarouselTap()) {
    event.preventDefault()
    event.stopPropagation()
    return true
  }

  return false
}
