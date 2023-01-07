import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule as EPassportModule } from '@nestjs/passport';
import Configuration from '../../../shared/configuration';
import { AuthService } from './auth.service';
import JwtStrategyService from './jwt-strategy.service';

@Module({
  imports: [
    EPassportModule,
    JwtModule.registerAsync({
      useFactory: (config: Configuration) => ({
        secret: config.jwtSecret(),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [Configuration],
    }),
  ],
  providers: [JwtStrategyService, AuthService],
  exports: [AuthService],
})
export class PassportModule {}
