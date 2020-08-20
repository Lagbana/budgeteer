import React from 'react'
import { useWindowSize } from '../utils/useWindowSize'
import { Form, Input, Card, Layout } from 'antd'
import { Buttons } from '../mobileComponents/Button'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
const { Content } = Layout

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const styling = {
  container: {
    backgroundColor: 'white',
    height: '50vh',
    width: '95vw',
    marginLeft: '2.5vw',
    marginRight: '2.5vw'
  },
  theme: {
    backgroundColor: 'white',
    height: '100vh',
    width: '100vw'
  },
  buttonItem: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}
export const Login = () => {
  const [width] = useWindowSize()

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      {width <= 768 ? (
        <div>
          <Content style={styling.theme}>
            <Card style={styling.container} bordered={false}>
              <Form
                {...layout}
                name='basic'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  rules={[
                    { required: true, message: 'Please input your username!' }
                  ]}
                >
                  <Input size='large' placeholder='jane@example.com' />
                </Form.Item>

                <Form.Item
                  rules={[
                    { required: true, message: 'Please input your password!' }
                  ]}
                >
                  <Input.Password
                    size='large'
                    placeholder='input password'
                    iconRender={visible =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>

                <Form.Item style={styling.buttonItem}>
                  <Buttons
                    name='LOG IN'
                    type='primary'
                    size='large'
                    htmlType='submit'
                    bkColor='red'
                    textColor='white'
                    width='83.5vw'
                  />
                </Form.Item>
              </Form>
            </Card>
          </Content>
        </div>
      ) : (
        <div> Desktop Login Page </div>
      )}
    </div>
  )
}
