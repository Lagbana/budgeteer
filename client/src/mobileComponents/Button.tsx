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
  addBorder?: Boolean
  onClick?: any
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
    height,
    addBorder,
    onClick
  } = props

  const styling: { [key: string]: React.CSSProperties } = {
    button: {
      backgroundColor: bkColor,
      width: width,
      height: height,
      borderRadius: '6px',
      border: addBorder ? '1.5px solid black' : 'none'
    },
    text: {
      fontWeight: 'bold',
      color: textColor
    }
  }

  return (
    <Button type={type} size={size} htmlType={htmlType} style={styling.button} onClick={onClick}>
      <span style={styling.text}>{name}</span>
    </Button>
  )
}
