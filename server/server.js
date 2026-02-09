import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { OpenAI } from 'openai'

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '2mb' }))

const client = new OpenAI({
  apiKey: process.env.H_CHAT_API_KEY
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

/**
 * POST /chat/stream
 * body: { model, input }
 * response: SSE (data: <event-json>\n\n)
 */
app.post('/api/chat/stream', async (req, res) => {
  const { model, input } = req.body ?? {}

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')
  if (res.flushHeaders) res.flushHeaders()

  try {
    const stream = await client.responses.create({
      model,
      input,
      stream: true
    })

    for await (const event of stream) {
      res.write(`data: ${JSON.stringify(event)}\n\n`)

      if (event.type === 'response.completed') break
    }
  } catch (err) {
    res.write(
      `event: error\ndata: ${JSON.stringify({
        message: err?.message ?? String(err)
      })}\n\n`
    )
  } finally {
    res.end()
  }
})

const port = Number(process.env.PORT)
app.listen(port, () => {
  console.log(`🚀 http://localhost:${port}`)
  console.log(`POST http://localhost:${port}/chat/stream`)
})
