# API 에러 핸들링

API 호출 시 발생하는 오류를 공통 타입·핸들러·메시지로 처리하는 방식입니다.

## 구조

| 구분            | 위치                           | 역할                                                          |
| --------------- | ------------------------------ | ------------------------------------------------------------- |
| 타입            | `shared/api/error/types.ts`    | `ApiErrorType`, `ApiResponseError` 정의                       |
| 메시지          | `shared/api/error/messages.ts` | 에러 타입별 사용자용 문구                                     |
| 핸들러          | `shared/api/error/handler.ts`  | status → 타입 매핑, 토스트 노출, 타입 가드                    |
| HTTP 클라이언트 | `shared/api/config.ts`         | `request()`에서 `!response.ok` 시 `{ status, message }` throw |

API 레이어(`health-check`, `stream-response`)와 UI(`ChatContent`)에서는 `catch`에서 `isApiResponseError(error)`로 구조화된 에러인지 확인한 뒤, `handleApiError(error.status)`로 한 곳에서 토스트를 띄웁니다.

---

## 1. API 에러 핸들링

- **공통 응답 에러**: `request()`가 `response.ok === false`일 때 `{ status, message }` 형태로 throw합니다. (`shared/api/config.ts`)
- **에러 타입 분류**: `getErrorType(status)`로 HTTP status를 `ApiErrorType`으로 매핑합니다.
  - `0` → `NETWORK_ERROR`
  - `401` → `UNAUTHORIZED`
  - `403` → `FORBIDDEN`
  - `404` → `NOT_FOUND`
  - `429` → `RATE_LIMIT`
  - `500` 이상 → `SERVER_ERROR`
  - 그 외 → `UNKNOWN`
- **UI 반영**: `handleApiError(status)`가 위 타입에 맞는 메시지를 `errorMessages`에서 가져와 토스트(sonner)로 표시합니다.
- **타입 안전**: `catch (error: unknown)` 후 `isApiResponseError(error)` 타입 가드로 `ApiResponseError`인 경우만 `error.status`를 사용합니다.

스트리밍 채팅·헬스체크 등 각 feature에서는 서버에서 던진 `{ status, message }`를 그대로 전파하거나, 네트워크/파싱 실패 시 `status: 500` 등으로 감싸서 던지며, 최종적으로 `ChatContent`·헬스체크 쪽 `catch`에서 `handleApiError(error.status)`를 한 번만 호출해 중복 토스트를 막습니다.

---

## 2. 네트워크 에러 처리

- **상태 코드 0**: `getErrorType(0)` → `NETWORK_ERROR`로 분류합니다. (연결 실패, CORS 등으로 status가 0인 경우)
- **메시지**: `errorMessages.NETWORK_ERROR` → `"네트워크 연결을 확인해주세요."` 로 사용자에게 표시됩니다.
- **직접 호출**: 네트워크 오류만 따로 토스트하고 싶을 때는 `handleNetworkError()`를 사용할 수 있습니다. (`handler.ts`)

`request()`는 `fetch` 기반이므로, `fetch`가 reject되면(타임아웃·DNS 실패 등) 응답 객체가 없을 수 있습니다. 그 경우 feature 레이어에서 `{ status, message }` 형태로 감싸서 던지면, 상위에서 `isApiResponseError` + `handleApiError`로 동일하게 처리할 수 있습니다.

---

## 3. API 제한 (Rate Limiting) 처리

- **상태 코드 429**: `getErrorType(429)` → `RATE_LIMIT`으로 분류합니다.
- **메시지**: `errorMessages.RATE_LIMIT` → `"요청이 너무 많습니다. 잠시 후 다시 시도해주세요."` 로 표시됩니다.
- **동작**: 다른 API 에러와 동일하게 `handleApiError(error.status)` 한 번으로 토스트만 하며, 재시도/백오프는 현재 로직에 없습니다. 필요 시 feature 또는 `request()` 레벨에서 429 시 재시도·지연 로직을 추가할 수 있습니다.

---

## 4. 사용자 친화적 에러 메시지

모든 `ApiErrorType`에 대해서는 `shared/api/error/messages.ts`에 한글 메시지가 정의되어 있습니다.

| 타입                  | 메시지                                                 |
| --------------------- | ------------------------------------------------------ |
| `NETWORK_ERROR`       | 네트워크 연결을 확인해주세요.                          |
| `RATE_LIMIT`          | 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.       |
| `UNAUTHORIZED`        | API 키가 올바르지 않습니다.                            |
| `FORBIDDEN`           | 접근 권한이 없습니다.                                  |
| `NOT_FOUND`           | 요청한 리소스를 찾을 수 없습니다.                      |
| `SERVER_ERROR`        | 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요. |
| `UNKNOWN`             | 알 수 없는 오류가 발생했습니다.                        |
| `HEALTH_CHECK_FAILED` | 서비스에 연결할 수 없습니다. 서버 상태를 확인해주세요. |

에러 발생 시 위 메시지가 토스트(sonner, `position: bottom-right`, `richColors`)로만 노출되며, 사용자에게 기술 용어 대신 행동을 유도하는 문구로 전달됩니다.

---

## 5. API 요청 취소 (AbortController / signal)

스트리밍 등 장시간 요청은 사용자가 "응답 중단" 버튼을 누르면 `AbortController`로 취소합니다.

- **공통 레이어**: `shared/api/config.ts`의 `FetchOptions`에 `signal?: AbortSignal`이 있으며, `fetch(endpoint, { ..., signal })`에 그대로 전달됩니다.
- **스트리밍 API**: `features/stream-response/api.ts`의 `StreamChatOptions`에 `signal?: AbortSignal`이 있고, `request(..., { signal })` 호출 시 넘깁니다.
- **UI에서 사용**: `widgets/chat-interface/ChatContent/ChatContent.tsx`에서
  - 전송 시 `abortControllerRef.current = new AbortController()` 생성 후 `streamChat({ ..., signal: abortControllerRef.current.signal })`로 signal 전달.
  - 취소 버튼 시 `handleCancelResponse()`에서 `abortControllerRef.current.abort()` 호출.
  - `finally`에서 `abortControllerRef.current = null`로 정리.
- **취소 시 에러 처리**: `fetch`가 `signal`으로 취소되면 `AbortError`가 발생합니다. `stream-response/api.ts`의 `catch`에서 `error.name === 'AbortError'`일 때 `{ status: 408, message: 'AbortError' }` 형태로 던져, 상위에서 `isApiResponseError`로 처리할 수 있습니다. (408은 현재 `getErrorType`에서 `UNKNOWN`으로 매핑되며, 필요 시 408 전용 타입·메시지를 추가해 취소 시 토스트를 숨기거나 문구를 바꿀 수 있습니다.)

정리하면, **`new AbortController()`로 인스턴스를 만들고 `.signal`을 API 옵션에 넘긴 뒤, 취소 시점에 `.abort()`를 호출**하는 방식으로 API 중단이 이루어집니다.

---

## 사용처 요약

- **헬스체크**: `features/health-check/api.ts` — `!response.ok` 시 `{ status, message }` throw → `catch`에서 `isApiResponseError` + `handleApiError(error.status)` 호출.
- **스트리밍 채팅**: `features/stream-response/api.ts` — `request()` 실패 시 구조화된 에러 전파 또는 500으로 감싸서 throw; `ChatContent`의 `catch`에서 `isApiResponseError` + `handleApiError(error.status)` 호출.
- **채팅 UI**: `widgets/chat-interface/ChatContent/ChatContent.tsx` — 전송 시 `new AbortController()` 생성 후 `streamChat({ ..., signal })`로 signal 전달, 취소 시 `abort()` 호출. 전송 실패 시 `catch`에서 `handleApiError` 한 번만 호출.

추가 API를 붙일 때는 `!response.ok`인 경우 `{ status, message }`를 throw하고, 호출하는 쪽 `catch`에서 `isApiResponseError` 확인 후 `handleApiError(error.status)`를 호출하면 동일한 에러 UX가 유지됩니다.
