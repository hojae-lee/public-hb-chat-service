import styled from '@emotion/styled'
import { colors, spacing, typography, breakpoints } from '@shared/design-system'

export const PromptModeBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: 0 ${spacing[24]};
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.tablet}px) {
    padding: 0 ${spacing[8]};
    gap: ${spacing[1]};
  }

  @media (max-width: ${breakpoints.mobile}px) {
    padding: 0 ${spacing[4]};
  }
`

export const ModeChip = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  padding: ${spacing[2]} ${spacing[3]};
  background: ${colors.background.secondary};
  border: 1px solid ${colors.border.light};
  border-radius: 20px;
  font-family: ${typography.fontFamily.sans};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.primary};
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: ${colors.primary[400]};
    background: ${colors.primary[50]};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary[400]};
    outline-offset: 2px;
  }

  span {
    white-space: nowrap;
  }

  @media (max-width: ${breakpoints.tablet}px) {
    padding: ${spacing[1]} ${spacing[2]};
    font-size: ${typography.fontSize['sm']};
    border-radius: 16px;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    padding: 6px ${spacing[2]};
    font-size: ${typography.fontSize['xs']};
    border-radius: 12px;
  }
`
