import styled from '@emotion/styled'
import { colors, spacing, typography } from '@shared/design-system'

export const IconButtonWrapper = styled.button<{
  $variant: string
  $size: string
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: ${spacing[1]};

  &.size-sm {
    width: 32px;
    height: 32px;
    font-size: ${typography.fontSize.md};
  }

  &.size-md {
    width: 40px;
    height: 40px;
    font-size: ${typography.fontSize.xl};
  }

  &.size-lg {
    width: 48px;
    height: 48px;
    font-size: ${typography.fontSize['2xl']};
  }

  &.variant-primary {
    background: ${colors.primary[500]};
    color: ${colors.text.inverse};

    &:hover:not(:disabled) {
      background: ${colors.primary[700]};
    }
  }

  &.variant-ghost {
    background: transparent;
    color: ${colors.text.secondary};

    &:hover:not(:disabled) {
      background: ${colors.gray[100]};
      color: ${colors.text.primary};
    }
  }

  &.variant-danger {
    background: transparent;
    color: ${colors.text.secondary};

    &:hover:not(:disabled) {
      background: rgba(244, 67, 54, 0.1);
      color: ${colors.error};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary[400]};
    outline-offset: 2px;
  }

  svg {
    width: 1em;
    height: 1em;
  }
`
