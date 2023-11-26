import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataService } from '../../../core';
import { DATA_BASE_CONFIGURATION } from '../../../configuration';
import { User, UserSchema } from './schemas/user.schema';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';
import { MongoDataServices } from './mongo-data-service.service';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    MongooseModule.forRoot(DATA_BASE_CONFIGURATION.mongoConnectionString),
    UsersService,
  ],
  providers: [
    {
      provide: IDataService, // using provide to associate IDataService with mongo implementation
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataService], // exporting IDataService (not Mongo implementation)
})
export class MongoDataServicesModule {}
