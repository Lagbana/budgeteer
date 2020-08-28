import 'reflect-metadata'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { Transactions } from '../models/transactions'
import {
  Transactions as TransactionSchema,
  TransactionInputs
} from '../schema/TransactionSchema'
import { TransactionsDao } from '../dao'
import { ItransactionsDao } from '../typing'

@Resolver(TransactionSchema)
export class TransactionResolver {
  transactionsDao: ItransactionsDao
  options: {}
  constructor(options: {}) {
    this.options = options
    this.transactionsDao = new TransactionsDao()
  }

  @Query(() => [TransactionSchema])
  async getTransactions () {
    try {
      const response = await this.transactionsDao.getTransactions()
      // const response = await Transactions.find({}).sort({ date: -1 })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  @Mutation(() => Boolean)
  async newTransaction (
    @Arg('transaction') transaction: string,
    @Arg('amount') amount: number
  ) {
    try {
      await this.transactionsDao.createTransaction({
        transaction,
        amount
      })
      // await Transactions.create({
      //   transaction,
      //   amount
      // })
    } catch (error) {
      console.log(error)
      return false
    }
    return true
  }

  @Mutation(() => Boolean)
  async newBulkTransactions (
    @Arg('bulk', _type => [TransactionInputs]) bulk: TransactionInputs[]
  ) {
    try {
      await this.transactionsDao.createBulkTransactions(bulk)
      // await Transactions.insertMany(bulk)
    } catch (error) {
      console.log(error)
      return false
    }
    return true
  }
}
