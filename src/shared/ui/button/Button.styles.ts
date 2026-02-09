import styled from '@emotion/styled'
import { colors, spacing, typography } from '@shared/design-system'

export const ButtonWrapper = styled.button<{
  $variant: string
  $size: string
  $fullWidth: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  border-radius: 8px;
  font-family: ${typography.fontFamily.sans};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  &.size-sm {
    padding: ${spacing[1]} ${spacing[3]};
    font-size: ${typography.fontSize.sm};
  }

  &.size-md {
    padding: ${spacing[2]} ${spacing[4]};
    font-size: ${typography.fontSize.md};
  }

  &.size-lg {
    padding: ${spacing[3]} ${spacing[6]};
    font-size: ${typography.fontSize.lg};
  }

  &.variant-primary {
    background: ${colors.primary[600]};
    color: ${colors.text.inverse};
    border: none;

    &:hover:not(:disabled) {
      background: ${colors.primary[700]};
    }
  }

  &.variant-secondary {
    background: ${colors.background.primary};
    color: ${colors.primary[600]};
    border: 1px solid ${colors.primary[600]};

    &:hover:not(:disabled) {
      background: ${colors.primary[50]};
    }
  }

  &.variant-ghost {
    background: transparent;
    color: ${colors.text.primary};
    border: none;

    &:hover:not(:disabled) {
      background: ${colors.gray[100]};
    }
  }

  &.variant-danger {
    background: ${colors.error};
    color: ${colors.text.inverse};
    border: none;

    &:hover:not(:disabled) {
      background: #d32f2f;
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
`
