import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactsController } from './controllers';
import { AppController } from './controllers/app/app.controller';
import { DatabaseModule } from './frameworks/databases/database.module';
import Configuration from './shared/configuration';
import { ContactUseCasesModule } from './use-cases/contact/contact-use-cases.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    SharedModule,
    DatabaseModule,
    ContactUseCasesModule,
  ],
  controllers: [AppController, ContactsController],
  providers: [Configuration],
  exports: [Configuration],
})
export class AppModule {}
