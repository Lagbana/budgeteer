import React from 'react'
import { useWindowSize } from '../utils/useWindowSize'
import { BudgetMobile } from '../mobileComponents/BudgetMobile'
// import { useGetTransactionsQuery } from '../generated/graphql'

interface props {
  history: any,
  // data: any
}

export const Budget = ({ history }: props) => {
  const [width] = useWindowSize()
  
//  console.log(data)

  return (
    <div>
      {width <= 768 ? (
        <div>
          <BudgetMobile history={history} />
        </div>
      ) : (
        <div> Desktop Home Page </div>
      )}
    </div>
  )
}
