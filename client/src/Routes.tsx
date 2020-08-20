import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Trends } from './pages/Trends'

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
        <Route exact path='/home' component={Home} />
        <Route exact path='/trends' component={Trends} />
      </Switch>
    </BrowserRouter>
  )
}
