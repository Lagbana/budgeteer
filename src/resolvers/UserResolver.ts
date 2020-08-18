import 'reflect-metadata'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { UserService } from '../services/userService'
import { IUserService } from '../typing/index'
import { User as UserSchema } from '../schema/UserSchema'

const userService = new UserService()

@Resolver(UserSchema)
export class UserResolver {
  userService: IUserService
  options: {}
  constructor (options = {}) {
    this.options = options
    this.userService = userService
    // this.userService = new UserService()
  }

  @Query(() => UserSchema)
  async getUser (userId: string) {
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
      await this.userService.makeUser(username, password)
    } catch (error) {
      console.log(error)
      return false
    }
    return true
  }
}
