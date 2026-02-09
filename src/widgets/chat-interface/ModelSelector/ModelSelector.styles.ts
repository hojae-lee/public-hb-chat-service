import styled from '@emotion/styled'
import { colors, spacing, typography } from '@shared/design-system'

export const ModelSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[4]};
  border-bottom: 1px solid ${colors.border.light};
  background: ${colors.background.primary};

  .selector-wrapper {
    position: relative;
  }

  .selector-button {
    display: flex;
    align-items: center;
    gap: ${spacing[2]};
    padding: ${spacing[2]} ${spacing[3]};
    background: ${colors.background.secondary};
    border: 1px solid ${colors.border.light};
    border-radius: 8px;
    font-family: ${typography.fontFamily.sans};
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.primary};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${colors.primary[400]};
    }
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: ${spacing[1]};
    min-width: 200px;
    background: ${colors.background.primary};
    border: 1px solid ${colors.border.light};
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 10;

    &.hidden {
      display: none;
    }
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: ${spacing[3]};
    text-align: left;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: ${colors.gray[100]};
    }

    &.selected {
      background: ${colors.primary[50]};
    }

    &:first-of-type {
      border-radius: 8px 8px 0 0;
    }

    &:last-of-type {
      border-radius: 0 0 8px 8px;
    }
  }

  .model-name {
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    color: ${colors.text.primary};
  }

  .model-description {
    font-size: ${typography.fontSize.xs};
    color: ${colors.text.secondary};
    margin-top: 2px;
  }

  .spacer {
    flex: 1;
  }
`
