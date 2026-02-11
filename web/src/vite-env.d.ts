/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AI_MODEL?: string
  readonly VITE_AI_API_KEY?: string
  readonly VITE_AI_BASE_URL?: string
  readonly VITE_API_BASE_URL?: string
  readonly VITE_API_TIMEOUT?: string
  readonly VITE_ENABLE_MOCK?: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
