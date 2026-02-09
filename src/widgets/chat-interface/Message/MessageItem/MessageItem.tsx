import { useEffect, useRef } from 'react'
import { Markdown, MarkdownWrapper, HighlightedText } from '@shared/ui'
import type { Message } from '@entities/message/types'
import { MessageItemWrapper } from '@widgets/chat-interface/Message/MessageItem/MessageItem.styles'

type MessageItemProps = {
  message: Message
  isHighlighted: boolean
  searchKeyword: string
  highlightIndex?: number
}

export const MessageItem = ({
  message,
  isHighlighted,
  searchKeyword,
  highlightIndex = 0
}: MessageItemProps) => {
  const hasKeyword = searchKeyword?.trim().length > 0
  const highlightRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isHighlighted && highlightRef.current) {
      highlightRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [isHighlighted, highlightIndex])

  return (
    <MessageItemWrapper
      $role={message.role}
      $isHighlighted={isHighlighted}
      role="article"
      aria-label={`${message.role === 'user' ? '사용자' : 'AI'} 메시지`}
    >
      <div className="message-content">
        {hasKeyword ? (
          <MarkdownWrapper>
            <HighlightedText
              searchWords={[searchKeyword]}
              textToHighlight={message.content}
              highlightClassName="highlight-text"
              focusedHighlightIndex={isHighlighted ? highlightIndex : null}
              focusedRef={highlightRef}
            />
          </MarkdownWrapper>
        ) : (
          <Markdown content={message.content} />
        )}
      </div>
    </MessageItemWrapper>
  )
}
