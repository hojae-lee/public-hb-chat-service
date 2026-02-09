import { createRoot } from 'react-dom/client'
import { ReactRouterProvider } from '@app/providers/ReactRouterProvider'

createRoot(document.getElementById('root')!).render(<ReactRouterProvider />)
