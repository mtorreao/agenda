import { Module } from '@nestjs/common';
import { IDatabase } from '../../shared/abstracts/database.abstract';
import Configuration from '../../shared/configuration';
import { MongoDBModule } from './mongo/mongodb.module';
import { MongoDBService } from './mongo/mongodb.service';

@Module({
  imports: [MongoDBModule],
  providers: [
    {
      provide: IDatabase,
      // This is the factory function that will be called to create the provider,
      useFactory: (
        configuration: Configuration,
        mongoDbService: MongoDBService,
      ) => {
        if (configuration.whichDb() === 'mongo') {
          return mongoDbService;
        }
        throw new Error('No database provider found');
      },
      inject: [Configuration, MongoDBService],
    },
  ],
  exports: [IDatabase],
})
export class DatabaseModule {}
