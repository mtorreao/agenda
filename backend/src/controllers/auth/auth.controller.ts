import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../shared/decorators/public.decorator';
import { AuthLoginDto } from '../../shared/dto/auth-login.dto';
import { AuthRegisterDto } from '../../shared/dto/auth-register.dto';
import { AuthUseCasesService } from '../../use-cases/auth/auth-use-cases.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCases: AuthUseCasesService) {}

  @Public()
  @ApiOperation({
    summary: 'Faz o login do usuário, retornando um token de acesso',
  })
  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    const resp = await this.authUseCases.login(body);
    if (!resp) {
      throw new HttpException(
        'Usuário ou senha inválidos',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return resp;
  }

  @Public()
  @ApiOperation({
    summary: 'Registra um novo usuário',
  })
  @Post('register')
  register(@Body() body: AuthRegisterDto) {
    return this.authUseCases.register(body);
  }
}
