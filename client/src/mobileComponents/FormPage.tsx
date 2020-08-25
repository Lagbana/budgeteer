import React from 'react'
import { Form, Input, Layout, notification } from 'antd'
import { Buttons } from '../mobileComponents/Button'
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  BackwardFilled
} from '@ant-design/icons'
import Logo from '../budgeteerLogo.svg'
import { setAccessToken } from '../utils/accessToken'
import { useAuthQuery } from '../generated/graphql'
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
  buttonItem: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  header: {
    fontSize: '36px',
    lineHeight: '40px',
    fontFamily: 'comfortaa',
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginBottom: '3.94vh'
  },
  icon: {
    fontSize: '25px',
    marginBottom: '3.94vh'
  },
  inputs: {
    height: '6.40vh',
    borderColor: '#353452',
    borderStyle: 'solid black',
    borderWidth: '1.5px'
  },
  brandContainer: {
    marginTop: '25vh',
    width: '68.625vw',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  brand: {
    width: '68.625vw'
  }
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

interface props {
  pageName: string
  buttonName: string
  actionHook: any
  history: any
}

// Form page component
export const FormPage = (props: props) => {
  const { pageName, buttonName, actionHook, history } = props

  const openNotification = (type: string) => {
    // @ts-ignore
    notification[type]({
      message: 'Registration unsuccessful',
      description: 'This username already exists'
    })
  }

  const onFinish = async (values: any) => {
    const response = await actionHook({
      variables: values
    })
    const { data } = response
    const { newUser, login } = data

    // console.log(login.token)

    if (newUser && newUser !== true) {
      openNotification('error')
    }

    if (response && response.data) {
      setAccessToken(login.token)
    }

    history.push('/budget')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const { data } = useAuthQuery()
  if (data) {
    history.push('/budget')
  }
  return (
    <div>
      <Content style={styling.theme}>
        <Content style={styling.container}>
          <div>
            <h2 style={styling.icon}>
              <BackwardFilled />
            </h2>
          </div>
          <div>
            <h2 style={styling.header}>{pageName}</h2>
          </div>
          <Form
            {...layout}
            name='basic'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name='username'
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input
                size='large'
                placeholder='Username'
                style={styling.inputs}
              />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password
                size='large'
                style={styling.inputs}
                placeholder='Password'
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item style={styling.buttonItem}>
              <Buttons
                name={buttonName}
                type='primary'
                size='large'
                htmlType='submit'
                bkColor='#353452'
                textColor='white'
                width='91.5vw'
                height='6.40vh'
              />
            </Form.Item>
          </Form>
          <div style={styling.brandContainer}>
            <img src={Logo} style={styling.brand} alt='Budgeteer Logo' />
          </div>
        </Content>
      </Content>
    </div>
  )
}
