import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware
} from 'type-graphql'
import { ApolloError } from 'apollo-server-express'
import { UserService } from '../services/userService'
import { IUserService, IContext } from '../typing/index'
import { User as UserSchema } from '../schema/UserSchema'
import { isEmpty } from 'lodash'
import { createRefreshToken } from '../utils/auth'
import { isAuthenticated } from '../utils/isAuthenticated'

@ObjectType()
class LoginResponse {
  @Field()
  _id: string

  @Field()
  token: string
}

@Resolver(UserSchema)
export class UserResolver {
  userService: IUserService
  options: {}
  constructor (options = {}) {
    this.options = options
    this.userService = new UserService()
  }

  @Query(() => String)
  @UseMiddleware(isAuthenticated)
  test(
    // access the context payload
    @Ctx() {payload}: IContext
  ) {
    return `your user id is ${payload?._id} and username is ${payload?.username}`
  }

  @Query(() => UserSchema)
  async getUser (@Arg('userId') userId: string) {
    try {
      const response = await this.userService.retrieveUser(userId)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  @Mutation(() => Boolean)
  async newUser (
    @Arg('username') username: string,
    @Arg('password') password: string
  ) {
    try {
      const createdFeedback = await this.userService.makeUser(
        username,
        password
      )
      const response = typeof createdFeedback === 'string' ? false : true
      return response
    } catch (error) {
      console.log(error)
    }
  }

  @Mutation(() => LoginResponse)
  async login (
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { res }: IContext
  ) {
    try {
      // Check to see that input fields are not empty
      if (isEmpty(username) || isEmpty(password)) {
        return new ApolloError(`Bad request, user inputs can not be empty`)
      }
      // Check to see if we receive the user object from the database
      const user = await this.userService.login({ username, password })
      if (typeof user !== 'object') {
        return new ApolloError(`This user does not exist`)
      } else {
        res.cookie(String(process.env.COOKIE_NAME), createRefreshToken(user), {
          httpOnly: true
        })
        return user
      }
    } catch (error) {
      console.log(error)
    }
  }
}
