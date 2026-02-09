import { X, PanelLeftClose, PanelLeft } from 'lucide-react'
import { colors } from '@shared/design-system'
import { IconButton, Text } from '@shared/ui'

type SidebarHeaderProps = {
  onToggleCollapse: () => void
  onClose: () => void
  isCollapsed: boolean
}

export const SidebarHeader = ({
  onToggleCollapse,
  onClose,
  isCollapsed
}: SidebarHeaderProps) => {
  return (
    <div className="sidebar-header">
      <div className="sidebar-title">
        <Text variant="h3" color="inverse">
          HD AI Chat Bot
        </Text>
      </div>
      <button
        className="toggle-button"
        onClick={onToggleCollapse}
        aria-label={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
      >
        {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
      </button>
      <div className="close-button">
        <IconButton aria-label="사이드바 닫기" onClick={onClose}>
          <X size={20} color={colors.text.inverse} />
        </IconButton>
      </div>
    </div>
  )
}
