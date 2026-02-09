import styled from '@emotion/styled'
import { colors, spacing } from '@shared/design-system'

export const ChatContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  background: ${colors.background.primary};
`

export const ChatContentContentWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
`

export const BottomSection = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  background: ${colors.background.primary};
  flex-shrink: 0;
`
