import fullRoutes from '@routes/full-routes'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { matchRoutes } from 'react-router-config'
import { LinkProps } from 'react-router-dom'
import { mergeRefs } from 'services/utils'

export enum PreloadMode {
  onView = 'onView',
  onFocus = 'onFocus',
}

/** Matches all routes against a given location (to) and preloads found ones */
export const usePreloadController = (
  to: LinkProps['to'],
  preloadMode: PreloadMode,
) => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    fallbackInView: true,
  })
  const ref = useRef<HTMLElement>(null)

  const preload = () => {
    const matchedRoutes = matchRoutes(fullRoutes, to as string)
    if (matchedRoutes) {
      for (const route of matchedRoutes.map(({ route }) => route)) {
        route['preload']?.()
      }
    }
  }

  useEffect(() => {
    const currentRef = ref.current

    if (preloadMode === PreloadMode.onView && inView) {
      preload()
    }

    if (preloadMode === PreloadMode.onFocus && currentRef) {
      currentRef.addEventListener('focus', preload)
      currentRef.addEventListener('mousemove', preload)
    }

    return () => {
      currentRef?.removeEventListener('focus', preload)
      currentRef?.removeEventListener('mousemove', preload)
    }
  }, [ref, inView, to])

  return mergeRefs([ref, inViewRef])
}

// Usage
// Then pass both refs to the element/component that needs them
