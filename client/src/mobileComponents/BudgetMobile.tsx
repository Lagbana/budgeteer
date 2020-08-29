import React, { useState, SetStateAction, useEffect } from 'react'
import { Form, Layout, Button, Tag, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FormItem } from '../mobileComponents/FormItem'
import { Buttons } from '../mobileComponents/Button'
import {
  useAuthQuery,
  useLogoutMutation,
  useGetTransactionsQuery,
  useCreateBulkTransactionsMutation
} from '../generated/graphql'
import { setAccessToken } from '../utils/accessToken'

const { Content } = Layout

interface props {
  history: any
}

interface state {
  transaction: string
  amount: number
  name: number
  key: number
  isListField: boolean
  fieldKey: number
}

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

export const BudgetMobile = (props: props) => {
  const { history } = props
  // Logout mutation
  const [logout] = useLogoutMutation()
  // Get all transactions query
  const response = useGetTransactionsQuery()
  // Authentication query
  const { data } = useAuthQuery()
  // Create bulk transactions mutation
  const [createBulk] = useCreateBulkTransactionsMutation()

  const result = data?.auth // data from authentication query
  const budgetData = response.data?.getTransactions // array of all transactions data

  const [balance, setBalance] = useState(0)
  const [fields, setFields]: any = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const newArray: SetStateAction<state> | any = budgetData?.map(
      (obj, index) => {
        const newObj = {
          transaction: obj.transaction,
          amount: obj.amount,
          name: index,
          key: index,
          isListField: true,
          fieldKey: index
        }
        return newObj
      }
    )

    if (newArray) {
      setFields(newArray)
    }

    let sumObject: any
    if (budgetData?.length! > 0) {
      sumObject = budgetData?.reduce((acc: any, cur: any): any => ({
        amount: acc.amount + cur.amount
      }))
      if (sumObject) {
        const { amount } = sumObject
        setBalance(amount)
      }
    }
    setReload(false)
  }, [budgetData, reload, balance])

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

  const onFinish = async (values: any) => {
    const { transactions } = values
    try {
      await createBulk({
        variables: {
          bulk: transactions
        }
      })
    } catch (error) {
      console.log(error)
    }
    setReload(true)
  }

  // decorate the name of the authenticated user
  const user = <Tag color='#87d068'>{result?.username}</Tag>

  const handleDisplay: any = () => {
    return (
      <div>
        <Form.Item>
          {fields
            ? fields.map((field: any, index: number) => {
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
              })
            : null}
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
          <Row style={{ paddingBottom: '3vh' }}>
            <Col span={18}>
              {data?.auth ? <h3>You are logged in as: {user}</h3> : ''}
            </Col>
            <Col span={6}>
              <Button
                danger={true}
                size='small'
                shape='round'
                onClick={async () => {
                  await logout()
                  setAccessToken('')
                  history.push('/login')
                }}
              >
                Logout
              </Button>
            </Col>
          </Row>

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
