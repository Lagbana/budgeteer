import { UserDao } from '../dao/userDao'
import {
  IUserDocument,
  IUserService,
  IjwtPayload,
  ICredentials
} from '../typing'
import bcrypt from 'bcrypt'
import { isEmpty } from 'lodash'
import { createAccessToken } from '../utils/auth'
import { User } from '../models/user'

/**
 * @constructor UserService
 * extends the UserDao class and performs user specific operations
 */
class UserService extends UserDao implements IUserService {
  options: any
  constructor (options: any = {}) {
    super()
    this.options = options
  }

  /**
   * @returns {Promise<IUserDocument>} - returns the user object
   * @throws - throws error if something goes wrong
   */

  public async retrieveUser (userId: string): Promise<IUserDocument | null> {
    try {
      if (isEmpty(userId)) {
        throw new Error(
          `Bad request. Expected input to be a string but received ${typeof userId}`
        )
      }
      const user = this.getUser(userId)
      return user
    } catch (err) {
      throw err
    }
  }

  /**
   * @param {string} - username string
   * @param {string} - password string
   * @returns {Promise<IUserDocument>} - returns a newly created user with password encrypted
   * @throws - throws error if something goes wrong
   */
  public async makeUser (
    username: string,
    password: string
  ) {
    try {
      if (isEmpty(username) || isEmpty(password)) {
        throw new Error('No empty fields allowed')
      }
      username = username.toLowerCase()

      // Check to see if the user exists before creating a new user
      let existingUser = await this.getUserByCustomField({ username })
      if (existingUser.length > 0) {
        return `This username is already taken`
      } else {
        // encrypt password
        const encryptedPassword = await this.encryptPassword(password)
        //create user
        await this.createUser(username, encryptedPassword)
        // authenticate user
        const userAuth = await this.authenticate({ username, password })
        return userAuth
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * Converts string password to a hash with a one-way hashing algorithm
   * @param {string} password - string password
   * @returns {String} - returns encrypted password string
   * @throws - throws error
   */
  private async encryptPassword (password: string) {
    try {
      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      const hashed = await bcrypt.hash(password, salt)
      return hashed
    } catch (err) {
      throw err
    }
  }

  /**
   * Creates a jwt token
   * @param {Object} params - {id, username}
   * @return {Promise<{string}>} token
   */
  private async jwtPayload (context: IjwtPayload) {
    const { _id, username, tokenVersion } = context
    try {
      const token = createAccessToken({ _id, username })
      return { _id, token, tokenVersion }
    } catch (error) {
      throw error
    }
  }

  /**
   * Compares input string with hashed string for validating user password
   * @param {string} password - input password string
   * @param {string} encryptPassword - hashed password stored in db
   * @return {Promise<Boolean>} - boolean
   * @throws {Error}
   */
  private async comparePasswords (
    password: string,
    encryptPassword: string
  ): Promise<Boolean> {
    try {
      return await bcrypt.compare(password, encryptPassword)
    } catch (error) {
      throw error
    }
  }

  /**
   * Authenticates the user based on input parameters
   * @param {Object} params - {username, password}
   * @return {Promise<Object<string>>} - token
   */
  public async authenticate (context: ICredentials) {
    try {
      const { username, password } = context
      let user: ICredentials[] = []
      if (!isEmpty(username)) {
        user = await this.getUserByCustomField({ username })
      }
      if (user.length > 0) {
        const foundUser = user[0]
        const encryptPassword = foundUser.password
        const validCredentials = await this.comparePasswords(
          password,
          encryptPassword
        )
        if (validCredentials) {
          return await this.jwtPayload(foundUser)
        } else {
          throw new Error(`Unauthorized`)
        }
      } else {
        const response: string = `This user does not exist`
        return response
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Generates an auth token for user authentication
   * @param {Object} params - { username, password }
   * @return {Object} { token }
   * @throws {Error}
   */
  public async login (context: ICredentials) {
    try {
      let { username, password } = context
      if (isEmpty(username) || isEmpty(password)) {
        throw new Error('Bad request, inputs can not be empty.')
      }
      username = username.toLowerCase()
      const userAuth = await this.authenticate({ username, password })
      return userAuth
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Generates an auth token for user authentication
   * @param {Object} params - { username, password }
   * @return {Object} { token }
   * @throws {Error}
   */
  public async revokeRefreshToken (userId: string) {
    try {
      await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { tokenVersion: 1 } }
      )
      return true
    } catch (error) {
      console.log(error)
    }
  }
}

export { UserService }
