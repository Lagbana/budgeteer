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
  date: Date
}

/**
 * -----------------------------------------------------------------------
 *  Interface definition for the implementation of the transaction object
 * -----------------------------------------------------------------------
 */
export interface ItransactionsDao {
  getTransactions(): Promise<Array<ITransactionDocument>>
  createTransaction(context: any): Promise<ITransactionDocument>
  createBulkTransactions(context: []): Promise<Array<ITransactionDocument>>
}
