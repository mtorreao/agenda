import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../frameworks/databases/mongo/models/user.model';
import { AuthRegisterDto } from '../../shared/dto/auth-register.dto';
import { AuthFactoryService } from './auth-factory.service';

const MOCK_USER: User = {
  id: '1',
  email: 'a@a.com',
  password: '1234',
};

describe('AuthFactoryService', () => {
  let service: AuthFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthFactoryService],
    }).compile();

    service = module.get<AuthFactoryService>(AuthFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should map user entity without pass', () => {
    // expected
    const expected = { ...MOCK_USER };
    // actual
    const actual = service.mapToUserEntityWithoutPass(expected);

    // assert
    expect(actual).toEqual({
      id: expected.id,
      email: expected.email,
    });
  });

  it('should map user entity without id for create', () => {
    // expected
    const expected: AuthRegisterDto = { ...MOCK_USER };
    // actual
    const actual = service.createUserEntity(expected);
    // assert
    expect(actual).toEqual({
      email: expected.email,
      password: expected.password,
    });
  });
});
