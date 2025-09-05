签名认证

```ts
// RFC1123格式时间戳生成
function getRFC1123Date() {
  const now = new Date()
  return now.toUTCString()
}

function normalizePath(path: string) {
  if (!path) return '/'
  return path.startsWith('/') ? path : `/${path}`
}

function buildRequestLine(method: string, path: string) {
  return `${method.toUpperCase()} ${path} HTTP/1.1`
}

function buildSignatureOrigin(host: string, date: string, method: string, path: string) {
  return `host: ${host}\ndate: ${date}\n${buildRequestLine(method, path)}`
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return typeof btoa !== 'undefined' ? btoa(binary) : Buffer.from(bytes).toString('base64')
}

function base64EncodeString(str: string): string {
  if (typeof Buffer !== 'undefined' && typeof Buffer.from === 'function') {
    // node.js
    return Buffer.from(str, 'utf8').toString('base64')
  }
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/**
 * 使用 Web Crypto 计算 HMAC-SHA256（异步）
 * @param appSecret
 * @param host
 * @param date 日期
 * @param method 方法
 * @param path 路径
 * @returns
 */
async function generateSignatureWebCrypto(
  appSecret: string,
  host: string,
  date: string,
  method: string,
  path: string
): Promise<string> {
  if (
    typeof crypto === 'undefined' ||
    !crypto.subtle ||
    typeof crypto.subtle.importKey !== 'function'
  ) {
    throw new Error(
      'Web Crypto API 不可用，请确保在 HTTPS 环境下运行或使用支持 Web Crypto API 的浏览器'
    )
  }

  const origin = buildSignatureOrigin(host, date, method, path)
  const enc = new TextEncoder()
  const keyData = enc.encode(appSecret)

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(origin))
    return arrayBufferToBase64(sig)
  } catch (error) {
    console.error('Web Crypto API 调用失败:', error)
    throw new Error('签名生成失败，请检查浏览器兼容性或网络环境')
  }
}

/**
 * 使用 crypto-js 计算 HMAC-SHA256
 */
async function generateSignatureCryptoJS(
  appSecret: string,
  host: string,
  date: string,
  method: string,
  path: string
): Promise<string> {
  try {
    const CryptoJS = await import('crypto-js')
    if (!CryptoJS || !CryptoJS.HmacSHA256 || !CryptoJS.enc || !CryptoJS.enc.Base64) {
      throw new Error('crypto-js 模块不完整，缺少必要的方法')
    }
    
    const origin = buildSignatureOrigin(host, date, method, path)
    const hmac = CryptoJS.HmacSHA256(origin, appSecret)
    return hmac.toString(CryptoJS.enc.Base64)
  } catch (error) {
    console.error('crypto-js 调用失败:', error)
    throw new Error(
      `crypto-js 签名生成失败: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export type CreateUrlOptions = {
  appId: string
  appSecret: string
  baseUrl: string
  assistantCode: string
  method: string
  path: string
  debug?: boolean
}

export async function createUrlAsync(opts: CreateUrlOptions): Promise<string> {
  const { appId, appSecret, baseUrl, assistantCode, method, path } = opts
  const urlObj = new URL(baseUrl)
  const host = urlObj.hostname
  const normalizedPath = normalizePath(path)

  const date = getRFC1123Date()

  let signature: string
  try {
    // 优先使用 Web Crypto API
    signature = await generateSignatureWebCrypto(appSecret, host, date, method, normalizedPath)
  } catch (error) {
    console.warn('Web Crypto API 不可用，尝试使用 crypto-js:', error)
    // 使用 crypto-js 作为 fallback
    signature = await generateSignatureCryptoJS(appSecret, host, date, method, normalizedPath)
  }

  const authorizationOrigin = `hmac api_key="${appId}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
  const authorization = base64EncodeString(authorizationOrigin)

  const params = new URLSearchParams({
    authorization,
    date,
    host,
    bodyId: assistantCode
  })

  const wsProtocol = urlObj.protocol === 'https:' ? 'wss:' : 'ws:'
  const wsBase = `${wsProtocol}//${urlObj.host}`

  return `${wsBase}${normalizedPath}?${params.toString()}`
}
```

使用：

```ts
try {
  const wsurl = await createUrlAsync({
    appId: openApiConfig.value.APP_ID,
    appSecret: openApiConfig.value.APP_SECRET,
    baseUrl: 'http://172.29.230.135:30009',
    assistantCode: openApiConfig.value.ASSISTANT_CODE,
    method: 'GET',
    path: '/openapi/flames/api/v2/chat'
  })
  return wsurl
} catch (error) {
  console.error('创建 WebSocket URL 失败:', error)
  throw new Error(
    `WebSocket 连接创建失败: ${error instanceof Error ? error.message : String(error)}`
  )
}
```

