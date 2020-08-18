import { ObjectType, Field, ID, InputType } from 'type-graphql'

@ObjectType({ description: 'User Schema' })
export class User {
  @Field(() => ID)
  id: string

  @Field()
  username: string

  @Field()
  password: string
}

// @InputType({ description: 'Transactions inputs' })
// export class TransactionInputs implements Partial<Transactions> {
//   @Field(() => ID)
//   id: string

//   @Field()
//   name: string

//   @Field()
//   value: number
// }
