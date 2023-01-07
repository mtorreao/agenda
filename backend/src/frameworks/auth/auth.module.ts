import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { IAuth } from '../../shared/abstracts/auth.abstract';
import { AuthService } from './passport/auth.service';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { PassportModule } from './passport/passport.module';

@Module({
  imports: [PassportModule],
  providers: [
    {
      provide: IAuth,
      useExisting: AuthService, // Por enquanto que só tem um provider, podemos usar o useExisting
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [IAuth],
})
export class AuthModule {}
