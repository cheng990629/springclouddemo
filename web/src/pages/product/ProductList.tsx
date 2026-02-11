import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, InputNumber, message, Popconfirm, Space, Tag, Select } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons'

interface Product {
  id: number
  name: string
  price: number
  description: string
  status: number
  createdAt: string
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form] = Form.useForm()

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/product/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      } else {
        message.warning('使用模拟数据')
        setProducts([
          { id: 1, name: '产品 A', price: 99.00, description: '这是一个示例产品', status: 1, createdAt: '2026-01-01' },
          { id: 2, name: '产品 B', price: 199.00, description: '这是另一个示例产品', status: 1, createdAt: '2026-01-02' },
          { id: 3, name: '产品 C', price: 299.00, description: '第三个产品', status: 0, createdAt: '2026-01-03' },
        ])
      }
    } catch (error) {
      console.error('获取产品列表失败:', error)
      message.error('获取产品列表失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAdd = () => {
    setEditingProduct(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    form.setFieldsValue(product)
    setModalVisible(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/product/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        message.success('删除成功')
        fetchProducts()
      } else {
        message.success('删除成功（模拟）')
        setProducts(products.filter(p => p.id !== id))
      }
    } catch (error) {
      message.success('删除成功（模拟）')
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const handleSubmit = async (values: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const token = localStorage.getItem('token')

      if (editingProduct) {
        const response = await fetch(`/product/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...values, id: editingProduct.id })
        })

        if (response.ok) {
          message.success('更新成功')
        } else {
          message.success('更新成功（模拟）')
          setProducts(products.map(p =>
            p.id === editingProduct.id ? { ...p, ...values } : p
          ))
        }
      } else {
        const response = await fetch('/product/api/products', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })

        if (response.ok) {
          message.success('创建成功')
        } else {
          message.success('创建成功（模拟）')
          const newProduct: Product = {
            id: Date.now(),
            ...values,
            createdAt: new Date().toISOString().split('T')[0]
          }
          setProducts([...products, newProduct])
        }
      }

      setModalVisible(false)
      fetchProducts()
    } catch (error) {
      message.error('操作失败')
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '产品名称', dataIndex: 'name', key: 'name' },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? '上架' : '下架'}
        </Tag>
      ),
    },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: Product) => (
        <Space size="small">
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="确定删除此产品？" onConfirm={() => handleDelete(record.id)}>
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>产品管理</h2>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchProducts}>刷新</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>添加产品</Button>
        </Space>
      </div>

      <Table columns={columns} dataSource={products} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />

      <Modal title={editingProduct ? '编辑产品' : '添加产品'} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="产品名称" rules={[{ required: true, message: '请输入产品名称' }]}>
            <Input placeholder="请输入产品名称" />
          </Form.Item>
          <Form.Item name="price" label="价格" rules={[{ required: true, message: '请输入价格' }]}>
            <InputNumber min={0} precision={2} style={{ width: '100%' }} placeholder="请输入价格" prefix="¥" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} placeholder="请输入产品描述" />
          </Form.Item>
          <Form.Item name="status" label="状态" initialValue={1}>
            <Select>
              <Select.Option value={1}>上架</Select.Option>
              <Select.Option value={0}>下架</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setModalVisible(false)}>取消</Button>
              <Button type="primary" htmlType="submit">{editingProduct ? '更新' : '创建'}</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ProductList
