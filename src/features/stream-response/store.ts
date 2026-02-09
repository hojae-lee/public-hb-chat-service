import { create } from 'zustand'

type StreamState = {
  isStreaming: boolean
  streamingContent: string
}

type StreamActions = {
  startStreaming: () => void
  appendContent: (chunk: string) => void
  stopStreaming: () => void
  reset: () => void
}

const initialState: StreamState = {
  isStreaming: false,
  streamingContent: ''
}

export const useStreamStore = create<StreamState & StreamActions>((set) => ({
  ...initialState,

  startStreaming: () => {
    set({
      isStreaming: true,
      streamingContent: ''
    })
  },

  appendContent: (chunk: string) => {
    set((state) => ({
      streamingContent: state.streamingContent + chunk
    }))
  },

  stopStreaming: () => {
    set({ isStreaming: false })
  },

  reset: () => set(initialState)
}))
