import React from 'react'
import { useWindowSize } from '../utils/useWindowSize'

export const Register = () => {
const [width] = useWindowSize()

return (
  <div>
    {width <= 768 ? (
      <div> Mobile Register Page </div>
    ) : (
      <div> Desktop Register Page </div>
    )}
  </div>
)

}
