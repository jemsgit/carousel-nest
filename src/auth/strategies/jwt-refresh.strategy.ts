import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from '../constants';
import { AuthService } from '../auth.service';

// extract token for checking
const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies['JWT-R'];
  }

  return jwt;
};

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  // calls only when token is valid token
  async validate(request: Request, payload: any) {
    console.log('valid');
    console.log(payload);

    return { ...payload, refreshToken: 123 };
  }
}
