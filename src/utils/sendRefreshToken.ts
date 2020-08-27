import { Response } from 'express'

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(String(process.env.COOKIE_NAME), token, {
    httpOnly: true,
    maxAge: 604800000,
    path: '/refresh_token'
  })
}
