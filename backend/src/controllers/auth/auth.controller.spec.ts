import { Test, TestingModule } from '@nestjs/testing';
import { AuthUseCasesService } from '../../use-cases/auth/auth-use-cases.service';
import { AuthController } from './auth.controller';

const MOCK_LOGIN = {
  email: 'a@a.com',
  password: 'Asdf1234!',
};

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthUseCasesService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthUseCasesService,
          useFactory: () => mockAuthUseCasesService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login', async () => {
    // Arrange
    const expected = '1234';
    mockAuthUseCasesService.login.mockResolvedValue({
      accessToken: expected,
    });

    // Act
    const { accessToken } = await controller.login(MOCK_LOGIN);

    // Assert
    expect(accessToken).toEqual(expected);
  });

  it('should throw an Unauthorized error if pass or email is invalid', () => {
    // expected
    mockAuthUseCasesService.login.mockResolvedValue(null);

    // actual
    const response = controller.login(MOCK_LOGIN);

    expect(response).rejects.toThrowError();
  });

  it('should register a new user and return user data and accessToken', () => {
    // expected
    const expected = {
      user: {
        id: '1',
        email: MOCK_LOGIN.email,
      },
      accessToken: '1234',
    };
    mockAuthUseCasesService.register.mockResolvedValue(expected);
    // actual
    const response = controller.register(MOCK_LOGIN);

    // Assert
    expect(response).resolves.toEqual(expected);
  });
});
