import { useEffect, useCallback, useRef } from 'react'
import { Search, ChevronUp, ChevronDown, X } from 'lucide-react'
import { IconButton } from '@shared/ui'
import { useHistoryStore } from '@features/manage-history/store'
import { useSearchStore } from '@features/search-messages/store'
import {
  SearchStateBarWrapper,
  SearchStateBarInner
} from '@widgets/chat-interface/SearchStateBar/SearchStateBar.styles'

export const SearchStateBar = () => {
  'use no memo'
  const inputRef = useRef<HTMLInputElement>(null)
  const currentMessages = useHistoryStore((s) => s.currentMessages)
  const {
    keyword: searchKeyword,
    resultIds,
    currentIndex,
    nextResult,
    previousResult,
    search,
    reset: resetSearch
  } = useSearchStore()

  const hasActiveSearch = searchKeyword?.trim().length > 0
  const resultCount = resultIds.length

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchKeyword
    }
  }, [searchKeyword])

  useEffect(() => {
    if (!hasActiveSearch) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetSearch()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasActiveSearch, resetSearch])

  const runSearch = useCallback(() => {
    const trimmed = inputRef.current?.value.trim()
    if (!trimmed) return
    search(currentMessages, trimmed)
  }, [currentMessages, search])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      runSearch()
    }
  }

  if (!hasActiveSearch) return null

  return (
    <SearchStateBarWrapper>
      <SearchStateBarInner role="status" aria-label="검색 상태">
        <div className="search-state-input-wrap">
          <Search size={14} aria-hidden className="search-state-icon" />
          <input
            ref={inputRef}
            type="search"
            className="search-state-input"
            placeholder="검색어 입력 또는 추가 검색..."
            defaultValue={searchKeyword}
            onKeyDown={handleKeyDown}
            aria-label="검색어 입력 또는 추가 검색"
            autoComplete="off"
          />
        </div>
        {resultCount > 0 && (
          <div className="search-state-nav">
            <IconButton
              aria-label="이전 결과"
              size="sm"
              onClick={previousResult}
              disabled={resultCount === 0}
            >
              <ChevronUp size={14} />
            </IconButton>
            <span
              className="search-state-nav-count"
              aria-live="polite"
              aria-label={`${currentIndex + 1}번째 / 총 ${resultCount}개`}
            >
              {currentIndex + 1}/{resultCount}
            </span>
            <IconButton
              aria-label="다음 결과"
              size="sm"
              onClick={nextResult}
              disabled={resultCount === 0}
            >
              <ChevronDown size={14} />
            </IconButton>
          </div>
        )}
        <IconButton aria-label="검색 취소" size="sm" onClick={resetSearch}>
          <X size={16} />
        </IconButton>
      </SearchStateBarInner>
    </SearchStateBarWrapper>
  )
}
