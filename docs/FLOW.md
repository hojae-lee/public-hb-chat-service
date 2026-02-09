# 화면·데이터 흐름 예시

## 라우트 → 페이지 → 위젯

1. **진입점**: `main.tsx` → 라우터에 `routes` 주입.
2. **라우트**: `app/router/routes.tsx`
   - `/` → `/chat`로 리다이렉트.
   - `/chat`, `/chat/:conversationId` → `App` 레이아웃 + 자식으로 `ChatPage`.
3. **앱 레이아웃**: `App.tsx` → `AppProvider`(QueryClient, 글로벌 스타일, Toaster) → `Outlet`(자식 라우트).
4. **채팅 페이지**: `pages/chat/page.tsx` (`ChatPage`)
   - `Sidebar`, `ChatContent`, `SearchModal` 조합.
   - URL `conversationId`에 따라 `useHistoryStore.selectConversation` / `clearCurrentConversation` 호출.
   - 검색 결과 선택 시 `navigate(/chat/:id)` + state로 키워드·메시지 ID 전달. 채팅 진입 시(검색 포함) 메시지 영역은 항상 최하단으로 스크롤되고, 검색 키워드 하이라이트는 유지됨.
5. **채팅 본문**: `widgets/chat-interface/ChatContent/ChatContent.tsx`
   - 메시지 목록(`MessageList`), 입력·프롬프트 모드(`PromptModeBar`, `MessageInput`), 모델 선택, 검색 상태 바 등 포함.
   - 대화 진입·전환 시 스크롤 컨테이너를 최하단으로 이동하는 로직 포함.
   - 스트리밍 전송·취소는 `features/stream-response` 스토어와 API 사용.

## 데이터 흐름 요약

- **헬스체크**: `AppProvider` 하단 어딘가에서 `useHealthCheck()` → TanStack Query가 주기적으로 헬스 API 호출 → Sidebar 등에서 연결 상태 표시.
- **대화·메시지**: `manage-history`, `stream-response` 스토어 + `shared/db`(Dexie)로 로컬 저장·로드.
- **검색**: `search-messages` 스토어 + 검색 알고리즘 → `SearchStateBar`에서 결과 수·현재 인덱스, `MessageItem`에서 하이라이팅.
