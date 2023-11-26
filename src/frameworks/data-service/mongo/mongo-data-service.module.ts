import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataService } from '../../../core';
import { DATA_BASE_CONFIGURATION } from '../../../configuration';
import { User, UserSchema } from './schemas/user.schema';
import { MongoDataServices } from './mongo-data-service.service';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(DATA_BASE_CONFIGURATION.mongoConnectionString),
    UsersService,
  ],
  providers: [
    {
      provide: IDataService,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataService],
})
export class MongoDataServicesModule {}
