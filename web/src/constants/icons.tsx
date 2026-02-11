import React from 'react'

// 折叠图标（向右箭头）
export const CollapseIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path d="M4.9987 1.99992C5.36689 1.99992 5.66536 2.2984 5.66536 2.66659L5.66536 13.6666C5.66536 14.0348 5.36689 14.3333 4.9987 14.3333C4.63051 14.3333 4.33203 14.0348 4.33203 13.6666L4.33203 2.66659C4.33203 2.2984 4.63051 1.99992 4.9987 1.99992Z" fill="currentColor"></path>
    <path d="M10.8053 4.97843C11.0429 4.69744 11.4636 4.66236 11.7448 4.89966C12.0258 5.13729 12.061 5.55794 11.8236 5.83911L10.0339 7.95728L11.8229 10.0689C12.0608 10.3498 12.0262 10.7704 11.7454 11.0084C11.4646 11.2463 11.044 11.2116 10.806 10.9309L8.65658 8.39445C8.43208 8.1292 8.4509 7.7396 8.6901 7.49666L8.86621 7.27466L8.87956 7.25806L10.8053 4.97843Z" fill="currentColor"></path>
  </svg>
)

// 展开图标（向左箭头）
export const ExpandIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path d="M11.0013 1.99992C10.6331 1.99992 10.3346 2.2984 10.3346 2.66659L10.3346 13.6666C10.3346 14.0348 10.6331 14.3333 11.0013 14.3333C11.3695 14.3333 11.668 14.0348 11.668 13.6666L11.668 2.66659C11.668 2.2984 11.3695 1.99992 11.0013 1.99992Z" fill="currentColor"></path>
    <path d="M5.1947 4.97843C4.95708 4.69744 4.53637 4.66236 4.25522 4.89966C3.97418 5.13729 3.939 5.55794 4.17637 5.83911L5.96606 7.95728L4.17711 10.0689C3.93923 10.3498 3.97384 10.7704 4.25458 11.0084C4.53532 11.2463 4.95596 11.2116 5.19397 10.9309L7.34342 8.39445C7.56792 8.1292 7.5491 7.7396 7.3099 7.49666L7.13379 7.27466L7.12044 7.25806L5.1947 4.97843Z" fill="currentColor"></path>
  </svg>
)

// Logo图标
export const LogoIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <img
    src="/logo.svg"
    alt="Logo"
    className={className}
    style={{
      width: '32px',
      height: '32px',
      ...style
    }}
  />
)

// AI聊天图标
export const AIChatIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <span
    className={`anticon defaultIcon-7W1XNVp9 ${className || ''}`}
    style={style}
    role="img"
    aria-hidden="true"
  >
    <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
      <use xlinkHref="#masterapp__ic_ai_chat_outline"></use>
    </svg>
  </span>
)

// ============================================
// 登录页面配置 - 在这里替换你自己的图标
// ============================================

// 登录页面 Logo 图标 - 替换为你的图片路径或 SVG 组件
export const LoginLogoIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <img
    // 替换这里：可以是 /logo.svg, /src/assets/images/your-logo.png, 或外部 URL
    src="/src/assets/images/sidebar-icon-1.jpg"
    alt="Login Logo"
    className={className}
    style={{
      width: 'auto',
      height: '40px',
      objectFit: 'contain',
      ...style
    }}
  />
)

// 如果想使用 SVG 图标，取消注释下面的代码并注释掉上面的 LoginLogoIcon：

/*
export const LoginLogoIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <text x="10" y="40" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="white">
      LUBASE
    </text>
  </svg>
)
*/
