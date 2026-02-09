import { create } from 'zustand'
import type { Message } from '@entities/message/types'

type SearchState = {
  keyword: string
  resultIds: string[]
  resultHighlightIndices: number[]
  currentIndex: number
}

type SearchActions = {
  search: (messages: Message[], keyword: string) => void
  setSearchFromNavigation: (
    keyword: string,
    messageId: string,
    messages: Message[]
  ) => void
  nextResult: () => void
  previousResult: () => void
  reset: () => void
}

const initialState: SearchState = {
  keyword: '',
  resultIds: [],
  resultHighlightIndices: [],
  currentIndex: 0
}

// 메시지 내에서 키워드가 몇 번 나타나는지 계산
const countKeywordInMessage = (content: string, keyword: string): number => {
  if (!keyword.trim()) return 0
  const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
  const matches = content.match(regex)
  return matches ? matches.length : 0
}

export const useSearchStore = create<SearchState & SearchActions>(
  (set, get) => ({
    ...initialState,

    search: (messages, keyword) => {
      const trimmedKeyword = keyword.trim().toLowerCase()
      if (!trimmedKeyword) {
        set(initialState)
        return
      }

      const results: { messageId: string; highlightIndex: number }[] = []

      for (const message of messages) {
        const count = countKeywordInMessage(message.content, trimmedKeyword)
        for (let i = 0; i < count; i++) {
          results.push({
            messageId: message.id,
            highlightIndex: i
          })
        }
      }
      set({
        keyword: trimmedKeyword,
        resultIds: results.map((r) => r.messageId),
        resultHighlightIndices: results.map((r) => r.highlightIndex),
        currentIndex: results.length > 0 ? 0 : 0
      })
    },

    setSearchFromNavigation: (keyword, messageId, messages) => {
      const trimmedKeyword = keyword.trim().toLowerCase()
      if (!trimmedKeyword) {
        set(initialState)
        return
      }

      const results: { messageId: string; highlightIndex: number }[] = []
      let targetIndex = 0

      messages.forEach((message) => {
        const count = countKeywordInMessage(message.content, trimmedKeyword)
        if (count > 0) {
          for (let i = 0; i < count; i++) {
            if (message.id === messageId && i === 0) {
              targetIndex = results.length
            }
            results.push({
              messageId: message.id,
              highlightIndex: i
            })
          }
        }
      })

      set({
        keyword: trimmedKeyword,
        resultIds: results.map((r) => r.messageId),
        resultHighlightIndices: results.map((r) => r.highlightIndex),
        currentIndex: targetIndex
      })
    },

    nextResult: () => {
      const { resultIds, currentIndex } = get()
      if (resultIds.length === 0) return
      set({
        currentIndex: (currentIndex + 1) % resultIds.length
      })
    },

    previousResult: () => {
      const { resultIds, currentIndex } = get()
      if (resultIds.length === 0) return
      set({
        currentIndex:
          currentIndex === 0 ? resultIds.length - 1 : currentIndex - 1
      })
    },

    reset: () => set(initialState)
  })
)
