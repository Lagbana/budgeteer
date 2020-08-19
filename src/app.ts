import express, { Application } from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import 'dotenv/config'

// Initialize the express application
const app: Application = express()

// Set up the middlewares
app.use(logger('dev'))
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Middleware that allows express to server static files to the client
// app.use(express.static('public'))



// initializeRoutes(app)

export { app }
