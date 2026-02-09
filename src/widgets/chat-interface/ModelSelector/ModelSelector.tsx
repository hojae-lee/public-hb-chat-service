import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { ModelAttribute } from '@shared/lib/models'

type ModelSelectorProps = {
  models: ModelAttribute[]
  selectedModel: ModelAttribute['id']
  onModelChange: (modelId: ModelAttribute['id']) => void
}

export const ModelSelector = ({
  models,
  selectedModel,
  onModelChange
}: ModelSelectorProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)

  const selectedModelData = models.find((m) => m.id === selectedModel)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleModelSelect = (modelId: ModelAttribute['id']) => {
    onModelChange(modelId)
    setIsDropdownOpen(false)
  }

  return (
    <div className="model-selector-wrapper" ref={selectorRef}>
      <button
        type="button"
        className="model-selector-button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
        aria-label="모델 선택"
      >
        <span className="model-selector-label">
          {selectedModelData?.name ?? '모델 선택'}
        </span>
        {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div
        className={`model-dropdown ${isDropdownOpen ? '' : 'hidden'}`}
        role="listbox"
        aria-label="모델 목록"
      >
        {models.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`model-dropdown-item ${m.id === selectedModel ? 'selected' : ''}`}
            onClick={() => handleModelSelect(m.id)}
            role="option"
            aria-selected={m.id === selectedModel}
          >
            <div className="model-name">{m.name}</div>
            <div className="model-description">{m.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
