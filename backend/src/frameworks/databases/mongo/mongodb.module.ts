import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import Configuration from '../../../shared/configuration';
import { Contact, ContactSchema } from './models/contact.model';
import { User, UserSchema } from './models/user.model';
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
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [MongoDBService],
  exports: [MongoDBService],
})
export class MongoDBModule {}
