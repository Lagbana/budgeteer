import { UserDao } from '../dao/userDao'
import { IUserDocument, IUserService, IjwtPayload } from '../typing'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { isEmpty } from 'lodash'

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
    const { id, username } = context
    try {
      const token = await jwt.sign(
        {
          id,
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
   * @return {Promise<Boolean>}
   * @throws {Error}
   */
  private comparePasswords (
    password: string,
    encryptPassword: string
  ): Promise<Boolean> {
    try {
      return bcrypt.compare(password, encryptPassword)
    } catch (error) {
      throw error
    }
  }
}

export { UserService }
