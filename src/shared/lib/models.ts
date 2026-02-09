export type ModelAttribute = {
  id: string
  name: string
  description: string
}

export const getAvailableModels = (): ModelAttribute[] => [
  {
    id: 'gpt-5',
    name: 'GPT-5',
    description: '강력한 범용 모델 · 최고 성능/정확도'
  },
  {
    id: 'gpt-5-mini',
    name: 'GPT-5 Mini',
    description: '비용 효율과 속도 균형이 좋은 모델'
  },
  {
    id: 'gpt-5-nano',
    name: 'GPT-5 Nano',
    description: '가장 빠르고 저렴한 경량 모델'
  },
  {
    id: 'gpt-5.2',
    name: 'GPT-5.2',
    description: 'GPT-5 계열 최신 플래그십 모델'
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    description: '검증된 고성능 모델 (GPT-4 후속)'
  },
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 Mini',
    description: '경량 고성능 모델'
  },
  {
    id: 'gpt-4.1-nano',
    name: 'GPT-4.1 Nano',
    description: '가장 빠르고 가장 저렴한 GPT-4.1 계열 모델'
  }
]
