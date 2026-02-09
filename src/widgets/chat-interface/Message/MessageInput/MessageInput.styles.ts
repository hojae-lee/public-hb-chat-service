import styled from '@emotion/styled'
import { colors, spacing, typography, breakpoints } from '@shared/design-system'

export const MessageInputWrapper = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 10;
  padding: ${spacing[4]} ${spacing[24]} ${spacing[8]};
  background: ${colors.background.primary};

  @media (max-width: ${breakpoints.tablet}px) {
    padding: ${spacing[4]} ${spacing[8]};
  }

  .input-bar {
    display: flex;
    flex-direction: column;
    gap: ${spacing[2]};
    width: 100%;
    background: ${colors.background.primary};
    border: 1px solid ${colors.border.default};
    border-radius: 16px;
    padding: ${spacing[2]} ${spacing[3]};
    transition: border-color 0.2s ease;

    &:focus-within {
      border-color: ${colors.primary[500]};
    }
  }

  .input-area {
    width: 100%;
    min-width: 0;
    display: flex;
    align-items: center;

    textarea {
      border: none;
      background: transparent;
      box-shadow: none;
      padding: 0;
      min-height: 36px;
      font-size: ${typography.fontSize.sm};
      line-height: ${typography.lineHeight.normal};

      &:focus {
        box-shadow: none;
      }
    }
  }

  .bottom-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${spacing[2]};
    flex-shrink: 0;
  }

  .bottom-right {
    display: flex;
    align-items: center;
    gap: ${spacing[2]};
  }

  .prompt-settings-button {
    display: flex;
    align-items: center;
    gap: ${spacing[1]};
    padding: ${spacing[2]} ${spacing[3]};
    background: transparent;
    border: 1px solid ${colors.border.light};
    border-radius: 8px;
    font-family: ${typography.fontFamily.sans};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    color: ${colors.text.secondary};
    cursor: pointer;
    transition:
      color 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      color: ${colors.text.primary};
      background: ${colors.gray[100]};
      border-color: ${colors.primary[300]};
    }

    &:focus-visible {
      outline: 2px solid ${colors.primary[500]};
      outline-offset: 2px;
    }

    svg {
      flex-shrink: 0;
    }

    span {
      white-space: nowrap;
    }

    @media (max-width: ${breakpoints.mobile}px) {
      span {
        display: none;
      }
      padding: ${spacing[1]};
      width: 32px;
      height: 32px;
      justify-content: center;
    }
  }

  .model-selector-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  .model-selector-button {
    display: flex;
    align-items: center;
    gap: ${spacing[1]};
    padding: ${spacing[1]} ${spacing[2]};
    background: transparent;
    border: none;
    border-radius: 8px;
    font-family: ${typography.fontFamily.sans};
    font-size: ${typography.fontSize.sm};
    color: ${colors.gray[700]};
    cursor: pointer;
    transition:
      color 0.2s ease,
      background 0.2s ease;

    &:hover {
      color: ${colors.text.primary};
      background: ${colors.gray[200]};
    }

    &:focus-visible {
      outline: 2px solid ${colors.primary[500]};
      outline-offset: 2px;
    }
  }

  .model-selector-label {
    white-space: nowrap;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .model-dropdown {
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: ${spacing[1]};
    min-width: 200px;
    background: ${colors.background.primary};
    border: 1px solid ${colors.border.light};
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 10;
    max-height: 300px;
    overflow-y: auto;

    &.hidden {
      display: none;
    }
  }

  .model-dropdown-item {
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

  .send-button {
    flex-shrink: 0;
    border-radius: 50%;
  }

  .send-button.variant-primary {
    background: ${colors.primary[500]};
  }

  .send-button.variant-primary:hover:not(:disabled) {
    background: ${colors.primary[600]};
  }
`
