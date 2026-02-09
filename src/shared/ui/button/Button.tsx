import type { ReactNode } from 'react'
import { ButtonWrapper } from '@shared/ui/button/Button.styles'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick
}: ButtonProps) => {
  return (
    <ButtonWrapper
      type={type}
      className={`variant-${variant} size-${size}`}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {loading ? 'Loading...' : children}
    </ButtonWrapper>
  )
}
