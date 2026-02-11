import { useState, useCallback } from 'react'

// 切换状态Hook
export function useToggle(
  initialValue = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue)
  }, [])

  const setToggle = useCallback((newValue: boolean) => {
    setValue(newValue)
  }, [])

  return [value, toggle, setToggle]
}
