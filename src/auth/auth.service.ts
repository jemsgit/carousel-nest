import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.generateAccessToken(payload),
      refresh_token: this.generateRefreshToken(payload),
    };
  }

  generateAccessToken(user: any) {
    const accessToken = this.jwtService.sign(user);
    return accessToken;
  }

  generateRefreshToken(user: any) {
    const refreshToken = this.jwtService.sign(user, {
      expiresIn: jwtConstants.refreshTokexExpiration,
    });
    return refreshToken;
  }

  async refreshTokens(username: string, refreshToken: string) {
    const user = await this.usersService.findOne(username);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = user.refreshToken === refreshToken;
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = {
      access_token: this.generateAccessToken(user),
      refresh_token: this.generateRefreshToken(user),
    };
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshToken(username: any, refresh_token: string) {
    await this.usersService.updateRefresh(username, refresh_token);
  }
}