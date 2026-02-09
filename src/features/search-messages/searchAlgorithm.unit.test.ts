import type { Conversation } from '@entities/conversation/types'
import type { Message } from '@entities/message/types'
import {
  searchMessages,
  searchAllConversations
} from '@features/search-messages/searchAlgorithm'

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

describe('searchMessages: 메시지 배열에서 키워드가 등장하는 모든 위치 검색', () => {
  it('1. 빈 키워드면 빈 배열을 반환한다', () => {
    const messages = [
      createMessage('1', 'hello world'),
      createMessage('2', '안녕하세요')
    ]
    expect(searchMessages(messages, '')).toEqual([])
    expect(searchMessages(messages, '  ')).toEqual([])
  })

  it('2. 키워드가 없으면 빈 배열을 반환한다', () => {
    const messages = [
      createMessage('1', 'hello world'),
      createMessage('2', '안녕하세요')
    ]
    expect(searchMessages(messages, '테스트')).toEqual([])
  })

  it('3. 대소문자를 구분하지 않고 매칭한다', () => {
    const messages = [
      createMessage('1', 'Hello World'),
      createMessage('2', 'hello WORLD')
    ]
    const result = searchMessages(messages, 'world')
    expect(result).toHaveLength(2)
  })

  it('4. 한 메시지에서 키워드가 여러 번 나오면 모든 위치 인덱스를 반환한다', () => {
    const messages = [
      createMessage(
        '1',
        '테스트 안녕하세요. 테스트 안녕하세요. 테스트 안녕하세요.'
      )
    ]
    const result = searchMessages(messages, '테스트')
    expect(result[0]).toEqual({
      messageId: '1',
      indices: [0, 11, 22]
    })
  })

  it('5. 매칭되는 메시지만 결과에 포함한다', () => {
    const messages = [
      createMessage('1', '안녕하세요.'),
      createMessage('2', '키워드가 있는 메시지입니다.'),
      createMessage('3', '없는 메시지입니다.')
    ]
    const result = searchMessages(messages, '키워드')
    expect(result).toEqual([
      {
        messageId: '2',
        indices: [0]
      }
    ])
  })
})

describe('searchAllConversations: 모든 대화에서 키워드를 검색하여 결과 반환', () => {
  it('1. 빈 키워드면 빈 배열을 반환한다', () => {
    const conversations = [
      createConversation('c1', '대화1', [createMessage('m1', 'hello')])
    ]
    expect(searchAllConversations(conversations, '')).toEqual([])
    expect(searchAllConversations(conversations, '   ')).toEqual([])
  })

  it('2. 키워드가 없으면 빈 배열을 반환한다', () => {
    const conversations = [
      createConversation('c1', '대화1', [createMessage('m1', 'hello world')])
    ]
    expect(searchAllConversations(conversations, 'xyz')).toEqual([])
  })

  it('3. 매칭되는 메시지에 대해 대화 정보와 스니펫을 반환한다', () => {
    const conversations = [
      createConversation('conv-1', '첫 번째 대화', [
        createMessage('msg-1', 'hello world'),
        createMessage('msg-2', '안녕하세요.')
      ])
    ]
    const result = searchAllConversations(conversations, '안녕')
    expect(result[0].snippet).toContain('안녕')
  })

  it('4. 여러 대화에서 검색 결과를 모두 반환한다', () => {
    const conversations = [
      createConversation('c1', '대화1', [
        createMessage('m1', 'hello'),
        createMessage('m2', '안녕하세요.')
      ]),
      createConversation('c2', '대화2', [createMessage('m3', '안녕하세요.')])
    ]
    const result = searchAllConversations(conversations, '안녕')
    expect(result).toHaveLength(2)
  })
})
