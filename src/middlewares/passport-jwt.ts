import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import setting from '../setting/env'

const secretOrKey = setting.settingCommon.JWT_SECRET as string

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey,
    },
    (jwt_payload, done) => {
      return done(null, jwt_payload)
    },
  ),
)

export default passport.authenticate('jwt', { session: false })
