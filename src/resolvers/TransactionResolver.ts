import 'reflect-metadata'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
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
  constructor (options: {}) {
    this.options = options
    this.transactionsDao = new TransactionsDao()
  }

  @Query(() => [TransactionSchema])
  async getTransactions () {
    try {
      const response = await this.transactionsDao.getTransactions()
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
      // filter out repeated transaction objects
      const map: any = {}
      const filteredBulk = bulk.filter(item => {
        const transaction = item.transaction
        const amount = item.amount

        if (!map[transaction]) {
          map[transaction] = [amount]
          return item
        } else if (!map[transaction].includes(amount)) {
          map[transaction].push(amount)
          return item
        }
      })

      await this.transactionsDao.createBulkTransactions(filteredBulk)
    } catch (error) {
      console.log(error)
      return false
    }
    return true
  }
}
