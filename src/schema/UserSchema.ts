import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: 'User Schema' })
export class User {
  @Field(() => ID)
  _id: string

  @Field()
  username: string

  @Field()
  password: string
}
