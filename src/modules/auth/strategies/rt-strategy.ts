import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayloadType } from '../type'
import { Request } from 'express'

@Injectable()
export class RTStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt-secret',
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: JwtPayloadType) {
    const refresh_token = req.get('authorization').replace('Bearer', '').trim()

    return {
      ...payload,
      refresh_token,
    }
  }
}
