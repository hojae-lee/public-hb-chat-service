import {
  WelcomeScreenWrapper,
  WelcomeGreeting,
  WelcomeSubtitle
} from '@widgets/chat-interface/WelcomeScreen/WelcomeScreen.styles'

export const WelcomeScreen = () => {
  return (
    <WelcomeScreenWrapper>
      <WelcomeGreeting>오늘 무엇을 할까요?</WelcomeGreeting>
      <WelcomeSubtitle>
        아래에서 모드를 선택하거나 바로 입력해 보세요.
      </WelcomeSubtitle>
    </WelcomeScreenWrapper>
  )
}
