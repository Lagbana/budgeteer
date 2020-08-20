import React from 'react'
import { useWindowSize } from '../utils/useWindowSize'

export const Home = () => {
  const [width] = useWindowSize()

  return (
    <div>
      {width <= 768 ? (
        <div> Mobile Home Page </div>
      ) : (
        <div> Desktop Home Page </div>
      )}
    </div>
  )
}
