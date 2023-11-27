import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IDataService } from '../../../core';
import { User, UserSchema } from './schemas/user.schema';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';
import { MongoDataServices } from './mongo-data-service.service';
import configuration from '../../../configuration';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    ConfigModule.forRoot({
      load: [configuration], // use configuration with .env file
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // inject config module
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoConnectionString'),
      }),
      inject: [ConfigService],
    }),
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
