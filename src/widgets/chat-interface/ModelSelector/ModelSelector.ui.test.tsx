import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import type { ModelOption } from '@entities/settings/types'
import { ModelSelector } from '@widgets/chat-interface/ModelSelector/ModelSelector'

const mockModels: ModelOption[] = [
  { id: 'model-a', name: 'Model A', description: 'First model' },
  { id: 'model-b', name: 'Model B', description: 'Second model' }
]

describe('ModelSelector', () => {
  it('버튼 클릭 시 aria-expanded true, listbox 노출', async () => {
    const user = userEvent.setup()
    const onModelChange = vi.fn()

    render(
      <ModelSelector
        models={mockModels}
        selectedModel="model-a"
        onModelChange={onModelChange}
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

  it('다시 클릭 시 드롭다운 닫힘', async () => {
    const user = userEvent.setup()
    render(
      <ModelSelector
        models={mockModels}
        selectedModel="model-a"
        onModelChange={vi.fn()}
      />
    )

    const trigger = screen.getByRole('button', { name: '모델 선택' })
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('옵션 클릭 시 onModelChange(modelId) 1회 호출, 드롭다운 닫힘', async () => {
    const user = userEvent.setup()
    const onModelChange = vi.fn()

    render(
      <ModelSelector
        models={mockModels}
        selectedModel="model-a"
        onModelChange={onModelChange}
      />
    )

    await user.click(screen.getByRole('button', { name: '모델 선택' }))
    const optionB = screen.getByRole('option', { name: /Model B/ })
    await user.click(optionB)

    expect(onModelChange).toHaveBeenCalledTimes(1)
    expect(onModelChange).toHaveBeenCalledWith('model-b')
    expect(screen.getByRole('button', { name: '모델 선택' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('wrapper 밖 mousedown 시 드롭다운 닫힘', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <ModelSelector
          models={mockModels}
          selectedModel="model-a"
          onModelChange={vi.fn()}
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

  it('선택된 모델이 버튼 라벨에 표시되고 해당 option이 aria-selected', async () => {
    const user = userEvent.setup()
    render(
      <ModelSelector
        models={mockModels}
        selectedModel="model-b"
        onModelChange={vi.fn()}
      />
    )

    const trigger = screen.getByRole('button', { name: '모델 선택' })
    expect(trigger).toHaveTextContent('Model B')

    await user.click(trigger)
    const options = screen.getAllByRole('option')
    const selectedOption = options.find(
      (el) => el.getAttribute('aria-selected') === 'true'
    )
    expect(selectedOption).toHaveTextContent('Model B')
  })
})
