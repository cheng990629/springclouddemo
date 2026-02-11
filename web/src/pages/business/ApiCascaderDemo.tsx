import React from 'react'
import { Form, Button, Space, message } from 'antd'
import { ApiCascader } from '@/adapter/components'
import { PageCard } from '@/adapter/views'

interface DemoFormValues {
  cascader?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const ApiCascaderDemo: React.FC = () => {
  const [form] = Form.useForm()

  const handleFinish = (values: DemoFormValues) => {
    message.success('Submitted')
    console.log(values)
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>API Cascader Demo</h1>
      <PageCard title="Basic">
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="region" label="Region" rules={[{ required: true }]}>
            <ApiCascader apiUrl="/api/provinces" fieldName="data" valueField="code" labelField="name" childrenField="cities" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Space>
          </Form.Item>
        </Form>
      </PageCard>
    </div>
  )
}

export default ApiCascaderDemo


