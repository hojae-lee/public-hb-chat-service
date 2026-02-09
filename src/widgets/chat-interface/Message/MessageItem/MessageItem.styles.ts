import styled from '@emotion/styled'
import { colors, spacing, breakpoints } from '@shared/design-system'

export const MessageItemWrapper = styled.div<{
  $role: string
  $isHighlighted: boolean
}>`
  display: flex;
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: 12px;
  max-width: 85%;
  background: ${({ $role, $isHighlighted }) => {
    if ($isHighlighted) return colors.primary[50]
    return $role === 'user' ? colors.primary[50] : ''
  }};
  border: ${({ $role, $isHighlighted }) => {
    if ($isHighlighted) return `2px solid ${colors.primary[400]}`
    return $role === 'user' ? `1px solid ${colors.primary[200]}` : 'none'
  }};
  box-shadow: ${({ $role }) =>
    $role === 'user' ? '0 1px 2px rgba(0, 0, 0, 0.06)' : 'none'};

  @media (max-width: ${breakpoints.mobile}px) {
    padding: ${spacing[2]};
    max-width: 90%;
  }

  .message-content {
    flex: 1;
    min-width: 0;
  }

  .highlight-text {
    background-color: #fef08a;
    padding: 0 2px;
    border-radius: 2px;
    transition: background-color 0.2s ease;
  }

  .highlight-text--focused {
    background-color: #fbbf24;
    font-weight: 600;
    box-shadow: 0 0 0 2px #f59e0b;
  }
`
