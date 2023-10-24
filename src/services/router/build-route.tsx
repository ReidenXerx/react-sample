import promiseRetry from 'promise-retry'
import { ComponentType, Suspense } from 'react'
import lazyWithPreload from 'react-lazy-with-preload'
import { RouteObject } from 'react-router-dom'
import { ValidateRouteTypes } from 'types/common-types'

import { ProtectedRoute } from './protected-route'

/** Extending RouteObject with the function to preload lazy component in advance */
export type RouteExtended = RouteObject & {
  preload?: () => Promise<ComponentType<any>>
}

export const buildRoute = ({
  path,
  factory,
  children,
  validate,
}: {
  path: string
  factory: () => Promise<{ default: ComponentType<any> }>
  children?: Array<RouteExtended>
  validate?: ValidateRouteTypes
}): RouteExtended => {
  const Component = lazyWithPreload(() =>
    promiseRetry((retry) => factory().catch(retry), {
      retries: 3,
    }),
  )

  return {
    path,
    children,
    preload: Component.preload,
    element: (
      <ProtectedRoute validate={validate}>
        <Suspense fallback={<></>}>
          <Component />
        </Suspense>
      </ProtectedRoute>
    ),
  }
}
