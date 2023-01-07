import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

describe('ContactsController', () => {
  let controller: ContactsController;
  const contactsServiceMock = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        {
          provide: ContactsService,
          useFactory: () => contactsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of contacts', () => {
    // Arrange
    const expected = [
      {
        id: 1,
        name: 'John Doe',
        email: 'a@a.com',
        phone: '1234567890',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'a@b.com',
        phone: '1234567890',
      },
    ];
    contactsServiceMock.findAll.mockResolvedValueOnce(expected);

    // Act
    const result = controller.findAll();

    // Assert
    expect(result).resolves.toEqual(expected);
  });
});
