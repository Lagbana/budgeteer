import { sign } from 'jsonwebtoken'
import { TRefreshToken, TAccessToken } from '../typing'

export const createRefreshToken = (user: any) => {
  return sign(
    { userId: user._id, tokenVersion: user.tokenVersion },
    String(process.env.REFRESH_TOKEN_SECRET),
    {
      expiresIn: '7d'
    }
  )
}

export const createAccessToken = (context: TAccessToken) => {
  return sign(
    {
      _id: context._id,
      username: context.username,
      issuer: `budgeteer.api.internal`,
      aud: `budgeteer.client`
    },
    Buffer.from(String(process.env.ACCESS_TOKEN_SECRET), 'base64'),
    { expiresIn: '30m' }
  )
}
