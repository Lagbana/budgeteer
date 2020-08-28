import React from 'react'
import { useAuthQuery } from '../generated/graphql'
import {
  RouteProps,
  Route,
  RouteComponentProps,
  Redirect
} from 'react-router-dom'

export const ProtectedRoute: React.FC<RouteProps>  = props => {
  const { component: __, ...rest } = props
  const { data, loading } = useAuthQuery()

  const renderRoute = (routeProps: RouteComponentProps) => {
    const { component } = props
      
    if (loading) {
      // loading screen
      return <div>loading...</div>
    }

    if (!data) {
      // user not logged in
      return <Redirect to='/login' />
    }
    const Component = component as any
    return <Component {...routeProps} />
  }

  return <Route {...rest} render={renderRoute} />
}
