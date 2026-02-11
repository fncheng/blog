## Storage封装

核心代码

```ts
/**
 * 安全跳转，防止 XSS 攻击
 */
export function safeAssignLocation(url: string) {
  try {
    // 仅允许相对路径（以 / 开头且不以 // 开头）或 http/https 协议
    const isRelative = url.startsWith('/') && !url.startsWith('//')
    if (isRelative) {
      window.location.href = url
      return
    }

    const parsed = new URL(url, window.location.origin)
    if (['http:', 'https:'].includes(parsed.protocol)) {
      window.location.href = url
    }
  } catch (e) {
    console.error('Invalid URL:', url)
  }
}

/**
 * 校验文件ID是否安全，防止路径遍历攻击
 * @param fileId 文件ID
 * @returns 校验通过返回true，否则返回false
 */
export function isSecureFileId(fileId: string): boolean {
  if (!fileId || typeof fileId !== 'string') {
    return false
  }

  // 检测路径遍历字符
  const dangerousPatterns = [
    '../',     // 相对路径遍历
    '..',      // 父目录
    './',      // 当前目录
    '\\',      // Windows路径分隔符
    '%2e%2e',  // URL编码的 ..
    '%2f',     // URL编码的 /
    '%5c',     // URL编码的 \
    '\0',      // 空字节
    '<',       // 防止HTML注入
    '>',       // 防止HTML注入
    '|',       // 管道符
    '&',       // 命令连接符
    ';',       // 命令分隔符
  ]

  const lowerFileId = fileId.toLowerCase()
  for (const pattern of dangerousPatterns) {
    if (lowerFileId.includes(pattern.toLowerCase())) {
      console.warn('[Security] 检测到不安全的文件ID:', fileId)
      return false
    }
  }

  // 白名单：只允许字母、数字、下划线、连字符和点（但不能以点开头）
  // 常见的文件ID格式：UUID、纯数字ID、带连字符的ID等
  const safePattern = /^[a-zA-Z0-9][a-zA-Z0-9_\-\.]*$/
  if (!safePattern.test(fileId)) {
    console.warn('[Security] 文件ID格式不符合安全规则:', fileId)
    return false
  }

  // 限制长度，防止过长的输入
  if (fileId.length > 255) {
    console.warn('[Security] 文件ID长度超出限制:', fileId)
    return false
  }

  return true
}

/**
 * 校验字符串是否安全（用于校验 deviceId、shareCode 等）
 * @param value 待校验的值
 * @returns 校验通过返回true，否则返回false
 */
export function isSecureString(value: string): boolean {
  if (!value || typeof value !== 'string') {
    return false
  }

  // 检测危险字符
  const dangerousChars = ['<', '>', '"', "'", '\\', '\0', ';', '|', '&', '$', '`']
  for (const char of dangerousChars) {
    if (value.includes(char)) {
      console.warn('[Security] 检测到不安全的字符串:', value)
      return false
    }
  }

  // 限制长度
  if (value.length > 500) {
    console.warn('[Security] 字符串长度超出限制:', value)
    return false
  }

  return true
}
```

Storage封装

```ts
import { isSecureString } from './xss'

/**
 * 安全的 sessionStorage 封装
 * 在存取数据时自动进行安全校验，防止恶意数据注入
 */
class SafeSessionStorage {
  /**
   * 安全地获取 sessionStorage 中的值
   * @param key 键名
   * @returns 返回值，如果不存在或不安全则返回 null
   */
  getItem(key: string): string | null {
    try {
      const value = sessionStorage.getItem(key)
      
      if (!value) {
        return null
      }
      
      // 对获取的值进行安全校验
      if (!isSecureString(value)) {
        console.warn(`[SafeStorage] sessionStorage中的值不安全，已被过滤: ${key}`)
        // 清除不安全的值
        sessionStorage.removeItem(key)
        return null
      }
      
      return value
    } catch (e) {
      console.error('[SafeStorage] 读取 sessionStorage 失败:', e)
      return null
    }
  }

  /**
   * 安全地设置 sessionStorage 的值
   * @param key 键名
   * @param value 值
   * @returns 是否设置成功
   */
  setItem(key: string, value: string): boolean {
    try {
      // 对键名进行校验
      if (!key || typeof key !== 'string') {
        console.error('[SafeStorage] 无效的键名')
        return false
      }
      
      // 对值进行安全校验
      if (!isSecureString(value)) {
        console.error(`[SafeStorage] 尝试存储不安全的值到 sessionStorage: ${key}`)
        return false
      }
      
      sessionStorage.setItem(key, value)
      return true
    } catch (e) {
      console.error('[SafeStorage] 写入 sessionStorage 失败:', e)
      return false
    }
  }

  /**
   * 移除 sessionStorage 中的值
   * @param key 键名
   */
  removeItem(key: string): void {
    try {
      sessionStorage.removeItem(key)
    } catch (e) {
      console.error('[SafeStorage] 删除 sessionStorage 失败:', e)
    }
  }

  /**
   * 清空所有 sessionStorage
   */
  clear(): void {
    try {
      sessionStorage.clear()
    } catch (e) {
      console.error('[SafeStorage] 清空 sessionStorage 失败:', e)
    }
  }

  /**
   * 获取 sessionStorage 中的键名列表
   */
  keys(): string[] {
    try {
      return Object.keys(sessionStorage)
    } catch (e) {
      console.error('[SafeStorage] 获取 sessionStorage 键名列表失败:', e)
      return []
    }
  }

  /**
   * 检查是否存在某个键
   * @param key 键名
   */
  has(key: string): boolean {
    return this.getItem(key) !== null
  }
}

/**
 * 安全的 localStorage 封装
 * 在存取数据时自动进行安全校验，防止恶意数据注入
 */
class SafeLocalStorage {
  /**
   * 安全地获取 localStorage 中的值
   * @param key 键名
   * @returns 返回值，如果不存在或不安全则返回 null
   */
  getItem(key: string): string | null {
    try {
      const value = localStorage.getItem(key)
      
      if (!value) {
        return null
      }
      
      // 对获取的值进行安全校验
      if (!isSecureString(value)) {
        console.warn(`[SafeStorage] localStorage中的值不安全，已被过滤: ${key}`)
        // 清除不安全的值
        localStorage.removeItem(key)
        return null
      }
      
      return value
    } catch (e) {
      console.error('[SafeStorage] 读取 localStorage 失败:', e)
      return null
    }
  }

  /**
   * 安全地设置 localStorage 的值
   * @param key 键名
   * @param value 值
   * @returns 是否设置成功
   */
  setItem(key: string, value: string): boolean {
    try {
      // 对键名进行校验
      if (!key || typeof key !== 'string') {
        console.error('[SafeStorage] 无效的键名')
        return false
      }
      
      // 对值进行安全校验
      if (!isSecureString(value)) {
        console.error(`[SafeStorage] 尝试存储不安全的值到 localStorage: ${key}`)
        return false
      }
      
      localStorage.setItem(key, value)
      return true
    } catch (e) {
      console.error('[SafeStorage] 写入 localStorage 失败:', e)
      return false
    }
  }

  /**
   * 移除 localStorage 中的值
   * @param key 键名
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error('[SafeStorage] 删除 localStorage 失败:', e)
    }
  }

  /**
   * 清空所有 localStorage
   */
  clear(): void {
    try {
      localStorage.clear()
    } catch (e) {
      console.error('[SafeStorage] 清空 localStorage 失败:', e)
    }
  }

  /**
   * 获取 localStorage 中的键名列表
   */
  keys(): string[] {
    try {
      return Object.keys(localStorage)
    } catch (e) {
      console.error('[SafeStorage] 获取 localStorage 键名列表失败:', e)
      return []
    }
  }

  /**
   * 检查是否存在某个键
   * @param key 键名
   */
  has(key: string): boolean {
    return this.getItem(key) !== null
  }
}

// 导出单例实例
export const safeSessionStorage = new SafeSessionStorage()
export const safeLocalStorage = new SafeLocalStorage()

// 默认导出
export default {
  session: safeSessionStorage,
  local: safeLocalStorage,
}
```

