import {
  Container,
  Sidebar,
  SidebarHeader,
  Logo,
  IconBox,
  SearchBox,
  NewChatButton,
  ChatList,
  ChatGroup,
  GroupTitle,
  ChatItem,
  MainContent,
  CenterContent,
  Title,
  Subtitle,
  QuickActions,
  QuickActionButton,
  InputArea,
  InputBox
} from '@widgets/chat-skeleton/ChatSkeleton.styles'

export const ChatWidgetSkeleton = () => {
  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <Logo />
          <IconBox />
        </SidebarHeader>

        <SearchBox />
        <NewChatButton />

        <ChatList>
          <ChatGroup>
            <GroupTitle />
            <ChatItem />
          </ChatGroup>

          <ChatGroup>
            <GroupTitle />
            <ChatItem />
          </ChatGroup>
        </ChatList>
      </Sidebar>

      <MainContent>
        <CenterContent>
          <Title />
          <Subtitle />

          <QuickActions>
            <QuickActionButton />
            <QuickActionButton />
            <QuickActionButton />
            <QuickActionButton />
          </QuickActions>
        </CenterContent>

        <InputArea>
          <InputBox />
        </InputArea>
      </MainContent>
    </Container>
  )
}
