import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthRegisterDto {
  @IsEmail({}, { message: 'Email inválido' })
  @ApiProperty({
    description: 'Email do usuário',
  })
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 0,
    },
    { message: 'Senha não atende aos critérios mínimos de segurança' },
  )
  @ApiProperty({
    description: 'Senha do usuário',
  })
  password: string;
}
