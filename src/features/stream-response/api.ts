import { request } from '@shared/api/config'
import { isApiResponseError } from '@shared/api/error/handler'
import { type Message, type MessageRole, MESSAGE_ROLE } from '@entities/message'

type StreamChatOptions = {
  messages: Message[]
  model: string
  systemPrompt?: string
  onChunk: (chunk: string) => void
  signal?: AbortSignal
}

export type StreamChatResponse = {
  fullContent: string
  isCompleted: boolean
}

export const streamChat = async ({
  messages,
  model,
  systemPrompt,
  onChunk,
  signal
}: StreamChatOptions): Promise<StreamChatResponse> => {
  const systemMessage = systemPrompt
    ? [{ role: MESSAGE_ROLE.SYSTEM as MessageRole, content: systemPrompt }]
    : []
  messages.map((m) => ({
    role: m.role,
    content: m.content
  }))
  const input = [
    ...systemMessage,
    ...messages.map((m) => ({ role: m.role, content: m.content }))
  ]

  try {
    const response = await request(
      `${import.meta.env.VITE_H_CHAT_API_URL}/api/chat/stream`,
      {
        method: 'POST',
        headers: {
          Accept: 'text/event-stream'
        },
        body: {
          model,
          input
        },
        signal
      }
    )

    if (!response.body) {
      throw new Error('Response body is not readable')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let fullContent = ''
    let isCompleted = false
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        // 새로운 청크를 버퍼에 추가
        buffer += decoder.decode(value, { stream: true })

        // SSE 이벤트는 \n\n으로 구분됨
        const events = buffer.split('\n\n')

        // 마지막 부분은 불완전할 수 있으므로 다시 버퍼에 저장
        buffer = events.pop() || ''

        for (const event of events) {
          if (!event.trim()) continue

          const lines = event.split('\n')
          let eventType: string | null = null
          let eventData: string | null = null

          // SSE 형식 파싱
          for (const line of lines) {
            if (line.startsWith('event: ')) {
              eventType = line.slice(7).trim()
            } else if (line.startsWith('data: ')) {
              eventData = line.slice(6).trim()
            }
          }

          if (!eventData) continue

          try {
            // 에러 이벤트 처리
            if (eventType === 'error') {
              const errorPayload = JSON.parse(eventData) as { message?: string }
              throw new Error(errorPayload?.message ?? 'Stream error occurred')
            }

            // 데이터 이벤트 파싱
            const parsedData = JSON.parse(eventData)

            // 텍스트 델타 처리
            if (parsedData?.type === 'response.output_text.delta') {
              const delta = parsedData.delta ?? ''
              if (delta) {
                fullContent += delta
                onChunk(delta)
              }
            }

            // 완료 이벤트 처리
            if (parsedData?.type === 'response.completed') {
              isCompleted = true
            }
          } catch (parseError) {
            // JSON 파싱 에러는 무시 (불완전한 청크일 수 있음)
            if (parseError instanceof SyntaxError) continue
            throw parseError
          }
        }
      }

      return {
        fullContent,
        isCompleted
      }
    } finally {
      reader.releaseLock()
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw {
        fullContent: '',
        isCompleted: false,
        status: 408,
        message: 'AbortError'
      }
    }

    if (isApiResponseError(error)) {
      throw {
        status: error.status,
        message: error.message
      }
    }

    throw {
      status: 500,
      message: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
    }
  }
}
