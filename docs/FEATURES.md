# 구현 기능 목록

CHECKLIST 기준 구현된 기능과 해당 컴포넌트/모듈 매핑입니다.

## 1. 기본 채팅 UI

| 기능                                         | 위치                                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| 히스토리 확인 가능한 sidebar                 | `widgets/sidebar/Sidebar.tsx`, `SidebarList.tsx`                                |
| 채팅 검색 가능한 검색 창                     | `widgets/search-bar/SearchBar.tsx`, `widgets/search-modal/SearchModal.tsx`      |
| 채팅 리스트                                  | `widgets/chat-interface/Message/MessageList.tsx`, `MessageItem.tsx`             |
| 채팅/대화 진입 시 메시지 목록 최하단 스크롤  | `widgets/chat-interface/ChatContent/ChatContent.tsx`                            |
| 채팅 입력창 (시스템 프롬프트·모델 설정 포함) | `MessageInput.tsx`, `ModelSelector`, `widgets/configure-prompt/PromptModal.tsx` |

## 2. 스트리밍 채팅

| 기능                        | 위치                                                      |
| --------------------------- | --------------------------------------------------------- |
| 생성형 AI API 스트리밍 호출 | `features/stream-response/api.ts`                         |
| 선택한 모델로 대화 API 전송 | `features/stream-response/api.ts`, `shared/lib/models.ts` |
| Stream 응답 실시간 처리     | `features/stream-response/store.ts`, `MessageList.tsx`    |
| 마크다운 렌더링             | `shared/ui/Markdown/Markdown.tsx`                         |
| 로딩·에러 처리              | `shared/api/error/`, `MessageList.tsx`, `ChatContent.tsx` |
| 응답 취소                   | `features/stream-response/store.ts` (AbortController)     |

**동작 요약**

- **API 호출**: `streamChat()`이 `POST /api/chat/stream`으로 요청. `Accept: text/event-stream`, body에 `model`과 `input`(시스템 프롬프트 + 대화 메시지 배열) 전달. 응답은 ReadableStream으로 받아 SSE 형식(`\n\n` 구분)으로 파싱 후 `data:` 라인 내용을 청크로 반환. 스트림 종료 시 누적된 전체 텍스트(`fullContent`)와 완료 여부 반환.
- **스트림 상태**: `features/stream-response/store.ts`에서 `isStreaming`(진행 여부), `streamingContent`(지금까지 수신한 텍스트) 관리. `startStreaming()`으로 시작·버퍼 비움, `appendContent(chunk)`로 청크 누적, `stopStreaming()`으로 플래그만 끔, `reset()`으로 스트림 관련 상태 전부 초기화. 응답이 끝나면(정상/에러/취소 공통) `reset()`을 호출해 다음 전송 시 이전 내용이 남지 않도록 함.
- **전송 흐름**: 사용자 전송 시 `ChatContent`에서 `startStreaming()` → 사용자 메시지 `addMessage` → `streamChat({ onChunk: appendContent, signal })` 호출. API가 보내는 청크마다 `appendContent`가 호출되어 `streamingContent`가 갱신되고, `MessageList`가 해당 내용을 실시간으로 표시(마크다운 렌더). 스트림이 끝나면 `fullContent`로 assistant 메시지를 만들어 `addMessage` 후 `resetStream()`.
- **취소**: 전송 중 취소 버튼 클릭 시 `AbortController.abort()`로 fetch 중단. catch에서 `stopStreaming()`, finally에서 `resetStream()` 호출.
- **로딩/에러**: `isStreaming && !streamingContent`일 때 Spinner 표시. API 에러는 `handleApiError`로 처리.

## 3. 모델 선택 / 시스템 프롬프트

| 기능                      | 위치                                                     |
| ------------------------- | -------------------------------------------------------- |
| 모델 선택 드롭다운        | `widgets/chat-interface/ModelSelector/ModelSelector.tsx` |
| 시스템 프롬프트 설정 모달 | `widgets/configure-prompt/PromptModal.tsx`               |
| 프롬프트 저장·로드        | `features/configure-prompt/store.ts`                     |

## 4. 대화 히스토리 저장·관리

| 기능                           | 위치                                                                |
| ------------------------------ | ------------------------------------------------------------------- |
| 대화 내역 저장 (새로고침 유지) | `shared/db/database.ts` (Dexie), `features/manage-history/`         |
| 첫 전송 시 sidebar에 추가      | `features/manage-history/store.ts`, `SidebarList.tsx`               |
| sidebar에서 대화 선택 시 로드  | `pages/chat/page.tsx`, `useHistoryStore`                            |
| 대화 내역 삭제                 | `widgets/sidebar/SidebarList.tsx`, `features/manage-history/api.ts` |
| 대화별 입력창 초안 저장        | `features/conversation-draft/store.ts`                              |

**대화별 스토어 저장**

- **대화·메시지**: `manage-history` 스토어의 `conversations` 배열에 대화 단위로 저장. 각 `Conversation`이 자신의 `messages` 배열을 가지며, 선택한 대화만 `currentConversationId` / `currentMessages`로 표시. DB(IndexedDB)에도 `saveConversation` 등으로 대화 단위 저장.
- **입력창 초안(드래프트)**: `conversation-draft` 스토어의 `draftByConversationId: Record<string, string>`로 대화 ID별 입력 내용을 분리 저장. 새 채팅은 키 `'new'` 사용. `ChatContent`에서 `currentConversationId ?? 'new'`로 키를 정해 읽고, `setDraft(conversationId, value)`로 해당 대화에만 저장.

## 5. 대화 검색

| 기능                    | 위치                                                         |
| ----------------------- | ------------------------------------------------------------ |
| 상단 검색창 키워드 입력 | `widgets/search-bar/SearchBar.tsx`                           |
| 검색 결과 수 노출       | `widgets/chat-interface/SearchStateBar/SearchStateBar.tsx`   |
| 화살표로 다음 결과 이동 | `SearchStateBar.tsx`, `features/search-messages/store.ts`    |
| 키워드 하이라이팅       | `features/search-messages/highlighter.ts`, `MessageItem.tsx` |
| Debounce (실시간 검색)  | `use-debounce`, `SearchBar` / 검색 로직                      |

**동작 요약**

- **두 가지 검색 경로**
  - **현재 대화 검색**: 상단 SearchBar / 채팅 화면의 SearchStateBar. 현재 열린 대화의 `currentMessages`만 대상으로 검색.
  - **전체 대화 검색**: 사이드바 "채팅 검색" → SearchModal. 모든 대화(`conversations`)를 순회하며 키워드가 포함된 메시지를 찾고, 대화 제목·메시지 스니펫으로 결과 표시. 결과 클릭 시 해당 대화로 이동하며, 스크롤은 항상 최하단으로 이동하고 키워드 하이라이트·검색 상태바로 해당 검색 결과를 표시.
- **검색 방식**: 메모리에 로드된 대화·메시지 배열을 클라이언트에서 검색. `features/search-messages/searchAlgorithm.ts`는 `indexOf`로 부분 문자열(대소문자 무시) 매칭, `store.ts`의 `search()`는 정규식(키워드 이스케이프 + `gi`)으로 등장 횟수를 세어 다음/이전 결과 인덱스와 하이라이트 위치를 계산.
- **하이라이트**: `highlighter.ts`의 `getHighlightedSegments`로 메시지 본문을 키워드 등장 구간별로 잘라 UI에 강조 표시.

## 6. 테스트

| 대상                                                    | 위치                                                                   |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| 검색 알고리즘 (부분 문자열, 대소문자 무시)              | `features/search-messages/searchAlgorithm.unit.test.ts`                |
| 히스토리 API (조회·저장·삭제)                           | `features/manage-history/api.unit.test.ts`                             |
| 스트림 스토어 (startStreaming, appendContent, reset 등) | `features/stream-response/store.unit.test.ts`                          |
| 하이라이팅 UI                                           | `shared/ui/highlighter/HighlightedText.ui.test.tsx`                    |
| 메시지 입력/전송, 전송 버튼·취소 버튼                   | `widgets/chat-interface/Message/MessageInput/MessageInput.ui.test.tsx` |
| 메시지 리스트 렌더·스트리밍 표시                        | `widgets/chat-interface/Message/MessageList/MessageList.ui.test.tsx`   |
| 모델 선택 드롭다운                                      | `widgets/chat-interface/ModelSelector/ModelSelector.ui.test.tsx`       |

**실행**

- 전체: `pnpm test`
- 단위만: `pnpm test:unit` (파일명에 `unit` 포함된 테스트)
- UI만: `pnpm test:ui` (파일명에 `ui` 포함된 테스트)
- CI: lint → format:check → test:unit → test:ui → build
