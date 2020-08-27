import React, { useState } from 'react'
// import React, { useState, useEffect, SetStateAction } from 'react'
import { Form, Layout, Button, Tag, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FormItem } from '../mobileComponents/FormItem'
import { Buttons } from '../mobileComponents/Button'
import {
  useAuthQuery,
  useLogoutMutation
  // useGetTransactionsQuery
} from '../generated/graphql'
import { setAccessToken } from '../utils/accessToken'
// import { isEmpty } from 'lodash'
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
  const [logout] = useLogoutMutation()
  const { data } = useAuthQuery()
  const result = data?.auth
  // const response = useGetTransactionsQuery()

  const user = <Tag color='#87d068'>{result?.username}</Tag>

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

  // const [appData, setAppData] = useState([
  //   {
  //     transaction: '',
  //     amount: 1000,
  //     name: -1,
  //     key: -1,
  //     isListField: false,
  //     fieldKey: -1
  //   }
  // ])
  const [balance, setBalance] = useState(0)
  const [fields, setFields] = useState(context)

  // useEffect(() => {
  //   const budgetData = response.data?.getTransactions

  //   const newArray: SetStateAction<state | any> = budgetData?.map(
  //     (obj, index) => {
  //       const newObj = {
  //         transaction: obj.name,
  //         amount: obj.value,
  //         name: index,
  //         key: index,
  //         isListField: true,
  //         fieldKey: index
  //       }
  //       return newObj
  //     }
  //   )

  //   console.log(newArray)
  //   setAppData([...appData, newArray])
  // }, [])

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

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo)
  // }

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
          {/* <div style={{ paddingBottom: '3vh' }}>
            {data?.auth ? <h3>You are logged in as: {user}</h3> : ''}
          </div> */}
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
