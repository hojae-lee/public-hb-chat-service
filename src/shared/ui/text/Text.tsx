import type { ReactNode, ElementType } from 'react'
import { TextWrapper } from '@shared/ui/text/Text.styles'

type TextProps = {
  children: ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label'
  color?: 'primary' | 'secondary' | 'inverse' | 'error'
  as?: ElementType
  className?: string
  id?: string
}

export const Text = ({
  children,
  variant = 'body',
  color = 'primary',
  as,
  className,
  id
}: TextProps) => {
  const tag = as || ('span' as const)

  return (
    <TextWrapper
      as={tag}
      className={`variant-${variant} color-${color} ${className || ''}`}
      $variant={variant}
      $color={color}
      id={id}
    >
      {children}
    </TextWrapper>
  )
}
