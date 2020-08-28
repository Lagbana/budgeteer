import { Schema, Model, model } from 'mongoose'
import { ITransactionDocument } from '../typing'

const transactionSchema: Schema = new Schema(
  {
    transaction: {
      type: String,
      trim: true,
      required: 'Enter a name for transaction'
    },
    amount: {
      type: Number,
      required: 'Enter an amount'
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

export const Transactions: Model<ITransactionDocument> = model<
  ITransactionDocument
>('Transactions', transactionSchema)
