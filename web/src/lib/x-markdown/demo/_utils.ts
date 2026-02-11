import { useMemo } from 'react'

// Minimal stub for useMarkdownTheme used by AgentTbox during demo.
// Returns a tuple [className] compatible with original usage.
export function useMarkdownTheme(): [string] {
  const className = useMemo(() => {
    return '' // no-op class name; consumers can style via existing CSS
  }, [])

  return [className]
}

export default useMarkdownTheme


