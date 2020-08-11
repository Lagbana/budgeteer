import { Router } from 'express'
const expressRouter = Router()
// Require all Routes
import { TransactionsRoute } from './transactions'

// Require all Services
// import {  } from '../services'

/*
    *Function: 
    Initialize all routes
*/
const initializeRoutes = (app: any) => {
  const routesArray = [new TransactionsRoute({ expressRouter })]

  routesArray.forEach(route => {
    route.initialize()
    app.use(route.router)
  })
}
// Export the routes
export { initializeRoutes }
