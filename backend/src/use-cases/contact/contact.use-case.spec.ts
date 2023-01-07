import { Test, TestingModule } from '@nestjs/testing';
import { IDatabase } from '../../shared/abstracts/database.abstract';
import { ContactUseCasesService } from './contact.use-case';

describe('ContactUseCaseService', () => {
  let service: ContactUseCasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ContactUseCasesService,
        {
          provide: IDatabase,
          useValue: () => jest.fn(),
        },
      ],
    }).compile();

    service = module.get<ContactUseCasesService>(ContactUseCasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contact', () => {
    // Arrange
    const contact = {
      name: 'John Doe',
      email: 'a@a.com',
      phone: '1234567890',
    };

    // Act
    const result = service.create(contact);

    // Assert
    expect(result).resolves.toEqual(contact);
  });
});
