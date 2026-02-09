import { colors } from '@shared/design-system'
import { SpinnerWrapper } from '@shared/ui/spinner/Spinner.styles'

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const Spinner = ({
  size = 'md',
  color = colors.primary[600]
}: SpinnerProps) => {
  return (
    <SpinnerWrapper
      className={`size-${size}`}
      $size={size}
      $color={color}
      role="status"
      aria-label="로딩 중"
    />
  )
}
