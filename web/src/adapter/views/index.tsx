import React from 'react'
import { Card, Empty, Spin, Result } from 'antd'
import type { CardProps, EmptyProps } from 'antd'

interface ViewWrapperProps {
  children: React.ReactNode
  loading?: boolean
  error?: Error | null
  empty?: boolean
  emptyProps?: EmptyProps
  className?: string
  style?: React.CSSProperties
}

export const ViewWrapper: React.FC<ViewWrapperProps> = ({
  children,
  loading = false,
  error = null,
  empty = false,
  emptyProps,
  className,
  style,
}) => {
  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-[200px] ${className}`} style={style}>
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <Result
        status="error"
        title="加载失败"
        subTitle={error.message}
        className={className}
        style={style}
      />
    )
  }

  if (empty) {
    return (
      <div className={`flex items-center justify-center min-h-[200px] ${className}`} style={style}>
        <Empty {...emptyProps} />
      </div>
    )
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

interface PageCardProps extends CardProps {
  title?: string
  children: React.ReactNode
}

export const PageCard: React.FC<PageCardProps> = ({
  title,
  children,
  ...cardProps
}) => {
  return (
    <Card
      title={title}
      variant="borderless"
      style={{ marginBottom: 16 }}
      {...cardProps}
    >
      {children}
    </Card>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataViewProps<T = any> {
  data: T[]
  loading?: boolean
  error?: Error | null
  emptyText?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderItem: (item: any, index: number) => React.ReactNode
  className?: string
}

export const DataView: React.FC<DataViewProps> = ({
  data,
  loading = false,
  error = null,
  emptyText = '暂无数据',
  renderItem,
  className,
}) => {
  return (
    <ViewWrapper
      loading={loading}
      error={error}
      empty={data.length === 0}
      emptyProps={{ description: emptyText }}
      className={className}
    >
      {data.map((item, index) => renderItem(item, index))}
    </ViewWrapper>
  )
}

interface FormViewProps {
  children: React.ReactNode
  title?: string
  loading?: boolean
  className?: string
}

export const FormView: React.FC<FormViewProps> = ({
  children,
  title,
  loading = false,
  className,
}) => {
  return (
    <Spin spinning={loading}>
      <Card
        title={title}
        variant="borderless"
        className={className}
      >
        {children}
      </Card>
    </Spin>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DetailViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | null
  loading?: boolean
  error?: Error | null
  fields: Array<{
    key: string
    label: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (value: any, record: any) => React.ReactNode
  }>
  className?: string
}

export const DetailView: React.FC<DetailViewProps> = ({
  data,
  loading = false,
  error = null,
  fields,
  className,
}) => {
  return (
    <ViewWrapper
      loading={loading}
      error={error}
      empty={!data}
      className={className}
    >
      {data && (
        <Card variant="borderless">
          {fields.map(field => (
            <div key={field.key} className="mb-4">
              <div className="text-gray-600 mb-1">{field.label}:</div>
              <div>
                {field.render
                  ? field.render(data[field.key], data)
                  : String(data[field.key] || '-')
                }
              </div>
            </div>
          ))}
        </Card>
      )}
    </ViewWrapper>
  )
}
