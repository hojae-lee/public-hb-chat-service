import { SendHorizonal, Square, SquareTerminal } from 'lucide-react'
import { getAvailableModels, type ModelAttribute } from '@shared/lib/models'
import { Textarea, IconButton } from '@shared/ui'
import { usePromptStore } from '@features/configure-prompt/store'
import { useHistoryStore } from '@features/manage-history/store'
import { useStreamStore } from '@features/stream-response/store'
import { MessageInputWrapper } from '@widgets/chat-interface/Message/MessageInput/MessageInput.styles'
import { ModelSelector } from '@widgets/chat-interface/ModelSelector/ModelSelector'

type MessageInputProps = {
  value: string
  onChange: (value: string) => void
  onSend: (message: string) => void
  onCancel: () => void
}

const defaultModel = getAvailableModels()[0].id as ModelAttribute['id']

export const MessageInput = ({
  value,
  onChange,
  onSend,
  onCancel
}: MessageInputProps) => {
  const isStreaming = useStreamStore((s) => s.isStreaming)
  const { getModels, openModal } = usePromptStore()
  const {
    currentConversationId,
    conversations,
    updateCurrentConversationPrompt
  } = useHistoryStore()

  const model =
    conversations.find((c) => c.id === currentConversationId)?.model ??
    defaultModel

  const handleSubmit = () => {
    if (value.trim() && !isStreaming) {
      onSend(value.trim())
      onChange('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleModelChange = (modelId: ModelAttribute['id']) => {
    updateCurrentConversationPrompt({ model: modelId })
  }

  const models = getModels()

  return (
    <MessageInputWrapper>
      <form
        className="input-bar"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="input-area">
          <Textarea
            id="message-input"
            name="message"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="무엇이든 물어보세요"
            fullWidth
            aria-label="메시지 입력"
          />
        </div>
        <div className="bottom-row">
          <button
            type="button"
            className="prompt-settings-button"
            onClick={openModal}
            aria-label="시스템 프롬프트 설정"
          >
            <SquareTerminal size={18} />
            <span>프롬프트</span>
          </button>
          <div className="bottom-right">
            <ModelSelector
              models={models}
              selectedModel={model}
              onModelChange={handleModelChange}
            />
            {isStreaming ? (
              <IconButton
                className="send-button"
                aria-label="응답 취소"
                variant="danger"
                size="md"
                onClick={onCancel}
              >
                <Square size={22} />
              </IconButton>
            ) : (
              <IconButton
                className="send-button"
                aria-label="메시지 전송"
                variant="primary"
                size="md"
                disabled={!value.trim() || isStreaming}
                onClick={handleSubmit}
              >
                <SendHorizonal size={22} />
              </IconButton>
            )}
          </div>
        </div>
      </form>
    </MessageInputWrapper>
  )
}
