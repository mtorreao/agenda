import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../frameworks/databases/database.module';
import { ContactFactoryService } from './contact-factory.service';
import { ContactUseCasesService } from './contact-use-cases.service';

@Module({
  imports: [DatabaseModule],
  providers: [ContactFactoryService, ContactUseCasesService],
  exports: [ContactFactoryService, ContactUseCasesService],
})
export class ContactUseCasesModule {}
