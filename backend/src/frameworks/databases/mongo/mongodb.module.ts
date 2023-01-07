import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import Configuration from '../../../shared/configuration';
import { Contact, ContactSchema } from './models/contact.model';
import { MongoDBService } from './mongodb.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    MongooseModule.forRootAsync({
      inject: [Configuration],
      useFactory: (configuration: Configuration) => ({
        uri: configuration.mongoDBConnectionString(),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
  providers: [MongoDBService],
  exports: [MongoDBService],
})
export class MongoDBModule {}
