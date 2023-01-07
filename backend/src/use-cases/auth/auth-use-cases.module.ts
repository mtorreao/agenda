import { Module } from '@nestjs/common';
import { AuthModule } from '../../frameworks/auth/auth.module';
import { DatabaseModule } from '../../frameworks/databases/database.module';
import { AuthFactoryService } from './auth-factory.service';
import { AuthUseCasesService } from './auth-use-cases.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [AuthFactoryService, AuthUseCasesService],
  exports: [AuthFactoryService, AuthUseCasesService],
})
export class AuthUseCasesModule {}
