import { MiddlewareFn } from 'type-graphql'
import { IContext } from '../typing'
import { verify } from 'jsonwebtoken'

/**
 * Middleware to check that a user is authenticated
 * @param {Object} - {req: Request, res: Response}
 * @param next
 */
export const isAuthenticated: MiddlewareFn<IContext> = ({ context }, next) => {
  // Read the request header
  const authorization = context.req.headers['authorization']

  if (!authorization) throw new Error('not authenticated')

  try {
    const token = authorization.split(' ')[1]
    // verify the token is correct
    const payload = verify(
      token,
      Buffer.from(String(process.env.ACCESS_TOKEN_SECRET), 'base64')
    )
    // set payload to the context
    context.payload = payload as any
  } catch (error) {
    console.log(error)
    throw new Error('not authenticated')
  }

  return next()
}
