import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { getAvailableModels, type ModelAttribute } from '@shared/lib/models'
import { MessageInput } from '@widgets/chat-interface/Message/MessageInput'

const mockModels = getAvailableModels() as ModelAttribute[]
vi.mock('@features/configure-prompt/store', () => ({
  usePromptStore: () => ({
    getModels: () => mockModels,
    openModal: vi.fn()
  })
}))

const mockUpdatePrompt = vi.fn()
const mockHistoryState = {
  currentConversationId: 'c1',
  conversations: [
    {
      id: 'c1',
      title: '대화',
      messages: [],
      createdAt: '',
      updatedAt: '',
      model: mockModels[0].id
    }
  ],
  updateCurrentConversationPrompt: mockUpdatePrompt
}
vi.mock('@features/manage-history/store', () => ({
  useHistoryStore: (selector?: (s: typeof mockHistoryState) => unknown) =>
    selector ? selector(mockHistoryState) : mockHistoryState
}))

describe('MessageInput: 메시지 입력/전송', () => {
  beforeEach(() => {
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
})
