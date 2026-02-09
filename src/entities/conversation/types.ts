import type { Message } from '@entities/message/types'

/** DB 및 메모리에서 사용하는 대화 한 건 (저장/로드 단위) */
export type Conversation = {
  id: string
  title: string
  messages: Message[]
  createdAt: string
  updatedAt: string
  /** 이 대화에서 사용한 모델 id (없으면 기본값 사용) */
  model?: string
  /** 이 대화의 시스템 프롬프트 (없으면 빈 문자열) */
  systemPrompt?: string
}
