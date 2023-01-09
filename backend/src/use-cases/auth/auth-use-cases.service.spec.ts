import { Test, TestingModule } from '@nestjs/testing';
import { IAuth } from '../../shared/abstracts/auth.abstract';
import { IDatabase } from '../../shared/abstracts/database.abstract';
import { IGenericRepository } from '../../shared/abstracts/generic-repository.abstract';
import { User } from '../../shared/entities/user.entity';
import { AuthFactoryService } from './auth-factory.service';
import { AuthUseCasesService } from './auth-use-cases.service';

const MOCK_RESPONSE = {
  user: <User>{
    id: '1',
    email: 'a@a.com',
    password: '1234567890',
  },
  accessToken: 'abc',
};

describe('AuthUseCasesService', () => {
  let service: AuthUseCasesService;
  const genericRepoMock: IGenericRepository<any> = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findBy: jest.fn(),
    findAll: jest.fn(),
  };
  const repositoryMock: IDatabase = {
    contacts: genericRepoMock,
    users: genericRepoMock,
  };
  const authMock: IAuth = {
    signIn: jest.fn(),
  };
  const authFactoryMock: AuthFactoryService = {
    mapToUserEntityWithoutPass: jest.fn(),
    createUserEntity: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthUseCasesService,
        {
          provide: IDatabase,
          useFactory: () => repositoryMock,
        },
        {
          provide: IAuth,
          useFactory: () => authMock,
        },
        {
          provide: AuthFactoryService,
          useFactory: () => authFactoryMock,
        },
      ],
    }).compile();

    service = module.get<AuthUseCasesService>(AuthUseCasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login', () => {
    // expected
    const expected = MOCK_RESPONSE;
    repositoryMock.users.findBy = jest
      .fn()
      .mockResolvedValueOnce(MOCK_RESPONSE.user);
    authMock.signIn = jest
      .fn()
      .mockResolvedValueOnce(MOCK_RESPONSE.accessToken);
    authFactoryMock.mapToUserEntityWithoutPass = jest
      .fn()
      .mockReturnValueOnce(MOCK_RESPONSE.user);
    // actual
    const actual = service.login({
      ...MOCK_RESPONSE.user,
    });

    // assert
    expect(actual).resolves.toEqual(expected);
  });

  it('should register a new user', () => {
    // expected
    const expected = MOCK_RESPONSE;
    repositoryMock.users.create = jest
      .fn()
      .mockResolvedValueOnce(MOCK_RESPONSE.user);
    authMock.signIn = jest
      .fn()
      .mockResolvedValueOnce(MOCK_RESPONSE.accessToken);
    authFactoryMock.mapToUserEntityWithoutPass = jest
      .fn()
      .mockReturnValueOnce(MOCK_RESPONSE.user);
    authFactoryMock.createUserEntity = jest
      .fn()
      .mockReturnValueOnce(MOCK_RESPONSE.user);
    // actual
    const actual = service.register({
      ...MOCK_RESPONSE.user,
    });

    // assert
    expect(actual).resolves.toEqual(expected);
  });
});
