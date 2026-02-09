import { useMemo, type RefObject, type ComponentPropsWithoutRef } from 'react'
import Highlighter from 'react-highlight-words'

type HighlightedTextProps = {
  searchWords: string[]
  textToHighlight: string
  highlightClassName?: string
  focusedHighlightIndex?: number | null
  focusedRef?: RefObject<HTMLElement | null>
}

// searchWords 배열에 있는 단어를 하이라이트 처리하는 컴포넌트
export const HighlightedText = ({
  searchWords,
  textToHighlight,
  highlightClassName = '',
  focusedHighlightIndex = null,
  focusedRef
}: HighlightedTextProps) => {
  'use no memo'

  const HighlightWrapper = useMemo(() => {
    let count = 0
    return ({
      children,
      highlightIndex: _highlightIndex,
      ...rest
    }: ComponentPropsWithoutRef<'mark'> & { highlightIndex?: number }) => {
      const currentIndex = count++
      // 포커스된 하이라이트 찾기
      const isFocused =
        focusedHighlightIndex !== null &&
        focusedHighlightIndex !== undefined &&
        currentIndex === focusedHighlightIndex

      return (
        <mark
          {...rest}
          ref={isFocused ? focusedRef : null}
          className={`${highlightClassName} ${isFocused ? `${highlightClassName}--focused` : ''}`}
        >
          {children}
        </mark>
      )
    }
  }, [highlightClassName, focusedHighlightIndex, focusedRef])

  return (
    <Highlighter
      searchWords={searchWords}
      textToHighlight={textToHighlight}
      autoEscape
      highlightClassName={highlightClassName}
      highlightTag={HighlightWrapper}
    />
  )
}
