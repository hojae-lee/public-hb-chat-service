import { useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { MessageSquare, Trash2, ChevronDown, ChevronRight } from 'lucide-react'
import { groupConversationsByDate } from '@features/manage-history/lib/groupConversationsByDate'
import { useHistoryStore } from '@features/manage-history/store'
import { useSearchStore } from '@features/search-messages/store'
import { useStreamStore } from '@features/stream-response/store'

type SidebarListProps = {
  isCollapsed: boolean
  onClose: () => void
}

export const SidebarList = ({ isCollapsed, onClose }: SidebarListProps) => {
  const navigate = useNavigate()
  const {
    conversations,
    currentConversationId,
    loadConversations,
    removeConversation
  } = useHistoryStore()
  const { stopStreaming, reset: resetStream } = useStreamStore()
  const { reset: resetSearch } = useSearchStore()

  const groups = useMemo(
    () => groupConversationsByDate(conversations),
    [conversations]
  )

  const [expandedByDateKey, setExpandedByDateKey] = useState<
    Record<string, boolean>
  >({})

  const isExpanded = useCallback(
    (dateKey: string) => expandedByDateKey[dateKey] !== false,
    [expandedByDateKey]
  )
  const toggleGroup = useCallback((dateKey: string) => {
    setExpandedByDateKey((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey] === false
    }))
  }, [])

  useEffect(() => {
    loadConversations()
  }, [loadConversations])

  const handleSelectConversation = (id: string) => {
    stopStreaming()
    resetStream()
    resetSearch()
    onClose()
    navigate(`/chat/${id}`)
  }

  const handleDeleteConversation = (id: string) => {
    const wasCurrent = id === currentConversationId
    removeConversation(id)
    if (wasCurrent) {
      navigate('/chat')
    }
  }

  if (isCollapsed) {
    return (
      <div
        className="conversation-list conversation-list--flat"
        role="list"
        aria-label="대화 목록"
      >
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`conversation-item ${conversation.id === currentConversationId ? 'active' : ''}`}
            onClick={() => handleSelectConversation(conversation.id)}
            role="listitem"
            aria-current={
              conversation.id === currentConversationId ? 'true' : undefined
            }
            title={conversation.title}
          >
            <MessageSquare size={16} className="conversation-icon" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="conversation-list" role="list" aria-label="대화 목록">
      {groups.map((group) => {
        const expanded = isExpanded(group.dateKey)
        const regionId = `group-${group.dateKey}`
        return (
          <div
            key={group.dateKey}
            className="conversation-group"
            role="group"
            aria-label={group.label}
          >
            <button
              type="button"
              className="conversation-group-header"
              onClick={() => toggleGroup(group.dateKey)}
              aria-expanded={expanded}
              aria-controls={regionId}
            >
              <span className="conversation-group-label">{group.label}</span>
              {expanded ? (
                <ChevronDown size={16} aria-hidden />
              ) : (
                <ChevronRight size={16} aria-hidden />
              )}
            </button>
            <div
              id={regionId}
              className="conversation-group-body"
              role="region"
              aria-label={`${group.label} 대화 목록`}
              hidden={!expanded}
            >
              {group.conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`conversation-item ${conversation.id === currentConversationId ? 'active' : ''}`}
                  onClick={() => handleSelectConversation(conversation.id)}
                  role="listitem"
                  aria-current={
                    conversation.id === currentConversationId
                      ? 'true'
                      : undefined
                  }
                >
                  <MessageSquare size={16} className="conversation-icon" />
                  <span className="conversation-title">
                    {conversation.title}
                  </span>
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteConversation(conversation.id)
                    }}
                    aria-label={`${conversation.title} 삭제`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
