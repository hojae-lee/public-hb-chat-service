import type { MessageRole } from '@entities/message/types'

export const MESSAGE_ROLE: Record<string, MessageRole> = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system'
}
