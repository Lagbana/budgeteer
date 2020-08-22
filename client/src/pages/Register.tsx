import React from 'react'
import { useWindowSize } from '../utils/useWindowSize'
import { FormPage } from '../mobileComponents/FormPage'
import { useRegisterMutation } from '../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'

// interface Props {}

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [width] = useWindowSize()
  const [register] = useRegisterMutation()

  return (
    <div>
      {width < 768 ? (
        <div>
          <FormPage
            pageName='Register'
            buttonName='SIGN UP'
            actionHook={register}
            history={history}
          />
        </div>
      ) : (
        <div> Desktop Register Page </div>
      )}
    </div>
  )
}
