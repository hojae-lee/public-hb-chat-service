import { createBrowserRouter } from 'react-router'
import { routes } from '@app/router/routes'

export const createRouter = () => {
  return createBrowserRouter(routes)
}
