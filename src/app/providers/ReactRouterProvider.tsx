import { RouterProvider } from 'react-router'
import { createRouter } from '@app/router/createRouter'

export const ReactRouterProvider = () => {
  const router = createRouter()

  return <RouterProvider router={router} />
}
