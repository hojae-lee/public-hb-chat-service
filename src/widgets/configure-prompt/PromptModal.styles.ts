import styled from '@emotion/styled'
import { colors, spacing, typography, breakpoints } from '@shared/design-system'

export const ModalWrapper = styled.div<{ $isOpen: boolean }>`
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
    max-width: 500px;
    max-height: 80vh;
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

  .modal-content {
    padding: ${spacing[4]};
    flex: 1;
    overflow-y: auto;
  }

  .modal-label {
    display: block;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    color: ${colors.text.primary};
    margin-bottom: ${spacing[2]};
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: ${spacing[2]};
    padding: ${spacing[4]};
  }
`
