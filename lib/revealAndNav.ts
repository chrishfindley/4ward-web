/**
 * Measure fixed nav height for hero offset (--nav-height).
 * Restore scroll-reveal interactions with a safe no-IO fallback.
 */
export function setupRevealAndNav(): () => void {
  try {
    const root = document.documentElement
    const nav = document.querySelector('.nav') as HTMLElement | null
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

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

    let revealObserver: IntersectionObserver | null = null
    if (revealNodes.length > 0) {
      if (typeof IntersectionObserver === 'undefined') {
        revealNodes.forEach((el) => el.classList.add('visible'))
      } else {
        revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const target = entry.target as HTMLElement
              if (entry.isIntersecting) {
                target.classList.add('visible')
              } else {
                target.classList.remove('visible')
              }
            })
          },
          { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
        )

        revealNodes.forEach((el) => revealObserver?.observe(el))
      }
    }

    return () => {
      revealObserver?.disconnect()
      navResizeObserver?.disconnect()
      window.removeEventListener('resize', setNavHeight)
    }
  } catch {
    return () => {}
  }
}
