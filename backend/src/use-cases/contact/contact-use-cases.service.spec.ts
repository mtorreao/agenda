import { Test, TestingModule } from '@nestjs/testing';
import { IDatabase } from '../../shared/abstracts/database.abstract';
import { ContactFactoryService } from './contact-factory.service';
import { ContactUseCasesService } from './contact-use-cases.service';

const MOCK_CONTACT = {
  name: 'John Doe',
  email: 'a@a.com',
  phone: '1234567890',
};

describe('ContactUseCaseService', () => {
  let service: ContactUseCasesService;
  const genericRepoMock = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findBy: jest.fn(),
    findAll: jest.fn(),
  };
  const repositoryMock = {
    contacts: genericRepoMock,
    users: genericRepoMock,
  };
  const contactFactoryServiceMock = {
    createNewContact: jest.fn(),
    updateContact: jest.fn(),
    mapContact: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ContactUseCasesService,
        {
          provide: ContactFactoryService,
          useFactory: () => contactFactoryServiceMock,
        },
        {
          provide: IDatabase,
          useFactory: () => repositoryMock,
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
    const expected = {
      ...MOCK_CONTACT,
      id: '1',
      userId: '11',
    };
    repositoryMock.contacts.create.mockResolvedValue(expected);

    // Act
    const result = service.create(MOCK_CONTACT, expected.userId);

    // Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should return a list of all contacts', () => {
    // Arrange
    const expected = [
      {
        ...MOCK_CONTACT,
        id: '1',
        userId: '11',
      },
    ];
    repositoryMock.contacts.findAll.mockResolvedValue(expected);
    contactFactoryServiceMock.mapContact.mockImplementation((c) => c);

    // Act
    const result = service.findAll({ userId: expected[0].userId });

    // Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should return a contact by id', () => {
    // Arrange
    const expected = {
      ...MOCK_CONTACT,
      id: '1',
      userId: '11',
    };
    repositoryMock.contacts.findById.mockResolvedValue(expected);

    // Act
    const result = service.findOne(expected.id);

    // Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should update a contact and return updated data', () => {
    // Arrange
    const expected = {
      ...MOCK_CONTACT,
      id: '1',
      userId: '11',
    };
    repositoryMock.contacts.update.mockResolvedValue(expected);

    // Act
    const result = service.update(expected.id, {
      email: expected.email,
      name: expected.name,
      phone: expected.phone,
    });

    // Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should remote a contact', () => {
    // Arrange
    repositoryMock.contacts.delete.mockImplementation();

    // Act
    const result = service.remove('1');

    // Assert
    expect(() => result).not.toThrow();
  });
});
