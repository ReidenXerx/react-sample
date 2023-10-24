/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@store/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ValidateRouteTypes } from 'types/common-types'

type FallbackUrlType = {
  fallbackUrl: string | undefined
}

export const ProtectedRoute = ({
  children,
  validate,
}: {
  children: JSX.Element
  validate?: ValidateRouteTypes
}) => {
  const args = useSelector((state: RootState) =>
    // TODO move to utils
    Object.entries(state).reduce((acc, [key, value]) => {
      if (validate?.argsList.includes(key)) {
        return { ...acc, key: value }
      }
      return acc
    }, {}),
  )

  const navigate = useNavigate()
  const validated = validate?.(
    args as { [key in keyof RootState]: any },
  ) as FallbackUrlType

  if (!validated?.fallbackUrl) {
    return children
  }

  navigate(validated?.fallbackUrl)
  return null
}
