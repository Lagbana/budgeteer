import React, { useState } from 'react'
import { useWindowSize } from '../utils/useWindowSize'
import { FormPage } from '../mobileComponents/FormPage'
import { useLoginMutation } from '../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [width] = useWindowSize()
  const [login] = useLoginMutation()

  return (
    <div>
      {width < 768 ? (
        <div>
          <FormPage
            pageName='Log in'
            buttonName='LOG IN'
            actionHook={login}
            history={history}
          />
        </div>
      ) : (
        <div> Desktop Login Page </div>
      )}
    </div>
  )
}
