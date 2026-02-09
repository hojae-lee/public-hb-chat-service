import styled from '@emotion/styled'
import { colors, spacing, typography, breakpoints } from '@shared/design-system'

export const MessageListWrapper = styled.div`
  flex: 1;
  padding: ${spacing[8]} ${spacing[24]};
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
  min-height: 100%;

  @media (max-width: ${breakpoints.tablet}px) {
    padding: ${spacing[4]} ${spacing[8]};
  }

  .message-row {
    display: flex;
    width: 100%;
  }

  .message-row--user {
    justify-content: flex-end;
  }

  .message-row--assistant {
    justify-content: flex-start;
  }

  .loading-wrapper {
    display: flex;
    align-items: center;
    padding: ${spacing[4]};
  }

  .streaming-message {
    display: flex;
    padding: ${spacing[4]};
    border-radius: 12px;
    background: ${colors.background.chat};

    .streaming-content {
      flex: 1;
      min-width: 0;
      font-size: ${typography.fontSize.md};
      line-height: ${typography.lineHeight.relaxed};
      color: ${colors.text.primary};
      white-space: pre-wrap;
      word-break: break-word;
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: ${spacing[4]};
    color: ${colors.text.secondary};
    text-align: center;
    padding: ${spacing[8]};

    .empty-icon {
      font-size: ${typography.fontSize['4xl']};
    }

    .empty-title {
      font-size: ${typography.fontSize.lg};
      font-weight: ${typography.fontWeight.semibold};
    }

    .empty-description {
      margin-top: ${spacing[2]};
    }
  }
`
