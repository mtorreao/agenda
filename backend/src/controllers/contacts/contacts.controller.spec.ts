import { Test, TestingModule } from '@nestjs/testing';
import { ContactUseCasesService } from '../../use-cases/contact/contact-use-cases.service';
import { ContactsController } from './contacts.controller';

const MOCK_CREATE_CONTACT = {
  email: 'a@a.com',
  name: 'John Doe',
  phone: '1234567890',
};

const MOCK_FIND_ALL_CONTACTS = [
  { ...MOCK_CREATE_CONTACT, id: '1', userId: '2' },
  { ...MOCK_CREATE_CONTACT, id: '2', userId: '3' },
];

describe('ContactsController', () => {
  let controller: ContactsController;
  const contactUseCasesServiceMock = {
    create: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        {
          provide: ContactUseCasesService,
          useFactory: () => contactUseCasesServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a contact and return the new data', () => {
    // expected
    const expected = {
      ...MOCK_CREATE_CONTACT,
      id: '1',
      userId: '2',
    };
    contactUseCasesServiceMock.create.mockResolvedValue(expected);
    // actual
    const actual = controller.create(MOCK_CREATE_CONTACT, {
      user: {
        userId: expected.userId,
      },
    });

    expect(actual).resolves.toEqual(expected);
  });

  it('should return a filtered list of contacts by userId', () => {
    // expected
    const expected = [MOCK_FIND_ALL_CONTACTS[0]];
    contactUseCasesServiceMock.findAll.mockResolvedValue(expected);
    // actual
    const actual = controller.findAll({
      user: {
        userId: expected[0].userId,
      },
    });

    expect(actual).resolves.toEqual(expected);
  });

  it('should return a contact by id', () => {
    // expected
    const expected = MOCK_FIND_ALL_CONTACTS[0];
    contactUseCasesServiceMock.findOne.mockResolvedValue(expected);
    // actual
    const actual = controller.findOne(expected.id);

    expect(actual).resolves.toEqual(expected);
  });

  it('should update a contact and return the new data', () => {
    // expected
    const expected = MOCK_FIND_ALL_CONTACTS[0];
    contactUseCasesServiceMock.update.mockResolvedValue(expected);
    // actual
    const actual = controller.update(expected.id, expected);

    expect(actual).resolves.toEqual(expected);
  });

  it('should delete a contact', () => {
    // expected
    contactUseCasesServiceMock.remove.mockResolvedValue(null);
    // actual
    const actual = controller.remove(MOCK_FIND_ALL_CONTACTS[0].id);

    expect(actual).resolves.not.toThrowError();
  });
});
