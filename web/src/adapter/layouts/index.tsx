import React from 'react'
import { Layout as AntLayout, theme } from 'antd'
import type { LayoutProps } from 'antd'

const { useToken } = theme

interface LayoutAdapterProps extends LayoutProps {
  children: React.ReactNode
  className?: string
}

export const Layout: React.FC<LayoutAdapterProps> = ({
  children,
  className,
  ...props
}) => {
  const { token } = useToken()

  return (
    <AntLayout
      className={className}
      style={{
        background: token.colorBgContainer,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </AntLayout>
  )
}

export const Header: React.FC<LayoutAdapterProps> = ({
  children,
  className,
  ...props
}) => {
  const { token } = useToken()

  return (
    <AntLayout.Header
      className={className}
      style={{
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        padding: '0 24px',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </AntLayout.Header>
  )
}

export const Content: React.FC<LayoutAdapterProps> = ({
  children,
  className,
  ...props
}) => {
  const { token } = useToken()

  return (
    <AntLayout.Content
      className={className}
      style={{
        background: token.colorBgContainer,
        padding: 24,
        margin: 0,
        minHeight: 280,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </AntLayout.Content>
  )
}

export const Footer: React.FC<LayoutAdapterProps> = ({
  children,
  className,
  ...props
}) => {
  const { token } = useToken()

  return (
    <AntLayout.Footer
      className={className}
      style={{
        background: token.colorBgContainer,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
        textAlign: 'center',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </AntLayout.Footer>
  )
}

export const Sider: React.FC<LayoutAdapterProps & { collapsible?: boolean; collapsed?: boolean; onCollapse?: (collapsed: boolean) => void }> = ({
  children,
  className,
  collapsible,
  collapsed,
  onCollapse,
  ...props
}) => {
  const { token } = useToken()

  return (
    <AntLayout.Sider
      className={className}
      collapsible={collapsible}
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        background: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </AntLayout.Sider>
  )
}
