import { Response } from 'express'

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(String(process.env.COOKIE_NAME), token, {
    httpOnly: true
  })
}
