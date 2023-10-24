import { Primitive } from 'types/common-types'

export const paths = {
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  userManagement: '/user-management',
  groupManagement: '/group-management',
  workspaces: '/workspaces',
  createWorkspace: '/create-workspace',
  chat: '/chat',
  permissionManagement: '/permission-management',
  '404': '/404',
}

export const constructComplexUrlWithParams = (
  baseUrl: string,
  params: { [key: string]: Primitive },
) => {
  const stringParams: { [key: string]: string } = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, String(value)]),
  )

  const urlParams = new URLSearchParams(stringParams)
  return `${baseUrl}?${urlParams.toString()}`
}
