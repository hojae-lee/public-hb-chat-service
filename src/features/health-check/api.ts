import { request } from '@shared/api/config'
import { isApiResponseError, handleApiError } from '@shared/api/error/handler'

export const healthCheck = async () => {
  try {
    const response = await request(
      `${import.meta.env.VITE_H_CHAT_API_URL}/api/health`
    )

    if (!response.ok) {
      throw {
        status: response.status,
        message: 'Health check failed'
      }
    }

    return response.json()
  } catch (error: unknown) {
    if (isApiResponseError(error)) {
      handleApiError(error.status)
      throw {
        status: error.status,
        message: error.message
      }
    }

    throw new Error('Health check failed')
  }
}
