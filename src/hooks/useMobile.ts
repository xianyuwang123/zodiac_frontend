import { useEffect, useState } from 'react'
import { lightTheme as theme } from '../theme'

import useWindowSize from './useWindowSize'

/**
 * Use more Compatibility mobile user-agent detect
 * @returns true / false
 */
const useMobile = (): boolean => {
  const mobileBreakpoint = theme.breakpoints.mobile || 576
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= mobileBreakpoint || /iPhone|iPad|iPod|Android/i.test(navigator?.userAgent)
  )
  const { width } = useWindowSize()

  useEffect(() => {
    if (width) {
      setIsMobile((width ?? 0) <= mobileBreakpoint)
    }
  }, [width, mobileBreakpoint])

  return isMobile
}

export default useMobile
