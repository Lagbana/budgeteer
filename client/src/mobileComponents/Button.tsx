import React from 'react'
import { Button } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

interface props {
  type?:
    | 'text'
    | 'link'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'dashed'
    | undefined
  name: string
  size: SizeType
  htmlType?: 'button' | 'submit' | 'reset' | undefined
  bkColor?: string
  textColor: string
  width?: string
  height?: string
}

export const Buttons = (props: props) => {
  const {
    name,
    type,
    size,
    htmlType,
    textColor,
    bkColor,
    width,
    height
  } = props

  const styling: { [key: string]: React.CSSProperties } = {
    button: {
      backgroundColor: bkColor,
      width: width,
      height: height,
      borderRadius: '6px',
      border: 'none'
    },
    text: {
      fontWeight: 'bold',
      color: textColor
    }
  }

  return (
    <Button type={type} size={size} htmlType={htmlType} style={styling.button}>
      <span style={styling.text}>{name}</span>
    </Button>
  )
}
