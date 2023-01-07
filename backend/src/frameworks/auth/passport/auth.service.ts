import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuth } from '../../../shared/abstracts/auth.abstract';
import { JwtSignInDto } from '../../../shared/dto/jwt-sign-in.dto';
import { JwtSignOutDto } from '../../../shared/dto/jwt-sign-out.dto';
import { JwtSignUpDto } from '../../../shared/dto/jwt-sign-up.dto';

@Injectable()
export class AuthService implements IAuth {
  constructor(private readonly jwtService: JwtService) {}

  signIn(dto: JwtSignInDto): Promise<string> {
    return this.jwtService.signAsync({ email: dto.email, sub: dto.userId });
  }

  signUp(dto: JwtSignUpDto): Promise<string> {
    throw new Error('Method not implemented.');
  }
  signOut(dto: JwtSignOutDto): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
