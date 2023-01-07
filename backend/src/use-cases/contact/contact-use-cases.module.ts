import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../frameworks/databases/database.module';
import { ContactFactoryService } from './contact.factory';
import { ContactUseCasesService } from './contact.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [ContactFactoryService, ContactUseCasesService],
  exports: [ContactFactoryService, ContactUseCasesService],
})
export class ContactUseCasesModule {}
