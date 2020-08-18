import { UserDao } from '../dao/userDao'
import {
  IUserDocument,
  IUserService,
  IjwtPayload,
  ICredentials
} from '../typing'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { isEmpty } from 'lodash'
import e from 'express'

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
  ): Promise<IUserDocument> {
    try {
      if (isEmpty(username) || isEmpty(password)) {
        throw new Error('No empty fields allowed')
      }
      username = username.toLowerCase()
      password = await this.encryptPassword(password)
      const user = this.createUser(username, password)
      return user
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
      const saltRounds = 23
      const salt = await bcrypt.genSalt(saltRounds)
      return bcrypt.hash(password, salt)
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
    const { _id, username } = context
    try {
      const token = await jwt.sign(
        {
          _id,
          username,
          issuer: `budgeteer.api.internal`,
          aud: `budgeteer.client`
        },
        String(process.env.JWT_SECRET),
        { expiresIn: '1h' }
      )
      return { token }
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
        throw new Error(`Unauthorized`)
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
      const auth = await this.authenticate({ username, password })
      return auth
    } catch (error) {
      console.log(error)
    }
  }
}

export { UserService }
