import { JwtSignInDto } from '../dto/jwt-sign-in.dto';

export abstract class IAuth {
  abstract signIn(dto: JwtSignInDto): Promise<string>;
}
