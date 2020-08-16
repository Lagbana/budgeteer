import 'reflect-metadata'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { Transactions } from '../models/transactions'
// import { ITransactionDocument, ITransactionResolver } from '../typing'
import TransactionSchema from '../schema/TransactionSchema'

@Resolver(TransactionSchema)
export class TransactionResolver {
  @Query(() => [TransactionSchema])
  async getTransactions () {
    try {
      const response = await Transactions.find({}).sort({ date: -1 })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  @Mutation(() => Boolean)
  async newTransaction (
    @Arg('name') name: string,
    @Arg('value') value: number
  ) {
    try {
      await Transactions.create({
        name,
        value
      })
    } catch (error) {
      console.log(error)
      return false
    }
    return true
  }
}
