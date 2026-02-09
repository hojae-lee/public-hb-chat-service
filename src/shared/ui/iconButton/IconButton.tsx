import type { ReactNode } from 'react'
import { IconButtonWrapper } from '@shared/ui/iconButton/IconButton.styles'

type IconButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  'aria-label': string
  onClick?: () => void
}

export const IconButton = ({
  children,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}: IconButtonProps) => {
  const { className, ...rest } = props
  return (
    <IconButtonWrapper
      type="button"
      className={[`variant-${variant} size-${size}`, className]
        .filter(Boolean)
        .join(' ')}
      $variant={variant}
      $size={size}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </IconButtonWrapper>
  )
}
