import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './auth/guards/jwt-refresh-auth.guard';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Request as RequestType } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: RequestType) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('user/registration')
  async registr(@Request() req: RequestType) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestType) {
    return req.user;
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('auth/refresh')
  getNewToken(@Request() req: RequestType) {
    console.log(req);
    return req.user;
  }
}

//curl http://localhost:3001/auth/refresh -H "Cookie: JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTcwMDQ4NzE3MSwiZXhwIjoxNzAwNDk3OTcxfQ.bgDcN42ZGH2y9tDNpwvELzvUun-FAAVTsGn0rZgJ2ac;JWT-R=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTcwMDQ4NzE3MSwiZXhwIjoxNzAwNjU5OTcxfQ.r9EcJsRz-edQbgU7NSitU0-2I01bH9XjX400e2h2ehk"
