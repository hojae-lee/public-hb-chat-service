import { toast } from 'sonner'
import { errorMessages } from '@shared/api/error/messages'
import type { ApiErrorType, ApiResponseError } from '@shared/api/error/types'

export const getErrorType = (status: number): ApiErrorType => {
  if (status === 0) return 'NETWORK_ERROR'
  if (status === 401) return 'UNAUTHORIZED'
  if (status === 403) return 'FORBIDDEN'
  if (status === 404) return 'NOT_FOUND'
  if (status === 429) return 'RATE_LIMIT'
  if (status >= 500) return 'SERVER_ERROR'
  return 'UNKNOWN'
}

export const handleApiError = (status: number): void => {
  const errorType = getErrorType(status)
  const message = errorMessages[errorType]
  toast.error(message)
}

export const handleNetworkError = (): void => {
  toast.error(errorMessages.NETWORK_ERROR)
}

export const isApiResponseError = (e: unknown): e is ApiResponseError => {
  return typeof e === 'object' && e !== null && 'status' in e && 'message' in e
}
