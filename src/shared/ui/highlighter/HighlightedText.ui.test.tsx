import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { HighlightedText } from '@shared/ui/highlighter/HighlightedText'

describe('HighlightedText: 검색어 하이라이팅', () => {
  it('1. searchWords가 비어 있으면 하이라이트용 mark가 없고 원문만 보인다', () => {
    const { container } = render(
      <HighlightedText searchWords={[]} textToHighlight="hello world" />
    )
    const marks = container.querySelectorAll('mark')
    expect(marks).toHaveLength(0)
    expect(screen.getByText('hello world')).toBeInTheDocument()
  })

  it('2. 단일 단어가 매칭되면 해당 단어가 mark 안에 렌더링된다', () => {
    const { container } = render(
      <HighlightedText searchWords={['hello']} textToHighlight="hello world" />
    )
    const marks = container.querySelectorAll('mark')
    expect(marks).toHaveLength(1)
    expect(marks[0]).toHaveTextContent('hello')
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('3. 같은 단어가 여러 번 나오면 각각 mark로 감싸진다', () => {
    const { container } = render(
      <HighlightedText
        searchWords={['테스트']}
        textToHighlight="테스트 또는 테스트"
      />
    )
    const marks = container.querySelectorAll('mark')
    expect(marks).toHaveLength(2)
    expect(marks[0]).toHaveTextContent('테스트')
    expect(marks[1]).toHaveTextContent('테스트')
  })

  it('4. focusedHighlightIndex가 0이면 첫 번째 mark에 포커스 클래스가 붙는다', () => {
    const { container } = render(
      <HighlightedText
        searchWords={['키워드']}
        textToHighlight="첫번째 키워드 두번째 키워드"
        highlightClassName="highlight-text"
        focusedHighlightIndex={0}
      />
    )
    const marks = container.querySelectorAll('mark')
    expect(marks).toHaveLength(2)
    expect(marks[0].className).toContain('highlight-text--focused')
    expect(marks[1].className).not.toContain('highlight-text--focused')
  })

  it('5. searchWords가 여러 개면 각 단어가 각각 mark로 감싸진다', () => {
    const { container } = render(
      <HighlightedText
        searchWords={['가', '나']}
        textToHighlight="가 그리고 나"
      />
    )
    const marks = container.querySelectorAll('mark')
    expect(marks.length).toBeGreaterThanOrEqual(2)
    expect(marks[0]).toHaveTextContent('가')
  })

  it('6. focusedRef를 넘기면 focusedHighlightIndex에 해당하는 mark가 ref에 담긴다', () => {
    const focusedRef = createRef<HTMLElement | null>()
    const { container } = render(
      <HighlightedText
        searchWords={['가']}
        textToHighlight="a 가 b 나 c"
        highlightClassName="hl"
        focusedHighlightIndex={0}
        focusedRef={focusedRef}
      />
    )
    const marks = container.querySelectorAll('mark')
    expect(focusedRef.current?.textContent).toBe(marks[0].textContent)
  })
})
