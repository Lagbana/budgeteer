import { Document } from 'mongoose'
import { Request, Response } from 'express'

/**
 * ------------------------------------------
 * Interface definition for the config object
 * ------------------------------------------
 */
export interface IConfig {
  port: number
}

/**
 * ------------------------------------------
 * Interface definition for the express objects
 * ------------------------------------------
 */
export interface IContext {
  req: Request
  res: Response
  payload?: TAccessToken
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
  tokenVersion?: number
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
 * Refresh token type
 */
export type TRefreshToken = {
  _id: string | undefined
  token?: string
  tokenVersion?: number
}

/**
 * Access token type
 */
export type TAccessToken = {
  _id: string | undefined
  username: string
}

/**
 * -----------------------------------------------------------------------
 *  Interface definition for the implementation of the user service
 * -----------------------------------------------------------------------
 */
export interface IUserService {
  retrieveUser(id: string): Promise<IUserDocument | null>
  makeUser(username: string, password: string): Promise<IUserDocument | string>
  login(context: ICredentials): Promise<TRefreshToken | string | undefined>
  revokeRefreshToken(userId: string): Promise<true | undefined>
}

/**
 * ------------------------------------------------------------------------------
 *  Interface definition for the UserService jwtPayload method parameter object
 * ------------------------------------------------------------------------------
 */
export interface IjwtPayload {
  _id?: string
  username: string
  tokenVersion?: number
}

/**
 * -----------------------------------------------------
 *  Interface definition for the user credential object
 * -----------------------------------------------------
 */
export interface ICredentials {
  _id?: string
  username: string
  password: string
  tokenVersion?: number
}
