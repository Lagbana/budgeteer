import React from 'react'
import { useAuthQuery } from '../generated/graphql'
import { isEmpty } from 'lodash'
import { RouteProps, Route, RouteComponentProps, Redirect } from 'react-router-dom'

export const ProtectedRoute: React.FC<RouteProps> = props => {
  const { component: __, ...rest } = props
  const { data, loading } = useAuthQuery()
  
    const renderRoute = (routeProps: RouteComponentProps) => {
        const { component } = props

        // @ts-ignore
        console.log(data)
        if (loading) {
            // loading screen
            return <div>loading...</div>
        }

        if (!data) {
            // user not logged in
            return <Redirect to="/login" />
        }
        const Component = component as any
        return <Component {...routeProps} />
    }


  return <Route {...rest} render={renderRoute} />
}

// export const ProtectedRoute: React.FC<props> = (props) => {
// //   const { history } = props
//   const { data } = useAuthQuery()
//     console.log(data)
//   return !isEmpty(data) ? <>{props.children}</> : <div>You are not allowed here!!</div>
// }
