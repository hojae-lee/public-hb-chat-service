import { useRef } from 'react'
import { Spinner } from '@shared/ui'
import { useHistoryStore } from '@features/manage-history/store'
import { useSearchStore } from '@features/search-messages/store'
import { useStreamStore } from '@features/stream-response/store'
import { MessageItem } from '@widgets/chat-interface/Message/MessageItem'
import { MessageListWrapper } from '@widgets/chat-interface/Message/MessageList/MessageList.styles'

export const MessageList = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const currentMessages = useHistoryStore((s) => s.currentMessages)
  const { isStreaming, streamingContent } = useStreamStore()
  const { keyword, resultIds, resultHighlightIndices, currentIndex } =
    useSearchStore()

  const currentResultMessageId =
    resultIds.length > 0 ? resultIds[currentIndex] : null
  const currentResultHighlightIndex =
    resultHighlightIndices.length > 0 ? resultHighlightIndices[currentIndex] : 0

  return (
    <MessageListWrapper ref={containerRef} role="log" aria-label="메시지 목록">
      {currentMessages.map((message) => {
        const isHighlighted = message.id === currentResultMessageId

        return (
          <div
            key={message.id}
            className={
              message.role === 'user'
                ? 'message-row message-row--user'
                : 'message-row message-row--assistant'
            }
          >
            <MessageItem
              message={message}
              isHighlighted={isHighlighted}
              searchKeyword={keyword}
              highlightIndex={isHighlighted ? currentResultHighlightIndex : 0}
            />
          </div>
        )
      })}

      {streamingContent && (
        <div className="streaming-message">
          <div className="streaming-content">{streamingContent}</div>
        </div>
      )}

      {isStreaming && !streamingContent && (
        <div className="loading-wrapper">
          <Spinner size="md" />
        </div>
      )}
    </MessageListWrapper>
  )
}
