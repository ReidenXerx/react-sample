import { Navigate } from 'react-router-dom'

import { Typography } from '@mui/material'
import { RouteExtended, buildRoute } from '../build-route'
import { paths } from '../paths'

export const authRoutes: Array<RouteExtended> = [
  buildRoute({
    path: paths.login,
    factory: () => import('pages/login'),
  }),
  buildRoute({
    path: paths['404'],
    factory: () => import('pages/404'),
  }),
  buildRoute({
    path: paths.userManagement,
    factory: () => import('pages/user-management'),
  }),
  buildRoute({
    path: paths.groupManagement,
    factory: () => import('pages/group-management'),
  }),

  buildRoute({
    path: paths.workspaces,
    factory: () => import('pages/workspaces'),
  }),

  buildRoute({
    path: paths.createWorkspace,
    factory: () => import('pages/workspace-create'),
  }),

  buildRoute({
    path: paths.chat,
    factory: () => import('pages/chat'),
  }),
  buildRoute({
    path: paths.permissionManagement,
    factory: () => import('pages/permission-management'),
  }),
  {
    index: true,
    element: <Navigate to={paths['404']} />,
  },
  {
    path: '*',
    element: <Typography>Not found</Typography>,
  },
]
