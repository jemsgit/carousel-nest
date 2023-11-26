import { Module } from '@nestjs/common';

import { MongoDataServicesModule } from 'src/frameworks/data-service/mongo/mongo-data-service.module';

@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataSeviceModule {}
