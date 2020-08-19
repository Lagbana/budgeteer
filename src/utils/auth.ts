import { sign } from 'jsonwebtoken'
import { TRefreshToken, TAccessToken } from '../typing'

export const createRefreshToken = (user: TRefreshToken) => {
  return sign({ userId: user._id }, String(process.env.REFRESH_TOKEN), {
    expiresIn: '7d'
  })
}

export const createAccessToken = (context: TAccessToken) => {
  return sign(
    {
      _id: context._id,
      username: context.username,
      issuer: `budgeteer.api.internal`,
      aud: `budgeteer.client`
    },
    Buffer.from(String(process.env.ACCESS_TOKEN), 'base64'),
    { expiresIn: '1h' }
  )
}
