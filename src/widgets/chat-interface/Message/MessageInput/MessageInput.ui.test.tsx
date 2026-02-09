import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { getAvailableModels, type ModelAttribute } from '@shared/lib/models'
import type { Message } from '@entities/message/types'
import { MessageInput } from '@widgets/chat-interface/Message/MessageInput'

const mockModels = getAvailableModels() as ModelAttribute[]

const mockOpenModal = vi.fn()
vi.mock('@features/configure-prompt/store', () => ({
  usePromptStore: () => ({
    getModels: () => mockModels,
    openModal: mockOpenModal
  })
}))

let currentModelId = mockModels[0].id
const mockUpdatePrompt = vi.fn((payload: { model?: string }) => {
  if (payload?.model !== undefined) {
    currentModelId = payload.model
  }
})
const getMockHistoryState = () => ({
  currentConversationId: 'c1',
  conversations: [
    {
      id: 'c1',
      title: '대화',
      messages: [] as Message[],
      createdAt: '',
      updatedAt: '',
      model: currentModelId
    }
  ],
  updateCurrentConversationPrompt: mockUpdatePrompt
})
vi.mock('@features/manage-history/store', () => ({
  useHistoryStore: (
    selector?: (s: ReturnType<typeof getMockHistoryState>) => unknown
  ) => {
    const state = getMockHistoryState()
    return selector ? selector(state) : state
  }
}))

let mockIsStreaming = false
vi.mock('@features/stream-response/store', () => ({
  useStreamStore: (selector: (s: { isStreaming: boolean }) => unknown) =>
    selector({ isStreaming: mockIsStreaming })
}))

describe('MessageInput: 메시지 입력/전송', () => {
  beforeEach(() => {
    mockIsStreaming = false
    vi.clearAllMocks()
  })

  it('1. 텍스트 입력 후 전송 버튼 클릭 시 onSend가 trim된 값으로 1회 호출되고, 입력이 비워진다', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    const Wrapper = () => {
      const [value, setValue] = useState('')
      return (
        <MessageInput
          value={value}
          onChange={setValue}
          onSend={onSend}
          onCancel={vi.fn()}
        />
      )
    }
    render(<Wrapper />)
    const input = screen.getByRole('textbox', { name: '메시지 입력' })
    await user.type(input, '  안녕하세요  ')
    await user.click(screen.getByRole('button', { name: '메시지 전송' }))
    expect(onSend).toHaveBeenCalledWith('안녕하세요')
    expect(input).toHaveValue('')
  })

  it('2. 입력이 비어 있으면 전송 버튼이 disabled이다', () => {
    render(
      <MessageInput
        value=""
        onChange={vi.fn()}
        onSend={vi.fn()}
        onCancel={vi.fn()}
      />
    )
    expect(screen.getByRole('button', { name: '메시지 전송' })).toBeDisabled()
  })

  it('3. Shift 없이 Enter 누르면 onSend가 호출된다', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    const Wrapper = () => {
      const [value, setValue] = useState('')
      return (
        <MessageInput
          value={value}
          onChange={setValue}
          onSend={onSend}
          onCancel={vi.fn()}
        />
      )
    }
    render(<Wrapper />)
    const input = screen.getByRole('textbox', { name: '메시지 입력' })
    await user.type(input, '엔터로 전송')
    await user.keyboard('{Enter}')
    expect(onSend).toHaveBeenCalledWith('엔터로 전송')
  })

  it('4. 스트리밍 중일 때 취소 버튼이 보이고, 클릭 시 onCancel이 1회 호출된다', async () => {
    mockIsStreaming = true
    const user = userEvent.setup()
    const onCancel = vi.fn()
    render(
      <MessageInput
        value=""
        onChange={vi.fn()}
        onSend={vi.fn()}
        onCancel={onCancel}
      />
    )
    expect(
      screen.queryByRole('button', { name: '메시지 전송' })
    ).not.toBeInTheDocument()
    const cancelButton = screen.getByRole('button', { name: '응답 취소' })
    await user.click(cancelButton)
    expect(onCancel).toHaveBeenCalledTimes(1)
    mockIsStreaming = false
  })
})

describe('MessageInput: 모델 선택', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    currentModelId = mockModels[0].id
  })

  it('모델 선택 버튼 클릭 시 드롭다운 열림', async () => {
    const user = userEvent.setup()
    render(
      <MessageInput
        value=""
        onChange={vi.fn()}
        onSend={vi.fn()}
        onCancel={vi.fn()}
      />
    )
    const trigger = screen.getByRole('button', { name: '모델 선택' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('listbox', { name: '모델 목록' })
    ).toBeInTheDocument()
  })

  it('모델 목록에서 옵션 클릭 시 updateCurrentConversationPrompt 호출, 드롭다운 닫힘', async () => {
    const user = userEvent.setup()
    render(
      <MessageInput
        value=""
        onChange={vi.fn()}
        onSend={vi.fn()}
        onCancel={vi.fn()}
      />
    )
    await user.click(screen.getByRole('button', { name: '모델 선택' }))
    const secondModel = mockModels[1]
    const option = screen.getByRole('option', {
      name: new RegExp(secondModel.name)
    })
    await user.click(option)

    expect(mockUpdatePrompt).toHaveBeenCalledWith({ model: secondModel.id })
    expect(screen.getByRole('button', { name: '모델 선택' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('드롭다운 열린 상태에서 외부 클릭 시 드롭다운 닫힘', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <MessageInput
          value=""
          onChange={vi.fn()}
          onSend={vi.fn()}
          onCancel={vi.fn()}
        />
        <button type="button">Outside</button>
      </div>
    )
    await user.click(screen.getByRole('button', { name: '모델 선택' }))
    expect(screen.getByRole('button', { name: '모델 선택' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    await user.click(screen.getByRole('button', { name: 'Outside' }))
    expect(screen.getByRole('button', { name: '모델 선택' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('시스템 프롬프트 버튼 클릭 시 openModal 1회 호출', async () => {
    const user = userEvent.setup()
    render(
      <MessageInput
        value=""
        onChange={vi.fn()}
        onSend={vi.fn()}
        onCancel={vi.fn()}
      />
    )
    await user.click(
      screen.getByRole('button', { name: '시스템 프롬프트 설정' })
    )
    expect(mockOpenModal).toHaveBeenCalledTimes(1)
  })
})
