import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap(): Promise<string> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  await app.listen(3001);
  return app.getUrl();
}

void (async (): Promise<void> => {
  try {
    const url = await bootstrap();
    console.log(url, 'Bootstrap');
  } catch (error) {
    console.error(error, 'Bootstrap');
  }
})();

// curl -X POST http://localhost:3001/auth/login -d '{"username": "john", "password":"changeme"}' -H "Content-Type: application/json"

// curl http://localhost:3001/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTcwMDQzMTc3MCwiZXhwIjoxNzAwNDMxODMwfQ._3ORVUGagnzPdnFO77pOyqqYdb9LTq4Wh6rQkG98nG8"
// curl http://localhost:3001/profile -H "Cookie: JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTcwMDQzMjc5NSwiZXhwIjoxNzAwNDMyODU1fQ.NW4AuRp4qeLmcLgMnlTEernSsg2kP_WM4_FFpmlESTA"
