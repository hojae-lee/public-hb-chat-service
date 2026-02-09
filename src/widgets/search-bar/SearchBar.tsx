import { useState } from 'react'
import { Search, ChevronUp, ChevronDown, X, Menu } from 'lucide-react'
import { useDebouncedCallback } from '@shared/lib/debounce'
import { IconButton } from '@shared/ui'
import { useHistoryStore } from '@features/manage-history/store'
import { useSearchStore } from '@features/search-messages/store'
import { SearchBarWrapper } from '@widgets/search-bar/SearchBar.styles'

type SearchBarProps = {
  onMenuClick: () => void
}

export const SearchBar = ({ onMenuClick }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const currentMessages = useHistoryStore((s) => s.currentMessages)
  const {
    keyword,
    resultIds,
    currentIndex,
    search,
    nextResult,
    previousResult,
    reset
  } = useSearchStore()

  const debouncedSearch = useDebouncedCallback(
    (value: string) => search(currentMessages, value),
    150
  )

  const handleChange = (value: string) => {
    setSearchValue(value)
    debouncedSearch(value)
  }

  const resultCount = resultIds.length
  const showResults = keyword.length > 0

  return (
    <SearchBarWrapper role="search" aria-label="대화 검색">
      <div className="menu-button">
        <IconButton aria-label="메뉴 열기" onClick={onMenuClick}>
          <Menu size={20} />
        </IconButton>
      </div>

      <div className="search-bar-inner">
        <div className={`search-wrapper ${showResults ? 'active' : ''}`}>
          <Search size={16} className="search-icon" aria-hidden="true" />
          <input
            id="conversation-search"
            name="search"
            type="text"
            className="search-input"
            value={searchValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="대화 검색..."
            aria-label="검색어 입력"
          />
          {showResults && (
            <>
              <span className="result-info" aria-live="polite">
                {resultCount > 0
                  ? `${currentIndex + 1}/${resultCount}`
                  : '결과 없음'}
              </span>
              <div className="navigation-buttons">
                <IconButton
                  aria-label="이전 결과"
                  size="sm"
                  onClick={previousResult}
                  disabled={resultCount === 0}
                >
                  <ChevronUp size={16} />
                </IconButton>
                <IconButton
                  aria-label="다음 결과"
                  size="sm"
                  onClick={nextResult}
                  disabled={resultCount === 0}
                >
                  <ChevronDown size={16} />
                </IconButton>
              </div>
              <IconButton aria-label="검색 닫기" size="sm" onClick={reset}>
                <X size={16} />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </SearchBarWrapper>
  )
}
