import styled from '@emotion/styled'
import { colors, spacing, typography, breakpoints } from '@shared/design-system'

export const SidebarWrapper = styled.aside<{
  $isOpen: boolean
  $isCollapsed: boolean
}>`
  width: ${({ $isCollapsed }) => ($isCollapsed ? '60px' : '280px')};
  height: 100vh;
  min-height: 100vh;
  align-self: flex-start;
  position: sticky;
  top: 0;
  background: ${colors.background.sidebar};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition:
    width 0.3s ease,
    transform 0.3s ease;

  @media (max-width: ${breakpoints.tablet}px) {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 280px;
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: ${({ $isCollapsed }) =>
      $isCollapsed ? 'center' : 'space-between'};
    padding: ${spacing[4]};
  }

  .toggle-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: ${colors.text.inverse};
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    @media (max-width: ${breakpoints.tablet}px) {
      display: none;
    }
  }

  .sidebar-title {
    flex: 1; // 남은 공간 차지
    opacity: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '1')};
    visibility: ${({ $isCollapsed }) => ($isCollapsed ? 'hidden' : 'visible')};
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease;
    white-space: nowrap;
    overflow: hidden; // 넘치는 부분 숨김
  }

  .close-button {
    display: none;

    @media (max-width: ${breakpoints.tablet}px) {
      display: block;
    }
  }

  .new-chat-wrapper {
    padding: ${spacing[4]};
    display: flex;
    flex-direction: column;
    gap: ${spacing[2]};
  }

  .new-chat-button {
    display: flex;
    align-items: center;
    justify-content: ${({ $isCollapsed }) =>
      $isCollapsed ? 'center' : 'flex-start'};
    gap: ${spacing[2]};
    width: 100%;
    padding: ${spacing[3]}
      ${({ $isCollapsed }) => ($isCollapsed ? spacing[3] : spacing[4])};
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: ${colors.text.inverse};
    font-family: ${typography.fontFamily.sans};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .button-text {
      opacity: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '1')};
      visibility: ${({ $isCollapsed }) =>
        $isCollapsed ? 'hidden' : 'visible'};
      transition:
        opacity 0.2s ease,
        visibility 0.2s ease;
      white-space: nowrap;
    }
  }

  .conversation-list {
    flex: 1;
    overflow-y: auto;
    padding: ${spacing[2]};
  }

  .conversation-list--flat {
    display: flex;
    flex-direction: column;
    gap: ${spacing[1]};
    align-items: center;
  }

  .conversation-list--flat .conversation-item {
    width: 100%;
    justify-content: center;
    padding: ${spacing[3]};
  }

  .conversation-group {
    margin-bottom: ${spacing[2]};
  }

  .conversation-group:last-child {
    margin-bottom: 0;
  }

  .conversation-group-header {
    display: flex;
    align-items: center;
    justify-content: ${({ $isCollapsed }) =>
      $isCollapsed ? 'center' : 'space-between'};
    width: 100%;
    padding: ${spacing[2]} ${spacing[3]};
    background: transparent;
    border: none;
    border-radius: 8px;
    color: ${colors.text.inverse};
    font-family: ${typography.fontFamily.sans};
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .conversation-group-header:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .conversation-group-label {
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.medium};
    opacity: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '0.9')};
    visibility: ${({ $isCollapsed }) => ($isCollapsed ? 'hidden' : 'visible')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease;
  }

  .conversation-group-body {
    padding-left: ${spacing[2]};
    margin-top: ${spacing[1]};
  }

  .conversation-group-body[hidden] {
    display: none;
  }

  .conversation-item {
    display: flex;
    align-items: center;
    justify-content: ${({ $isCollapsed }) =>
      $isCollapsed ? 'center' : 'space-between'};
    gap: ${({ $isCollapsed }) => ($isCollapsed ? spacing[0] : spacing[2])};
    padding: ${spacing[3]};
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.active {
      background: rgba(255, 255, 255, 0.15);
    }

    &:hover .delete-button {
      opacity: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '0.7')};
    }
  }

  .conversation-icon {
    color: ${colors.text.inverse};
    flex-shrink: 0;
  }

  .conversation-title {
    flex: 1;
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.inverse};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '1')};
    visibility: ${({ $isCollapsed }) => ($isCollapsed ? 'hidden' : 'visible')};
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease;
  }

  .delete-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: ${colors.text.inverse};
    opacity: 0;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      opacity: 1 !important;
      background: rgba(244, 67, 54, 0.2);
      color: ${colors.error};
    }
  }

  .sidebar-footer {
    margin-top: auto;
    padding: ${spacing[4]};
    flex-shrink: 0;
  }

  .connection-status {
    display: flex;
    align-items: center;
    justify-content: ${({ $isCollapsed }) =>
      $isCollapsed ? 'center' : 'flex-start'};
    gap: ${spacing[2]};
  }

  .connection-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .connection-dot--connected {
    background: ${colors.success};
  }

  .connection-dot--disconnected {
    background: ${colors.error};
  }

  .connection-dot--checking {
    background: ${colors.gray[400]};
  }

  .connection-label {
    font-size: ${typography.fontSize.xs};
    color: ${colors.text.inverse};
    opacity: 0.9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
