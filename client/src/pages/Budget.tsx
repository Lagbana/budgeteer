import React from 'react'
import { useWindowSize } from '../utils/useWindowSize'
import { BudgetMobile } from '../mobileComponents/BudgetMobile'

export const Budget = () => {
  const [width] = useWindowSize()

  return (
    <div>
      {width <= 768 ? (
        <div>
          {' '}
          <BudgetMobile />{' '}
        </div>
      ) : (
        <div> Desktop Home Page </div>
      )}
    </div>
  )
}
