import React from 'react'
import { Button, Space } from 'antd'
import Background from '../background.svg'
import Shape from '../Shape.svg'
import { useWindowSize } from '../utils/useWindowSize'
import { Buttons } from '../mobileComponents/Button'

interface props {
  history: any
}

export const Landing = ({ history }: props) => {
  const [width] = useWindowSize()

  const styling: { [key: string]: React.CSSProperties } = {
    page: {
      backgroundImage: `url(${Background})`,
      backgroundRepeat: 'repeat-y',
      backgroundSize: 'cover',
      WebkitBackgroundSize: 'cover',
      MozBackgroundSize: 'cover',
      OBackgroundSize: 'cover',
      backgroundColor: '#ffffff',
      height: '87vh',
      width: '100vw'
    },
    brandContainer: {
      paddingTop: '40vh',
      width: '85vw',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    brand: {
      width: '85vw'
    },
    buttons: {
      marginTop: '89vh',
      width: '100vw',
      paddingLeft: '3.9vw',
      paddingRight: '3.9vw'
    }
  }

  return (
    <div>
      {width <= 768 ? (
        <div style={styling.page}>
          <Space direction='horizontal' align='center' style={styling.buttons}>
            <Buttons
              name={'LOG IN'}
              size='large'
              bkColor='white'
              textColor='black'
              width='45vw'
              height='6.5vh'
              addBorder={true}
              onClick={() => {
                history.push('/login')
              }}
            />
            <Buttons
              name={'REGISTER'}
              size='large'
              bkColor='black'
              textColor='white'
              width='45vw'
              height='6.5vh'
              onClick={() => {
                history.push('/register')
              }}
            />
          </Space>
          <div style={{ width: '100vw' }}>
            <img
              src={Shape}
              style={{ width: '30vw', marginLeft: '35vw', marginRight: '35vw' }}
            />
          </div>
        </div>
      ) : (
        <div>
          <div> Desktop Landing Page </div>
          <Button
            type='primary'
            shape='round'
            // icon={<DownloadOutlined />}
            size={'large'}
            danger
          >
            Testing 1, 2, 3...
          </Button>
        </div>
      )}
    </div>
  )
}
