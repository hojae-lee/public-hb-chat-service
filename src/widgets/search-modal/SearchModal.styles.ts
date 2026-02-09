import styled from '@emotion/styled'
import { colors, spacing, typography, breakpoints } from '@shared/design-system'

export const SearchModalWrapper = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: ${spacing[4]};

  .modal {
    background: ${colors.background.primary};
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    max-height: 500px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    @media (max-width: ${breakpoints.mobile}px) {
      max-height: 90vh;
    }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${spacing[4]};
    border-bottom: 1px solid ${colors.border.light};
  }

  .search-input-wrap {
    padding: ${spacing[2]} ${spacing[4]} ${spacing[4]};
    border-bottom: 1px solid ${colors.border.light};
  }

  .search-input {
    width: 100%;
    padding: ${spacing[2]} ${spacing[3]};
    font-family: ${typography.fontFamily.sans};
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.primary};
    background: ${colors.background.secondary};
    border: 1px solid ${colors.border.light};
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s ease;

    &::placeholder {
      color: ${colors.text.disabled};
    }

    &:focus {
      border-color: ${colors.primary[500]};
    }
  }

  .results-list {
    flex: 1;
    overflow-y: auto;
    padding: ${spacing[2]};
    min-height: 120px;
  }

  .result-item {
    display: block;
    width: 100%;
    padding: ${spacing[3]};
    text-align: left;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;
    font-family: inherit;

    &:hover {
      background: ${colors.gray[100]};
    }
  }

  .result-title {
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    color: ${colors.text.primary};
    margin-bottom: ${spacing[1]};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .result-snippet {
    font-size: ${typography.fontSize.xs};
    color: ${colors.text.secondary};
    line-height: ${typography.lineHeight.relaxed};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .empty-state {
    padding: ${spacing[6]};
    text-align: center;
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.secondary};
  }
`
