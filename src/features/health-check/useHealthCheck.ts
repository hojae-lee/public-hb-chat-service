import { queryOptions, useQuery } from '@tanstack/react-query'
import { healthCheck } from '@features/health-check/api'

// factory pattern
const healthQueryKeys = {
  all: ['health'] as const
}

export const healthQueries = {
  health: () =>
    queryOptions({
      queryKey: healthQueryKeys.all,
      queryFn: healthCheck,
      staleTime: Infinity,
      retry: 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    })
}

export const useHealthCheck = () => {
  return useQuery(healthQueries.health())
}
