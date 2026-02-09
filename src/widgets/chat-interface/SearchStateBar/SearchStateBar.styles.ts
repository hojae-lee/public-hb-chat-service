import styled from '@emotion/styled'
import { colors, spacing, typography, breakpoints } from '@shared/design-system'

export const SearchStateBarWrapper = styled.div`
  padding: ${spacing[2]} ${spacing[24]} 0 ${spacing[24]};
  flex-shrink: 0;

  @media (max-width: ${breakpoints.tablet}px) {
    padding: ${spacing[2]} ${spacing[8]} 0 ${spacing[8]};
  }
`

export const SearchStateBarInner = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[2]} ${spacing[3]};
  background: ${colors.background.secondary};
  border: 1px solid ${colors.border.light};
  border-radius: 16px;

  .search-state-input-wrap {
    display: flex;
    align-items: center;
    gap: ${spacing[2]};
    flex: 1;
    min-width: 0;
  }

  .search-state-icon {
    flex-shrink: 0;
    color: ${colors.text.secondary};
  }

  .search-state-input {
    flex: 1;
    min-width: 0;
    padding: ${spacing[1]} 0;
    border: none;
    background: transparent;
    font-family: ${typography.fontFamily.sans};
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.primary};
    outline: none;
  }

  .search-state-input::placeholder {
    color: ${colors.text.secondary};
  }

  .search-state-nav {
    display: flex;
    align-items: center;
    gap: ${spacing[1]};
    padding: ${spacing[1]} ${spacing[2]};
    background: ${colors.background.primary};
    border: 1px solid ${colors.border.light};
    border-radius: 8px;
    font-size: ${typography.fontSize.xs};
    color: ${colors.text.secondary};
    flex-shrink: 0;
  }

  .search-state-nav-count {
    min-width: 2ch;
    text-align: center;
  }
`
