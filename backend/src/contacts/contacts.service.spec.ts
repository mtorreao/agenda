import { Test, TestingModule } from '@nestjs/testing';
import { IDatabase } from '../shared/abstracts/database.abstract';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ContactsService,
        {
          provide: IDatabase,
          useValue: () => jest.fn(),
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
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
