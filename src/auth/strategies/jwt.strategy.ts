import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { Request } from 'express';

const cookieExtractor = (req: Request) => {
  let jwt = null;

  console.log(req.cookies);
  if (req && req.cookies) {
    jwt = req.cookies['JWT'];
  }

  return jwt;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // called when token was sucessfully decrypted
  async validate(payload: any) {
    console.log('val');
    return { userId: payload.sub, username: payload.username };
  }
}
