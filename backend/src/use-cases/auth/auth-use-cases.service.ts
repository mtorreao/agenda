import { Injectable } from '@nestjs/common';
import { IAuth } from '../../shared/abstracts/auth.abstract';
import { IDatabase } from '../../shared/abstracts/database.abstract';
import { AuthLoginResponseDto } from '../../shared/dto/auth-login-response.dto';
import { AuthLoginDto } from '../../shared/dto/auth-login.dto';
import { AuthRegisterDto } from '../../shared/dto/auth-register.dto';
import { AuthFactoryService } from './auth-factory.service';

@Injectable()
export class AuthUseCasesService {
  constructor(
    private readonly repository: IDatabase,
    private readonly auth: IAuth,
    private readonly authFactory: AuthFactoryService,
  ) {}

  async login(dto: AuthLoginDto): Promise<AuthLoginResponseDto> {
    const user = await this.repository.users.findBy('email', dto.email);
    if (user && user.password === dto.password) {
      return {
        user: this.authFactory.mapToUserEntityWithoutPass(user),
        accessToken: await this.auth.signIn({
          email: user.email,
          userId: user.id,
        }),
      };
    }
    return null;
  }

  async register(dto: AuthRegisterDto): Promise<AuthLoginResponseDto> {
    const userExists = await this.repository.users.findBy('email', dto.email);
    if (userExists) {
      return null;
    }
    const user = await this.repository.users.create(
      this.authFactory.createUserEntity(dto),
    );

    return {
      user: this.authFactory.mapToUserEntityWithoutPass(user),
      accessToken: await this.auth.signIn({
        email: user.email,
        userId: user.id,
      }),
    };
  }
}
