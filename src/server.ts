import 'reflect-metadata'
import { app } from './app'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import { TransactionResolver, UserResolver } from './resolvers'
import { buildSchema } from 'type-graphql'
import { IConfig } from './typing'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { verify } from 'jsonwebtoken'
import { UserDao } from './dao/userDao'
import { createAccessToken, createRefreshToken } from './utils/auth'
import { sendRefreshToken } from './utils/sendRefreshToken'

// Set up cookie parser middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)
app.use('/refresh_token', cookieParser())

/**
 * Special route for handling refreshing our jwt token. The cookie only works on this route and the token is resent
 * only when the current cookie expires and the user is still in an active session.
 */

app.post('/refresh_token', async (req, res) => {
  // Read the cookie and get the refresh token
  const token = req.cookies.loj

  // Ensure a token received, otherwise do not send an accessToken
  if (!token) {
    return res.send({ ok: false, accessToken: '' })
  }

  // Make sure the token has not expired and it's valid
  let payload: any = null
  try {
    payload = verify(token, String(process.env.REFRESH_TOKEN_SECRET))
  } catch (error) {
    console.log(error)
    return res.send({ ok: false, accessToken: '' })
  }

  // Using the userId value on payload object find the user in the DB
  const userDao = new UserDao()
  const user = await userDao.getUser(payload.userId)

  if (!user) {
    return res.send({ ok: false, accessToken: '' })
  }

  // Check to see if the user token version and the payload token are the same
  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: '' })
  }

  // Send a new refresh token - optional, but it allows active users to maintain cookie
  sendRefreshToken(res, createRefreshToken(user))

  // If the user is found, create a new access token
  return res.send({ ok: true, accessToken: createAccessToken(user) })
})

// Set the port
const config: IConfig = {
  port: Number(process.env.PORT) || 8080
}

const startServer = async (): Promise<void> => {
  // Connect to mongoDB database running remotely or locally during development
  // Specify mongoDB connection option booleans
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/budgeteer',
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TransactionResolver, UserResolver],
      emitSchemaFile: true
    }),
    context: ({ req, res }) => ({ req, res })
  })

  server.applyMiddleware({ app, cors: false })

  app.listen(config.port, () => {
    console.log(`App running on http://localhost:8080${server.graphqlPath}`)
  })
}

startServer()
