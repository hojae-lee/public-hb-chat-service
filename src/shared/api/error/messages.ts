import type { ApiErrorType } from '@shared/api/error/types'

export const errorMessages: Record<ApiErrorType, string> = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  RATE_LIMIT: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  UNAUTHORIZED: 'API 키가 올바르지 않습니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  SERVER_ERROR: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
  HEALTH_CHECK_FAILED: '서비스에 연결할 수 없습니다. 서버 상태를 확인해주세요.'
}
