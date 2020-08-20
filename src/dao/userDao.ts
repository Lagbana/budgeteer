import { Model } from 'mongoose'
import { User } from '../models/user'
import { IUserDocument, IUserDao, ICredentials } from '../typing'

/**
 * @constructor UserDao
 * Connects to the database and performs CRUD (create, read, update, delete)
 * operations on the user model
 */
class UserDao implements IUserDao {
  options: any
  user: Model<IUserDocument>
  constructor (options: any = {}) {
    this.options = options
    this.user = User
  }

  /**
   * @returns {Promise<IUserDocument>} - returns the user object
   * @throws - throws error if something goes wrong
   */

  public async getUser (id: string): Promise<IUserDocument | null> {
    try {
      const user = await this.user.findById(id)
      return user
    } catch (err) {
      throw err
    }
  }

  /**
   * Gets a user by a field
   * @param {Object} field - to retrieve a user by
   * @returns {Promise<IUserDocument[]>} - returns an array of possible user objects
   * @throws - throws error if something goes wrong
   */

  public async getUserByCustomField (field: {}): Promise<ICredentials[]> {
    try {
      const user = await this.user.find(field)
      return user
    } catch (err) {
      throw err
    }
  }

  /**
   * @param string - username
   * @param string - password
   * @returns {Promise<IUserDocument>} - returns a newly created user object
   * @throws - throws error if something goes wrong
   */
  public async createUser (
    username: string,
    password: string
  ): Promise<IUserDocument> {
    try {
      const user = await this.user.create({ username, password })
      return user
    } catch (err) {
      throw err
    }
  }
}

export { UserDao }
