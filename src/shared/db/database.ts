import Dexie, { type EntityTable } from 'dexie'

type Message = {
  id: string
  role: string
  content: string
  createdAt: string
}

// IndexedDB conversations 테이블에 저장되는 레코드 타입
type Conversation = {
  id: string
  title: string
  messages: Message[]
  createdAt: string
  updatedAt: string
  model?: string
  systemPrompt?: string
}

const db = new Dexie('ChatBotDB') as Dexie & {
  conversations: EntityTable<Conversation, 'id'>
}

db.version(1).stores({
  conversations: 'id, title, createdAt, updatedAt'
})

export const getAllConversations = async (): Promise<Conversation[]> => {
  return db.conversations.orderBy('updatedAt').reverse().toArray()
}

export const getConversation = async (
  id: string
): Promise<Conversation | undefined> => {
  return db.conversations.get(id)
}

export const saveConversation = async (
  conversation: Conversation
): Promise<void> => {
  await db.conversations.put(conversation)
}

export const deleteConversation = async (id: string): Promise<void> => {
  await db.conversations.delete(id)
}

export const clearAllConversations = async (): Promise<void> => {
  await db.conversations.clear()
}
