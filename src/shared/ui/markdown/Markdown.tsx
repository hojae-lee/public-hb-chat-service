import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MarkdownWrapper } from '@shared/ui/markdown/Markdown.styles'

type MarkdownProps = {
  content: string
}

export const Markdown = ({ content }: MarkdownProps) => {
  return (
    <MarkdownWrapper>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </MarkdownWrapper>
  )
}
