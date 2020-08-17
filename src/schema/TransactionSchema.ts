import { ObjectType, Field, ID, InputType } from 'type-graphql'

@ObjectType({ description: 'Transactions Schema' })
export class Transactions {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  value: number
}

@InputType({ description: 'Transactions inputs' })
export class TransactionInputs implements Partial<Transactions> {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  value: number
}
