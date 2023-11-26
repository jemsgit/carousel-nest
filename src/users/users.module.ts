import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import {
  User,
  UserSchema,
} from '../frameworks/data-service/mongo/schemas/user.schema';
import {
  RefreshToken,
  RefreshTokenSchema,
} from '../frameworks/data-service/mongo/schemas/refresh-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
