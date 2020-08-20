import React from 'react'
import { useWindowSize } from '../utils/useWindowSize'

export const Trends = () => {
const [width] = useWindowSize()

return (
  <div>
    {width <= 768 ? (
      <div> Mobile Trends Page </div>
    ) : (
      <div> Desktop Trends Page </div>
    )}
  </div>
)

}
