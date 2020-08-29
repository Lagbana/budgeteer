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
import { sendRefreshToken } from '../utils/sendRefreshToken'
import { verify } from 'jsonwebtoken'

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

  @Mutation(() => Boolean)
  revokeRefreshTokenForUser (@Arg('userId') userId: string) {
    const response = this.userService.revokeRefreshToken(userId)
    return response
  }

  @Query(() => UserSchema)
  @UseMiddleware(isAuthenticated)
  auth (
    // access the context payload
    @Ctx() { payload }: IContext
  ) {
    const response = { _id: payload?._id, username: payload?.username }
    return response
  }

  @Query(() => UserSchema, { nullable: true })
  async user (@Ctx() context: IContext) {
    const authorization = context.req.headers['authorization']

    if (!authorization) {
      return null
    }

    try {
      const token = authorization.split(' ')[1]
      const payload: any = verify(
        token,
        Buffer.from(String(process.env.ACCESS_TOKEN_SECRET), 'base64')
      )
      return await this.userService.retrieveUser(payload._id)
    } catch (error) {
      console.log(error)
      return null
    }
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

  @Mutation(() => LoginResponse, { nullable: true })
  async newUser (
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { res }: IContext
  ) {
    try {
      // Check to see that input fields are not empty
      if (isEmpty(username) || isEmpty(password)) {
        return new ApolloError(`Bad request, user inputs can not be empty`)
      }
      // Check to see if the user was successfully created
      const userAuth = await this.userService.makeUser(username, password)
      if (typeof userAuth !== 'object') {
        return null
      } else {
        // Set up cookie with refresh token and return userAuth object
        sendRefreshToken(res, createRefreshToken(userAuth))
        return userAuth
      }
    } catch (error) {
      console.log(error)
    }
  }

  @Mutation(() => LoginResponse, { nullable: true })
  async login (
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { res }: IContext
  ) {
    try {
      // Check to see that input fields are not empty
      if (isEmpty(username) || isEmpty(password)) {
        return null
      }
      // Check to see if we receive the user object from the database
      const userAuth = await this.userService.login({ username, password })
      if (typeof userAuth !== 'object') {
        return null
      } else {
        // Set up cookie with refresh token and return userAuth object
        sendRefreshToken(res, createRefreshToken(userAuth))
        return userAuth
      }
    } catch (error) {
      console.log(error)
    }
  }

  @Mutation(() => Boolean)
  async logout (@Ctx() { req, res }: IContext) {
    sendRefreshToken(res, '')
    res.cookie('loj', '', {
      expires: new Date(628021800000),
      // maxAge: -1,
      path: '/refresh_token'
    })
    // res.clearCookie('loj')

    return true
  }
}
