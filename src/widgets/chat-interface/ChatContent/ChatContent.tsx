import { useRef, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router'
import { handleApiError, isApiResponseError } from '@shared/api/error/handler'
import { now } from '@shared/lib/dateFormat'
import { getAvailableModels, type ModelAttribute } from '@shared/lib/models'
import { type Message, MESSAGE_ROLE } from '@entities/message'
import { usePromptStore } from '@features/configure-prompt/store'
import { useConversationDraftStore } from '@features/conversation-draft/store'
import { useHistoryStore } from '@features/manage-history/store'
import { useSearchStore } from '@features/search-messages/store'
import { streamChat } from '@features/stream-response/api'
import { useStreamStore } from '@features/stream-response/store'
import {
  ChatContentWrapper,
  ChatContentContentWrapper,
  BottomSection
} from '@widgets/chat-interface/ChatContent/ChatContent.styles'
import { MessageInput } from '@widgets/chat-interface/Message/MessageInput'
import { MessageList } from '@widgets/chat-interface/Message/MessageList'
import { PromptModeBar } from '@widgets/chat-interface/Message/PromptModeBar'
import { SearchStateBar } from '@widgets/chat-interface/SearchStateBar/SearchStateBar'
import { WelcomeScreen } from '@widgets/chat-interface/WelcomeScreen/WelcomeScreen'
import { PromptModal } from '@widgets/configure-prompt/PromptModal'

const defaultModel = getAvailableModels()[0].id as ModelAttribute['id']

type LocationSearchState = {
  searchKeyword?: string
  highlightMessageId?: string
}

export const ChatContent = () => {
  const abortControllerRef = useRef<AbortController | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const skipScrollToEndRef = useRef(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { conversationId } = useParams<{ conversationId?: string }>()

  const {
    currentConversationId,
    currentMessages,
    createConversation,
    addMessage,
    updateCurrentConversationPrompt
  } = useHistoryStore()
  const { setSearchFromNavigation } = useSearchStore()
  const draftKey = currentConversationId ?? 'new'
  const inputValue = useConversationDraftStore(
    (s) => s.draftByConversationId[draftKey] ?? ''
  )
  const setDraft = useConversationDraftStore((s) => s.setDraft)
  const setInputValue = (value: string) =>
    setDraft(currentConversationId, value)

  const state = location.state as LocationSearchState | null
  if (state?.searchKeyword && state?.highlightMessageId) {
    skipScrollToEndRef.current = true
  }

  useEffect(() => {
    if (
      !state?.searchKeyword ||
      !state?.highlightMessageId ||
      conversationId !== currentConversationId ||
      currentMessages.length === 0
    ) {
      return
    }
    setSearchFromNavigation(
      state.searchKeyword,
      state.highlightMessageId,
      currentMessages
    )
    navigate(location.pathname, { replace: true, state: undefined })
  }, [
    state?.searchKeyword,
    state?.highlightMessageId,
    conversationId,
    currentConversationId,
    currentMessages,
    setSearchFromNavigation,
    navigate,
    location.pathname
  ])

  useEffect(() => {
    if (!conversationId) return
    if (skipScrollToEndRef.current) {
      skipScrollToEndRef.current = false
      return
    }
    const el = scrollContainerRef.current
    if (!el) return
    const id = requestAnimationFrame(() => {
      el.scrollIntoView({ block: 'end' })
    })
    return () => cancelAnimationFrame(id)
  }, [conversationId, currentMessages.length])

  const model = useHistoryStore((s) => {
    const conversation = s.conversations.find(
      (c) => c.id === s.currentConversationId
    )
    return conversation?.model ?? defaultModel
  })
  const systemPrompt = useHistoryStore((s) => {
    const conversation = s.conversations.find(
      (c) => c.id === s.currentConversationId
    )
    return conversation?.systemPrompt ?? ''
  })

  const {
    isStreaming,
    startStreaming,
    appendContent,
    stopStreaming,
    reset: resetStream
  } = useStreamStore()

  const { isModalOpen, closeModal } = usePromptStore()

  const handleSendMessage = async (content: string) => {
    if (isStreaming) return

    let conversationId = currentConversationId
    if (!conversationId) {
      conversationId = createConversation()
      navigate(`/chat/${conversationId}`)
    }

    abortControllerRef.current = new AbortController()

    try {
      // 스트리밍 시작
      startStreaming()

      const userMessage: Message = {
        id: Date.now().toString(),
        role: MESSAGE_ROLE.USER,
        content,
        createdAt: now()
      }

      await addMessage(userMessage)
      const { fullContent } = await streamChat({
        messages: [...currentMessages, userMessage],
        model,
        systemPrompt,
        onChunk: appendContent,
        signal: abortControllerRef.current.signal
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: MESSAGE_ROLE.ASSISTANT,
        content: fullContent,
        createdAt: now()
      }

      await addMessage(assistantMessage)
    } catch (error) {
      if (isApiResponseError(error)) {
        handleApiError(error.status)
      }
      // 스트리밍 중단
      stopStreaming()
    } finally {
      abortControllerRef.current = null
      // 스트리밍 초기화
      resetStream()
    }
  }

  const handleCancelResponse = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    stopStreaming()
  }

  return (
    <>
      <ChatContentWrapper>
        <ChatContentContentWrapper>
          {conversationId ? <MessageList /> : <WelcomeScreen />}
        </ChatContentContentWrapper>
        <BottomSection>
          <SearchStateBar />
          <PromptModeBar onSelectMode={setInputValue} />
          <MessageInput
            key={currentConversationId ?? 'new'}
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            onCancel={handleCancelResponse}
          />
        </BottomSection>
        <div ref={scrollContainerRef} />
      </ChatContentWrapper>
      {isModalOpen && (
        <PromptModal
          isOpen={isModalOpen}
          initialPrompt={systemPrompt}
          onSave={(prompt) => {
            updateCurrentConversationPrompt({ systemPrompt: prompt })
            closeModal()
          }}
          onClose={closeModal}
        />
      )}
    </>
  )
}
