import { css } from '@emotion/react'
import { colors, typography } from '@shared/design-system'

export const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: clamp(0.875rem, 0.5rem + 1vw, 1rem);
  }

  body {
    font-family: ${typography.fontFamily.sans};
    font-size: ${typography.fontSize.md};
    line-height: ${typography.lineHeight.normal};
    color: ${colors.text.primary};
    background-color: ${colors.background.primary};
    min-height: 100vh;
    margin: 0;
  }

  #root {
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  input,
  textarea {
    font-family: inherit;
  }

  ul,
  ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }
`
