import { useRef, type TextareaHTMLAttributes } from 'react'
import { TextareaWrapper } from '@shared/ui/textarea/Textarea.styles'

type TextareaProps = {
  error?: boolean
  fullWidth?: boolean
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({
  error = false,
  fullWidth = false,
  value,
  onChange,
  ...props
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <TextareaWrapper
      ref={textareaRef}
      className={error ? 'error' : ''}
      $error={error}
      $fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      aria-invalid={error}
      {...props}
    />
  )
}
