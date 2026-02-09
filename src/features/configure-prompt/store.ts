import { create } from 'zustand'
import { getAvailableModels, type ModelAttribute } from '@shared/lib/models'

type PromptState = {
  isModalOpen: boolean
}

type PromptActions = {
  openModal: () => void
  closeModal: () => void
  getModels: () => { id: string; name: string; description: string }[]
}

export const usePromptStore = create<PromptState & PromptActions>()((set) => ({
  isModalOpen: false,

  openModal: () => set({ isModalOpen: true }),

  closeModal: () => set({ isModalOpen: false }),

  getModels: (): ModelAttribute[] => getAvailableModels()
}))
