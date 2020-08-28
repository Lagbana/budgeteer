import React from 'react'
import { Form, Input, Space, InputNumber } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'

interface props {
  field: any
  remove?: any
  transaction: any
  funds: any
  fields: any
  setFields: any
}

export const FormItem = (props: props) => {
  const { field, transaction, funds, setFields, fields } = props

  const updateAmount = (amount: any) => {
    const newFields = fields.map((ctx: any) => {
      if (field.key === ctx.key) return { ...ctx, amount }
      return ctx
    })
    setFields(newFields)
  }

  const updateTransaction = (e: any) => {
    const newFields = fields.map((ctx: any) => {
      if (field.key === ctx.key) return { ...ctx, transaction: e.target.value }
      return ctx
    })
    setFields(newFields)
  }

  return (
    <Space
      key={field.key}
      style={{ display: 'flex', marginBottom: 8 }}
      align='start'
    >
      <Form.Item
        {...field}
        name={[field.name, 'transaction']}
        fieldKey={[field.fieldKey, 'transaction']}
        initialValue={transaction}
        rules={[
          {
            required: true,
            message: 'Missing transaction type'
          }
        ]}
      >
        <Input
          placeholder='Transaction'
          value={transaction}
          onChange={updateTransaction}
        />
      </Form.Item>
      <Form.Item
        {...field}
        name={[field.name, 'amount']}
        initialValue={funds}
        fieldKey={[field.fieldKey, 'amount']}
        rules={[
          {
            required: true,
            message: 'Missing transaction amount'
          }
        ]}
      >
        <InputNumber
          onChange={updateAmount}
          value={funds}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={value => value!.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

      <MinusCircleOutlined
        onClick={() => {
          const newFields = fields.filter((ctx: any) => field.key !== ctx.key)
          setFields(newFields)
        }}
      />
    </Space>
  )
}
