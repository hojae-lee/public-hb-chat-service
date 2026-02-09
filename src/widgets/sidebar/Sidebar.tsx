import { useNavigate } from 'react-router'
import { Pencil, Search } from 'lucide-react'
import { useSearchStore } from '@features/search-messages/store'
import { useStreamStore } from '@features/stream-response/store'
import { SidebarWrapper } from '@widgets/sidebar/Sidebar.styles'
import { SidebarConnectionStatus } from '@widgets/sidebar/SidebarConnectionStatus'
import { SidebarHeader } from '@widgets/sidebar/SidebarHeader'
import { SidebarList } from '@widgets/sidebar/SidebarList'

type SidebarProps = {
  isOpen: boolean
  isCollapsed: boolean
  onClose: () => void
  onToggleCollapse: () => void
  onOpenSearch?: () => void
}

export const Sidebar = ({
  isOpen,
  isCollapsed,
  onClose,
  onToggleCollapse,
  onOpenSearch
}: SidebarProps) => {
  const navigate = useNavigate()

  const { stopStreaming, reset: resetStream } = useStreamStore()
  const { reset: resetSearch } = useSearchStore()

  const handleNewChat = () => {
    stopStreaming()
    resetStream()
    resetSearch()
    onClose()
    navigate('/chat')
  }

  const handleOpenSearch = () => {
    onOpenSearch?.()
    onClose()
  }

  return (
    <SidebarWrapper
      $isOpen={isOpen}
      $isCollapsed={isCollapsed}
      role="complementary"
      aria-label="대화 히스토리"
    >
      <SidebarHeader
        onToggleCollapse={onToggleCollapse}
        onClose={onClose}
        isCollapsed={isCollapsed}
      />

      {!isCollapsed && (
        <div className="new-chat-wrapper">
          <button
            type="button"
            className="new-chat-button"
            onClick={handleOpenSearch}
            aria-label="채팅 검색"
          >
            <Search size={16} />
            <span className="button-text">채팅 검색</span>
          </button>
          <button
            type="button"
            className="new-chat-button"
            onClick={handleNewChat}
            aria-label="새 채팅 시작"
          >
            <Pencil size={16} />
            <span className="button-text">새 채팅</span>
          </button>
        </div>
      )}
      <SidebarList isCollapsed={isCollapsed} onClose={onClose} />
      <SidebarConnectionStatus isCollapsed={isCollapsed} />
    </SidebarWrapper>
  )
}
