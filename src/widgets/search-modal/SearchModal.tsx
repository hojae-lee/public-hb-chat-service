import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useDebouncedCallback } from '@shared/lib/debounce'
import { IconButton, Text } from '@shared/ui'
import { useHistoryStore } from '@features/manage-history/store'
import {
  searchAllConversations,
  type GlobalSearchResult
} from '@features/search-messages/searchAlgorithm'
import { SearchModalWrapper } from '@widgets/search-modal/SearchModal.styles'

type SearchModalProps = {
  isOpen: boolean
  onClose: () => void
  onSelectResult: (
    conversationId: string,
    messageId: string,
    keyword: string
  ) => void
}

export const SearchModal = ({
  isOpen,
  onClose,
  onSelectResult
}: SearchModalProps) => {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<GlobalSearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const conversations = useHistoryStore((s) => s.conversations)
  const loadConversations = useHistoryStore((s) => s.loadConversations)

  const runSearch = useDebouncedCallback((value: string) => {
    if (!value.trim()) {
      setResults([])
      return
    }
    const list = searchAllConversations(conversations, value)
    setResults(list)
  }, 200)

  useEffect(() => {
    if (isOpen) {
      if (conversations.length === 0) {
        loadConversations()
      }
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [isOpen, loadConversations, conversations.length])

  useEffect(() => {
    runSearch(keyword)
  }, [keyword, runSearch, conversations.length])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSelect = (item: GlobalSearchResult) => {
    onSelectResult(item.conversationId, item.messageId, keyword.trim())
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <SearchModalWrapper
      $isOpen={isOpen}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      aria-label="채팅 검색"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <Text variant="h3" as="h2" id="search-modal-title">
            채팅 검색
          </Text>
          <IconButton aria-label="닫기" onClick={onClose}>
            <X size={20} />
          </IconButton>
        </div>
        <div className="search-input-wrap">
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="전체 대화에서 검색..."
            value={keyword}
            onChange={handleChange}
            aria-label="검색어 입력"
            autoComplete="off"
          />
        </div>
        <div className="results-list">
          {keyword.trim() && results.length === 0 && (
            <div className="empty-state" role="status">
              검색 결과가 없습니다.
            </div>
          )}
          {!keyword.trim() && (
            <div className="empty-state" role="status">
              검색어를 입력하세요.
            </div>
          )}
          {results.map((item) => (
            <button
              key={`${item.conversationId}-${item.messageId}`}
              type="button"
              className="result-item"
              onClick={() => handleSelect(item)}
            >
              <div className="result-title">{item.conversationTitle}</div>
              <div className="result-snippet">{item.snippet}</div>
            </button>
          ))}
        </div>
      </div>
    </SearchModalWrapper>
  )

  return createPortal(modalContent, document.body)
}
