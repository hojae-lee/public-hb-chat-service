import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { colors } from '@shared/design-system'

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const SpinnerWrapper = styled.div<{
  $size: string
  $color: string
}>`
  border: 2px solid ${colors.gray[200]};
  border-top-color: ${({ $color }) => $color};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  &.size-sm {
    width: 16px;
    height: 16px;
  }

  &.size-md {
    width: 24px;
    height: 24px;
  }

  &.size-lg {
    width: 32px;
    height: 32px;
  }
`
