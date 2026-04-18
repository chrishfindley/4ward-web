/**
 * Measure fixed nav height for hero offset (--nav-height).
 * Scroll-reveal is CSS-only now (see globals.css); do not hide content behind JS.
 */
export function setupRevealAndNav(): () => void {
  try {
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

    return () => {
      navResizeObserver?.disconnect()
      window.removeEventListener('resize', setNavHeight)
    }
  } catch {
    return () => {}
  }
}
