// Register Mongoose Models
// require('./models/userModel')
// require('./models/companyModel')
// require('./models/jobModel')
// require('./models/videoModel')
// require('./models/otpModel')

// require('dotenv').config()
import express, { Application, Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import compression from 'compression'
import { initializeRoutes } from './routes'

if (process.env.NODE_ENV === 'development') {
  const { config } = require('dotenv')
  config()
}

// Initialize the express application
const app: Application = express()

// Set up the middlewares
app.use(logger('dev'))
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Middleware that allows express to server static files to the client
// app.use(express.static('public'))

// Connect to mongoDB database running remotely or locally during development
// Specify mongoDB connection option booleans
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budget', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// app.use(
//   koaSwagger({
//     routePrefix: '/swagger',
//     swaggerOptions: {
//       url: '/swagger.yml'
//     }
//   })
// )

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.send('We made it here')
// })

initializeRoutes(app)

export { app }
