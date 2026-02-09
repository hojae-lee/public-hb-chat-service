import { describe, it, expect, beforeEach } from 'vitest'
import { useStreamStore } from '@features/stream-response/store'

describe('stream-response/store', () => {
  beforeEach(() => {
    useStreamStore.getState().reset()
  })

  it('초기 상태: isStreaming false, streamingContent 빈 문자열', () => {
    const state = useStreamStore.getState()
    expect(state.isStreaming).toBe(false)
    expect(state.streamingContent).toBe('')
  })

  it('startStreaming() 호출 시 isStreaming true, streamingContent 빈 문자열', () => {
    useStreamStore.getState().startStreaming()
    const state = useStreamStore.getState()
    expect(state.isStreaming).toBe(true)
    expect(state.streamingContent).toBe('')
  })

  it('appendContent(chunk) 호출 시 streamingContent에 chunk 누적', () => {
    useStreamStore.getState().appendContent('Hello')
    expect(useStreamStore.getState().streamingContent).toBe('Hello')

    useStreamStore.getState().appendContent(' ')
    useStreamStore.getState().appendContent('World')
    expect(useStreamStore.getState().streamingContent).toBe('Hello World')
  })

  it('stopStreaming() 호출 시 isStreaming false, content는 유지', () => {
    useStreamStore.getState().startStreaming()
    useStreamStore.getState().appendContent('partial')
    useStreamStore.getState().stopStreaming()

    const state = useStreamStore.getState()
    expect(state.isStreaming).toBe(false)
    expect(state.streamingContent).toBe('partial')
  })

  it('reset() 호출 시 초기 상태로 복귀', () => {
    useStreamStore.getState().startStreaming()
    useStreamStore.getState().appendContent('some content')
    useStreamStore.getState().reset()

    const state = useStreamStore.getState()
    expect(state.isStreaming).toBe(false)
    expect(state.streamingContent).toBe('')
  })
})
