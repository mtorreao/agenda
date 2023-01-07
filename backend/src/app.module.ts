import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AppController,
  AuthController,
  ContactsController,
} from './controllers';
import { AuthModule } from './frameworks/auth/auth.module';
import { DatabaseModule } from './frameworks/databases/database.module';
import { SharedModule } from './shared/shared.module';
import { AuthUseCasesModule } from './use-cases/auth/auth-use-cases.module';
import { ContactUseCasesModule } from './use-cases/contact/contact-use-cases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    SharedModule,
    DatabaseModule,
    AuthModule,
    ContactUseCasesModule,
    AuthUseCasesModule,
  ],
  controllers: [AppController, ContactsController, AuthController],
})
export class AppModule {}
