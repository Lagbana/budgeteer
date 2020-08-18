import { Document } from 'mongoose'

/**
 * ------------------------------------------
 * Interface definition for the config object
 * ------------------------------------------
 */
export interface IConfig {
  port: number
}

/**
 * -------------------------------------------------
 *  Interface definition for the transaction object
 * -------------------------------------------------
 */
export interface ITransactionDocument extends Document {
  name: string
  value: number
  date?: Date
}

/**
 * -----------------------------------------------------------------------
 *  Interface definition for the implementation of the transaction DAO
 * -----------------------------------------------------------------------
 */
export interface ItransactionsDao {
  getTransactions(): Promise<Array<ITransactionDocument>>
  createTransaction(context: any): Promise<ITransactionDocument>
  createBulkTransactions(context: []): Promise<Array<ITransactionDocument>>
}

/**
 * -------------------------------------------------
 *  Interface definition for the user object
 * -------------------------------------------------
 */
export interface IUserDocument extends Document {
  username: string
  password: string
}

/**
 * ---------------------------------------------------------------
 *  Interface definition for the implementation of the user DAO
 * ---------------------------------------------------------------
 */
export interface IUserDao {
  getUser(id: string): Promise<IUserDocument | null>
  createUser(username: string, password: string): Promise<IUserDocument>
}

/**
 * -----------------------------------------------------------------------
 *  Interface definition for the implementation of the user service
 * -----------------------------------------------------------------------
 */
export interface IUserService {
  retrieveUser(id: string): Promise<IUserDocument | null>
  makeUser(username: string, password: string): Promise<IUserDocument>

}

/**
 * ------------------------------------------------------------------------------
 *  Interface definition for the UserService jwtPayload method parameter object
 * ------------------------------------------------------------------------------
 */
export interface IjwtPayload {
  _id?: string
  username: string
}

/**
 * -----------------------------------------------------
 *  Interface definition for the user credential object
 * -----------------------------------------------------
 */
export interface ICredentials {
  _id?:string
  username: string
  password: string
}
