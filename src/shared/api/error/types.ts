export type ApiErrorType =
  | 'NETWORK_ERROR'
  | 'RATE_LIMIT'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'SERVER_ERROR'
  | 'UNKNOWN'
  | 'HEALTH_CHECK_FAILED'

export type ApiResponseError = {
  status: number
  message: string
}
