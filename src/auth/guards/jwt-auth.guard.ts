import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// use as alias for using in controller as JwtAuthGuard (not like AuthGuard('jwt'))

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
