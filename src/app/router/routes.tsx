import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router'
import { ChatWidgetSkeleton } from '@widgets/chat-skeleton/ChatSkeleton'

// lazy loading 추가 (code splitting)
const App = lazy(() => import('@app/App'))
const ChatPage = lazy(() => import('@pages/chat/page'))

// 라우트 설정
export const routes = [
  { path: '/', element: <Navigate to="/chat" replace /> },
  {
    path: '/chat',
    element: (
      <Suspense fallback={<ChatWidgetSkeleton />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <ChatPage />
      },
      {
        path: ':conversationId',
        element: <ChatPage />
      }
    ]
  }
]
