import { Schema, Model, model } from 'mongoose'
import { IUserDocument } from '../typing'

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
    }
  }
)

export const User: Model<IUserDocument> = model<
  IUserDocument
>('User', userSchema)
