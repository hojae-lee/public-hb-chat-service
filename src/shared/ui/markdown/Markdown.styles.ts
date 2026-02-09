import styled from '@emotion/styled'
import { colors, spacing, typography } from '@shared/design-system'

export const MarkdownWrapper = styled.div`
  font-family: ${typography.fontFamily.sans};
  font-size: ${typography.fontSize.md};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.text.primary};
  word-break: break-word;

  & > *:first-of-type {
    margin-top: 0;
  }

  & > *:last-of-type {
    margin-bottom: 0;
  }

  /* Highlighter Markdown 적용 */
  & > span {
    display: block;
    white-space: pre-wrap;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: ${typography.fontWeight.semibold};
    line-height: ${typography.lineHeight.tight};
    margin: ${spacing[4]} 0 ${spacing[2]};
    color: ${colors.text.primary};
  }

  h1 {
    font-size: ${typography.fontSize['2xl']};
  }

  h2 {
    font-size: ${typography.fontSize.xl};
  }

  h3 {
    font-size: ${typography.fontSize.lg};
  }

  h4,
  h5,
  h6 {
    font-size: ${typography.fontSize.md};
  }

  p {
    margin: 0 0 ${spacing[3]};
  }

  :not(pre) > code {
    font-family: ui-monospace, 'Fira Code', 'Consolas', monospace;
    font-size: ${typography.fontSize.sm};
    background: ${colors.gray[100]};
    color: ${colors.text.primary};
    padding: 2px 6px;
    border-radius: 6px;
    border: 1px solid ${colors.border.light};
  }

  pre {
    margin: ${spacing[3]} 0;
    padding: ${spacing[4]};
    background: ${colors.gray[100]};
    border: 1px solid ${colors.border.light};
    border-radius: 8px;
    overflow-x: auto;
  }

  pre code {
    font-family: ui-monospace, 'Fira Code', 'Consolas', monospace;
    font-size: ${typography.fontSize.sm};
    line-height: ${typography.lineHeight.relaxed};
    color: ${colors.text.primary};
    background: none;
    padding: 0;
    border: none;
  }

  ul,
  ol {
    margin: 0 0 ${spacing[3]};
    padding-left: ${spacing[6]};
  }

  li {
    margin: ${spacing[1]} 0;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  blockquote {
    margin: ${spacing[3]} 0;
    padding: ${spacing[2]} ${spacing[4]};
    border-left: 4px solid ${colors.primary[400]};
    background: ${colors.primary[50]};
    color: ${colors.text.primary};
    border-radius: 0 8px 8px 0;
  }

  blockquote p {
    margin: 0;
  }

  a {
    color: ${colors.primary[600]};
    text-decoration: underline;
  }

  a:hover {
    color: ${colors.primary[700]};
  }

  table {
    width: 100%;
    margin: ${spacing[3]} 0;
    border-collapse: collapse;
    font-size: ${typography.fontSize.sm};
  }

  th,
  td {
    padding: ${spacing[2]} ${spacing[3]};
    border: 1px solid ${colors.border.light};
    text-align: left;
  }

  th {
    background: ${colors.gray[100]};
    font-weight: ${typography.fontWeight.semibold};
  }

  tr:nth-of-type(even) {
    background: ${colors.gray[50]};
  }

  hr {
    margin: ${spacing[4]} 0;
    border: none;
    border-top: 1px solid ${colors.border.light};
  }

  strong {
    font-weight: ${typography.fontWeight.bold};
  }

  em {
    font-style: italic;
  }
`
