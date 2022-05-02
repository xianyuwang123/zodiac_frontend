import { useRef, useCallback, useEffect } from 'react'

/**
 * const { onUnmounted } = useUnMounted()
 * if (onUnmounted()) {
 *   ...
 * } else {
 *   ...
 * }
 */
const useUnMounted = () => {
  const isUnMountedRef = useRef(false)

  useEffect(() => {
    return () => {
      isUnMountedRef.current = true
    }
  }, [])

  const getIsUnMounted = useCallback(() => isUnMountedRef.current, [])

  return { onUnmounted: getIsUnMounted }
}

export default useUnMounted
