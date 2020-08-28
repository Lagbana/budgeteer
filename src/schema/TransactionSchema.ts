import { ObjectType, Field, ID, InputType } from 'type-graphql'

@ObjectType({ description: 'Transactions Schema' })
export class Transactions {
  @Field(() => ID)
  _id?: string

  @Field()
  transaction: string

  @Field()
  amount: number
}

@InputType({ description: 'Transactions inputs' })
export class TransactionInputs implements Partial<Transactions> {
  // @Field(() => ID)
  // _id?: string 

  @Field()
  transaction: string

  @Field()
  amount: number
}
