import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fff;
`

export const Sidebar = styled.aside`
  width: 280px;
  background-color: #1e67d3;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const Logo = styled.div`
  width: 120px;
  height: 24px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`

export const IconBox = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`

export const SearchBox = styled.div`
  height: 40px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`

export const NewChatButton = styled.div`
  height: 40px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`

export const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`

export const ChatGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const GroupTitle = styled.div`
  width: 60px;
  height: 16px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 8px;
`

export const ChatItem = styled.div`
  height: 36px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 6px;
`

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`

export const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 600px;
`

export const Title = styled.div`
  width: 240px;
  height: 32px;
  background: linear-gradient(to right, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%);
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`

export const Subtitle = styled.div`
  width: 320px;
  height: 20px;
  background: linear-gradient(to right, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%);
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 6px;
`

export const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`

export const QuickActionButton = styled.div`
  width: 120px;
  height: 36px;
  background: linear-gradient(to right, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%);
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 18px;
`

export const InputArea = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 360px);
  max-width: 800px;
`

export const InputBox = styled.div`
  height: 56px;
  background: linear-gradient(to right, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%);
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`
