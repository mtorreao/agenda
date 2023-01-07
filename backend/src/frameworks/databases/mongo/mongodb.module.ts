import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import Configuration from '../../../shared/configuration';
import { Contact, ContactSchema } from './models/contact.model';
import { MongoDBService } from './mongodb.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [Configuration],
      useFactory: (configuration: Configuration) => ({
        uri: configuration.mongoDBConnectionString(),
      }),
    }),
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
  providers: [MongoDBService],
  exports: [MongoDBService],
})
export class MongoDBModule {}
