import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: 'Transactions Schema' })
export default class Transactions {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  value: number
}
