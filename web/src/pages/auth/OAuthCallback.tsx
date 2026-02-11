import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Spin } from 'antd'
import { useAuth } from '@/contexts/AuthContext'
import { useAppStore, useSetUser, useSetToken } from '@/store'

// 用于存储 zustand action 函数的 ref
let setUserRef: ((user: any) => void) | null = null
let setTokenRef: ((token: string | null) => void) | null = null

// 立即执行的调试日志
console.log('=== OAuthCallback 模块已加载 ===')
console.log('当前 URL:', window.location.href)
console.log('=================================')

function OAuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const auth = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  console.log('=== OAuthCallback 组件渲染 ===')
  console.log('searchParams:', Object.fromEntries(searchParams.entries()))
  console.log('=================================')

  // 初始化 zustand action refs
  const tempSetUser = useSetUser()
  const tempSetToken = useSetToken()
  if (!setUserRef) setUserRef = tempSetUser
  if (!setTokenRef) setTokenRef = tempSetToken

  // 安全的 JWT 解析函数
  const parseJwt = (token: string): Record<string, unknown> | null => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        console.error('JWT 格式错误，parts 数量:', parts.length)
        return null
      }

      let payload = parts[1]
      // URL safe base64 decode
      payload = payload.replace(/-/g, '+').replace(/_/g, '/')

      // 处理 padding
      const padLength = (4 - (payload.length % 4)) % 4
      if (padLength > 0 && padLength < 4) {
        payload += '='.repeat(padLength)
      }

      // 解码 base64
      const binaryString = window.atob(payload)
      const len = binaryString.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      // 检查是否 gzip 压缩 (gzip 头: 0x1f 0x8b)
      if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
        console.log('检测到 gzip 压缩，使用 DecompressionStream')
        // 使用 DecompressionStream 解压
        const ds = new DecompressionStream('gzip')
        const writer = ds.writable.getWriter()
        writer.write(bytes)
        writer.close()
        const response = new Response(ds.readable)
        return response.json().catch(() => null)
      }

      // 直接解码
      const decoded = new TextDecoder('utf-8').decode(bytes)
      return JSON.parse(decoded)
    } catch (e) {
      console.error('JWT 解析异常:', e)
      return null
    }
  }

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token')
      const code = searchParams.get('code')
      const errorParam = searchParams.get('error')

      console.log('=== OAuth2 Callback 参数 ===')
      console.log('token 存在:', !!token)
      console.log('code 存在:', !!code)
      console.log('error:', errorParam)
      console.log('==============================')

      if (errorParam) {
        setError(`授权失败: ${errorParam}`)
        setLoading(false)
        return
      }

      if (token) {
        try {
          // 解析 token 获取用户信息
          const payload = await parseJwt(token)

          if (!payload) {
            setError('登录失败，无法解析 token')
            setLoading(false)
            return
          }

          console.log('=== GitHub OAuth2 Token Payload ===')
          console.log('Payload:', JSON.stringify(payload, null, 2))
          console.log('===================================')

          // 构建用户数据（支持 GitHub OAuth2 用户资料）
          const userData = {
            username: payload.sub || payload.username || payload.github_username || 'github_user',
            roles: payload.roles || ['EDITOR'],
            // GitHub OAuth2 用户资料
            name: payload.name || undefined,
            email: payload.email || undefined,
            avatar: payload.avatar || undefined,
            provider: payload.provider || 'local',
            // 额外信息
            company: payload.company || undefined,
            location: payload.location || undefined,
            blog: payload.blog || undefined,
            bio: payload.bio || undefined,
            html_url: payload.html_url || undefined,
            // 统计信息
            public_repos: payload.public_repos || 0,
            public_gists: payload.public_gists || 0,
            followers: payload.followers || 0,
            following: payload.following || 0,
            // 其他
            twitter: payload.twitter_username || undefined,
            account_type: payload.account_type || 'User',
            hireable: payload.hireable || false,
            created_at: payload.created_at || undefined,
            github_username: payload.github_username || undefined,
            github_id: payload.github_id || undefined,
          }

          console.log('=== 保存到 localStorage 的 userData ===')
          console.log('userData:', userData)
          console.log('token:', token.substring(0, 50) + '...')
          console.log('=======================================')

          // 保存到 localStorage
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(userData))

          // 直接更新 AuthContext 状态
          auth.setUser(userData)
          auth.setToken(token)

          // 同时更新 zustand store (兼容旧组件)
          if (setUserRef) setUserRef(userData)
          if (setTokenRef) setTokenRef(token)

          console.log('=== 登录状态已同步到所有 store ===')
          console.log('userData:', userData)
          console.log('=======================================')

          // 强制刷新页面以确保状态同步
          window.location.href = '/'
        } catch (e) {
          console.error('Failed to parse token:', e)
          setError('登录失败，无法解析 token')
        }
        setLoading(false)
        return
      }

      if (code) {
        // 授权码模式：需要用 code 换取 token
        try {
          // 调用后端用 code 换取 token
          const response = await fetch(`/uaa/oauth2/token?code=${code}&grant_type=authorization_code`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (response.ok) {
            const data = await response.json()
            if (data.access_token) {
              localStorage.setItem('token', data.access_token)
              const base64Url = data.access_token.split('.')[1]
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
              const payload = JSON.parse(window.atob(base64))

              const userData = {
                username: payload.sub || payload.username || payload.github_username || 'github_user',
                roles: payload.roles || ['EDITOR'],
                // GitHub OAuth2 用户资料
                name: payload.name || undefined,
                email: payload.email || undefined,
                avatar: payload.avatar || undefined,
                provider: payload.provider || 'local',
                // 额外信息
                company: payload.company || undefined,
                location: payload.location || undefined,
                blog: payload.blog || undefined,
                bio: payload.bio || undefined,
                html_url: payload.html_url || undefined,
                // 统计信息
                public_repos: payload.public_repos || 0,
                public_gists: payload.public_gists || 0,
                followers: payload.followers || 0,
                following: payload.following || 0,
                // 其他
                twitter: payload.twitter || undefined,
                account_type: payload.account_type || 'User',
                hireable: payload.hireable || false,
                created_at: payload.created_at || undefined,
                github_username: payload.github_username || undefined,
                github_id: payload.github_id || undefined,
              }
              localStorage.setItem('user', JSON.stringify(userData))
              window.location.href = '/'
            } else {
              setError('登录失败，未获取到 token')
            }
          } else {
            setError('授权码换取 token 失败')
          }
        } catch (e) {
          console.error('Token exchange error:', e)
          setError('登录失败，请重试')
        }
        setLoading(false)
        return
      }

      setError('无效的回调参数')
      setLoading(false)
    }

    handleCallback()
  }, [searchParams, navigate])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Spin size="large" />
          <p style={{ marginTop: 16 }}>正在处理 GitHub 登录...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: 32,
          borderRadius: 8,
          maxWidth: 400,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ color: '#ff4d4f', marginBottom: 16 }}>登录失败</h2>
          <p style={{ color: '#666', marginBottom: 24 }}>{error}</p>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '8px 24px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            返回登录页
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default OAuthCallback
