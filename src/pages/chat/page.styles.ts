import styled from '@emotion/styled'
import { colors, spacing, breakpoints } from '@shared/design-system'

export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;

  .main-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100%;
    min-width: 0;

    @media (max-width: ${breakpoints.tablet}px) {
      width: 100%;
      padding-top: 56px;
    }
  }

  .chat-header {
    display: none;
    align-items: center;
    padding: ${spacing[3]} ${spacing[4]};
    background: ${colors.background.primary};
    border-bottom: 1px solid ${colors.border.light};
    min-height: 56px;

    @media (max-width: ${breakpoints.tablet}px) {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99;
    }

    @media (max-width: ${breakpoints.mobile}px) {
      padding: ${spacing[2]} ${spacing[3]};
    }
  }
`
