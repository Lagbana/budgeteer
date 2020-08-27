import React from 'react'
import { useWindowSize } from '../utils/useWindowSize'
import { BudgetMobile } from '../mobileComponents/BudgetMobile'

interface props {
  history: any
}

export const Budget = ({ history }: props) => {
  const [width] = useWindowSize()

  return (
    <div>
      {width <= 768 ? (
        <div>
          <BudgetMobile history={history}/>
        </div>
      ) : (
        <div> Desktop Home Page </div>
      )}
    </div>
  )
}
