import { beforeEach, vi } from 'vitest'
import {
  getAllConversations as dbGetAll,
  getConversation as dbGetOne,
  saveConversation as dbSave,
  deleteConversation as dbDelete
} from '@shared/db/database'
import type { Conversation } from '@entities/conversation/types'
import type { Message } from '@entities/message/types'
import {
  getAllConversations,
  getConversation,
  saveConversation,
  deleteConversation
} from '@features/manage-history/api'

// mock 함수 정의 (msw 를 이용한 api 테스트가 아니라 vi.mock 를 이용하여 DB 함수 모킹)
vi.mock('@shared/db/database', () => ({
  getAllConversations: vi.fn(),
  getConversation: vi.fn(),
  saveConversation: vi.fn(),
  deleteConversation: vi.fn()
}))

// 메시지 생성 함수
const createMessage = (
  id: string,
  content: string,
  role: Message['role'] = 'user'
): Message => ({
  id,
  role,
  content,
  createdAt: new Date().toISOString()
})

// 대화 생성 함수
const createConversation = (
  id: string,
  title: string,
  messages: Message[]
): Conversation => ({
  id,
  title,
  messages,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

// it 테스트 시작 전 리셋
beforeEach(() => {
  vi.clearAllMocks()
})

describe('getAllConversations: 모든 대화 조회', () => {
  it('1. DB가 빈 배열을 반환하면 빈 배열이 반환된다', async () => {
    vi.mocked(dbGetAll).mockResolvedValue([])
    const result = await getAllConversations()
    expect(dbGetAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual([])
  })

  it('2. DB가 대화 목록을 반환하면 그대로 반환된다', async () => {
    const conversations = [
      createConversation('1', '대화1', [createMessage('m1', '안녕')]),
      createConversation('2', '대화2', [])
    ]
    vi.mocked(dbGetAll).mockResolvedValue(conversations)
    const result = await getAllConversations()
    expect(dbGetAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual(conversations)
  })
})

describe('getConversation: 특정 대화 조회', () => {
  it('1. 해당 id로 DB get이 호출되고, 반환된 대화가 그대로 반환된다', async () => {
    const conversation = createConversation('c1', '제목', [
      createMessage('m1', '내용')
    ])
    vi.mocked(dbGetOne).mockResolvedValue(conversation)
    const result = await getConversation('c1')
    expect(dbGetOne).toHaveBeenCalledTimes(1)
    expect(dbGetOne).toHaveBeenCalledWith('c1')
    expect(result).toEqual(conversation)
  })
})

describe('saveConversation: 대화 저장', () => {
  it('1. 전달한 conversation으로 DB put이 1회 호출된다', async () => {
    vi.mocked(dbSave).mockResolvedValue()
    const conversation = createConversation('c1', '저장할 대화', [])
    await saveConversation(conversation)
    expect(dbSave).toHaveBeenCalledTimes(1)
    expect(dbSave).toHaveBeenCalledWith(conversation)
  })
})

describe('deleteConversation: 대화 삭제', () => {
  it('1. 전달한 id로 DB delete가 1회 호출된다', async () => {
    vi.mocked(dbDelete).mockResolvedValue()
    await deleteConversation('c1')
    expect(dbDelete).toHaveBeenCalledTimes(1)
    expect(dbDelete).toHaveBeenCalledWith('c1')
  })
})
