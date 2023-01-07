import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '../../shared/entities/user.entity';
import { User as UserModel } from '../../frameworks/databases/mongo/models/user.model';
import { AuthRegisterDto } from '../../shared/dto/auth-register.dto';

@Injectable()
export class AuthFactoryService {
  mapToUserEntityWithoutPass(model: UserModel): Omit<UserEntity, 'password'> {
    return {
      id: model.id,
      email: model.email,
    };
  }

  createUserEntity(dto: AuthRegisterDto): Omit<UserEntity, 'id'> {
    return {
      email: dto.email,
      password: dto.password,
    };
  }
}
