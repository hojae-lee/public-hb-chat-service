import type { ReactNode } from 'react'
import { Global } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { globalStyles } from '@app/styles/AppProvider.styles'

const queryClient = new QueryClient()

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyles} />
      <Toaster position="bottom-right" richColors />
      {children}
    </QueryClientProvider>
  )
}
