# HD AI Chatbot – Backend Server

채팅 API(OpenAI 스트리밍 등)를 제공하는 Express 서버입니다.

## 기술 스택 (주요 버전)

| 구분       | 기술         | 버전            |
| ---------- | ------------ | --------------- |
| 런타임     | Node (ESM)   | -               |
| 프레임워크 | Express      | ^5.2.1          |
| OpenAI     | openai       | ^6.17.0         |
| 기타       | cors, dotenv | ^2.8.6, ^17.2.3 |

## 설치 및 실행

```bash
pnpm install
pnpm dev
```

## 환경 변수 (.env)

프로젝트 루트 또는 `server/` 디렉터리에 `.env` 파일을 두고 아래 변수를 설정하세요.

```bash
# openai api key
H_CHAT_API_KEY=sk-...
PORT=8000
```

.env.example 에서 .example 을 삭제하고 진행하시면 됩니다.
