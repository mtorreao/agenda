import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ContactsModule } from './contacts/contacts.module';
import { DatabaseModule } from './frameworks/databases/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    DatabaseModule,
    ContactsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
