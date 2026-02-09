import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import type { Message } from '@entities/message/types'
import { MessageList } from '@widgets/chat-interface/Message/MessageList'

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'Hello',
    createdAt: '2025-01-01T00:00:00Z'
  }
]

vi.mock('@features/manage-history/store', () => ({
  useHistoryStore: (selector: (s: { currentMessages: Message[] }) => unknown) =>
    selector({ currentMessages: mockMessages })
}))

let mockIsStreaming = false
let mockStreamingContent = ''

vi.mock('@features/stream-response/store', () => ({
  useStreamStore: () => ({
    isStreaming: mockIsStreaming,
    streamingContent: mockStreamingContent
  })
}))

vi.mock('@features/search-messages/store', () => ({
  useSearchStore: () => ({
    keyword: '',
    resultIds: [] as string[],
    resultHighlightIndices: [] as number[],
    currentIndex: 0
  })
}))

describe('MessageList', () => {
  beforeEach(() => {
    mockIsStreaming = false
    mockStreamingContent = ''
  })

  it('스트리밍 중이고 streamingContent가 비어 있을 때 로딩 영역에 Spinner 표시', () => {
    mockIsStreaming = true
    mockStreamingContent = ''

    render(<MessageList />)

    const list = screen.getByRole('log', { name: '메시지 목록' })
    expect(list).toBeInTheDocument()
    const loadingWrapper = list.querySelector('.loading-wrapper')
    expect(loadingWrapper).toBeInTheDocument()
    expect(loadingWrapper).toContainElement(
      screen.getByRole('status', { hidden: true })
    )
  })

  it('streamingContent가 있을 때 .streaming-message / .streaming-content에 해당 텍스트 표시', () => {
    mockStreamingContent = '스트리밍 중인 내용'

    render(<MessageList />)

    const streamingMessage = document.querySelector('.streaming-message')
    expect(streamingMessage).toBeInTheDocument()
    const streamingContent = document.querySelector('.streaming-content')
    expect(streamingContent).toHaveTextContent('스트리밍 중인 내용')
  })

  it('일반 메시지만 있을 때 currentMessages만 렌더, 스트리밍 UI 없음', () => {
    mockIsStreaming = false
    mockStreamingContent = ''

    render(<MessageList />)

    expect(screen.getByRole('log', { name: '메시지 목록' })).toBeInTheDocument()
    expect(document.querySelector('.streaming-message')).not.toBeInTheDocument()
    expect(document.querySelector('.loading-wrapper')).not.toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
