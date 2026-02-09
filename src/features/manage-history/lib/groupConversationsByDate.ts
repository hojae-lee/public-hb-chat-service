import dayjs from 'dayjs'
import { formatDate } from '@shared/lib/dateFormat'
import type { Conversation } from '@entities/conversation/types'

export type ConversationGroup = {
  label: string
  dateKey: string
  conversations: Conversation[]
}

const getGroupLabel = (dateKey: string): string => {
  const d = dayjs(dateKey)
  const today = dayjs().startOf('day')

  if (d.isSame(today, 'day')) return 'Today'
  return formatDate(dateKey)
}

export const groupConversationsByDate = (
  conversations: Conversation[]
): ConversationGroup[] => {
  const map = new Map<string, Conversation[]>()

  for (const c of conversations) {
    const dateKey = dayjs(c.createdAt).format('YYYY-MM-DD')
    const list = map.get(dateKey) ?? []
    list.push(c)
    map.set(dateKey, list)
  }

  const sortedKeys = [...map.keys()].sort((a, b) => (a > b ? -1 : 1))
  return sortedKeys.map((dateKey) => ({
    dateKey,
    label: getGroupLabel(dateKey),
    conversations: map.get(dateKey)!
  }))
}
