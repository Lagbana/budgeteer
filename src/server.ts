import 'reflect-metadata'
import { app } from './app'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import { TransactionResolver, UserResolver } from './resolvers'
import { buildSchema } from 'type-graphql'
import { IConfig } from './typing'

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
    })
  })

  server.applyMiddleware({ app })

  app.listen(config.port, () => {
    console.log(`App running on http://localhost:8080${server.graphqlPath}`)
  })
}

startServer()
