import React from 'react'
import { Button } from 'antd'
import { useWindowSize } from '../utils/useWindowSize'

export const Landing = () => {
  const [width] = useWindowSize()
//   const styling = {
//     backgroundColor: '#3366FF',
//     color: 'white'
//   }

  return (
    <div>
      {width <= 768 ? (
        <div> Mobile Landing Page </div>
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
