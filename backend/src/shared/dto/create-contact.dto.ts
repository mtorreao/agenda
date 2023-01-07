import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateContactDto {
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @IsString()
  @ApiProperty({
    description: 'Nome do contato',
    required: true,
  })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @ApiProperty({
    description: 'Email do contato',
  })
  email: string;

  @IsPhoneNumber('BR')
  @ApiProperty({
    description: 'Telefone do contato',
  })
  phone: string;
}
