import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function OAuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token')
      const code = searchParams.get('code')
      const errorParam = searchParams.get('error')

      if (errorParam) {
        setError(`授权失败: ${errorParam}`)
        setLoading(false)
        return
      }

      if (token) {
        // 如果 URL 中直接返回了 token
        try {
          // 解析 token 获取用户信息
          const base64Url = token.split('.')[1]
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
          const payload = JSON.parse(window.atob(base64))

          console.log('=== GitHub OAuth2 Token Payload ===')
          console.log('Payload:', payload)
          console.log('===================================')

          // 构建用户数据（支持 GitHub OAuth2 用户资料）
          const userData = {
            username: payload.sub || payload.username || payload.github_username || 'github_user',
            roles: payload.roles || ['EDITOR'],
            // GitHub OAuth2 用户资料
            name: payload.name || null,
            email: payload.email || null,
            avatar: payload.avatar || null,
            provider: payload.provider || 'local',
            // 额外信息
            company: payload.company || null,
            location: payload.location || null,
            blog: payload.blog || null,
            bio: payload.bio || null,
            html_url: payload.html_url || null,
            // 统计信息
            public_repos: payload.public_repos || 0,
            public_gists: payload.public_gists || 0,
            followers: payload.followers || 0,
            following: payload.following || 0,
            // 其他
            twitter: payload.twitter || null,
            account_type: payload.account_type || 'User',
            hireable: payload.hireable || false,
            created_at: payload.created_at || null,
          }

          console.log('=== 保存到 localStorage 的 userData ===')
          console.log('userData:', userData)
          console.log('=======================================')

          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(userData))
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
                name: payload.name || null,
                email: payload.email || null,
                avatar: payload.avatar || null,
                provider: payload.provider || 'local',
                // 额外信息
                company: payload.company || null,
                location: payload.location || null,
                blog: payload.blog || null,
                bio: payload.bio || null,
                html_url: payload.html_url || null,
                // 统计信息
                public_repos: payload.public_repos || 0,
                public_gists: payload.public_gists || 0,
                followers: payload.followers || 0,
                following: payload.following || 0,
                // 其他
                twitter: payload.twitter || null,
                account_type: payload.account_type || 'User',
                hireable: payload.hireable || false,
                created_at: payload.created_at || null,
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
  }, [searchParams, navigate, login])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f] mx-auto mb-4"></div>
          <p className="text-[#1e3a5f]">正在处理 GitHub 登录...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full mx-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-[#1e3a5f] mb-2">登录失败</h2>
              <p className="text-[#6a737d] mb-6">{error}</p>
              <button
                onClick={() => navigate('/login')}
                className="btn btn-primary"
              >
                返回登录页
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default OAuthCallback
