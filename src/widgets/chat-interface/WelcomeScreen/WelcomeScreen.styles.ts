import styled from '@emotion/styled'
import { colors, spacing, typography, breakpoints } from '@shared/design-system'

export const WelcomeScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: ${spacing[8]} ${spacing[4]};
  text-align: center;
  background: ${colors.background.primary};
  gap: ${spacing[6]};
  min-height: 100%;

  @media (max-width: ${breakpoints.mobile}px) {
    padding: ${spacing[6]} ${spacing[3]};
    gap: ${spacing[4]};
  }
`

export const WelcomeGreeting = styled.h1`
  margin: 0;
  font-family: ${typography.fontFamily.sans};
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  line-height: ${typography.lineHeight.tight};

  @media (max-width: ${breakpoints.mobile}px) {
    font-size: ${typography.fontSize.xl};
  }
`

export const WelcomeSubtitle = styled.p`
  margin: 0;
  font-family: ${typography.fontFamily.sans};
  font-size: ${typography.fontSize.lg};
  color: ${colors.text.secondary};
  line-height: ${typography.lineHeight.normal};
`

export const ModeButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${spacing[2]};
  max-width: 560px;
`

export const ModeButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${colors.background.secondary};
  border: 1px solid ${colors.border.light};
  border-radius: 12px;
  font-family: ${typography.fontFamily.sans};
  font-size: ${typography.fontSize.sm};
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
`
