import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuth } from '../../../shared/abstracts/auth.abstract';
import { JwtSignInDto } from '../../../shared/dto/jwt-sign-in.dto';

@Injectable()
export class AuthService implements IAuth {
  constructor(private readonly jwtService: JwtService) {}

  signIn(dto: JwtSignInDto): Promise<string> {
    return this.jwtService.signAsync({ email: dto.email, sub: dto.userId });
  }
}
