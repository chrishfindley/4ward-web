/**
 * Fixed nav height + scroll reveals. Safari (incl. iPad) can mis-handle
 * percentage rootMargin on IntersectionObserver, leaving .reveal at opacity:0 forever.
 * Use pixel rootMargin only + IO fallback + a short visibility failsafe.
 */
export function setupRevealAndNav(): () => void {
  const root = document.documentElement
  const nav = document.querySelector('.nav') as HTMLElement | null

  const setNavHeight = () => {
    if (!nav) return
    root.style.setProperty('--nav-height', `${Math.ceil(nav.getBoundingClientRect().height)}px`)
  }

  setNavHeight()
  requestAnimationFrame(setNavHeight)
  window.addEventListener('resize', setNavHeight)

  const navResizeObserver =
    nav && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(setNavHeight) : null
  if (nav && navResizeObserver) {
    navResizeObserver.observe(nav)
  }

  const revealNodes = Array.from(document.querySelectorAll('.reveal'))

  const showInViewport = () => {
    const h = window.innerHeight
    revealNodes.forEach((el) => {
      if (el.classList.contains('visible')) return
      const r = el.getBoundingClientRect()
      if (r.bottom > 0 && r.top < h) {
        el.classList.add('visible')
      }
    })
  }

  let observer: IntersectionObserver | null = null
  let failsafeId: number | null = null

  if (typeof IntersectionObserver === 'undefined') {
    revealNodes.forEach((el) => el.classList.add('visible'))
  } else {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle('visible', e.isIntersecting)
        })
      },
      {
        threshold: [0, 0.05, 0.1],
        // Pixel-only — % rootMargin is unreliable on WebKit iPad/Safari
        rootMargin: '0px 0px -32px 0px',
      },
    )
    revealNodes.forEach((el) => observer!.observe(el))

    requestAnimationFrame(() => {
      requestAnimationFrame(showInViewport)
    })
    failsafeId = window.setTimeout(showInViewport, 400)
  }

  return () => {
    observer?.disconnect()
    navResizeObserver?.disconnect()
    window.removeEventListener('resize', setNavHeight)
    if (failsafeId !== null) window.clearTimeout(failsafeId)
  }
}
