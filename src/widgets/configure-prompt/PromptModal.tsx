import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button, IconButton, Text, Textarea } from '@shared/ui'
import { ModalWrapper } from '@widgets/configure-prompt/PromptModal.styles'

type PromptModalProps = {
  isOpen: boolean
  initialPrompt: string
  onSave: (prompt: string) => void
  onClose: () => void
}

export const PromptModal = ({
  isOpen,
  initialPrompt,
  onSave,
  onClose
}: PromptModalProps) => {
  const [prompt, setPrompt] = useState(initialPrompt)

  useEffect(() => {
    setPrompt(initialPrompt)
  }, [initialPrompt])

  const handleSave = () => {
    onSave(prompt)
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <ModalWrapper
      $isOpen={isOpen}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <Text variant="h3" as="h2" id="modal-title">
            시스템 프롬프트 설정
          </Text>
          <IconButton aria-label="닫기" onClick={onClose}>
            <X size={20} />
          </IconButton>
        </div>
        <div className="modal-content">
          <label className="modal-label" htmlFor="system-prompt">
            프롬프트
          </label>
          <Textarea
            id="system-prompt"
            name="system-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="AI의 역할과 응답 스타일을 정의하세요..."
            fullWidth
            rows={8}
          />
        </div>
        <div className="modal-footer">
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </div>
      </div>
    </ModalWrapper>
  )

  return createPortal(modalContent, document.body)
}
