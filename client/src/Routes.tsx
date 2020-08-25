import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Budget } from './pages/Budget'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Trends } from './pages/Trends'
import { ProtectedRoute } from './utils/ProtectedRoute'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <div>
        <header>
          <div>
            <Link to='/register'>register</Link>
          </div>
          <div>
            <Link to='/login'>login</Link>
          </div>
        </header>
      </div> */}
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <ProtectedRoute exact path='/budget' component={Budget} />
        <Route exact path='/trends' component={Trends} />
      </Switch>
    </BrowserRouter>
  )
}
