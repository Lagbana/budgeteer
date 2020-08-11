import { Model } from 'mongoose'
import { Transactions } from '../models/transactions'
import { ITransactionDocument, ItransactionsDao } from '../typing'

/**
 * @constructor TransactionDao
 * Connects to the database and performs CRUD (create, read, update, delete)
 * operations on the transactions model
 */
class TransactionsDao implements ItransactionsDao {
  options: any
  transactions: Model<ITransactionDocument>
  constructor (options: any = {}) {
    this.options = options
    this.transactions = Transactions
  }

  /**
   * @returns {Promise<[ITransactionDocument]>} - returns an array transaction objects
   * @throws - throws error if something goes wrong
   * retrieves all transactions and sorts by descending order
   */

  async getTransactions (): Promise<Array<ITransactionDocument>> {
    try {
      const transactions = this.transactions.find({}).sort({ date: -1 })
      return transactions
    } catch (err) {
      throw err
    }
  }

  /**
   * @param {Object} - context
   * @returns {Promise<ITransactionDocument>} - creates a new transaction in the database and returns a transaction object
   * @throws - throws error if something goes wrong
   */
  async createTransaction (context: any): Promise<ITransactionDocument> {
    try {
      const transaction = this.transactions.create(context)
      return transaction
    } catch (err) {
      throw err
    }
  }

  /**
   * @param {Array} - context
   * @returns {Promise[<ITransactionDocument>]} - saves bulk transactions in the database and returns an array of transaction objects
   * @throws - throws error if something goes wrong
   */

  async createBulkTransactions (
    context: []
  ): Promise<Array<ITransactionDocument>> {
    try {
      const bulkTransactions = this.transactions.insertMany(context)
      return bulkTransactions
    } catch (err) {
      throw err
    }
  }
}

export { TransactionsDao }
