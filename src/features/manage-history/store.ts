import { create } from 'zustand'
import { now } from '@shared/lib/dateFormat'
import { getAvailableModels, type ModelAttribute } from '@shared/lib/models'
import type { Conversation } from '@entities/conversation/types'
import type { Message } from '@entities/message/types'
import {
  getAllConversations,
  getConversation,
  saveConversation,
  deleteConversation
} from '@features/manage-history/api'

const DEFAULT_MODEL = getAvailableModels()[0].id as ModelAttribute['id']

type HistoryState = {
  conversations: Conversation[]
  currentConversationId: string | null
  currentMessages: Message[]
  isLoading: boolean
}

type HistoryActions = {
  loadConversations: () => Promise<void>
  selectConversation: (id: string) => Promise<void>
  createConversation: () => string
  addMessage: (message: Message) => Promise<void>
  updateConversationTitle: (id: string, title: string) => Promise<void>
  updateCurrentConversationPrompt: (payload: {
    model?: string
    systemPrompt?: string
  }) => Promise<void>
  removeConversation: (id: string) => Promise<void>
  clearCurrentConversation: () => void
}

const initialState: HistoryState = {
  conversations: [],
  currentConversationId: null,
  currentMessages: [],
  isLoading: false
}

export const useHistoryStore = create<HistoryState & HistoryActions>(
  (set, get) => ({
    ...initialState,

    loadConversations: async () => {
      set({ isLoading: true })
      const conversations = await getAllConversations()
      set({ conversations, isLoading: false })
    },

    selectConversation: async (id) => {
      const conversation = await getConversation(id)
      if (conversation) {
        set((state) => ({
          currentConversationId: id,
          currentMessages: conversation.messages,
          conversations: state.conversations.map((c) =>
            c.id === id ? conversation : c
          )
        }))
      }
    },

    createConversation: () => {
      const newId = Date.now().toString()
      const newConversation: Conversation = {
        id: newId,
        title: '새 대화',
        messages: [],
        createdAt: now(),
        updatedAt: now(),
        model: DEFAULT_MODEL,
        systemPrompt: ''
      }

      set((state) => ({
        conversations: [newConversation, ...state.conversations],
        currentConversationId: newId,
        currentMessages: []
      }))

      saveConversation(newConversation)
      return newId
    },

    addMessage: async (message) => {
      const { currentConversationId, currentMessages, conversations } = get()

      if (!currentConversationId) return

      const newMessages = [...currentMessages, message]

      set({ currentMessages: newMessages })

      const conversation = conversations.find(
        (c) => c.id === currentConversationId
      )
      if (conversation) {
        const updatedConversation: Conversation = {
          ...conversation,
          messages: newMessages,
          title:
            conversation.title === '새 대화' && message.role === 'user'
              ? message.content.slice(0, 30) +
                (message.content.length > 30 ? '...' : '')
              : conversation.title,
          updatedAt: now()
        }

        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === currentConversationId ? updatedConversation : c
          )
        }))

        await saveConversation(updatedConversation)
      }
    },

    updateConversationTitle: async (id, title) => {
      const { conversations } = get()
      const conversation = conversations.find((c) => c.id === id)

      if (conversation) {
        const updatedConversation: Conversation = {
          ...conversation,
          title,
          updatedAt: now()
        }

        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? updatedConversation : c
          )
        }))

        await saveConversation(updatedConversation)
      }
    },

    updateCurrentConversationPrompt: async (payload) => {
      const { currentConversationId, conversations } = get()
      if (!currentConversationId) return

      const conversation = conversations.find(
        (c) => c.id === currentConversationId
      )
      if (!conversation) return

      const updatedConversation: Conversation = {
        ...conversation,
        ...(payload.model !== undefined && { model: payload.model }),
        ...(payload.systemPrompt !== undefined && {
          systemPrompt: payload.systemPrompt
        }),
        updatedAt: now()
      }

      set((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === currentConversationId ? updatedConversation : c
        )
      }))

      await saveConversation(updatedConversation)
    },

    removeConversation: async (id) => {
      const { currentConversationId } = get()

      await deleteConversation(id)

      set((state) => ({
        conversations: state.conversations.filter((c) => c.id !== id),
        currentConversationId:
          currentConversationId === id ? null : currentConversationId,
        currentMessages:
          currentConversationId === id ? [] : state.currentMessages
      }))
    },

    clearCurrentConversation: () => {
      set({
        currentConversationId: null,
        currentMessages: []
      })
    }
  })
)
