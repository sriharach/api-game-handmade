import { NextFunction, Response, Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from '../setting/env'

export const Login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body
    const privateKey = env.settingCommon.JWT_SECRET as string
    const privateKeyRefresh = env.settingCommon.JWT_SECRET_REFRESH as string
    const payload = {
      username,
      password,
    }
    const token = jwt.sign(payload, privateKey, {
      expiresIn: '30m',
      algorithm: 'HS256',
    })
    const refresh_token = jwt.sign(payload, privateKeyRefresh, {
      algorithm: 'HS256',
    })
    const JWTdecode = jwt.decode(token) as JwtPayload

    res
      .json({
        access_token: token,
        refresh_token,
        expires_in: JWTdecode.exp,
      })
      .status(200)
  } catch (error) {
    next(error)
  }
}

