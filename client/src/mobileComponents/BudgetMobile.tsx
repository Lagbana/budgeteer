import React, { useState, useEffect } from 'react'
import { Form, Layout, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FormItem } from '../mobileComponents/FormItem'

import { Buttons } from '../mobileComponents/Button'
const { Content } = Layout

const styling: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: 'white',
    width: '91.5vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '7.4vh'
  },
  theme: {
    backgroundColor: 'white',
    height: '100vh',
    width: '100vw',
    padding: 0
  },
  header: {
    fontSize: '36px',
    lineHeight: '40px',
    fontFamily: 'comfortaa',
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginBottom: '3.94vh'
  },
  balance: {
    fontSize: '22px',
    lineHeight: '25px',
    fontFamily: 'comfortaa',
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginBottom: '3.94vh'
  },
  brandContainer: {
    marginTop: '5vh',
    width: '91.5vw',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

// Form page component
export const BudgetMobile = () => {
  const context = [
    {
      transaction: 'random1',
      amount: 1000,
      name: 0,
      key: 0,
      isListField: true,
      fieldKey: 0
    },
    {
      transaction: 'random2',
      amount: 3400,
      name: 1,
      key: 1,
      isListField: true,
      fieldKey: 1
    },
    {
      transaction: 'random3',
      amount: 1120,
      name: 2,
      key: 2,
      isListField: true,
      fieldKey: 2
    },
    {
      transaction: 'random4',
      amount: 1230,
      name: 3,
      key: 3,
      isListField: true,
      fieldKey: 2
    }
  ]

  const [balance, setBalance] = useState(0)
  const [fields, setFields] = useState(context)

  // useEffect(() => {


  // }, [balance])

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const monthNumber = new Date().getMonth()
  const monthName = months[monthNumber]

  const onFinish = (values: any) => {
    const { transactions } = values
    const sumObject = transactions.reduce((acc: any, cur: any) => ({
      amount: acc.amount + cur.amount
    }))
    const { amount } = sumObject
    setBalance(amount)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleDisplay: any = () => {
    return (
      <div>
        <Form.Item>
          {fields.map((field: any, index: number) => {
            return (
              <FormItem
                key={index}
                field={field}
                fields={fields}
                setFields={setFields}
                transaction={field.transaction}
                funds={field.amount}
              />
            )
          })}
          <Button
            style={{ height: '6.40vh' }}
            type='dashed'
            onClick={() => {
              const len = fields.length
              setFields([
                ...fields,
                {
                  transaction: '',
                  amount: 0,
                  name: len,
                  key: len,
                  isListField: true,
                  fieldKey: len
                }
              ])
            }}
            block
          >
            <PlusOutlined />
            Add Transaction
          </Button>
        </Form.Item>
      </div>
    )
  }

  return (
    <div>
      <Content style={styling.theme}>
        <Content style={styling.container}>
          <div>
            <h2 style={styling.header}>
              <span>{monthName} </span>budget
            </h2>
          </div>
          <div>
            <h3 style={styling.balance}>
              Balance: $
              <span>
                {String(balance).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </span>
            </h3>
          </div>

          <Form
            name='budget form'
            onFinish={onFinish}
            autoComplete='off'
            preserve={true}
          >
            <Form.List
              name='transactions'
              children={(fields, actions) => handleDisplay(fields, actions)}
            />

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>

          <div style={styling.brandContainer}>
            <Buttons
              name='VIEW TRENDS'
              type='primary'
              size='large'
              htmlType='submit'
              bkColor='#353452'
              textColor='white'
              width='91.5vw'
            />
          </div>
        </Content>
      </Content>
    </div>
  )
}
