import { create } from 'zustand'

const NEW_CHAT_KEY = 'new'

type DraftState = {
  draftByConversationId: Record<string, string>
}

type DraftActions = {
  getDraft: (conversationId: string | null) => string
  setDraft: (conversationId: string | null, value: string) => void
}

export const useConversationDraftStore = create<DraftState & DraftActions>(
  (set, get) => ({
    draftByConversationId: {},

    getDraft: (conversationId) => {
      const key = conversationId ?? NEW_CHAT_KEY
      return get().draftByConversationId[key] ?? ''
    },

    setDraft: (conversationId, value) => {
      const key = conversationId ?? NEW_CHAT_KEY
      set((state) => ({
        draftByConversationId: {
          ...state.draftByConversationId,
          [key]: value
        }
      }))
    }
  })
)
