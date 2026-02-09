import styled from '@emotion/styled'
import { colors, typography } from '@shared/design-system'

export const TextWrapper = styled.span<{
  $variant: string
  $color: string
  $id?: string
}>`
  font-family: ${typography.fontFamily.sans};
  margin: 0;

  &.variant-h1 {
    font-size: ${typography.fontSize['3xl']};
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
  }

  &.variant-h2 {
    font-size: ${typography.fontSize['2xl']};
    font-weight: ${typography.fontWeight.semibold};
    line-height: ${typography.lineHeight.tight};
  }

  &.variant-h3 {
    font-size: ${typography.fontSize.xl};
    font-weight: ${typography.fontWeight.semibold};
    line-height: ${typography.lineHeight.tight};
  }

  &.variant-body {
    font-size: ${typography.fontSize.md};
    font-weight: ${typography.fontWeight.normal};
    line-height: ${typography.lineHeight.normal};
  }

  &.variant-caption {
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.normal};
    line-height: ${typography.lineHeight.normal};
  }

  &.variant-label {
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    line-height: ${typography.lineHeight.normal};
  }

  &.color-primary {
    color: ${colors.text.primary};
  }

  &.color-secondary {
    color: ${colors.text.secondary};
  }

  &.color-inverse {
    color: ${colors.text.inverse};
  }

  &.color-error {
    color: ${colors.error};
  }
`
