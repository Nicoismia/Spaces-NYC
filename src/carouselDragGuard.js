const TAP_MOVE_THRESHOLD = 8
const RECENTLY_DRAGGED_MS = 200

let isDragging = false
let recentlyDragged = false
let recentTimeout = null

export function markCarouselDragStart() {
  isDragging = false
}

export function markCarouselHorizontalDrag() {
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

export function shouldBlockCarouselTap(totalMovement = 0) {
  if (isDragging || recentlyDragged) return true
  return totalMovement > TAP_MOVE_THRESHOLD
}

export function guardCarouselTap(event, totalMovement = 0) {
  if (shouldBlockCarouselTap(totalMovement)) {
    event.preventDefault()
    event.stopPropagation()
    return true
  }

  return false
}

export { TAP_MOVE_THRESHOLD }
