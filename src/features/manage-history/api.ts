import {
  getAllConversations as dbGetAllConversations,
  getConversation as dbGetConversation,
  saveConversation as dbSaveConversation,
  deleteConversation as dbDeleteConversation
} from '@shared/db/database'
import type { Conversation } from '@entities/conversation/types'

// 대화 목록 조회
export const getAllConversations = async (): Promise<Conversation[]> => {
  return dbGetAllConversations() as Promise<Conversation[]>
}

// 대화 조회
export const getConversation = async (
  id: string
): Promise<Conversation | undefined> => {
  return dbGetConversation(id) as Promise<Conversation | undefined>
}

// 대화 저장
export const saveConversation = async (
  conversation: Conversation
): Promise<void> => {
  return dbSaveConversation(conversation)
}

// 대화 삭제
export const deleteConversation = async (id: string): Promise<void> => {
  return dbDeleteConversation(id)
}
