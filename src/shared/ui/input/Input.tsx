import type { InputHTMLAttributes } from 'react'
import { InputWrapper } from '@shared/ui/input/Input.styles'

type InputProps = {
  error?: boolean
  fullWidth?: boolean
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

export const Input = ({
  error = false,
  fullWidth = false,
  ...props
}: InputProps) => {
  return (
    <InputWrapper
      className={error ? 'error' : ''}
      $error={error}
      $fullWidth={fullWidth}
      aria-invalid={error}
      {...props}
    />
  )
}
