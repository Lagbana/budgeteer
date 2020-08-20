import { Schema, Model, model } from 'mongoose'
import { IUserDocument } from '../typing'
import { number } from 'yup'

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: 'Enter your name'
    },
    password: {
      type: String,
      required: 'Enter a password'
    },
    tokenVersion: {
      type: Number,
      default: 0
    }
  }
)

export const User: Model<IUserDocument> = model<
  IUserDocument
>('User', userSchema)
