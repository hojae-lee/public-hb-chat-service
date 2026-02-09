import styled from '@emotion/styled'
import { colors, spacing, typography, breakpoints } from '@shared/design-system'

export const SearchBarWrapper = styled.header`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${colors.background.primary};
  border-bottom: 1px solid ${colors.border.light};
  min-height: 56px;

  @media (max-width: ${breakpoints.mobile}px) {
    padding: ${spacing[2]} ${spacing[3]};
  }

  .menu-button {
    display: none;

    @media (max-width: ${breakpoints.tablet}px) {
      display: block;
    }
  }

  .search-bar-inner {
    flex: 1;
    min-width: 0;
    width: 100%;
  }

  .search-wrapper {
    display: flex;
    align-items: center;
    gap: ${spacing[2]};
    flex: 1;
    max-width: 200px;
    padding: ${spacing[2]} ${spacing[3]};
    background: ${colors.background.secondary};
    border: 1px solid ${colors.border.light};
    border-radius: 8px;
    transition: all 0.2s ease;

    &.active {
      max-width: 400px;
      border-color: ${colors.primary[400]};
    }

    &:focus-within {
      border-color: ${colors.primary[500]};
      max-width: 400px;
    }
  }

  .search-icon {
    color: ${colors.text.secondary};
    flex-shrink: 0;
  }

  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    font-family: ${typography.fontFamily.sans};
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.primary};
    outline: none;

    &::placeholder {
      color: ${colors.text.disabled};
    }
  }

  .result-info {
    display: flex;
    align-items: center;
    gap: ${spacing[1]};
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.secondary};
    white-space: nowrap;
  }

  .navigation-buttons {
    display: flex;
    align-items: center;
    gap: ${spacing[1]};
  }

  .title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${breakpoints.tablet}px) {
      display: none;
    }
  }
`
