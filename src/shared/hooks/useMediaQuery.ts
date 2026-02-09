import { useState, useEffect } from 'react'
import { breakpoints } from '@shared/design-system'

// 뷰포트 너비가 모바일 화면인지 확인하는 훅
export const useMediaQuery = (
  maxWidthPx: number = breakpoints.tablet
): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(`(max-width: ${maxWidthPx}px)`).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${maxWidthPx}px)`)
    const handler = () => setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [maxWidthPx])

  return matches
}
