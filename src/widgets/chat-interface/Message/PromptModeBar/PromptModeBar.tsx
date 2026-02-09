import {
  PromptModeBarWrapper,
  ModeChip
} from '@widgets/chat-interface/Message/PromptModeBar/PromptModeBar.styles'

const PROMPT_MODES = [
  {
    id: 'onboarding',
    label: '온보딩 전체 안내',
    prompt:
      '우리 회사에 첫 입사한 신입 기준으로 온보딩 내용을 단계별로 정리해줘.'
  },
  {
    id: 'welcome-email',
    label: '입사 인사 메일',
    prompt: '신입 입사 인사 메일 템플릿을 정중한 톤으로 작성해줘.'
  },
  {
    id: 'doc-summary',
    label: '문서 요약 (업무 파악용)',
    prompt: '신입이 빠르게 업무를 이해할 수 있도록 이 문서를 요약해줘.'
  },
  {
    id: 'meeting-notes',
    label: '회의록 정리',
    prompt: '회의 내용을 회의록 형식으로 정리해줘.'
  }
] as const

type PromptModeBarProps = {
  onSelectMode: (prompt: string) => void
}

export const PromptModeBar = ({ onSelectMode }: PromptModeBarProps) => {
  return (
    <PromptModeBarWrapper role="group" aria-label="프롬프트 모드 선택">
      {PROMPT_MODES.map(({ id, label, prompt }) => (
        <ModeChip
          key={id}
          type="button"
          onClick={() => onSelectMode(prompt)}
          aria-label={label}
        >
          <span>{label}</span>
        </ModeChip>
      ))}
    </PromptModeBarWrapper>
  )
}
