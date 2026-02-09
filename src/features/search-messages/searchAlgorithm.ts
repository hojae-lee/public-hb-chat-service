import type { Conversation } from '@entities/conversation/types'
import type { Message } from '@entities/message/types'

type SearchResult = {
  messageId: string
  indices: number[]
}

export type GlobalSearchResult = {
  conversationId: string
  conversationTitle: string
  messageId: string
  snippet: string
}
/**
 * 키워드 주변 텍스트를 추출하여 미리보기 스니펫 생성 (검색 모달에서 간단하게 보여주기 사용)
 */
const getSnippet = (
  content: string,
  keyword: string,
  radius: number = 30
): string => {
  if (!keyword.trim()) return content.slice(0, 60)
  const lower = content.toLowerCase()
  const lowerKeyword = keyword.toLowerCase()
  const idx = lower.indexOf(lowerKeyword)
  if (idx === -1) return content.slice(0, 60)
  const start = Math.max(0, idx - radius)
  const end = Math.min(content.length, idx + keyword.length + radius)
  const snippet = content.slice(start, end)
  return (
    (start > 0 ? '...' : '') + snippet + (end < content.length ? '...' : '')
  )
}

/**
 * 모든 대화에서 키워드를 검색하여 결과 반환
 */
export const searchAllConversations = (
  conversations: Conversation[],
  keyword: string
): GlobalSearchResult[] => {
  if (!keyword.trim()) return []

  const results: GlobalSearchResult[] = []

  for (const conversation of conversations) {
    const perMessage = searchMessages(conversation.messages, keyword)
    for (const message of conversation.messages) {
      const hit = perMessage.find((r) => r.messageId === message.id)
      if (hit) {
        results.push({
          conversationId: conversation.id,
          conversationTitle: conversation.title,
          messageId: message.id,
          snippet: getSnippet(message.content, keyword)
        })
      }
    }
  }

  return results
}

/**
 * 메시지 배열에서 키워드가 등장하는 모든 위치 검색
 */
export const searchMessages = (
  messages: Message[],
  keyword: string
): SearchResult[] => {
  if (!keyword.trim()) return []

  const lowerKeyword = keyword.toLowerCase()
  const results: SearchResult[] = []

  for (const message of messages) {
    const content = message.content.toLowerCase()
    const indices: number[] = []
    let startIndex = 0

    while (true) {
      const index = content.indexOf(lowerKeyword, startIndex)
      if (index === -1) break
      indices.push(index)
      startIndex = index + 1
    }

    if (indices.length > 0) {
      // 메시지 id와 키워드가 등장하는 위치 인덱스를 결과에 추가
      results.push({ messageId: message.id, indices })
    }
  }

  return results
}
