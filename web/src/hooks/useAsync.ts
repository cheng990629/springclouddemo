import { useState, useEffect, useCallback } from 'react'

// 异步操作Hook
interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
): AsyncState<T> & {
  execute: () => Promise<void>
  reset: () => void
} {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async () => {
    setState(prevState => ({ ...prevState, loading: true, error: null }))

    try {
      const data = await asyncFunction()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      })
    }
  }, [asyncFunction])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { ...state, execute, reset }
}
