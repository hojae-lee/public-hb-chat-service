import styled from '@emotion/styled'
import { colors, spacing, typography } from '@shared/design-system'

export const TextareaWrapper = styled.textarea<{
  $error: boolean
  $fullWidth: boolean
}>`
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-height: 30px;
  padding: ${spacing[3]};
  font-family: ${typography.fontFamily.sans};
  font-size: ${typography.fontSize.md};
  line-height: ${typography.lineHeight.normal};
  color: ${colors.text.primary};
  background: ${colors.background.primary};
  border: 1px solid ${colors.border.light};
  border-radius: 8px;
  outline: none;
  resize: none;
  transition: all 0.2s ease;

  &.error {
    border-color: ${colors.error};
  }

  &::placeholder {
    color: ${colors.text.disabled};
  }

  &:hover:not(:disabled) {
    border-color: ${colors.primary[400]};
  }

  &:focus {
    border-color: ${colors.primary[500]};
    box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.1);
  }

  &.error:focus {
    border-color: ${colors.error};
    box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
  }

  &:disabled {
    background: ${colors.gray[100]};
    cursor: not-allowed;
  }
`
