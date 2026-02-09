import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Menu } from 'lucide-react'
import { useMediaQuery } from '@shared/hooks/useMediaQuery'
import { IconButton } from '@shared/ui'
import { useHistoryStore } from '@features/manage-history/store'
import { ChatContent } from '@widgets/chat-interface/ChatContent/ChatContent'
import { SearchModal } from '@widgets/search-modal/SearchModal'
import { Sidebar } from '@widgets/sidebar/Sidebar'
import { PageWrapper } from '@pages/chat/page.styles'

const ChatPage = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)
  const [isSearchModalOpen, setSearchModalOpen] = useState<boolean>(false)
  const { conversationId } = useParams<{ conversationId?: string }>()
  const selectConversation = useHistoryStore((s) => s.selectConversation)
  const clearCurrentConversation = useHistoryStore(
    (s) => s.clearCurrentConversation
  )

  useEffect(() => {
    if (conversationId) {
      selectConversation(conversationId)
    } else {
      clearCurrentConversation()
    }
  }, [conversationId, selectConversation, clearCurrentConversation])

  const handleSelectSearchResult = (
    targetConversationId: string,
    messageId: string,
    keyword: string
  ) => {
    setSearchModalOpen(false)
    setSidebarOpen(false)
    navigate(`/chat/${targetConversationId}`, {
      state: {
        searchKeyword: keyword,
        highlightMessageId: messageId,
        conversationId: targetConversationId
      }
    })
  }

  return (
    <PageWrapper>
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={isMobile ? false : sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />
      <main className="main-content">
        <div className="chat-header">
          <IconButton
            aria-label="메뉴 열기"
            onClick={() => setSidebarOpen(true)}
            className="menu-button"
          >
            <Menu size={20} />
          </IconButton>
        </div>
        <ChatContent />
      </main>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />
    </PageWrapper>
  )
}

export default ChatPage
