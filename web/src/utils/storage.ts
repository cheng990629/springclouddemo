// 本地存储工具函数

const STORAGE_PREFIX = 'ai_app_'

// 设置存储项
export const setStorageItem = (key: string, value: any): void => {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, serializedValue)
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

// 获取存储项
export const getStorageItem = <T = any>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`)
    if (item === null) {
      return defaultValue ?? null
    }
    return JSON.parse(item)
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return defaultValue ?? null
  }
}

// 删除存储项
export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

// 清空所有存储项
export const clearStorage = (): void => {
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

// 检查存储项是否存在
export const hasStorageItem = (key: string): boolean => {
  return localStorage.getItem(`${STORAGE_PREFIX}${key}`) !== null
}

// 获取所有存储键
export const getStorageKeys = (): string[] => {
  try {
    const keys = Object.keys(localStorage)
    return keys
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .map(key => key.replace(STORAGE_PREFIX, ''))
  } catch (error) {
    console.error('Error getting storage keys:', error)
    return []
  }
}
