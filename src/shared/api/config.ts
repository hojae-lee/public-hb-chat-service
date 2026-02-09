export type HttpError = { message: string; status: number }

export type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: unknown
  signal?: AbortSignal
}

export const request = async (
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const { method = 'GET', headers = {}, body, signal } = options
  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined,
    signal
  })

  if (!response.ok) {
    const err: HttpError = { message: 'HTTP Error', status: response.status }
    throw err
  }

  return response
}
