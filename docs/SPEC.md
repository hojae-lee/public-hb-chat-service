# Spec

## FSD (Feature-Sliced Design) 구조

```
src/
├── app/          # 앱 초기화, 라우터, 프로바이더
├── pages/        # 라우트별 페이지 (ChatPage 등)
├── widgets/      # UI 블록 (Sidebar, ChatContent, SearchModal 등)
├── features/     # 비즈니스 기능 (health-check, stream-response, search-messages 등)
├── entities/     # 도메인 엔티티 타입 (conversation, message, settings)
└── shared/       # 공용: API, DB, UI, design-system, lib
```

- **app**: `AppProvider`(TanStack Query, 글로벌 스타일, Toaster), 라우트 정의.
- **pages**: URL과 매핑되는 페이지 컴포넌트만. 비즈니스 로직은 features/widgets에 위임.
- **widgets**: 여러 feature/entity를 조합한 화면 단위 UI.
- **features**: API 호출, 검색, 스트리밍, 히스토리, 프롬프트 설정 등 기능 단위.
- **entities**: 도메인 타입 정의.
- **shared**: API 설정·에러 처리, IndexedDB(Dexie), 공용 UI, 디자인 토큰.

레이어 간 규칙: 상위 레이어만 하위 레이어를 참조 (app → pages → widgets → features → entities → shared).

import 순서는 아래 레이어 -> 위 레이어 순서로 지정.

---

## 린트/포맷 설정

### ESLint (Flat config, `eslint.config.js`)

- **대상**: `**/*.{ts,tsx,js,jsx}` (config·일부 `**/*.js` 제외)
- **기반**: `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-config-prettier`(포맷 충돌 방지)
- **플러그인**: React, React Hooks, TanStack Query, unused-imports, import
- **주요 규칙**:
  - React: `jsx-runtime`, `function-component-definition`(arrow-function), `prop-types`/`display-name` off
  - 미사용: `unused-imports/no-unused-imports` error, `no-unused-vars`는 `^_` 무시
  - **FSD import order** (`import/order`): 순서 `builtin` → `external` → `internal`(pathGroups) → parent/sibling/index. pathGroups는 `@shared/**`, `@entities/**`, `@features/**`, `@widgets/**`, `@pages/**`, `@app/**`를 internal 앞에 레이어 순으로 정렬. `pathGroupsExcludedImportTypes: ['builtin','external']`, `alphabetize`, `newlines-between: 'always'`
  - **순환 참조** (`import/no-cycle`): 순환 import 금지. `maxDepth: 10`으로 검사. FSD 레이어 의존성(상위→하위 단방향) 위반 시 에러.

### Prettier (`.prettierrc.js`)

- **옵션**: `printWidth: 80`, `tabWidth: 2`, `semi: false`, `singleQuote: true`, `trailingComma: 'none'`, `endOfLine: 'lf'`, `arrowParens: 'always'`
- **스크립트**: `pnpm format`(쓰기), `pnpm format:check`(검사만)

---

## 경로 별칭 및 빌드

- **경로 별칭**: `tsconfig.json` `paths` 및 Vite `resolve.alias` 동기화. `@/`(src), `@app/*`, `@pages/*`, `@widgets/*`, `@features/*`, `@entities/*`, `@shared/*`. import 시 FSD 레이어 alias 사용 권장.
- **React Compiler**: Vite `@vitejs/plugin-react`에 `babel-plugin-react-compiler` 적용.
- **빌드 청크**: `manualChunks`로 vendor 분리 — `react-vendor`, `markdown`, `ui`(emotion, lucide), `data`(zustand, tanstack-query, dexie), `router`, `sonner`, 그 외 `vendor`.

---

## TanStack Query

- **버전**: `@tanstack/react-query@5.90.12`
- **역할**: 서버 상태(캐시, 리페치, 로딩/에러) 관리.
- **사용처**:
  - `app/providers/AppProvider.tsx`: `QueryClient` 생성, `QueryClientProvider`로 앱 래핑.
  - `features/health-check/useHealthCheck.ts`: ~~헬스체크 API를 주기적으로 호출하고 연결 상태 표시에 사용.~~ -> 훅이 처음 쓰일 때 한 번만 호출하는 방식으로 변경. (http error 를 별도로 처리해서 주기적으로 체크하는 것에 큰 의미가 없음.)

```ts
// AppProvider.tsx
const queryClient = new QueryClient()
<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

// useHealthCheck.ts
return useQuery(healthQueries.health())
```

추가 API(채팅 히스토리 등)를 서버에서 가져오는 경우에도 동일하게 `queryOptions` + 훅으로 확장하는 것을 권장.

---

## 팩토리 패턴 (Query Options)

TanStack Query의 **query options 팩토리**를 사용해 쿼리 키·옵션을 한 곳에서 관리합니다.

- **위치**: `features/health-check/useHealthCheck.ts`
- **구성**:
  - `healthQueryKeys`: 쿼리 키 상수 (`['health']`).
  - `healthQueries`: `queryOptions()`를 반환하는 팩토리 객체. 헬스체크는 최초 1회만 호출하므로 `staleTime: Infinity`, `refetchOnMount: false`, `refetchOnWindowFocus: false`로 주기 refetch 비활성화.
  - `useHealthCheck`: `useQuery(healthQueries.health())`로 훅에서 사용.

```ts
const healthQueryKeys = { all: ['health'] as const }

export const healthQueries = {
  health: () =>
    queryOptions({
      queryKey: healthQueryKeys.all,
      queryFn: healthCheck,
      staleTime: Infinity,
      retry: 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    })
}

export const useHealthCheck = () => useQuery(healthQueries.health())
```

이점: 쿼리 키·옵션이 feature 단위로 모여 있어 prefetch·invalidate 시 동일한 `healthQueries.health()`를 재사용할 수 있고, 타입과 일관성이 유지됩니다. 새로운 API가 생기면 해당 feature에 `xxxQueries`를 추가해 같은 패턴으로 확장하면 됩니다.

---
