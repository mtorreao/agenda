import { User } from '../entities/user.entity';

export class AuthLoginResponseDto {
  accessToken: string;
  user: Omit<User, 'password'>;
}
