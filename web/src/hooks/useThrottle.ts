import { useRef } from 'react'

// 节流Hook
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRan = useRef<number>(Date.now())

  return ((...args: Parameters<T>) => {
    if (Date.now() - lastRan.current >= delay) {
      callback(...args)
      lastRan.current = Date.now()
    }
  }) as T
}
