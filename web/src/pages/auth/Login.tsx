import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import LoginForm from './LoginForm'

function Login() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleGitHubLogin = () => {
    window.location.href = '/oauth2/authorize/github'
  }

  return (
    <div className="min-h-screen flex">
      {/* 左侧：登录表单 */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">LUBASE</h1>
            <p className="text-gray-500">企业级智能管理平台</p>
          </div>

          <LoginForm />

          {/* 分隔线 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">其他登录方式</span>
            </div>
          </div>

          {/* GitHub 登录按钮 */}
          <button
            onClick={handleGitHubLogin}
            className="btn w-full mb-3"
            style={{
              backgroundColor: '#24292e',
              color: 'white',
              border: '1px solid #24292e',
              height: 48,
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer'
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub 登录
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            登录即表示您同意 <a href="#" className="text-[#1677ff]">服务条款</a> 和 <a href="#" className="text-[#1677ff]">隐私政策</a>
          </p>
        </div>
      </div>

      {/* 右侧：背景图 */}
      <div
        className="hidden lg:block lg:flex-1 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="h-full w-full bg-gradient-to-br from-[#1677ff]/80 to-[#731d70]/80 flex items-center justify-center p-12">
          <div className="max-w-lg text-white text-center">
            <h2 className="text-4xl font-bold mb-6">欢迎使用 LUBASE</h2>
            <p className="text-xl opacity-90 mb-8">
              企业级智能管理平台，集成 AI 能力，助力企业数字化转型
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm opacity-75">系统稳定性</div>
              </div>
              <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-75">企业用户</div>
              </div>
              <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold">7×24</div>
                <div className="text-sm opacity-75">技术支持</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
