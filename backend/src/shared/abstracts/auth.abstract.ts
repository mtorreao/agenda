import { JwtSignInDto } from '../dto/jwt-sign-in.dto';
import { JwtSignOutDto } from '../dto/jwt-sign-out.dto';
import { JwtSignUpDto } from '../dto/jwt-sign-up.dto';

export abstract class IAuth {
  abstract signIn(dto: JwtSignInDto): Promise<string>;
  abstract signUp(dto: JwtSignUpDto): Promise<string>;
  abstract signOut(dto: JwtSignOutDto): Promise<string>;
}
